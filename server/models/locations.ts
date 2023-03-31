const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("../data/worldcities.csv");
let csvData: any[] = [];
let csvStream = fastcsv
  .parse()
  .on("data", function (data: any) {
    csvData.push(data);
  })
  .on("end", function () {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const pool = new Pool({
      host: "localhost",
      user: "postgres",
      database: "weather_app",
      password: "Nosilla11!",
      port: 5432,

      idleTimeoutMillis: 0,
      connectionTimeoutMillis: 0
    });

    const query =
      "INSERT INTO locations (city, city_ascii, lat, lng, country, iso2, iso3, admin_name, capital, population, id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";

    pool.connect((err: any, client: { query: (arg0: string, arg1: undefined, arg2: ((err: any, res: any) => void) | undefined) => void; }, done: () => void) => {
      if (err) throw err;

      try {
        csvData.forEach(row => {
          client.query(query, row, (err: { stack: any; }, res: { rowCount: string; }) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } catch(e){
        client.query('ROLLBACK')
      }
      finally {
        done();
      }
    });
  });

stream.pipe(csvStream);
