module.exports = app => {
    const dna = require("../controllers/dna.controller.js");
  
    var router = require("express").Router();
  
    // Create a new DNA chain
    router.post("/", dna.create);
  
    // Retrieve all DNA chains
    router.get("/", dna.findAll);
  
    app.use('/mutation', router);
};