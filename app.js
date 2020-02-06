const faker = require("faker");
const mysql = require("mysql");

console.log(faker.internet.email());

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "node_mysql",
  password: ""
});

// Query
const query = "select count(*) as total from users";
con.query(query, (err, results, fields) => {
  if (err) throw err;
  console.log(results[0].total);
});

/** Inserting */

let q = 'insert into users (email) values ("google@test.com")';
con.query(q, (err, results, fields) => {
  if (err) throw err;
  console.log(results);
});

let person = { email: faker.internet.email(), created_at: faker.date.past() };
// set ? でdynamicに値が変化する。object名とカラム名は対応させる
const result = con.query("insert into users set ?", person, (error, result) => {
  if (error) throw error;
  console.log(result);
});

/** Bulk insert */
let data = [];
for (let i = 0; i < 500; i++) {
  data.push([faker.internet.email(), faker.date.past()]);
}

let q = "insert into users (email, created_at) values ?";

console.log(data);

con.query(q, [data], (err, result) => {
  console.log(err);
  console.log(result);
});

con.end();
