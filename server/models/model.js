const { mongoose, Footprint } = require("../db");

async function postFootprint(footprint) {
  console.log("Footprint in model: ", footprint);
  const doc = await Footprint.create({ footprint });
  console.log("Doc posted: ", doc);
  return doc;
}

module.exports = { postFootprint };
