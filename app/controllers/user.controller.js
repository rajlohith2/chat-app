const User = require("../models/user.model");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log("REQ", req.body)
    // Create a Customer
    const user = new User({
      age: req.body.age,
      name: req.body.name,
      gender: req.body.gender,
      imagePath: req.body.imagePath,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    });
    console.log("USER", user)
  
    // Save Customer in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
  };


  exports.findOne = (req, res) => {
    User.findById(req.params.userid, (err, data) => {
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