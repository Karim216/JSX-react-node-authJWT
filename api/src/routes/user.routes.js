module.exports = (userapp) => {
  const users = require("../controllers/user.controller.js");
  const verifyToken = require("../middlewares/auth.jwt");
  const router = require("express").Router();

  router.use(verifyToken);
  router.post("/", users.create);
  router.get("/", users.findAll);
  router.get("/:id", users.findOne);
  router.put("/:id", users.update);
  router.put("/password/:id", users.updatePassword);
  router.delete("/:id", users.delete);
  router.delete("/", users.deleteAll);

  userapp.use("/api/users", router);
};