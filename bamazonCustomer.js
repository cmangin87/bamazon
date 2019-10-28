var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Olive1989",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  displayInventory();
});

function displayInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (i = 0; i < res.length; i++) {
      console.log("item number: " + res[i].item_id);
      console.log("item: " + res[i].product_name);
      console.log("price: $" + res[i].price);
    }
    purchase();
  });
}
