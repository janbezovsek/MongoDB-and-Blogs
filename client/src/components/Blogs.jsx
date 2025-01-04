import {} from "react";
import "./Blogs.css";

const Blogs = () => {
  return (
    <div className="news">
      <header className="news-header">News header</header>
      <div className="news-content">
        <div className="navbar">
          <nav className="categories">Categories</nav>
        </div>
        <div className="news-section">
          <div className="headline">Headline</div>
          <div className="news-grid">News grid</div>
        </div>
        <div className="my-blogs">My blogs</div>
        <div className="others-blogs">Others blogs</div>
      </div>
      <footer className="footer">Footer</footer>
    </div>
  );
};

export default Blogs;
