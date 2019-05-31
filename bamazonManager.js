var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require("cli-table");

// sets up connection through mysql database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',

    password: 'password',
    database: 'bamazon_DB'
});

connection.connect(function(err){
    if (err) throw err;
    console.log('detected');
    runSearch();

});

// prompt for choices the manager can do
function runSearch(){
    inquirer
    .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            'View Products for Sale',
            'View Low Inventory',
            'Add to Inventory',
            'Add New Product'
        ]
    })
    .then(function(answer){
        switch (answer.action){
            case 'View Products for Sale':
            viewProducts();
            break;

            case 'View Low Inventory':
            viewLowInventory();
            break;

            case 'Add to Inventory':
            updateInventory();
            break;

            case 'Add New Product':
            addProduct();
            break;
        }
    });
}


// Displays all items that are in stock
function viewProducts(){
    // var query = 'SELECT id, product_name, department, price, stock_quantity  FROM products Where stock_quantity > 0';
    
    connection.query('SELECT id, product_name, department, price, stock_quantity  FROM products Where stock_quantity > 0'
    , function(err, res){
        if (err) throw new err;
        console.log('Items for Sale');
        console.log('Id \t Name \t Department \t Price \t Quantity\n');
        
            for (var i = 0; i < res.length; i++) {
                if (res[i].stock_quantity === null){
                    res[i].stock_quantity = 0;
                }
                
            };
            console.table(res);
         runSearch();
    });

}


// displays all items with invetory less then or equal to 5
function viewLowInventory(){
    var query = 'SELECT id, product_name, department, price, stock_quantity  FROM products Where stock_quantity <= 5'
    connection.query(query, function(err, res){
        for (var i = 0; i < res.length; i++){
            if (res[i].stock_quantity <= 5){
                console.log('These items have less than 5 units in stock');
                console.table(res[i]);
            }
            else {
                console.log('Invetory is looking strong!');
            }
        }
        runSearch();
    });
};


// chooses id for the getupdate function to change inventory.

function updateInventory(){
    inquirer
        .prompt([
            {
            name: 'id',
            message: 'Pleae choose which id you would like to update'

            },
        ])
        .then(function(answer){
            getUpdate(answer.id);
        })
}

function getUpdate(id){
    inquirer
        .prompt([
            {
                name: 'stock_quantity',
                message: 'What would you like to change the inventory to?'
            },
    ])
        .then(function(answer){
        connection.query(
            'UPDATE products Set stock_quantity=? WHERE id=?',
            [answer.stock_quantity, id],
            function(err, res){
                if (err) throw err;
                console.log('your update was successful!')
                viewProducts();
            }
            )
    })
}



function addProduct(){
    inquirer
        .prompt([
            {
                name: 'product_name',
                message: 'Enter product name.',
            },
            {
                name: 'department',
                message: 'Enter department',
            },
            {
                name: 'price',
                message: 'Enter price of item',
            },
            {
                name: 'stock_quantity',
                message: 'Enter stock quantity'
            },
        ])
        .then(answers => {
            const{product_name, department, price, stock_quantity} = answers;
            connection.query(
                'INSERT INTO products SET ?',
                {
                    product_name,
                    department,
                    price,
                    stock_quantity,
                },
                function(err){
                    if (err) throw err;
                    console.log('The product has been added to the database!');
                    viewProducts()
                },
            );
        });
}