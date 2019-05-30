var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_DB"
});

// connect to the myswl server and sql database
connection.connect(function(err){
    // if (err) throw err;
    console.log("detected")
    searchItems();
    
});

// Logs all of the data from the database
function searchItems() {
  connection.query(
    "SELECT id, product_name, price, stock_quantity FROM products WHERE stock_quantity>0",
    function(err, res) {
      if (err) throw err;
      console.log("Id \t Name \t Price \t Quantity\n");
      for (var i = 0; i < res.length; i++) {
        console.log(
          res[i].id +
            "\t" +
            res[i].product_name +
            "\t" +
            res[i].price +
            "\t" +
            res[i].stock_quantity +
            "\n"
        );
      }
    //   response from prompt
      promptQ(res.length);
    }
  );
}

// prompt for finding id and amount the customer would like to purchse
function promptQ(length) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "item_id",
        message:
          "Enter the Item Id you would like to buy??? 'Press C to Exit'"
      }
    ])
    .then(function(answer) {
      var purchaseItemId = answer.item_id;
      if (purchaseItemId.toUpperCase() === "C") {
        process.exit();
      }
      inquirer
        .prompt([
          {
            type: "input",
            name: "quantity",
            message: "how many units of the product would you like to buy???"
          }
        ])
        .then(function(answer) {

            // checks to make sure that the inputs are real inputs.
            if (
            purchaseItemId > length + 1 ||
            isNaN(purchaseItemId) ||
            isNaN(answer.quantity)){
            console.log("invalid Input");


            if (purchaseItemId > length + 1 || isNaN(purchaseItemId)) {
              console.log("The item id is not valid");
            }
            if (isNaN(answer.quantity)) {
              console.log("Invalid quantity");
            }
            // connection.end();
            searchItems();
            
            // moves to confirming the purchase and giving the cost  
          } else {
            connection.query(
              "SELECT stock_quantity, price from products where id = ?",
              [purchaseItemId],
              function(err, res) {
                if (err) throw err;
                if (answer.quantity > res[0].stock_quantity) {
                  console.log("Insufficient quantity!");
                } else {
                  var updateQuantity =
                    res[0].stock_quantity - parseFloat(answer.quantity);
                  connection.query(
                    "update products set ? where ?",
                    [
                      {
                        stock_quantity: updateQuantity
                      },
                      {
                        id: purchaseItemId
                      }
                    ],
                    function(err, res) {
                      if (err) throw err;
                    }
                  );
                  var totalCost = res[0].price * answer.quantity;
                  console.log(
                    "The total price of the purchase : " + totalCost.toFixed(2)
                  );
                }
                // connection.end();
                searchItems();
              }
            );
          }
        });
    });
}
