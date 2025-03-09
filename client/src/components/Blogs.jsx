import { useState, useEffect} from "react";
import axios from "axios";
import "./Blogs.css";
import userImage from '../assets/images/userImage.jpg'
import noImage from '../assets/images/noImage.jpeg'
import treeImage from '../assets/images/tree.jpg'
import NewsModal from "./NewsModal";
import Bookmarks from "./Bookmarks";


const categories = [
  'general',
  'world',
  'business',
  'technology',
  'entertainment',
  'sports',
  'science',
  'health',
  'nation',
]

const Blogs = ({  onLogin, handleLogout, onShowBlogs }) => {

  //state for storing main news article on the page
  const [ headline, setHeadline ] = useState([])

  //array of news articles
  const [ news, setNews ] = useState([])

  //state for the type of the news
  const [ selectedCategory, setSelectedCategory ] = useState('general')

  //state for search input
  const [ searchInput, setSearchInput ] = useState('')

  //state for searching the news from the API
  const [ searchQuery, setSearchQuery ] = useState('')

  //state for modal
  const [ showModal, setShowModal ] = useState(false)

  //state for the selected article
  const [ selectedArticle, setSelectedArticle ] = useState(null)

  //state for bookmarked articles
  const [ bookmarks, setBookmarks ] = useState([])

  //bookmarks modal visibility
  const [ showBookmarksModal, setShowBookmarksModal ] = useState(false)

  //get login state for toggling between login and logout in navbar
  const state = JSON.parse(localStorage.getItem('login'));

  //userInfo we use to display the name of the user on the page
  let name = JSON.parse(localStorage.getItem('userInfo')).data.user.name


  //fetching API for news
  useEffect(() => {
    const fetchNews = async () => {
      let URL = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=ad9380e55df5fcb1adc1f84a98faf1c6`
    
      if(searchQuery) {
        URL = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=ad9380e55df5fcb1adc1f84a98faf1c6`
      }
      
      
      
      const response = await axios.get(URL)

      const fetchedNews = response.data.articles

      //function for displaying noImage if articles aren't awailable
      fetchedNews.forEach((article) => {
        if(!article.image) {
          article.image = noImage
        }
      })

      //headline news, image, title
      setHeadline(fetchedNews[0])

      //news grid images, titles
      setNews(fetchedNews.slice(1, 7))

      const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []
      setBookmarks(savedBookmarks)

    }
    fetchNews()
  },[selectedCategory, searchQuery])

  //function for selecting news category
  const handleCategory = (e, category) => {
    e.preventDefault()
    setSelectedCategory(category)
  }

  //function for searching news
  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(searchInput)
    setSearchInput('')//clear search input after submition
  }

  //when article is clicked it shows modal
  const handleArticle = (article) => {
    setSelectedArticle(article)
    setShowModal(true)
  }

  //bookmarked articles function
  const handleBookmarkClick = (article) => {
    setBookmarks((prevBookmarks) => {
      const updatedBookmarks = prevBookmarks.find(
        (bookmark)=> bookmark.title === article.title) ?
        prevBookmarks.filter((bookmark)=>bookmark.title !== article.title)
        : [...prevBookmarks, article]
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
      return updatedBookmarks
    })
  }

  return (
    <>
      <div className="news">
        <header className="news-header">
          <h1 className="logo">Blogs and news </h1>
          <div className="sign-in" onClick={onLogin}>
            {state ? (
              <div style={{ color: "#919db1", display: "none" }}></div>
            ) : (
              <div style={{ color: "#919db1" }}>Sign Up</div>
            )}
          </div>
          <div className="Logout" onClick={handleLogout}>
            {state ? (
              <div style={{ color: "#919db1" }}>Logout</div>
            ) : (
              <div style={{ color: "#919db1", display: "none" }}></div>
            )}
          </div>
          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <input type="text" placeholder="Search news..." value={searchInput}
              onChange={(e)=> setSearchInput(e.target.value)} />
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </header>
        <div className="news-content">
          <div className="navbar">
            <div className="user">
              {state && name ? (
                <div style={{ color: "#919db1" , fontSize: 15 }}>Welcome back {name}</div>
              ) : (
                <div style={{ color: "#919db1" , fontSize: 15 }}>Guest user</div>
              )}
              <img src={userImage} alt="User image" onClick={onShowBlogs}></img>
            </div>
            <nav className="categories">
              <h1 className="nav-heading">Categories</h1>
              <div className="nav-links">
                {categories.map((category) => (
                    <a href="#" key={category} className="nav-link"
                    onClick={(e)=>handleCategory(e,category)}>
                    {category}
                  </a>
                ))}
                <a href="#" className="nav-link" onClick=
                {()=>setShowBookmarksModal(true)}>
                  Bookmarks <i className="fa-solid fa-bookmark"></i>
                </a>
              </div>
            </nav>
          </div>
          <div className="news-section">
            {headline && (<div className="headline" onClick={()=> 
              handleArticle(headline)
            }>
              <img src={headline.image || noImage} alt={userImage} />
              <h2 className="headline-title">
                {headline.title}
                <i className={`${bookmarks.some((bookmark)=>
                bookmark.title === headline.title) ? "fa-solid" : "fa-regular"} fa-bookmark bookmark`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleBookmarkClick(headline)
                }}  ></i>
              </h2>
            </div>
          )}
            
            <div className="news-grid">
              {news.map((article, index)=> (
                <div key={index} className="news-grid-item" onClick={()=> 
                  handleArticle(article)}>
                <img src={article.image || noImage} alt={article.title} />
                  <h3>
                      {article.title}
                      <i className={`${bookmarks.some((bookmark)=>
                bookmark.title === article.title) ? "fa-solid" : "fa-regular"} fa-bookmark bookmark`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleBookmarkClick(article)
                }}  ></i>
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <NewsModal show={showModal} article={selectedArticle} onClose={()=>setShowModal(false)}/>
          <Bookmarks show={showBookmarksModal} bookmarks={bookmarks} 
          onClose={()=>setShowBookmarksModal(false)}
          onSelectArticle={handleArticle}
          onDeleteBookmark={handleBookmarkClick}
          />
          <div className="my-blogs">
            <h1 className="my-blogs-heading">
              My Blogs
            </h1>
            <div className="blog-posts-content">
              <div className="new-blog-post-content">
                <img src={treeImage} alt="Post Image"  />
                <h3>ekrgeg egrg gertg</h3>
                <div className="post-buttons">
                  <button className="edit-post">
                  <i className="fas fa-edit"></i>
                  </button>
                  <button className="delete-post">
                    <i className="fas fa-window-close"></i>
                  </button>
                </div>
              </div>
              <div className="new-blog-post-content">
                <img src={treeImage} alt="Post Image"  />
                <h3>ekrgeg egrg gertg</h3>
                <div className="post-buttons">
                  <button className="edit-post">
                  <i className="fas fa-edit"></i>
                  </button>
                  <button className="delete-post">
                  <i className="fas fa-window-close"></i>
                  </button>
                </div>
              </div>
              <div className="new-blog-post-content">
                <img src={treeImage} alt="Post Image"  />
                <h3>ekrgeg egrg gertg</h3>
                <div className="post-buttons">
                  <button className="edit-post">
                  <i className="fas fa-edit"></i>
                  </button>
                  <button className="delete-post">
                  <i className="fas fa-window-close"></i>
                  </button>
                </div>
              </div>
              <div className="new-blog-post-content">
                <img src={treeImage} alt="Post Image"  />
                <h3>ekrgeg egrg gertg</h3>
                <div className="post-buttons">
                  <button className="edit-post">
                  <i className="fas fa-edit"></i>
                  </button>
                  <button className="delete-post">
                  <i className="fas fa-window-close"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="others-blogs">
          <h1 className="other-blogs-heading">
              Other Blogs
          </h1>
          <div className="blog-posts-content">
              <div className="new-blog-post-content">
                <img src={treeImage} alt="Post Image"  />
                <h3>ekrgeg egrg gertg</h3>
                <div className="post-buttons">
                  <button className="edit-post">
                  <i className="fas fa-edit"></i>
                  </button>
                  <button className="delete-post">
                  <i className="fas fa-window-close"></i>
                  </button>
                </div>
              </div>
              <div className="new-blog-post-content">
                <img src={treeImage} alt="Post Image"  />
                <h3>ekrgeg egrg gertg</h3>
                <div className="post-buttons">
                  <button className="edit-post">
                  <i className="fas fa-edit"></i>
                  </button>
                  <button className="delete-post">
                  <i className="fas fa-window-close"></i>
                  </button>
                </div>
              </div>
              <div className="new-blog-post-content">
                <img src={treeImage} alt="Post Image"  />
                <h3>ekrgeg egrg gertg</h3>
                <div className="post-buttons">
                  <button className="edit-post">
                  <i className="fas fa-edit"></i>
                  </button>
                  <button className="delete-post">
                  <i className="fas fa-window-close"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="news-footer">
          <p>
            <span>News and blogs</span>
          </p>
        </footer>
      </div>
    </>
  );
}

export default Blogs;
