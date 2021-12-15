import jwt from "jsonwebtoken";

export const check_authentication = async (req, res, next) => {
  const token = req.cookies["jwt"];
  if (!token)
    return res
      .status(405)
      .json({ message: "You need to log in first before doing this" });
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = user["id"];
    next();
  } catch (e) {
    console.error(e.message);
    res.cookie("jwt", "expired", { maxAge: 1 });
    return res.status(405).json({
      message: "Your session has expired. Please, try reauthenticate yourself",
      status: 401,
    });
  }
};
