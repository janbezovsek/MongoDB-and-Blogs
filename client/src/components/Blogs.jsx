import {useState} from "react";
import "./Blogs.css";

const Blogs = ({ onShowBlogs, onLogin, handleLogin }) => {


  const state = JSON.parse(localStorage.getItem('login'));//get login state for toggling between login and logout in navbar

  let name = JSON.parse(localStorage.getItem('userInfo')).data.user.name



  return (
    <>
    <div className="news">
      <header className="news-header">
        <h1 className="logo">Blogs and news </h1>
        <div className="sign-in" onClick={onLogin}>
            {state ? (
              
                <div style={{color : '#919db1',display:'none' }}>
                
                </div>
              ) 
            : (

                <div style={{color : '#919db1' }}>
                  Sign Up 
                </div>
              
            )}
        </div>
        <div className="search-bar">
            <form>
                <input type="text"placeholder="Search blogs..." />
                <button type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>
      </header>
      <div className="news-content">
        <div className="navbar">
          <div className="user">
            {state ? (
              <div style={{color : '#919db1'}}>
                  Welcome back {name}
              </div>
            ) : (
              <div style={{color : '#919db1' }}>
                  Guest user 
              </div>
            )}
          </div>
          <nav className="categories">Categories</nav>
        </div>
        <div className="news-section">
          <div className="headline">Headline</div>
          <div className="news-grid">News grid</div>
        </div>
        <div className="my-blogs">My blogs</div>
        <div className="others-blogs">Others blogs</div>
      </div>
      <footer className="news-footer">Footer</footer>
    </div>
    </>
  )
}

export default Blogs;
