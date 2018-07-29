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
  console.log("-----Welcome to Bamazon Supervisor Portal!-----")
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Product Sales by Department",
        "Create New Department",
        "Exit Supervisor Site"
      ]
    })
    .then(function(answer) {
     // console.log("You selected "+answer.action);
      switch (answer.action) {
      case "View Product Sales by Department":
        prodSalesbyDept();
        break;
      case "Create New Department":
        addDept();
        break;
      case "Exit Supervisor Site":
        exitPortal();
       break;
      }
    });
}

//function to display a summarized table for each department
function prodSalesbyDept(){
  connection.query("select d.department_id, d.department_name, d.overhead_costs, dept_rollup.Product_Sales,"+
  "(dept_rollup.Product_Sales-d.overhead_costs) as total_profit from departments d inner join"+
  "(select department_name, sum(product_sales) as Product_Sales from products group by department_name)dept_rollup on d.department_name = dept_rollup.department_name", function(err, res){
		if(err) throw err;

		//Display the product information to the terminal, including the quantity in stock.
		//Create table to hold the data we get back from the database query.
		var deptsummaryTable = new Table({
			//Define names for the header rows.
		    head: ['Department ID', 'Department Name', 'Overhead Costs', 'Product Sales', 'Total Profit']
		  //, colWidths: [100, 200, 200, 200]
		});
		 
		//Loop through the database query results and push the results to the table and populate table with the product data.
		for (var i=0; i < res.length; i++) {			
			// table is an Array, so you can `push`, `unshift`, `splice` and friends 
			deptsummaryTable.push(
		    	[res[i].department_id, res[i].department_name,  res[i].overhead_costs, res[i].Product_Sales, res[i].total_profit]
			);
		} 
		//Display table to terminal.
		console.log(deptsummaryTable.toString());
	});

  setTimeout(init_load, 3000); 
}


function  addDept(){
  inquirer.prompt([{
    name: "department_name",
    message: "What is the name of the department that you want to add?"
  },
  {
      name: "overhead_costs",
      message: "What are the overhead costs for this new dept.?"
  }
      ]).then(function(answers) { 
        
        connection.query(
          "INSERT INTO departments SET ?",
          {
            department_name: answers.department_name,
            overhead_costs:  answers.overhead_costs
          },
          function(err, res) {
            console.log(res.affectedRows + " product inserted!\n");
            // Call updateProduct AFTER the INSERT completes
           console.log("You just added a new department: "+answers.department_name+" with overhead costs = $"+answers.overhead_costs);
           setTimeout(init_load, 3000); 
          }
        );

      })
    }

    function exitPortal(){
      console.log("Thanks for visting Bamazon Supervisor site! Bye!");
    	connection.end();
	    return;
    }