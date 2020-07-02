const sql = require("./db.js");

// constructor
const User = function(user) {
  this.age = user.age;
  this.gender = user.gender;
  this.name = user.name;
  this.image_path = user.imagePath;
  this.created_at = user.createdAt;
  this.updated_at = user.updatedAt;
};


User.create = (newUser, result) => {
  console.log("User ", newUser )
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = User;