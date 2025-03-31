import {} from 'react'
import treeImage from '../assets/images/tree.jpg'
import './BlogsModal.css'

const BlogsModal = ({closeModal,  selectedPost}) => {
return (
    <div className='modal-overlay'>
        <div className='modal-content'>
            <span className='close-button' onClick={()=>closeModal()}>
                <i className='fa-solid fa-xmark'></i>
            </span>
            <img src={treeImage} alt="Modal Image" 
            className='blogs-modal-image'/>
            <h2 className='blogs-modal-title'>
                {selectedPost.title}
            </h2>
            <p className='blog-post-content'>
                {selectedPost.content}
            </p>
        </div>
    </div>
)
}

export default BlogsModal