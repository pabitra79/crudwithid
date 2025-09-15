const UserSchema = require("../model/userSchmea");

class UserController {
  // creta the user
  async createUser(req, res) {
    try {
      const { user_name } = req.body;
      // if (!user_name) {
      //   console.log("All feild required");
      // }
      const data = new UserSchema({
        user_name,
      });
      const newData = await data.save();
      if (newData) {
        return res.redirect("/productForm");
      }
      // return res.status(201).json({ message: true });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
  //   get the user data
  async getUser(req, res) {
    try {
      const user = await UserSchema.find();
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
}
module.exports = new UserController();
