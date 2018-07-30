# Wannabe_Amazon

<b>Bamazon Customer</b></br>
In the customer site, first we see below a snapshot of the products table. Note the stock quantities and product sales columns for item ids 5 and 8</br>
![](screenshots/products_original.png)
After customer purchases item ids 5 & 8, worth 10 units each see the updated quantities in stocks and increased product sales for these 2 items.</br>
see below the gif for the bamazonCustomer application showing the purchase happening...
![](gifs/bamazonCustomer.gif)
Finally please see the updated values of stock quantity and product sales after the 2 purchases for those 2 items</br>
![](screenshots/products_5_8_purchase.png)</br>

<b>Bamazon Manager</b></br>
Please see below gif to see how there are diffent options for Manager to see all products, view low inventory, update inverntory for existing product and also add new products!</br>
We see that after customer purchase 26 units of item id=8, the product sales $ increased to $1120 i.e. ($600 + (26*$20)). The quantity depleted to only 4 and then using the add Inventory option , again added 26 units to increase the stock quantity to 30.</br>
Also added a new product called Baseball Bat under Sports department.
![](gifs/bamazonManager.gif)</br>
After the manager transactions, see the record for updated product sales for item id=8.</br>
![](screenshots/products_manager.png)

<b>Bamazon Supervisor</b></br>
In the below gif, as a supervisor, we see that the Fitness department has a loss amount of $300. </br> 
Then a customer comes in and buys 10 quantities of Dumbell (item id=6) worth $100 each, so product sales is incremented by $1000 and then product sales value = $3200, resulting in a new profit of $700.
![](gifs/bamazonSupervisor.gif)
Also in the gif, the supervisor is able to add a new department called Electricals, and we can see that record inserted in departments table as shown below. After loading new department Electricals via the Supervisor app, see the below updated screenshot from workbench showing the newly inserted record.
![](screenshots/departments_updated.png)



