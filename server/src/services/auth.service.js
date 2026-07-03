import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import slugify from "slugify";
import jwt from "jsonwebtoken";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (idToken) => {
  if (!idToken) {
    throw new ApiError(400, "Google ID token is required");
  }

  // Verify Google ID Token
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const {
    sub: googleId,
    email,
    name,
    picture,
    email_verified,
  } = payload;

  if (!email_verified) {
    throw new ApiError(401, "Google email is not verified");
  }

  // Find user by Google ID or Email
  let user = await User.findOne({
    $or: [{ googleId }, { email }],
  }).select("+refreshToken");

  // Create a new user if one doesn't exist
  if (!user) {
    const username = await generateUsername(name);

    user = await User.create({
      fullName: name,
      username,
      email,
      profilePicture: picture,
      authProvider: "google",
      googleId,
      isVerified: true,
    });
  }

  // Link an existing email account with Google
  else if (!user.googleId) {
    user.googleId = googleId;
    user.authProvider = "google";
    user.isVerified = true;

    // Save Google profile picture only if the user doesn't already have one
    if (!user.profilePicture) {
      user.profilePicture = picture;
    }

    await user.save({
      validateBeforeSave: false,
    });
  }

  // Generate our JWT tokens
  const { accessToken, refreshToken } = createTokenPair(user);

  // Store the latest refresh token
  await saveRefreshToken(user, refreshToken);

  return {
    user: user.toJSON(),
    accessToken,
    refreshToken,
  };
};

const generateUsername = async (fullName) => {
  const baseUsername = slugify(fullName, {
    lower: true,
    strict: true,
    replacement: "",
  });

  let username = baseUsername;

  while (await User.findOne({ username })) {
    username = `${baseUsername}${Math.floor(1000 + Math.random() * 9000)}`;
  }

  return username;
};

const createTokenPair = (user) => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  return {
    accessToken,
    refreshToken,
  };
};

const saveRefreshToken = async (user, refreshToken) => {
  user.refreshToken = refreshToken;

  await user.save({
    validateBeforeSave: false,
  });
};

const registerUser = async ({ fullName, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const username = await generateUsername(fullName);

  const user = await User.create({
    fullName,
    username,
    email,
    password,
  });

  const { accessToken, refreshToken } = createTokenPair(user);

  await saveRefreshToken(user, refreshToken);

  return {
    user: user.toJSON(),
    accessToken,
    refreshToken,
  };
};


const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select(
    "+password +refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  user.lastLogin = new Date();

  const { accessToken, refreshToken } = createTokenPair(user);

  await saveRefreshToken(user, refreshToken);

  return {
    user: user.toJSON(),
    accessToken,
    refreshToken,
  };
};


const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, {
    $unset: {
      refreshToken: 1,
    },
  });

  return true;
};


const refreshAccessToken = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token is required");
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const user = await User.findById(decodedToken.id).select("+refreshToken");

  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (user.refreshToken !== incomingRefreshToken) {
    throw new ApiError(401, "Refresh token mismatch");
  }

  const { accessToken, refreshToken } = createTokenPair(user);

  await saveRefreshToken(user, refreshToken);

  return {
    accessToken,
    refreshToken,
  };
};

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  createTokenPair,
  saveRefreshToken,
  googleLogin
};