const Message = require("../models/message.model");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const message = new Message({
        senderUserId:  req.body.senderUserId,
        recUserId: req.body.recUserId,
        message: req.body.message,
        deleteAt: req.body.deleteAt,
        createdAt: req.body.createdAt
    });
    console.log(message)
  
    // Save Customer in the database
    Message.create(message, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
  };

  exports.findMany = (req, res) => {
    Message.getAllUserMessages(req.params.userid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.userid}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.userid
          });
        }
      } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Message.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.customerId
          });
        }
      } else res.send({ message: `Message was deleted successfully!` });
    });
  };