# bamazon_app

Link to wokring application
https://drive.google.com/file/d/1eX0T-Nq5tnYNgZtQMUWBGr9R_hNIRRLK/view

This application uses Mysql and node. 

I created a database in mysql and required that databas when developing the application. I also used require and cli-tables.

This application has two parts.

Customer
  -customer is given a list of the available products in stock.
  -then is prompted to chose an ID of the item they would like to purchase
  -the application checks if there is enough inventory to make the purchase
  -if there is they are told that the purchase was made and their total
  -the application then subtracts the amount purchased from inventory
  
Manager
List a set of menu options:
-View Products for Sale
-View Low Inventory
-Add to Inventory
-Add New Product

If a manager selects View Products for Sale, the app lists every available item: the item IDs, names, prices, and quantities.
If a manager selects View Low Inventory, then it will list all items with an inventory count lower than five.
If a manager selects Add to Inventory, it will display a prompt that will let the manager "add more" of any item currently in the store.
If a manager selects Add New Product, it will allow the manager to add a completely new product to the store.
