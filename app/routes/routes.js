module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const messages = require("../controllers/message.controller.js");
    app.post("/create-user", users.create);
   
    app.get("/users/:userid", users.findOne);
  
    app.post("/create-msg", messages.create);
  
    app.get("/get-messages/:userid", messages.findMany);
  
    app.delete("/messages/:id", messages.delete);
  };