import {} from 'react'
import userImage from '../assets/images/userImage.jpg' 
import './NewsModal.css'

const NewsModal = () => {


return (
    <div className="modal-overlay">
        <div className="modal-content">
        <span className="close-button">
            <i className="fa-solid fa-xmark"></i>
        </span>
        <img src={userImage} alt="Modal image" className="modal-image" />
        <h2 className="modal-title">
             eergergergegergeg
        </h2>
        <p className="modal-source">
            asfasfasfasfasfas
        </p>
        <p className="modal-date">
            sdbsdbsdb
        </p>
        <p className="modal-content-text">
            sdbsdbsdb
        </p>
        <a href="#" className="read-more-link">
            Read more
        </a>
        </div>
    </div>
)
}

export default NewsModal