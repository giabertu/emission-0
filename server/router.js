const router = require("express").Router();
const controller = require("./controllers/controller");

router.post("/footprints", controller.postFootprint);
/* router.get("/footprints", controller.getFootprints); */

module.exports = router;
