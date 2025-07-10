const express = require("express");
const z = require('zod');
const bcrypt = require('bcrypt');
const {User,Admin,Course} = require('../database/db');
const jwt = require('jsonwebtoken');

const { db_url, JWT_ADMIN_SECRET, JWT_USER_SECRET } = require("../config");
routes = express();
routes.use(express.json());

routes.post("/signup", async (req,res) => {
  const user_parse = z.object({
    name: z
      .string()
      .min(3, { message: "Too Short" })
      .max(20, { message: "Too Long!" }),
    email: z.string().email(),
    password: z
      .string()
      .min(5, { message: "Password Length must be atleast 5" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
        message:
          "Password must conatain atleat 1 Uppercase, 1 LowerCase, 1 Digit and a Special Character",
      }),
  });
  let parse_response =  user_parse.safeParse(req.body);
  let data = parse_response.data;
  let err = parse_response.error;
  if (parse_response.success){
    let response = await User.findOne({ email: data.email });
    if(response){
        res.json({
            message : "User already exist"
        })
    }else{
        data.password = await bcrypt.hash(data.password, 3);
        await User.create(data);
        res.json({
            message : "Signed up succesfully, please login"
        })
    }
  }else {
    res.json({
        error : err
    })
  }
});


routes.post("/login", async (req,res) => {
    const user_parse = z.object({
      email: z.string().email(),
      password: z
        .string()
        .min(5, { message: "Password Length must be atleast 5" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
          message:
            "Password must conatain atleat 1 Uppercase, 1 LowerCase, 1 Digit and a Special Character",
        }),
    });
    let parse_response = user_parse.safeParse(req.body);
    let data = parse_response.data;
    let err = parse_response.error;
    if (parse_response.success){
        let response = await User.findOne({email : data.email});
        if (response){
            const check = await bcrypt.compare(data.password,response.password);
            if (check){
                res.json({
                    message : "You are logged in...!",
                    token : jwt.sign({
                        id : response._id
                    },JWT_USER_SECRET)
                })
            }else{
                res.json({
                    message : "Invalid Password"
                })
            }
        }else{
            message : "Email is not registered, Please Signup"
        }
    }
});

routes.listen(3000);