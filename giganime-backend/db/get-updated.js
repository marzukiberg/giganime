const dataServer1 = require("./updated-data/server1");

const getUpdated = async () => {
  const items1 = await dataServer1();
  return items1;
};

module.exports = getUpdated;
