const { mongoose, Footprint } = require("../db");

async function postFootprint(footprint) {
  console.log("Footprint in model: ", footprint);
  const doc = await Footprint.create({ footprint });
  console.log("Doc posted: ", doc);
  return doc;
}
async function getFootprints() {
  const docs = await Footprint.find({});
  console.log("Docs array: ", docs);
  return docs;
}

module.exports = { postFootprint, getFootprints };
