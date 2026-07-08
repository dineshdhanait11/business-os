import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Layout() {


const { logout, user } = useAuth();

const navigate = useNavigate();


const role = user?.role_id;



const logoutUser = () => {

logout();

navigate("/login");

};





return (

<div

style={{

display:"flex",

minHeight:"100vh",

background:"#f8fafc"

}}

>



<div

style={{

width:"260px",

background:"linear-gradient(180deg,#1d4ed8,#9333ea)",

color:"white",

padding:"25px"

}}

>



<h1>
🚀 Business OS
</h1>


<p>
Management System
</p>


<hr />




<MenuLink to="/">
🏠 Dashboard
</MenuLink>





<MenuLink to="/inventory">
📦 Inventory
</MenuLink>





<MenuLink to="/customers">
👥 Customers
</MenuLink>





<MenuLink to="/invoices">
🧾 Invoices
</MenuLink>





{role === 1 && (

<MenuLink to="/employees">
👨‍💼 Employees
</MenuLink>

)}





{role === 1 && (

<MenuLink to="/reports">
📊 Reports
</MenuLink>

)}





<button

onClick={logoutUser}

style={{

marginTop:"40px",

width:"100%",

padding:"12px",

border:"none",

borderRadius:"10px",

background:"#ef4444",

color:"white",

cursor:"pointer"

}}

>

Logout

</button>



</div>






<div

style={{

flex:1,

padding:"30px"

}}

>



<div

style={{

background:"white",

padding:"15px",

borderRadius:"15px",

marginBottom:"20px"

}}

>


<h2>
Welcome to Business OS 👋
</h2>


<p>
Manage your business easily
</p>


</div>





<Outlet />





</div>





</div>


);


}







function MenuLink({to,children}:any){


return (

<Link

to={to}

style={{

display:"block",

padding:"12px",

margin:"8px 0",

color:"white",

textDecoration:"none",

borderRadius:"10px"

}}

>

{children}

</Link>


);


}
