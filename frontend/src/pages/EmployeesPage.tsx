import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


type Employee = {

id:number;

name:string;

email:string;

phone:string;

position:string;

joining_date:string;

salary:string;

};



export default function EmployeesPage(){


const {user}=useAuth();


const tenant_id=user?.tenant_id;



const [employees,setEmployees]=useState<Employee[]>([]);



const [form,setForm]=useState({

name:"",
email:"",
phone:"",
position:"",
joining_date:"",
salary:""

});





useEffect(()=>{

if(tenant_id){

loadEmployees();

}

},[tenant_id]);






const loadEmployees=()=>{


axios.get(

`http://localhost:3000/api/employees/${tenant_id}`

)

.then((res)=>{

setEmployees(res.data);

})

.catch((err)=>{

console.log(err);

});


};








const addEmployee=()=>{


axios.post(

"http://localhost:3000/api/employees",

{

tenant_id:tenant_id,

name:form.name,

email:form.email,

phone:form.phone,

position:form.position,

joining_date:form.joining_date,

salary:form.salary

}

)

.then(()=>{


alert("Employee Added Successfully");


setForm({

name:"",
email:"",
phone:"",
position:"",
joining_date:"",
salary:""

});


loadEmployees();


})

.catch((err)=>{


console.log(err);

alert("Error adding employee");


});


};








return (

<div>


<h1>
👨‍💼 Employee Management
</h1>





<div style={box}>


<h2>
Add Employee
</h2>




<input

style={input}

placeholder="Name"

value={form.name}

onChange={(e)=>
setForm({...form,name:e.target.value})
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

placeholder="Phone"

value={form.phone}

onChange={(e)=>
setForm({...form,phone:e.target.value})
}

/>




<input

style={input}

placeholder="Position"

value={form.position}

onChange={(e)=>
setForm({...form,position:e.target.value})
}

/>




<input

style={input}

type="date"

value={form.joining_date}

onChange={(e)=>
setForm({...form,joining_date:e.target.value})
}

/>




<input

style={input}

placeholder="Salary"

value={form.salary}

onChange={(e)=>
setForm({...form,salary:e.target.value})
}

/>




<button

style={button}

onClick={addEmployee}

>

Add Employee

</button>



</div>









<div style={box}>


<h2>
Employee List
</h2>





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
Email
</th>



<th style={cell}>
Position
</th>



<th style={cell}>
Salary
</th>



<th style={cell}>
Joining Date
</th>



</tr>


</thead>







<tbody>



{

employees.map(emp=>(


<tr key={emp.id}>


<td style={cell}>
{emp.name}
</td>



<td style={cell}>
{emp.email}
</td>



<td style={cell}>
{emp.position}
</td>



<td style={cell}>
₹{emp.salary}
</td>



<td style={cell}>

{

new Date(emp.joining_date)
.toLocaleDateString()

}

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

border:"1px solid #ddd"

};





const button={

padding:"12px 20px",

background:"#2563eb",

color:"white",

border:"none",

cursor:"pointer"

};





const cell={

border:"1px solid #ddd",

padding:"10px",

textAlign:"center" as const

};
