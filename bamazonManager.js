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
            "Add new product",
            "Exit"
    ]
    })
    .then(function(answer) {
        switch(answer.Menu){
            case "View products for sale":
                viewProduct();
                break;
            case "View low inventory":
                viewLowInventory();
                break;
            case "Add to inventory":
                addInventory();
                break;
            case "Add new product":
                break;
            case "Exit":
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
    });
    backToMenu();
};
function viewLowInventory() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        for (let i = 0; i < res.length; i++){
            if (res[i].stock_quantity < 10){
                console.log(res[i]);
            }
        }
    });
    backToMenu();
};

function addInventory() {
    inquirer
        .prompt([{

            name: "Quantity",
            type: "input",
            message: "How much inventory would you like to add?",
            validate: function(val){
                if (isNaN(val) === false){
                    return true;
                } else {
                    console.log("\nNot a acceptable input. Pleas enter a number.");
                }
            }
        },
        {
            name: "id",
            type: "input",
            message: "What is the ID number you would like to add the inventory to?",
            validate: function(val){
                if (isNaN(val) === false){
                    return true;
                } else {
                    console.log("\nNot a acceptable input. Please enter a number.");
                    return false;
                }

            }
        }

        
    ])
    .then(function (answer){
        
        
        let resID = parseInt(answer.id);
        let resQuant = parseInt(answer.Quantity);
        console.log("\nSecond response answers" + resID, resQuant);
        connection.query("UPDATE products SET ? WHERE ?",
    [
        {
            stock_quantity: resQuant
        },
        {
            id: resID
        }
    ],
    
    function (err){
        console.log("3rd test this function");
        if (err) throw err;
        
        else {
            console.log("Inventory Successfully Added!");
            viewProduct();
        }
    }
    )
    });
};

function backToMenu() {
    inquirer
        .prompt({
            name:"Menu",
            type: "confirm",
            message: "Back to main menu?"
        })
        .then(function (answer){
            if (answer.Menu === true){
                startProgram();
            } else {
                exit();
            }
       });
};

function exit() {
    connection.end();
};