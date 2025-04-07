import { useState,  lazy, Suspense  } from 'react'
const Blogs = lazy(() => import('./components/Blogs'))
const CreateBlog = lazy(() => import('./components/CreateBlog'))
const SignUp = lazy(() => import('./components/SignUp'))
import Cookies from "universal-cookie"
const cookies = new Cookies();

const renderLoader = () => <p>Loading</p>;

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

//function to set login to false
const handleLogout = () => {
  ///setLogin(false)
  localStorage.removeItem("login")
  //destroy userInfo
  localStorage.removeItem("userInfo")
  // destroy the cookie
  cookies.remove("TOKEN", { path: "/" })
  // redirect user to the landing page
  window.location.href = "/";
}

  return (
    <div className="container">
      <div className="blog-posts">
        <Suspense fallback={renderLoader()}>
        {showHome && <Blogs onShowBlogs={handleShowBlogs} onLogin={handleShowSignUp}  handleLogout={handleLogout} />}
        {showBlogs && <CreateBlog onShowHome={handleBackToHome} />}
        {showSignUp && <SignUp onShowHome={handleBackToHome}  />}
        </Suspense>
      </div>
    </div>
  )
}

export default App