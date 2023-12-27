exports.jwtToken = async (message, statusCode, user, res) => {
  const token = await user.getJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("token", token, options).status(statusCode).json({
    success: true,
    token,
    message,
    user,
    isAuthenticated: true,
  });
};
