import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


type Customer = {

id:number;

name:string;

phone:string;

email:string;

address:string;

};




export default function CustomersPage(){


const {user}=useAuth();


const tenant_id=user?.tenant_id;



const [customers,setCustomers]=useState<Customer[]>([]);



const [search,setSearch]=useState("");



const [form,setForm]=useState({

name:"",
phone:"",
email:"",
address:""

});






useEffect(()=>{


if(tenant_id){

loadCustomers();

}


},[tenant_id]);







const loadCustomers=()=>{


axios.get(

`http://localhost:3000/api/customers/${tenant_id}`

)

.then((res)=>{


setCustomers(res.data);


})

.catch((err)=>{


console.log(err);


});


};









const addCustomer=()=>{


axios.post(

"http://localhost:3000/api/customers",

{

tenant_id:tenant_id,

name:form.name,

phone:form.phone,

email:form.email,

address:form.address

}

)

.then(()=>{


alert("Customer Added Successfully");



setForm({

name:"",
phone:"",
email:"",
address:""

});



loadCustomers();



})

.catch((err)=>{


console.log(err);

alert("Error adding customer");


});


};









const filteredCustomers = customers.filter((customer)=>

customer.name

.toLowerCase()

.includes(search.toLowerCase())

);









return(

<div>


<h1>
👥 Customer Management
</h1>





<div style={box}>


<h2>
Add Customer
</h2>





<input

style={input}

placeholder="Customer Name"

value={form.name}

onChange={(e)=>

setForm({...form,name:e.target.value})

}

/>





<input

style={input}

placeholder="Phone"

value={form.phone}

onChange={(e)=>

setForm({...form,phone:e.target.value})

}

/>





<input

style={input}

placeholder="Email"

value={form.email}

onChange={(e)=>

setForm({...form,email:e.target.value})

}

/>





<input

style={input}

placeholder="Address"

value={form.address}

onChange={(e)=>

setForm({...form,address:e.target.value})

}

/>





<button

style={button}

onClick={addCustomer}

>

Add Customer

</button>



</div>









<div style={box}>


<h2>
Customer List
</h2>





<input

style={input}

placeholder="Search Customer"

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

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
Phone
</th>


<th style={cell}>
Email
</th>


<th style={cell}>
Address
</th>


</tr>

</thead>





<tbody>


{

filteredCustomers.map((customer)=>(


<tr key={customer.id}>


<td style={cell}>
{customer.name}
</td>



<td style={cell}>
{customer.phone}
</td>



<td style={cell}>
{customer.email}
</td>



<td style={cell}>
{customer.address}
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

margin:"5px",

border:"1px solid #ddd",

borderRadius:"8px"

};





const button={

background:"#2563eb",

color:"white",

padding:"12px 20px",

border:"none",

borderRadius:"10px",

cursor:"pointer"

};





const cell={

border:"1px solid #ddd",

padding:"10px",

textAlign:"center" as const

};
