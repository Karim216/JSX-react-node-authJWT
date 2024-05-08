module.exports = (userapp) => {
  const users = require("../controllers/user.controller.js");
  const router = require("express").Router();
  const verifyToken = require("../middlewares/auth.jwt.js");

  // All routes are protected and can only be accessed by authenticated users
  router.use(verifyToken);

  router.post("/", users.createUser);
  router.get("/:id", users.getUserById);
  router.get("/", users.getAllUsers);
  router.get("/me/infos", users.getUserInfo);
  router.put("/:id", users.updateUserById);
  router.delete("/:id", users.deleteUserById);

  userapp.use("/api/users", router);
};