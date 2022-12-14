const mysql = require('mysql2/promise');
const dbConfig = require('../configs/db.config');
const connection =  mysql.createPool(dbConfig);
async function query(sql, params) {
  // console.log(connection.format(sql, params));
  const [results, ] = await connection.execute(connection.format(sql, params));
  // const [results, ] = await connection.(sql, params);
  return results;
}
module.exports = {
  query
}
