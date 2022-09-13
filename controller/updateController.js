const argon2 = require("argon2");
const { UpdateUser } = require("../model/db");

const updateController = async (req, res) => {
  const { fullname, email, username, password } = req.body;
  const { id } = req.params;
  const mainPassword = await argon2.hash(password);
  UpdateUser(
    {
      id: id,
      Full_Name: fullname,
      Email: email,
      Username: username,
      Password: mainPassword,
    },
    (err) => {
      if (err) {
        res.status(500).json({ status: false, message: "Error updating user" });
      } else {
        res
          .status(200)
          .json({ status: true, message: "User updated successfully" });
      }
    }
  );
};

module.exports = updateController;