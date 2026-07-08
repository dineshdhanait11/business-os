import { createContext, useContext, useState } from "react";


const AuthContext = createContext<any>(null);



export function AuthProvider({children}:any){



const [token,setToken]=useState(

localStorage.getItem("token")

);



const [user,setUser]=useState(

JSON.parse(
localStorage.getItem("user") || "null"
)

);







const login=(

token:string,

userData:any

)=>{


localStorage.setItem(

"token",

token

);



localStorage.setItem(

"user",

JSON.stringify(userData)

);



setToken(token);



setUser(userData);



};








const logout=()=>{


localStorage.removeItem("token");

localStorage.removeItem("user");



setToken(null);

setUser(null);


};








return(


<AuthContext.Provider


value={{

token,

user,

login,

logout

}}



>


{children}



</AuthContext.Provider>


);



}






export function useAuth(){


return useContext(AuthContext);


}
