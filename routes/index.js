const express = require('express');
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin");
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get('/',(req,res)=>{
    let error = req.flash("error");
    res.render("index", {error, loggedin: false});
    // res.send('Hello World!');
});

router.get("/shop",isloggedin,async (req,res)=>{
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });
});


router.get("/cart", isloggedin,async (req,res)=>{
    let user = await userModel.findOne({email: req.user.email});
    res.render("cart", { user });
})

router.get("/addtocart/:productid",isloggedin, async (req,res)=>{
    // console.log(req.user)
    let user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","Added to cart");
    res.redirect("/shop");
})


router.get("/logout",isloggedin,(req,res)=>{
    res.render('shop');
});

module.exports = router;