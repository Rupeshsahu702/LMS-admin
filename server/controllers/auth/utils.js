import ms from "ms";

/**
 * Generates secure cookie options for access tokens.
 * Implements security best practices including XSS and CSRF protection.
 *
 * @function getAccessTokenCookieOptions
 * @returns {Object} Cookie configuration object
 */
export const getAccessTokenCookieOptions = () => ({
  httpOnly: true, // Prevents XSS attacks - JavaScript cannot access
  secure: true, // HTTPS only in production
  sameSite: "strict", // Prevents CSRF attacks
  maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY),
});

/**
 * Generates secure cookie options for refresh tokens.
 * Implements security best practices including XSS and CSRF protection.
 *
 * @function getRefreshTokenCookieOptions
 * @returns {Object} Cookie configuration object
 */
export const getRefreshTokenCookieOptions = () => ({
  httpOnly: true, // Prevents XSS attacks
  secure: true, // HTTPS only in production
  sameSite: "strict", // Prevents CSRF attacks
  maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY),
});

/**
 * Clears authentication cookies from the response
 * @param {Object} res - Express response object
 */
export const clearAuthCookies = (res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
};

/**
 * Sets authentication tokens in HTTP-only cookies
 * @param {Object} res - Express response object
 * @param {string} accessToken - JWT access token
 * @param {string} refreshToken - JWT refresh token
 */
export const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, getAccessTokenCookieOptions());
  res.cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
};

/**
 * Formats user data for API response
 * @param {Object} user - User document from database
 * @returns {Object} Formatted user object
 */
export const formatUserResponse = (user) => ({
  id: user._id,
  email: user.email,
  name: user.name,
  lastName: user.lastName,
  lmsId: user.lmsId,
  role: user.role,
  accountStatus: user.accountStatus,
  avatar: user.avatar,
});
