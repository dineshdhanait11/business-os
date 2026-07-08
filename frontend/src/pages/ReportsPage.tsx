import { useEffect, useState } from "react";
import axios from "axios";


export default function ReportsPage(){


const [data,setData]=useState<any>(null);



useEffect(()=>{


axios

.get("http://localhost:3000/api/dashboard/1")

.then((res)=>{

setData(res.data);

});


},[]);




if(!data){

return <h2>Loading Reports...</h2>;

}



return(

<div>


<h1>
📊 Business Reports
</h1>



<div style={grid}>


<Card
title="Employees"
value={data.employees}
/>



<Card
title="Customers"
value={data.customers}
/>



<Card
title="Products"
value={data.products}
/>



<Card
title="Total Sales"
value={"₹"+data.sales.total_sales}
/>



<Card
title="Invoices"
value={data.sales.total_invoices}
/>



</div>






<div style={box}>


<h2>
💰 Sales Summary
</h2>


<p>
Total Invoices:
{data.sales.total_invoices}
</p>


<p>
Total Revenue:
₹{data.sales.total_sales}
</p>


<p>
Average Invoice:

₹

{

(
Number(data.sales.total_sales) /
Number(data.sales.total_invoices)

).toFixed(2)

}

</p>



</div>




<div style={box}>


<h2>
⚠️ Stock Alert
</h2>


{

data.low_stock_products.length===0?

<p>
All products are healthy ✅
</p>

:

data.low_stock_products.map((p:any)=>(

<p key={p.id}>

{p.name} -
{p.quantity} left

</p>


))

}



</div>



</div>

);


}





function Card({title,value}:any){


return(

<div

style={{

background:"#2563eb",

color:"white",

padding:"20px",

borderRadius:"15px"

}}

>


<h3>
{title}
</h3>


<h1>
{value}
</h1>


</div>

);


}



const grid={

display:"grid",

gridTemplateColumns:"repeat(5,1fr)",

gap:"20px"

};



const box={

background:"white",

padding:"25px",

marginTop:"25px",

borderRadius:"15px"

};
