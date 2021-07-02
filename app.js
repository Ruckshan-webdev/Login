const express = require('express')
const  Mongoose  = require('mongoose')
const app = express()
const UserModel = require('./Model')
const serverles = require('serverless-http')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const DB = "mongodb+srv://user:user@cluster0.h4tcg.mongodb.net/login?retryWrites=true&w=majority"
Mongoose.connect(DB, {useNewUrlParser: true, useCreateIndex:true ,  useUnifiedTopology: true, useFindAndModify:false}).then(console.log("DB Connected")).catch((err)=> console.log(err));


app.get('/', (req,res)=>{
    res.render('index.ejs')
})

app.get('/login', (req,res)=>{
    res.render('login.ejs')
})

app.get('/register', (req,res)=>{
    res.render('register.ejs')
})


app.post('/register', async (req,res)=>{
        try {
            const createUser = await UserModel.insertMany(req.body)
            res.status(201).render('success.ejs')
            
        } catch (error) {
            res.status(401).render('error.ejs' )
            
        }

})

app.post('/login', async (req,res)=>{
    try {
        const findUser = await UserModel.findOne(req.body)
        if(findUser){
            res.status(201).render('success.ejs')
        }else{
             throw new Error
        }
        
    } catch (error) {
        res.status(404).render('error.ejs')
        
    }


    
})



let port = process.env.PORT || 3000


app.listen(port, ()=>{
    console.log("Running on port");
})


