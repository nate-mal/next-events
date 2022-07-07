const { Client } = require("pg");

export default async function excuteQuery({ query, values }) {
  const client = new Client({
    connectionString: process.env.PGSQL_DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  return new Promise((resolve, reject) => {
    try {
      client.connect();
      client.query(query, (error, response) => {
        if (error) {
          if (error.rowCount === 0) {
            console.log(error);
            throw new Error({ message: "No data available", error });
          }
          console.log(error);
          throw new Error(error);
        }
        // for (let row of response.rows) {
        //   console.log(JSON.stringify(row));
        // }
        // console.log(response);
        resolve(response.rows);

        client.end();
      });
    } catch (error) {
      // console.log(error);
      reject({
        message: `Something went wrong with the database connection`,
        error: error,
      });
    }
  });
}

// const { Client } = require("pg");

// export default async function excuteQuery({ query, values }) {
//   console.log(process.env.GREETINGS);
//   const client = new Client({
//     connectionString: process.env.PGSQL_DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   });
//   try {
//     client.connect();
//     client.query(query, (err, response) => {
//       if (err) {
//         console.log(err);

//         throw err;
//       }
//       for (let row of response.rows) {
//         console.log(JSON.stringify(row));
//       }
//       console.log(response.rows);
//       client.end();
//     });
//   } catch (error) {
//     console.log(error);
//     return { error };
//   } finally {
//     client.end();
//   }
// }

// import { Pool } from "pg";

// const conn = new Pool({
//   user: process.env.PGSQL_USER,
//   password: process.env.PGSQL_PASSWORD,
//   host: process.env.PGSQL_HOST,
//   port: process.env.PGSQL_PORT,
//   database: process.env.PGSQL_DATABASE,
//   sslmode: "require",
// });

// export default async function excuteQuery({ query, values }) {
//   console.log(process.env.GREETINGS);
//   try {
//     const results = await conn.query(query, values);
//     return results;
//   } catch (error) {
//     console.log(error);
//     return { error };
//   }
// }

// import mysql from "serverless-mysql";
// const db = mysql({
//   config: {
//     host: process.env.MYSQL_HOST,
//     port: process.env.MYSQL_PORT,
//     database: process.env.MYSQL_DATABASE,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//   },
// });
// export default async function excuteQuery({ query, values }) {
//   console.log(process.env.GREETINGS);
//   try {
//     const results = await db.query(query, values);
//     await db.end();
//     return results;
//   } catch (error) {
//     return { error };
//   }
// }
