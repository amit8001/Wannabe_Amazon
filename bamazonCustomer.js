var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require("./keys.js");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: keys.dbpwd.pwd,
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  init_load();
});

function init_load() {
  console.log("Welcome to Bamazon portal !!");
  console.log("------------------------------------------");

  inquirer.prompt([{
    name: "action",
    type: "list",
    message: "Would you like to see our items ?",
    choices: ["Yes", "No"]
  }])
  .then(data => {
    if (data.action == "Yes") {
        show_items();
    } else {
        exit_out();
    }
  });
}

function exit_out(){
  console.log("Thanks for visting Bamazon site! Bye!");
  connection.end();
  //process.exit();
}

var dept_arr = [];
//var item_choice;

function show_items(){
  //console.log("Inside show items!");

  connection.query("SELECT distinct department_name FROM products", function(err, res) {
    if (err) throw err;
    //      console.log(res);

    for (var i = 0; i < res.length; i++) {
        dept_arr.push(res[i].department_name);
    }

    inquirer.prompt([{
            name: "departments",
            type: "list",
            message: "Please select a department",
            choices: dept_arr
        }])
        .then(data => {
            console.log("You selected " + data.departments);
           // item_choice = data.departments;
            var query = "SELECT * FROM products WHERE department_name='" + data.departments + "'"
           // console.log(query);
            connection.query(query, function(err, res) {
              if (err) throw err;
               // console.log(res);
               console.log("------------------------------------");
               console.log ("Department: "+data.departments);
               console.log("------------------------------------");
               for (var i = 0; i < res.length; i++) {
                  console.log("Item id "+ res[i].item_id);
                  console.log("Product Name "+ res[i].product_name);
                  console.log("Item Price is $"+ res[i].price);
                  console.log("Quantity in stock "+ res[i].stock_quantity);
                  console.log("------------------------------------");
            }

            choose_action();

        })
      })
    })
  }

  function  choose_action(){

    inquirer.prompt([{
      name: "user_choice",
      type: "list",
      message: "What do you want to do ?",
      choices: ["Purchase item", "Select another item","Exit"]
    }])
    .then(data => {
      if (data.user_choice == "Select another item") {
          show_items();
      } 
      else if (data.user_choice =="Purchase item") {
         // console.log("About to make a purchase");
          purchase_items();
      }
      else {
          exit_out();
      }
    }); 

  }

  var user_prvd_id;
  var user_req_qty;

  function purchase_items(){
      
      inquirer.prompt([{
        name: "item_id_choice",
        message: "What is the item id you would like to buy?"
      },
      {
          name: "quantity",
          message: "How many units do you want of it?"
      }
          ]).then(function(answers) { 
              //console.log("You requested item with id: "+answers.item_id_choice);
              //console.log("You requested units: "+answers.quantity);
              var query = "SELECT * FROM products WHERE item_id='" + answers.item_id_choice + "'"
              // console.log(query);
               connection.query(query, function(err, res) {
                 if (err) throw err;

                 if (res.length > 0){ 
                 // console.log(res);
                 // console.log(res[0].stock_quantity);
                 // console.log(answers.quantity);
                  //validating based on stock qty
                  if (answers.quantity > res[0].stock_quantity){
                    console.log("Insufficient quantity! Please provide info again");
                    purchase_items();  
                  }
                  else{
                   // console.log("Now entering final fulfillment!");
                    console.log ("Thanks for your order! You total cost is $"+(res[0].price*answers.quantity));
                    var query = connection.query(
                      "UPDATE products SET ? WHERE ?", [{
                              stock_quantity: (res[0].stock_quantity-answers.quantity),
                              product_sales: (res[0].product_sales+(res[0].price*answers.quantity))
                          },
                          {
                              item_id: answers.item_id_choice
                          }
                      ],
                      function(err, res) {
                          console.log(res.affectedRows + " records updated!\n");
                          console.log("After this purchase...");
                          choose_action();
                         // connection.end();
                      }
                  );  

                  }

                }
                else{
                  console.log("The item number "+ answers.item_id_choice+" was not found. Please choose again");
                  show_items();  
                }    
            
               })
          })
  }


