import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {

  const [form, setForm] = useState({
    business_name: "",
    owner_name: "",
    email: "",
    password: ""
  });


  const register = () => {

    axios
      .post(
        "http://localhost:3000/api/auth/register",
        form
      )
      .then(() => {
        alert("Registration successful");
      })
      .catch(() => {
        alert("Registration failed");
      });

  };


  return (
    <div
      style={{
        width:"400px",
        margin:"50px auto",
        background:"white",
        padding:"30px",
        borderRadius:"15px"
      }}
    >

      <h1>
        Register Business
      </h1>


      <input
        placeholder="Business Name"
        onChange={(e)=>
          setForm({
            ...form,
            business_name:e.target.value
          })
        }
      />

      <br/>


      <input
        placeholder="Owner Name"
        onChange={(e)=>
          setForm({
            ...form,
            owner_name:e.target.value
          })
        }
      />

      <br/>


      <input
        placeholder="Email"
        onChange={(e)=>
          setForm({
            ...form,
            email:e.target.value
          })
        }
      />

      <br/>


      <input
        placeholder="Password"
        type="password"
        onChange={(e)=>
          setForm({
            ...form,
            password:e.target.value
          })
        }
      />

      <br/>


      <button onClick={register}>
        Register
      </button>


    </div>
  );
}
