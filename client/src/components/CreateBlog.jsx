import {} from 'react'

const CreateBlog = ({ onShowHome }) => {
  return (
    <>
      <div className="home" onClick={onShowHome}>
          <button>
            Home
          </button> 
      </div>
    </>
  )
}

export default CreateBlog