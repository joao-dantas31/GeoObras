const { execute, queryOne } = require("./database/sqlite");
module.exports = {
  async ddlUser() {
    await execute(
      "CREATE TABLE IF NOT EXISTS database (\
            type TEXT,\
            host TEXT,\
            port INTEGER,\
            user TEXT,\
            password TEXT,\
            database TEXT,\
            dialect TEXT,\
            active TEXT,\
            CONSTRAINT database_pk PRIMARY KEY(type, host, port, database));"
    );

    const configuration = await queryOne(
      "SELECT * FROM database WHERE type = 'mssql' AND dialect = 'mssql'"
    );
    if (configuration) {
      await execute(
        "UPDATE database SET host = ?, port = ? WHERE type = 'mssql' AND dialect = 'mssql';",
        [process.env.DB_IP_ADRESS, process.env.DB_PORT]
      );
    } else {
      await execute(
        "INSERT INTO database(type, host, port, database, user, password, dialect, active) VALUES (?,?,?,?,?,?,?,?);",
        [
          "mssql",
          process.env.DB_IP_ADRESS,
          process.env.DB_PORT,
          "GeoObras",
          "sa",
          "Mssql123", //Passar por env posteriormente
          "mssql",
          "true",
        ]
      );
    }

    await execute(
      "CREATE TABLE IF NOT EXISTS saved_layers (\
                table_name TEXT,\
                json TEXT,\
                CONSTRAINT saved_layers_pk PRIMARY KEY(table_name));"
    );
  },
};
