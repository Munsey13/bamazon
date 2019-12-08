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

connection.connect(function(err){
    if (err) throw err;
    console.log("Is Connected!");
    displayItems();
});

// function startApp()

//a function that connects to that database and  console.logs all the information in the products table on the database then ends the connection.

function displayItems(){
    connection.query("SELECT * FROM products", function(err,res){
        if (err) throw err;
        for (let i = 0; i < res.length; i++){
        console.log("\nID: " + res[i].id + " | " + "Product Name: " + res[i].product_name + " | " + "Department Name: " + res[i].department_name + " | " + "Price(US dollar): $" + res[i].price + " | " + "Stock Quantity: " + res[i].stock_quantity);
        };
        //connection.end();
    }
    )}; 
