import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import slugify from "slugify";
import jwt from "jsonwebtoken";

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
};