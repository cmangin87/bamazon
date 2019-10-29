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

function purchase() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "item_id",
        message: "Enter the id number of the item you would like to purchase.",
        filter: Number
      },
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase?",
        filter: Number
      }
    ])
    .then(function(purchase) {
      var item = purchase.item_id;
      var quantity = purchase.quantity;

      var queryStr = "SELECT * FROM products WHERE ?";

      connection.query(queryStr, { item_id: item }, function(err, res) {
        if (err) throw err;

        if (res.length === 0) {
          console.log("Invalid id number!");
          displayInventory();
        } else {
          var productInfo = res[0];

          if (quantity <= productInfo.stock_quantity) {
            console.log(
              productInfo.product_name + "is in stock! Placing your order now!"
            );

            var updateQueryStr =
              "UPDATE products SET stock_quantity = " +
              (productInfo.stock_quantity - quantity) +
              " WHERE item_id = " +
              item;

            connection.query(updateQueryStr, function(err, data) {
              if (err) throw err;

              console.log("Your order has been placed!");
              console.log("Your total is $" + productInfo.price * quantity);

              connection.end();
            });
          } else {
            console.log("Insufficient stock!");
          }
        }
      });
    });
}
