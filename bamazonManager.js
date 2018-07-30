var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require("./keys.js");
var Table = require('cli-table');


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
  console.log("-----Welcome to Bamazon Manager Portal!-----")
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ]
    })
    .then(function(answer) {
      //console.log("You selected "+answer.action);
      switch (answer.action) {
      case "View Products for Sale":
        productSearch();
        break;

      case "View Low Inventory":
        viewLowInventory();
        break;

      case "Add to Inventory":
        addInventory();
        break;

      case "Add New Product":
        addProduct();
        break;
      
      case "Exit":
        exit();
        break;

      }
    });
}

function exit(){
  console.log("Thanks for visting the Bamazon Manager site! Bye!");
  connection.end();

}


//function to list every available item: the item IDs, names, prices, and quantities.
function productSearch(){
  connection.query("SELECT * FROM products", function(err, res){
		if(err) throw err;

		//Display the product information by creating table to hold the query data
		var productsTable = new Table({
			//Define headers
		    head: ['Item number', 'Item', 'Deparment', 'Price', 'Quantity in stock']
		  
		});
		 
		//Loop through query results and push the results to the table and populate table with the product data.
		for (var i=0; i < res.length; i++) {			
			// table is an Array
			productsTable.push(
		    	[res[i].item_id, res[i].product_name,  res[i].department_name, res[i].price, res[i].stock_quantity],
			);
		} 
		//Display table to terminal.
		console.log(productsTable.toString());
	});

  setTimeout(init_load, 3000); 
}

function viewLowInventory(){
  connection.query("SELECT * FROM products where stock_quantity < 5", function(err, res){
		if(err) throw err;

    if (res.length > 0){
		//Display the product information by creating table to hold the query data
		var productsTable = new Table({
			//Define header column names.
		    head: ['Item number', 'Item', 'Deparment', 'Price', 'Quantity in stock']
		 
		});
		 
		//Loop through query results and populate table with the product data.
		for (var i=0; i < res.length; i++) {			
			// table is an Array
			productsTable.push(
		    	[res[i].item_id, res[i].product_name,  res[i].department_name, res[i].price, res[i].stock_quantity],
			);
		} 
		//Display table to terminal.
    console.log(productsTable.toString());
    
  }
  else {
   console.log ("No item in inventory has a count < 5!")
 }

	});

  setTimeout(init_load, 3000); 

}


function addInventory(){
  inquirer.prompt([{
    name: "item_id_choice",
    message: "What is the item id you would like to add to?"
  },
  {
      name: "quantity",
      message: "How many units of it would you like to add?"
  }
      ]).then(function(answers) { 
        //  console.log("You are interested in item with id: "+answers.item_id_choice);
        //  console.log("You want to add units= "+answers.quantity);
          var query = "SELECT * FROM products WHERE item_id='" + answers.item_id_choice + "'"
          connection.query(query, function(err, res) {
            if (err) throw err;

            if (res.length > 0){ 
          //    console.log(res);
          //    console.log(res[0].stock_quantity);
          //    console.log(answers.quantity);

                var query = connection.query(
                  "UPDATE products SET ? WHERE ?", [{
                          stock_quantity: (res[0].stock_quantity+parseInt(answers.quantity))
                      },
                      {
                          item_id: answers.item_id_choice
                      }
                  ],
                  function(err, res) {
                      console.log(res.affectedRows + " records updated!\n");
                      var query = "SELECT * FROM products WHERE item_id='" + answers.item_id_choice + "'"
                      connection.query(query, function(err, res) {
                        if (err) throw err;
                        console.log("New quantity in stock for item id:"+res[0].item_id+" = "+res[0].stock_quantity);
                      });

                      console.log("After this update...");
                      setTimeout(init_load, 3000); 
                  }
              );  

              

            }
            else{
              console.log("The item number "+ answers.item_id_choice+" was not found. Please choose from available actions!");
              setTimeout(init_load, 3000); 
            }    

          })
        })
}

function  addProduct(){
  inquirer.prompt([{
    name: "product_name",
    message: "What is the name of the item that you want to add?"
  },
  {
      name: "department",
      message: "Which department does it belong to?"
  },
  {
    name: "price",
    message: "What is the unit price?"
},
{
  name: "quantity",
  message: "How much quantity you want to stock it with initially?"
}
      ]).then(function(answers) { 
        
        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answers.product_name,
            department_name: answers.department,
            price: answers.price,
            stock_quantity: answers.quantity
          },
          function(err, res) {
            console.log(res.affectedRows + " product inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            productSearch();
          }
        );

      })
    }