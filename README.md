# bamazon
The goal what to create a store-like interface with MySQL and Node.js.
--------------------
### What It Does
1.    `bamazonCustomer.js`

    * Displays all the product in the store.

    * Prompts the customer with what they would like to buy using the ID of the product.

    * Then asks the customer for the quantity of that product they want.

        * Then it checks if the store has that amount instock, if it does it will return with "order has been recieved" and show the customer the total price.

        * If their is not enought stock in the store then the customer will be told "Insufficient quantity! Please enter ID and Stock Quantity Again".

        * If the order goes through then the MySQL database will be updated with the new available stock amount for that product.
--------------------
### Results
- ![bamazonCustomer.js](/images/Screenshot(10).png)
- ![bamazonCustomer.js](/images/Screenshot(11).png)
- ![bamazonCustomer.js](/images/Screenshot(12).png)
- ![bamazonCustomer.js](/images/Screenshot(13).png)
- ![bamazonCustomer.js](/images/Screenshot(14).png)
- ![bamazonCustomer.js](/images/Screenshot(15).png)

--------------------
### Work in progress
`bamazonManager.js`
#### Done/Not Done
   -[x] * List a set of menu options:

   -[x] * View Products for Sale
    
   -[x] * View Low Inventory
    
   -[] * Add to Inventory
    
   -[] * Add New Product

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
--------------------
### Technologies Used
    * Node.js
    * Inquirer NPM Package
    * MySQL NPM Package
    * JavaScript
--------------------
### Built With
    * MySQL/MySQL Workbench
    * Visual Studio Code 
    * Gitbash Terminal
--------------------
### Authors
Michael Munsey 