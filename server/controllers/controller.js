const model = require("../models/model");

async function postFootprint(req, res) {
  const { footprint } = req.body;
  console.log("Inside controller");
  try {
    const doc = await model.postFootprint(footprint);
    console.log("Post to database successful 🍏");
    res.status(200).json(doc);
  } catch (error) {
    console.log("Error posting to database 🍎, ", error);
    res.sendStatus(400);
  }
}

async function getFootprints(req, res) {
  try {
    const footprintArray = await model.getFootprints();
    console.log("Post to database successful 🍏");
    res.status(201).json(footprintArray);
  } catch (error) {
    console.log("Error posting to database 🍎, ", error);
    res.sendStatus(400);
  }
}

module.exports = { postFootprint, getFootprints };
