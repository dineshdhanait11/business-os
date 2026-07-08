import { useEffect, useState } from "react";
import axios from "axios";


export default function InvoicesPage(){


const [invoices,setInvoices]=useState<any[]>([]);

const [customers,setCustomers]=useState<any[]>([]);

const [products,setProducts]=useState<any[]>([]);



const [customer,setCustomer]=useState("");

const [product,setProduct]=useState("");

const [quantity,setQuantity]=useState(1);



const [items,setItems]=useState<any[]>([]);




useEffect(()=>{

loadData();

},[]);




const loadData=()=>{


axios
.get("http://localhost:3000/api/invoices/1")
.then(res=>setInvoices(res.data));



axios
.get("http://localhost:3000/api/customers/1")
.then(res=>setCustomers(res.data));



axios
.get("http://localhost:3000/api/products/1")
.then(res=>setProducts(res.data));


};






const addItem=()=>{


const selectedProduct =
products.find(
(p)=>p.id===Number(product)
);



if(!selectedProduct){

alert("Select product");

return;

}



setItems([

...items,

{

product_id:selectedProduct.id,

name:selectedProduct.name,

quantity:quantity,

price:selectedProduct.selling_price

}

]);


};







const createInvoice=()=>{


axios.post(

"http://localhost:3000/api/invoices",

{

tenant_id:1,

customer_id:Number(customer),

items:items.map(item=>({

product_id:item.product_id,

quantity:item.quantity

}))

}

)

.then(()=>{


alert("Invoice Created Successfully");


setItems([]);

loadData();


})

.catch(err=>{

console.log(err);

alert("Error creating invoice");

});


};








return(

<div>


<h1>
🧾 Invoice Management
</h1>




<div style={box}>


<h2>
Create Invoice
</h2>



<select

style={input}

onChange={(e)=>setCustomer(e.target.value)}

>

<option>
Select Customer
</option>


{

customers.map(c=>(

<option key={c.id} value={c.id}>

{c.name}

</option>

))

}


</select>





<select

style={input}

onChange={(e)=>setProduct(e.target.value)}

>


<option>
Select Product
</option>


{

products.map(p=>(

<option key={p.id} value={p.id}>

{p.name} ₹{p.selling_price}

</option>

))

}


</select>




<input

type="number"

style={input}

value={quantity}

onChange={(e)=>
setQuantity(Number(e.target.value))
}

/>



<button

style={button}

onClick={addItem}

>

Add Item

</button>






<h3>
Items
</h3>


{

items.map((item,index)=>(

<p key={index}>

{item.name} -
{item.quantity}

</p>

))

}




<button

style={createButton}

onClick={createInvoice}

>

Create Invoice

</button>



</div>









<div style={box}>


<h2>
Invoice History
</h2>



<table style={{width:"100%"}}>


<thead>

<tr>

<th>ID</th>

<th>Customer</th>

<th>Amount</th>

<th>Status</th>

</tr>

</thead>



<tbody>


{

invoices.map(invoice=>(

<tr key={invoice.id}>

<td>
{invoice.id}
</td>

<td>
{invoice.customer_id}
</td>

<td>
₹{invoice.total_amount}
</td>


<td>
{invoice.status}
</td>


</tr>


))


}


</tbody>



</table>



</div>



</div>

);


}





const box={

background:"white",

padding:"25px",

borderRadius:"15px",

marginBottom:"20px"

};



const input={

padding:"10px",

margin:"5px"

};



const button={

padding:"10px 20px",

background:"#2563eb",

color:"white",

border:"none"

};



const createButton={

padding:"12px 25px",

marginTop:"20px",

background:"#16a34a",

color:"white",

border:"none"

};
