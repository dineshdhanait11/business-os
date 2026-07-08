import { useEffect, useState } from "react";
import axios from "axios";


export default function DashboardPage(){


const [data,setData]=useState<any>(null);



useEffect(()=>{


axios
.get("http://localhost:3000/api/dashboard/1")
.then((res)=>{

setData(res.data);

})
.catch((err)=>{

console.log(err);

});


},[]);



if(!data){

return <h2>Loading Dashboard...</h2>;

}



return(

<div>


<h1>
📊 Business Dashboard
</h1>



<div
style={{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"20px"
}}
>



<Card
title="Employees"
value={data.employees}
icon="👨‍💼"
/>


<Card
title="Products"
value={data.products}
icon="📦"
/>


<Card
title="Customers"
value={data.customers}
icon="👥"
/>


<Card
title="Total Sales"
value={`₹${data.sales.total_sales}`}
icon="💰"
/>



</div>





<div
style={{
marginTop:"30px",
background:"white",
padding:"25px",
borderRadius:"15px"
}}
>


<h2>
⚠️ Low Stock Products
</h2>



{

data.low_stock_products.length===0?

<p>
All products are well stocked ✅
</p>

:

data.low_stock_products.map((item:any)=>(

<p key={item.id}>

{item.name} - Only {item.quantity} left

</p>

))


}



</div>



</div>

);


}






function Card({title,value,icon}:any){


return(

<div

style={{

background:"linear-gradient(135deg,#2563eb,#9333ea)",

color:"white",

padding:"25px",

borderRadius:"20px",

boxShadow:"0 10px 20px #ddd"

}}

>


<h2>
{icon} {title}
</h2>


<h1>
{value}
</h1>


</div>

);


}
