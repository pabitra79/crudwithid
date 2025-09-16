const UserSchema = require("../model/userSchmea");

class UserController {
  // Create the user
  async createUser(req, res) {
    try {
      const { user_name } = req.body;

      // FIXED: Added validation back with proper error handling
      if (!user_name || user_name.trim() === "") {
        return res.status(400).json({ error: "User name is required" });
      }

      const data = new UserSchema({
        user_name: user_name.trim(),
      });

      const newData = await data.save();

      // FIXED: Added proper conditional return
      if (newData) {
        return res.redirect("/productForm");
      } else {
        return res.status(500).json({ error: "Failed to create user" });
      }
    } catch (err) {
      console.error("Error creating user:", err);

      // Handle duplicate key error
      if (err.code === 11000) {
        return res.status(400).json({ error: "User name already exists" });
      }

      return res.status(500).json({ err: err.message });
    }
  }

  // Get the user data
  async getUser(req, res) {
    try {
      const user = await UserSchema.find();
      return res.status(200).json(user);
    } catch (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ err: err.message });
    }
  }
}

module.exports = new UserController();
