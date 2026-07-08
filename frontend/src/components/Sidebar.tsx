import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  UserRound
} from "lucide-react";


export default function Sidebar() {

  return (

    <div
      style={{
        width:"240px",
        height:"100vh",
        background:"#111827",
        color:"white",
        padding:"20px",
        position:"fixed"
      }}
    >

      <h2>
        Business OS
      </h2>


      <nav
        style={{
          marginTop:"30px"
        }}
      >

        <Menu
          icon={<LayoutDashboard size={20}/>}
          text="Dashboard"
          link="/"
        />


        <Menu
          icon={<Users size={20}/>}
          text="Employees"
          link="/employees"
        />


        <Menu
          icon={<Package size={20}/>}
          text="Inventory"
          link="/inventory"
        />


        <Menu
          icon={<FileText size={20}/>}
          text="Invoices"
          link="/invoices"
        />


        <Menu
          icon={<UserRound size={20}/>}
          text="Customers"
          link="/customers"
        />


      </nav>


    </div>

  );

}



function Menu({icon,text,link}:any){

return(

<Link
to={link}
style={{
display:"flex",
alignItems:"center",
gap:"10px",
color:"white",
textDecoration:"none",
padding:"12px",
marginBottom:"10px",
borderRadius:"8px"
}}
>

{icon}

{text}

</Link>

)

}
