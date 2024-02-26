const router = require("express").Router();
const pfRoutes = require("./pf");

// Post routes
router.use("/pf", pfRoutes);

module.exports = router;