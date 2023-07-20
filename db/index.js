const mysql = require("mysql2");
const config = require("config");

const connection = mysql
  .createConnection({
    host: config.get("host"),
    user: config.get("user"),
    password: config.get("password"),
    database: config.get("database"),
  })
  .promise();

const createUser = async (uname, pass) => {
  const result = await connection.query(
    `
  INSERT INTO users (username,password)
  values (?,?,)
    `,
    [uname, pass]
  );
  return result;
};

const getUser = async (uname) => {
  const result = await connection.query(
    `SELECT id,username,password FROM users where username=?`,
    [uname]
  );
  return result;
};

module.exports = {  createUser, getUser };
