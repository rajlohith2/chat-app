const sql = require("./db.js");

/**
 * You first need to create a formatting function to pad numbers to two digits…
 **/
function twoDigits(d) {
  if(0 <= d && d < 10) return "0" + d.toString();
  if(-10 < d && d < 0) return "-0" + (-1*d).toString();
  return d.toString();
}

/**
* …and then create the method to output the date string as desired.
* Some people hate using prototypes this way, but if you are going
* to apply this to more than one Date object, having it as a prototype
* makes sense.
**/
Date.prototype.toMysqlFormat = function() {
  return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

// constructor
const Message = function(message) {
    this.senderUserId = message.senderUserId;
    this.receiverUserId = message.recUserId;
    this.message = message.message;
    this.delete_at = new Date(message.deleteAt).toMysqlFormat();
    this.created_at = new Date(message.createdAt).toMysqlFormat();
    this.updated_at = new Date().toMysqlFormat();

};

Message.create = (newMessage, result) => {
  sql.query("INSERT INTO messages SET ?", newMessage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var datetime = new Date().toMysqlFormat();
    sql.query(
      `UPDATE users SET updated_at='${datetime}' WHERE id=${newMessage.senderUserId}`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          //result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found User with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );

    console.log("created message: ", { id: res.insertId, ...newMessage });
    result(null, { id: res.insertId, ...newMessage });
  });
};

Message.getAllUserMessages = (userId, result) => {
    sql.query(`SELECT * FROM messages where senderUserId=${userId} or receiverUserId=${userId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("users: ", res);
      result(null, res);
    });
  };
Message.remove = (id, result) => {
  sql.query("DELETE FROM messages WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Message with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted message with id: ", id);
    result(null, res);
  });
};
module.exports = Message;