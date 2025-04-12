import { useState, useEffect} from "react";
import axios from "axios";
import "./Blogs.css";
import userImage from '../assets/images/userImage.jpg'
import noImage from '../assets/images/noImage.jpeg'
import treeImage from '../assets/images/tree.jpg'
import NewsModal from "./NewsModal";
import Bookmarks from "./Bookmarks";
import BlogsModal from "./BlogsModal";


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

const Blogs = ({  onLogin, handleLogout, onShowBlogs  }) => {

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

  // will update list as database updates on refreshing the site
  //saved my blogs to show on the page
  const [myList, setMyList] = useState([])
  
  // will update list as database updates on refreshing the site
  //saved others blogs to show on the page in other blogs parts of the page
  const [otherList, setOtherList] = useState([])

  // Track item to delete for delete blog post function
  //custom confirmation modal for asking if you are sure you want to delete
  const [postToDelete, setPostToDelete] = useState(null);
  
  //array for single blog post while modal is open
  //to display when modal is clicked
  //for loged in users posts
  const [selectedPost, setSelectedPost] = useState([])

  //visibility of blog post modal
  //for loged in users posts
  const [showBlogModal, setShowBlogModal] = useState(false)

  //array for single blog post while modal is open
  //to display when modal is clicked
  //for all posts
  const [selectedPostAll, setSelectedPostAll] = useState([])

  //visibility of blog post modal
  //for all posts
  const [showBlogModalAll, setShowBlogModalAll] = useState(false)

  //get login state for toggling between login and logout in navbar
  const state = JSON.parse(localStorage.getItem('login'));

  let name = ""

  let userId = ""

  let token = ""

  if(state) {
//userInfo we use to display the name of the user on the page
name = JSON.parse(localStorage.getItem('userInfo')).data.user.name

//userId we use to search for posts of the loged in user
userId = JSON.parse(localStorage.getItem('userInfo')).data.user._id

//Bearer token for authorization
token = JSON.parse(localStorage.getItem('userInfo')).data.token
}


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


    //fetching all posts from database collection(MongoDB)
    //and displaying them in others blogs part of the site
  useEffect(() => {
      
      if(state){
        let isMounted = true
      const fetchAllBlogs = async () => {

try {
    const configuration = {
      method: "get",
      url: "https://mongodb-and-blogs.onrender.com/api/v1/post/all",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };

    // make the API call
      const response = await axios(configuration)
      //console.log("isMounted")
        if(isMounted) { 
          setOtherList(response.data.data);
          //console.log(response.data.data)
        }
      }
      catch(error)  {
        if(isMounted) {
        console.log(error)
        }
      }
      }
      //call function
      fetchAllBlogs()
      return () => {
        isMounted = false
      }
    }
  },[state, token])

  //fetching posts from database collection(MongoDB) for loged in user
  useEffect(() => {

    if(state){
        let isActive = true
        const fetchBlogPosts = async () => {
    try {
    const config = {
      method: "get",
      url: `https://mongodb-and-blogs.onrender.com/api/v1/post/${userId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };
    
    // make the API call
      const  responsePosts  = await axios(config)
        //seting data
        if(isActive){
          setMyList(responsePosts.data.data)
          //console.log(responsePosts.data.data)
        }
      } catch(error)  {
        if(isActive){
          console.log(error)
        }
      }
      }
      
        //call blog posts
        fetchBlogPosts()
        return () => {
          isActive = false
        }
      }
        },[onLogin,state,token,userId])

  

  const handleDeleteRequest = (id) => {
    setPostToDelete(id); // Set post id for confirmation
  };

  //function for deleting a blog post 
  //showing a modal for accepting or canceling delete request from the user
  const deleteBlogPost = async () => {
    if (postToDelete) {
    //_id of the blog post saved on the MongoDB
    let ID = postToDelete
    try {
      const configDelete = {
        method: "delete",
        url: `https://mongodb-and-blogs.onrender.com/api/v1/post/${ID}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
      // make the API call
      await axios(configDelete)
      setPostToDelete(null); // Hide modal
      //refresh page
      window.location.href = "/";
    } catch (error) {
      console.log(error)
    }
  }
}
//cancel delete request from pop up modal
const cancelDelete = () => {
  setPostToDelete(null); // Hide modal without deleting
};


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

  //blog post modal function for loged in users posts
  const handleShowBlogPostModal = (post) => {
    setShowBlogModal(true)
    setSelectedPost(post)
  }

  //blog post modal function for loged in users posts
  const closeBlogPostModal = () => {
    setShowBlogModal(false)
    setSelectedPost(null)
  }

    //blog post modal function for all posts
    const handleShowBlogPostModalAll = (post) => {
      setShowBlogModalAll(true)
      setSelectedPostAll(post)
    }
  
    //blog post modal function for all posts
    const closeBlogPostModalAll = () => {
      setShowBlogModalAll(false)
      setSelectedPostAll(null)
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
                <>
                <div style={{ color: "#919db1" , fontSize: 15 }}>Welcome back {name}</div>
                <img src={userImage} alt="User image" onClick={onShowBlogs}></img>
                </>
              ) : (
                <div style={{ color: "#919db1" , fontSize: 15 }}>Guest user</div>
              )}
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
          {state && myList ? (
              <div className="my-blogs">
              <h1 className="my-blogs-heading">
                My Blogs
              </h1>
              <div className="blog-posts-content">
                {myList.map((myPosts,index) => (
                    <div className="new-blog-post-content" key={index}>
                    <img src={treeImage} alt="Post Image"  onClick={()=> handleShowBlogPostModal(myPosts)}/>
                    <h3>{myPosts.title}</h3>
                    <div className="post-buttons">
                      <button className="edit-post">
                        <i className="fas fa-edit"></i>
                        </button>
                      <button className="delete-post" onClick={()=> handleDeleteRequest(myPosts._id)}>
                        <i className="fas fa-window-close"></i>
                      </button>
                    </div>
                  </div>
                ))}
                {showBlogModal && (<BlogsModal closeModal={closeBlogPostModal}  selectedPost={selectedPost} />)}
                {postToDelete && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          <h3>Confirm Deletion</h3>
          <p>
            Are you sure you want to delete? This action
            cannot be undone.
          </p>
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={deleteBlogPost}
              style={{
                background: "#ff4d4d",
                color: "white",
                border: "none",
                padding: "8px 15px",
                marginRight: "10px",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              Yes, Delete
            </button>
            <button
              onClick={cancelDelete}
              style={{
                background: "#ccc",
                color: "black",
                border: "none",
                padding: "8px 15px",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
              </div>
            </div>
            ) : ( 
          <div className="my-blogs">
          <h1 className="my-blogs-heading">
            My Blogs
          </h1>
          <div className="blog-posts-content">
            <h3>Not available. Please sign in</h3>
          </div>
          </div>
          )}
          {state && otherList ?  (
              <div className="others-blogs">
              <h1 className="other-blogs-heading">
                  Other Blogs
              </h1>
              <div className="blog-posts-content">
              {otherList.map((blogPosts,index) => (
                <div className="new-blog-post-content" key={index}>
                <img src={treeImage} alt="Post Image" onClick={()=> handleShowBlogPostModalAll(blogPosts)} />
                <h3>{blogPosts.title}</h3>
                </div> 
                ))}
                {showBlogModalAll && (<BlogsModal closeModal={closeBlogPostModalAll}  selectedPost={selectedPostAll} />)}
              </div>
              </div>
          ) : (
              <div className="others-blogs">
              <h1 className="other-blogs-heading">
                Other Blogs
              </h1>
              <div className="blog-posts-content">
                <h3>Not available. Please sign in</h3>
              </div>
              </div>
          )}
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
