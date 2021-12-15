import bcrypt from "bcrypt";
const SALT = 10;

export default class AuthService {
  static async hashPassword(password, salt = SALT) {
    return await bcrypt.hash(password, salt);
  }
  static async comparePassword(password, hashedPassword) {
    if (!password) return false;
    return await bcrypt.compare(password, hashedPassword);
  }
}
