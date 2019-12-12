require("dotenv").config();

const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.USER_ID,
    password: process.env.PW_ID,
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Is Connected!");
    startProgram();
});

function startProgram(){
inquirer
    .prompt({
        name: "Menu",
        type: "list",
        choices: [
            "View products for sale",
            "View low inventory",
            "Add to inventory",
            "Add new product"
    ]
    })
    .then(function(answer) {
        switch(answer.Menu){
            case "View products for sale":
                viewProduct();
                break;
            case "View low inventory":
                break;
            case "Add to inventory":
                break;
            case "Add new product":
                break;
            default:
                console.log("Unrecognize input, please try again");
                break;
            
        
        }
    });
};

function viewProduct(){
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (let i = 0; i < res.length; i++) {
            console.log("\nID: " + res[i].id + " | " + "Product Name: " + res[i].product_name + " | " + "Department Name: " + res[i].department_name + " | " + "Price(US dollar): $" + res[i].price + " | " + "Stock Quantity: " + res[i].stock_quantity);
        };
        //startProgram();
    });
    startProgram();
};