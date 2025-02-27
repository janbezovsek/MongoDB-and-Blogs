import { useState } from 'react'
import Blogs from './components/Blogs'
import CreateBlog from './components/CreateBlog'
//import Login from './components/Login'
//import Register from './components/Register'
import SignUp from './components/SignUp'
import Cookies from "universal-cookie"
const cookies = new Cookies();

const App = () => {


  //state for navigating to Home page
  const [ showHome, setShowHome ] = useState(true)

  //state for navigating to login page
  const [ showSignUp, setShowSignUp ] = useState(false)

  //state for navigating to blogs
  const [ showBlogs, setShowBlogs ] = useState(false)

  //function for navigating to login page
  const handleShowSignUp = () => {
    setShowHome(false)
    setShowSignUp(true)
    setShowBlogs(false)
  }

  //function for navigating back to Home page
  const handleBackToHome = () => {
    setShowHome(true)
    setShowSignUp(false)
    setShowBlogs(false)
  }


//function for navigating to Blogs page
const handleShowBlogs = () => {
  setShowHome(false)
  setShowSignUp(false)
  setShowBlogs(true)
}

//state for determening whether user is logged in or not
const [login, setLogin] = useState(null);

//function to set login to true
const handleLogin = () => {
  setLogin(true)
}

//function to set login to false
const handleLogout = () => {
  setLogin(false)
  // destroy the cookie
  cookies.remove("TOKEN", { path: "/" })
  // redirect user to the landing page
  window.location.href = "/";
}

//setting key login in local storage to true
if(login === true){
  localStorage.setItem('login', JSON.stringify(login))
}

//removing key login from local storage
if(login === false){
  localStorage.removeItem("login");
}


  return (
    <div className="container">
      <div className="blog-posts">
        {showHome && <Blogs onShowBlogs={handleShowBlogs} onLogin={handleShowSignUp} handleLogin={handleLogin} handleLogout={handleLogout}  />}
        {showBlogs && <CreateBlog onShowHome={handleBackToHome} />}
        {showSignUp && <SignUp onShowHome={handleBackToHome} login={login} handleLogin={handleLogin} />}
      </div>
    </div>
  )
}

export default App