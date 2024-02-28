const router = require("express").Router();
const pfRoutes = require("./pf");
const writeRoutes = require("./write");
const readRoutes = require("./read");

// Post routes
// router.use("/read", readRoutes);
// router.use("/write", writeRoutes);
router.use("/pf", pfRoutes);

module.exports = router;