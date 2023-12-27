exports.jwtToken = async (message, statusCode, user, res) => {
  const token = await user.getJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    sameSite: "None", // Allow cross-domain cookies
    httpOnly: true, // Only accessible via HTTP(S), not JS/browser access
  };

  res.cookie("token", token, options).status(statusCode).json({
    success: true,
    token,
    message,
    user,
    isAuthenticated: true,
  });
};
