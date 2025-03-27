import {useState} from 'react'
import axios from 'axios'
import userImage from '../assets/images/userImage.jpg'
import './CreateBlog.css'
import { useToast } from '@chakra-ui/react'

const CreateBlog = ({ onShowHome }) => {

//state for entered title
const [title, setTitle] = useState("")

//state for entered text
const [content, setContent] = useState("")

//for form functionality when typed in data is correct or false
const toast = useToast()

//get login state for toggling between login and logout in navbar
const state = JSON.parse(localStorage.getItem('login'));

let userId = ""

let token = ""

if(state){
//Bearer token for authorization
token = JSON.parse(localStorage.getItem('userInfo')).data.token
//userId we use to search for posts of the loged in user
userId = JSON.parse(localStorage.getItem('userInfo')).data.user._id
}

//submit handler function
const submitHandler = async () => {

  if( !title && !content ) {
    toast({
        title: 'Please fill all of the fields.',
        description: "Warning",
        status: 'warning',
        duration: 6000,
        isClosable: true,
        position: 'bottom',
    })
    return
}
//sending our data to designated API
try {
  const config = {
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
      }
  }
  await axios.post(
      "http://localhost:5000/api/v1/post", 
      { title, content, userId},
      config
  )
  toast({
      title: 'Post created successfully.',
      description: "You have created a post",
      status: 'success',
      duration: 6000,
      isClosable: true,
      position: 'bottom',
  })
    // redirect user to the home page
    window.location.href = "/";
} catch (error) {
  toast({
      title: 'Error occured.',
      description: error.response.data.message,
      status: 'error',
      duration: 6000,
      isClosable: true,
      position: 'bottom',
  })
}
}
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
              className='title-input' value={title} onChange={(e)=>setTitle(e.target.value)}/>
              <textarea className='text-input' placeholder='Add text(Max 1000char., Min 10)' value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
              <button /*type="submit"*/ className='submit-btn' onClick={submitHandler}> Submit button</button>
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