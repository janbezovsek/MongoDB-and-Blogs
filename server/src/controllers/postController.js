const Post = require("../models/postModel")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/errors/appError")


//get all posts from all users
const getAllPosts = catchAsync (async (req, res,next) => {

        const posts = await Post.find()
        res.status(200).json({
            status: "succes",
            data:  posts,
        })
    
})
//find posts from the same loged in user
const getPostByUserId = catchAsync (async (req, res, next) => {

    //userId parameter that we passed in the postModel.js
        const post = await Post.find( {userId: req.params.userId})
        
        if (!post) {
            return next(new AppError("Post doesn't exist", 404))
        }
        res.header("Access-Control-Allow-Origin", "*")
        res.status(200).json({
            status: "succes",
            data:  post,
        })
    
})


const createPost = catchAsync( async (req, res, next) => {

        const newPost = await Post.create(req.body)

        res.status(200).json({
            status: "succes",
            data:  newPost,
        })
    
})


const updatePost = catchAsync (async (req, res, next) => {



        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: "succes",
            data:  updatedPost,
        })
})


const deletePost = catchAsync( async (req, res,next) => {



       const post = await Post.findByIdAndDelete(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!post) {
            return next(new AppError("Post doesn't exist", 404))
        }

        res.status(200).json({
            status: "succes",
            message:  "Post is deleted",
        })

})


module.exports = {getAllPosts, getPostByUserId, createPost, updatePost, deletePost}