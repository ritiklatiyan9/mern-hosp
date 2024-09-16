export const genrateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent only over HTTPS in production
      sameSite: 'None', // Allows cross-domain cookie sharing
    })
    .json({
      success: true,

      message,
      user,
      token,
    });
};
