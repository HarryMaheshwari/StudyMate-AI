import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  googleLogin
} from "../services/auth.service.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const googleAuth = asyncHandler(async (req, res) => {
  const { idToken } = req.body;

  const { user, accessToken, refreshToken } =
    await googleLogin(idToken);

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user,
        },
        "Google login successful."
      )
    );
});

export const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const { user, accessToken, refreshToken } = await registerUser({
    fullName,
    email,
    password,
  });

  return res
    .status(201)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        201,
        {
          user
          
        },
        "Account created successfully."
      )
    );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, accessToken, refreshToken } = await loginUser({
    email,
    password,
  });

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user
         
        },
        "Login successful."
      )
    );
});

export const logout = asyncHandler(async (req, res) => {
  await logoutUser(req.user.id);

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, null, "Logout successful."));
});

export const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  const { accessToken, refreshToken: newRefreshToken } =
    await refreshAccessToken(incomingRefreshToken);

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", newRefreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        null,
        "Access token refreshed successfully."
      )
    );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      req.user,
      "Current user fetched successfully."
    )
  );
});
