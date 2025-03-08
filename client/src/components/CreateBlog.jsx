import {} from 'react'
import userImage from '../assets/images/userImage.jpg'
import './CreateBlog.css'

const CreateBlog = ({ onShowHome }) => {
  return (
      <div className="blogs">
        <div className="blogs-left">
          <img src={userImage} alt="User" />
        </div>
        <div className="blogs-right">
          <div className="blogs-right-form">
            <h1>
              New post
            </h1>
            <form>
              <input type="text" placeholder="Add Title
              (Max 100 Characters, Min 3 Characters)"
              className='title-input'/>
              <textarea className='text-input' placeholder='Add text(Max 1000char., Min 10)'></textarea>
              <button type="submit" className='submit-btn'> Submit button</button>
            </form>
          </div>
          <button className="home" onClick={onShowHome}>
            Home<i className="bx bx-chevron-right"></i>
          </button> 
        </div>
      </div>
  )
}

export default CreateBlog