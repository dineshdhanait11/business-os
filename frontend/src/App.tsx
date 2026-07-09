import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Layout from "./components/Layout";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import InventoryPage from "./pages/InventoryPage";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
import ReportsPage from "./pages/ReportsPage";



function ProtectedRoute({children}:any){

const {token}=useAuth();


if(!token){

return <Navigate to="/login"/>;

}


return children;

}




export default function App(){


return (

<AuthProvider>

<BrowserRouter basename="/business-os">


<Routes>


<Route
path="/login"
element={<LoginPage/>}
/>



<Route
path="/register"
element={<RegisterPage/>}
/>



<Route

path="/"

element={

<ProtectedRoute>

<Layout/>

</ProtectedRoute>

}

>


<Route
index
element={<DashboardPage/>}
/>



<Route
path="employees"
element={<EmployeesPage/>}
/>



<Route
path="inventory"
element={<InventoryPage/>}
/>



<Route
path="customers"
element={<CustomersPage/>}
/>



<Route
path="invoices"
element={<InvoicesPage/>}
/>



<Route
path="reports"
element={<ReportsPage/>}
/>



</Route>


</Routes>


</BrowserRouter>


</AuthProvider>


);


}
