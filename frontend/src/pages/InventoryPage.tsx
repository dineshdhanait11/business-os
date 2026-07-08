import { useEffect, useState } from "react";
import axios from "axios";


type Product = {

id:number;
name:string;
category:string;
purchase_price:string;
selling_price:string;
quantity:number;
unit:string;

};



export default function InventoryPage(){


const [products,setProducts]=useState<Product[]>([]);


const [search,setSearch]=useState("");



const [form,setForm]=useState({

name:"",
category:"",
purchase_price:"",
selling_price:"",
quantity:"",
unit:""

});





useEffect(()=>{

loadProducts();

},[]);




const loadProducts=()=>{


axios

.get("http://localhost:3000/api/products/1")

.then((res)=>{

setProducts(res.data);

});


};







const addProduct=()=>{


axios

.post(

"http://localhost:3000/api/products",

{

tenant_id:1,

name:form.name,

category:form.category,

purchase_price:Number(form.purchase_price),

selling_price:Number(form.selling_price),

quantity:Number(form.quantity),

unit:form.unit


}

)

.then(()=>{


alert("Product Added Successfully");


setForm({

name:"",
category:"",
purchase_price:"",
selling_price:"",
quantity:"",
unit:""

});


loadProducts();


})

.catch(()=>{

alert("Error adding product");

});


};







const filteredProducts=

products.filter((p)=>

p.name
.toLowerCase()
.includes(search.toLowerCase())

);







return(


<div>


<h1>
📦 Inventory Management
</h1>




<div style={boxStyle}>


<h2>
Add New Product
</h2>



<input
placeholder="Product Name"
style={inputStyle}
value={form.name}
onChange={(e)=>
setForm({...form,name:e.target.value})
}
/>



<input
placeholder="Category"
style={inputStyle}
value={form.category}
onChange={(e)=>
setForm({...form,category:e.target.value})
}
/>



<input
placeholder="Purchase Price"
style={inputStyle}
value={form.purchase_price}
onChange={(e)=>
setForm({...form,purchase_price:e.target.value})
}
/>



<input
placeholder="Selling Price"
style={inputStyle}
value={form.selling_price}
onChange={(e)=>
setForm({...form,selling_price:e.target.value})
}
/>



<input
placeholder="Quantity"
style={inputStyle}
value={form.quantity}
onChange={(e)=>
setForm({...form,quantity:e.target.value})
}
/>



<input
placeholder="Unit (kg, pcs)"
style={inputStyle}
value={form.unit}
onChange={(e)=>
setForm({...form,unit:e.target.value})
}
/>



<button
style={buttonStyle}
onClick={addProduct}
>
Add Product
</button>



</div>








<div style={boxStyle}>


<h2>
Product List
</h2>


<input

placeholder="Search Product"

style={inputStyle}

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>





<table

style={{
width:"100%",
borderCollapse:"collapse"
}}

>


<thead>

<tr>

<th style={cell}>
Name
</th>


<th style={cell}>
Category
</th>


<th style={cell}>
Buy Price
</th>


<th style={cell}>
Sell Price
</th>


<th style={cell}>
Quantity
</th>


</tr>

</thead>





<tbody>


{

filteredProducts.map((p)=>(


<tr key={p.id}>


<td style={cell}>
{p.name}
</td>



<td style={cell}>
{p.category}
</td>



<td style={cell}>
₹{p.purchase_price}
</td>



<td style={cell}>
₹{p.selling_price}
</td>



<td style={cell}>
{p.quantity} {p.unit}
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







const boxStyle={

background:"white",

padding:"25px",

borderRadius:"15px",

marginBottom:"20px"

};



const inputStyle={

padding:"10px",

margin:"5px",

border:"1px solid #ddd",

borderRadius:"8px"

};



const buttonStyle={

background:"#16a34a",

color:"white",

padding:"12px 25px",

border:"none",

borderRadius:"10px",

cursor:"pointer"

};



const cell={

border:"1px solid #ddd",

padding:"10px",

textAlign:"center" as const

};
