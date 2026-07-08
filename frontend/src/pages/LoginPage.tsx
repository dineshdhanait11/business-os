import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function LoginPage(){

const {login}=useAuth();

const navigate=useNavigate();


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");



const submit=()=>{

axios
.post(
"http://localhost:3000/api/auth/login",
{
email,
password
}
)
.then((res)=>{

login(
  res.data.token,
  res.data.user
);

navigate("/");

})
.catch(()=>{

alert("Invalid email or password");

});

};



return(

<div
style={{
width:"350px",
margin:"80px auto",
background:"#ffffff",
padding:"30px",
borderRadius:"15px",
boxShadow:"0 5px 20px #ddd"
}}
>


<h1>
🔐 Login
</h1>



<input
style={{
width:"100%",
padding:"10px",
margin:"10px 0"
}}
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>



<input
style={{
width:"100%",
padding:"10px",
margin:"10px 0"
}}
placeholder="Password"
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>



<button
style={{
width:"100%",
padding:"12px",
background:"#2563eb",
color:"white",
border:"none",
borderRadius:"8px"
}}
onClick={submit}
>
Login
</button>



<p>

Don't have an account?

<button
style={{
marginLeft:"10px",
background:"none",
border:"none",
color:"blue",
cursor:"pointer"
}}

onClick={()=>navigate("/register")}

>
Register
</button>


</p>



</div>

);

}
