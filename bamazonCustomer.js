var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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
   
});


// displays all Items in table
function displayItems(){
    var query = "SELECT * FROM products"
    connection.query(query, function(err, results){
        // if (err) throw err;
        var displayTable = new Table ({
			head: ["id", "product_name", "department", "price", "stock_quantity"],
			colWidths: [10,25,25,10,14]
		});
		for(var i = 0; i < results.length; i++){
			displayTable.push(
				[results[i].id,results[i].product_name, results[i].department, results[i].price, results[i].stock_quantity]
				);
		}
		console.log(displayTable.toString());
        productSelect();
	});
}
    

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
            poReturn(item, quantity);
        });
    };

    function poReturn(id, quantityNeed){
            connection.query('SELECT * from products WHERE id = ' + id, function(err, results){
                // if (err) throw err
                if(quantityNeed <= results[0].stock_quantity){
                    var totalCost = results[0].price * quantityNeed
                    console.log('There is enough inventory to complete your order');
                    console.log('Your total cost for ' + quantityNeed + ' ' + results[0].product_name + ' is ' + totalCost);
                    

                    connection.query("UPDATE product set stock_quantity = stock_quantity -" + quantityNeed + "WHERE id = " + id);
           
                }
                else{
                    console.log('Insufficient quantity. There is not enough '  + results[0].product_name + ' to complete your order.');
                } ;
                displayItems();  
            });
        };             
displayItems();