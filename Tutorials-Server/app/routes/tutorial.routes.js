module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Tutorial Create
  router.post("/", tutorials.create);

  // Tutorials List
  router.get("/", tutorials.findAll);

  // Tutorial Show 
  router.get("/:id", tutorials.findOne);

  // Tutorial Delete
  router.delete("/:id", tutorials.delete);
  
    // Update a Tutorial with id
    router.put("/:id", tutorials.update);

  // Delete all Tutorials
  router.delete("/", tutorials.deleteAll);

  app.use('/api/tutorials', router);
};
