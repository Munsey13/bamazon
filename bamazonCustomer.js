require("dotenv").config();

const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.USER_ID,
    password: process.env.PW_ID,
    database: "bamazon_db"
});
//Connecting the mysql server and sql database
connection.connect(function(err){
    if (err) throw err;
    console.log("Is Connected!");
    displayItems();
});

// function startApp()

//a function that connects to that database and grabs all the information in the products table on the database

function displayItems(){
    connection.query("SELECT * FROM products", function(err,res){
        if (err) throw err;
        for (let i = 0; i < res.length; i++){
        console.log("\nID: " + res[i].id + " | " + "Product Name: " + res[i].product_name + " | " + "Department Name: " + res[i].department_name + " | " + "Price(US dollar): $" + res[i].price + " | " + "Stock Quantity: " + res[i].stock_quantity);
        };
        //connection.end();
        messagesToAsk();
    });
} 

function messagesToAsk(){
    connection.query("SELECT * FROM products", function(err,res){
        if (err) throw err;
    
    inquirer
        .prompt([
            {
                name: "ID",
                type: "rawlist",
                choices: function(){
                    let choiceArray = [];
                    for (let i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].id);
                }
                return choiceArray;
            },
                message: "What is the ID of the product you would like to buy?"
            },
            {
                name: "Units",
                type: "input",
                message: "How many units of the product would you like to buy?"
            }    


        ])
        .then(function(answer){
            let chosenID;
            for (let i = 0; i < res.length; i++){
            if(answer.ID === res[i].id){
                chosenID = res[i];
              //  console.log("This is working");
            }
            }
            if (parseInt(answer.Units) < chosenID.stock_quantity) {
                console.log("Your order has been receieved");
                let newStock = chosenID.stock_quantity - parseInt(answer.Units);
                connection.query("UPDATE products SET ? WHERE ?",
                [
                {
                    newStock: stock_quantity
                },
                {
                    chosenID: id
                },    
                ],
                    
                
                function(err,res){
                    if (err) throw err;
                    console.log(res.affectedRows + "Stock Updated!\n");

                });
                console.log(newStock);
            } else{
                console.log("Insufficient quantity! Please enter ID and Stock Quantity");
            }
            
               
        });
        
        
    });
}
