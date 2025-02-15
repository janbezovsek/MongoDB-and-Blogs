import {useState} from 'react'
import Cookies from "universal-cookie"
//import './LogOut.css'
const cookies = new Cookies();

const Logout = ({handleLogout}) => {
  


    // logout
    const logout = () => {
        // destroy the cookie
        cookies.remove("TOKEN", { path: "/" });
        handleLogout()//function for setting login to false
        // redirect user to the landing page
        window.location.href = "/";
  
  
  
    return (
    <div>Logout</div>
  )
}
}
export default Logout