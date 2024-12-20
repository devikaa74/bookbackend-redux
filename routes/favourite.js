const router = require("express").Router();
const User = require("../models/user")
// const Book = require("../models/book")
// const jwt = require("jsonwebtoken")
const { authenticateToken }= require("./userAuth")


// add book to favourite
router.put("/add-book-to-favourite",authenticateToken, async (req, res)=>{
    try{
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            return res.status(200).json({message:"book is already in favourites"})
        }
         await User.findByIdAndUpdate(id, {$push: {favourites:bookid}})
         return res.status(200).json({message:"book added to favourites"})
    }catch(error){
        res.status(500).json({ message: "Internal server error"})
    }
})

// delete book to favourite
router.put("/remove-book-from-favourite",authenticateToken, async (req, res)=>{
    try{
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id, {$pull: {favourites:bookid}})
        }
         return res.status(200).json({message:"book removed from favourites"})
    }catch(error){
        res.status(500).json({ message: "Internal server error"})
    }
})
// get favourite books of a particular user
router.get("/get-favourite-books", authenticateToken, async (req, res)=>{
    try{
        const { id } = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;
        return res.json({
            status: "success",
            data: favouriteBooks,
        });
    }catch(error){
        console.log(error);
       return res.status(500).json({ message: "error occured"})
    }
})



module.exports = router;