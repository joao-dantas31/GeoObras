require("dotenv").config();
const mssql = require("mssql");
const {HttpError} = require("../errors/http-error");
const config = {
  user: "sa",
  password: "Mssql123",
  port: 1433,
  server: "localhost",
  database: "GeoObras",
  options: { trustServerCertificate: true },
};

const queryFromDb = async (queryText, ...otherParams) => {
  const client = await buildClient();

  let result;
  if (client) {
    result = await client.request().query(queryText, ...otherParams);
  }
  else {
    throw new HttpError(500, "Failed to connect to the database")
  }

  mssql.close();
  return result.recordset;
};

const buildClient = async (callback) => {
  let client;
  try {
    client = await mssql.connect(config);
  } catch (error) {
    console.log(error);
  }

  return client;
};

module.exports = {
  query: queryFromDb,
};
