const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require("../utils/generateToken");
const productModel = require('../models/product-model');



module.exports.registerUser = async (req,res)=>{

    try{
        let {fullname,email,password} = req.body;

        let user = await userModel.findOne({email:email});

        if(user) return res.status(401).send("User already exists, please login");
        
        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(password, salt, async (err,hash)=>{
                if(err) return res.send(err.message);
                else{
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash,
                    });
                    
                    let token = generateToken(user);
                    res.cookie("token", token);
                    req.flash("success","user created successfully");
                    res.redirect("/");
                }
            });
        });
        
    }
    catch(err){
        res.send(err.message);
    }

};

module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) {
            req.flash("error", "Email or Password is incorrect");
            return res.redirect("/");
        }
        bcrypt.compare(password, user.password, async (err, isMatch) => {
            if (!isMatch) {
                req.flash("error", "Email or Password is incorrect");
                return res.redirect("/");
            } else {
                let token = generateToken(user);
                res.cookie("token", token);
                console.log('asdad');
                return res.redirect("/shop");
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

module.exports.logoutUser = async (req,res) => {
    res.clearCookie("token");
    res.redirect("/")
};