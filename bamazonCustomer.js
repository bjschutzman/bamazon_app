var mysql = require("mysql");
var inquirer = require("inquirer");

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
    // displayItems()
    productSelect();
});







// creates prompt for which product
function productSelect(){
    inquirer
        .prompt([
            {
            name: 'id_select',
            type: 'input',
            message: 'Which product would you like to choose? Slect ID',
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            },
            {
            name: 'quantity',
            type: 'input',
            message: 'How many would you like to purchase?',
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            }
        ])
        .then(function(input){
            var item = input.id_select
            var quantity = input.quantity;
            connection.query(
                'SELECT FROM products WHERE?', {id_select: id}, function(err,data){
                    if (err) throw err
                    if(item.quantity > product.quantity){
                        console.log("We are out of stock")
                    }
                }
            )
        })
}












// displays all Items
function displayItems(){
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;
        console.log("_____________________________Inventory_____________________________")
        console.log('\n');
        var availableInv;
        for (var i = 0; i < results.length; i++){
            availableInv = '';
            availableInv += "ID: " + results[i].id + '  //  ';
            availableInv += "Product Name: " + results[i].product_name + "  //  ";
            availableInv += "Department: " + results[i].department + "  //  ";
            availableInv += "Price: " + results[i].price + " \n";

            console.log(availableInv);
        }
        connection.end();

    });
}