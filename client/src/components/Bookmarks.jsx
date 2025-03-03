import {} from 'react'
import "./Bookmarks.css"
import userImage from '../assets/images/userImage.jpg'

const Bookmarks = () => {



return (

    <div className="modal-overlay">
        <div className="modal-content">
            <span className="close-button">
                <i className="fa-solid fa-xmark"></i>
            </span>
            <h2 className="bookmarks-heading">
                Bookmarked News
            </h2>
            <div className="bookmark-list">
                <div className="bookmark-item">
                    <img src={userImage} alt="Bookmark Image" />
                    <h3>gfgtzzfuujuhbjhbjhhhhhh
                        jijjjjjjjjjjjjjjjj
                    </h3>
                    <span className="delete-button">
                        <i className="fa-regular
                        fa-circle-xmark"></i>
                    </span>
                </div>
                <div className="bookmark-item">
                    <img src={userImage} alt="Bookmark Image" />
                    <h3>gfgtzzfuujuhbjhbjhhhhhh
                        jijjjjjjjjjjjjjjjj
                    </h3>
                    <span className="delete-button">
                        <i className="fa-regular
                        fa-circle-xmark"></i>
                    </span>
                </div>
                <div className="bookmark-item">
                    <img src={userImage} alt="Bookmark Image" />
                    <h3>gfgtzzfuujuhbjhbjhhhhhh
                        jijjjjjjjjjjjjjjjj
                    </h3>
                    <span className="delete-button">
                        <i className="fa-regular
                        fa-circle-xmark"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
)
}

export default Bookmarks