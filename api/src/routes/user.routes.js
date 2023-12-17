module.exports = (userapp) => {
  const users = require("../controllers/user.controller.js");
  const router = require("express").Router();
  const verifyToken = require("../middlewares/auth.jwt.js");

  router.use(verifyToken);

  router.post("/", users.createUser);
  router.get("/:id", users.getUserById);
  router.get("/", users.getAllUsers);
  router.put("/:id", users.updateUserById);
  router.delete("/:id", users.deleteUserById);

  userapp.use("/api/users", router);
};