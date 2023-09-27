const express = require('express')
const bodyParser = require("body-parser");
const axios=require('axios')
const app = express()
const Doc =require('./doctype')
app.use(bodyParser.json());
app.use(express.static('public'))
const port = process.env.PORT ||1223
app.use(express.json());
const { Configuration, OpenAIApi } = require("openai");
app.use(express.urlencoded({ extended: false }));
// const uri = 'mongodb+srv://web1234:web1234@clusternewz.o2wezdx.mongodb.net/?retryWrites=true&w=majority';
const uri = 'mongodb+srv://sih2023:sih2023dsatm@cluster0.pdcoy7r.mongodb.net/?retryWrites=true&w=majority';
const mongoose = require('mongoose');
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
    
    const db = mongoose.connection;
    // const collection = db.collection('drydatas');
    db.on('error', function(err){
        console.log(err);
      });

  })
  .catch((err) => {
    console.log(err);
  });

async function Docgpt(text) {  
  try{

    const options = {
      method: 'POST',
      url: 'https://chatgpt-api8.p.rapidapi.com/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'b38251f12dmsh1e354647d127793p1fe19ejsnd617ffc74cff',
        'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com'
      },
      data: [
        {
          content: `You are an attorney working on a ${text} Document. Please provide a list of details in very simple words required from the user for this legal document in the format of a single js array only. For example, ['Tenant's Full Name', 'Landlord's Full Name', 'Property Address',... so on]. Ensure that you include all essential information in easy language for a comprehensive legal document.`,
          role: 'user'
        }
      ]
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
       return response.data
    } catch (error) {
        console.log(error)
       return "error"
    }
}catch(e){

}
}
app.post('/docdetail', async(req, res) => {
    let ans=await Docgpt(req.doc);
    if(ans!="error"){

        res.send({"data":1,"res":ans});
    }
    else{
    res.send({"data":0});
    }

})
app.post('/doctype', async(req, res) => {

    
    try {
        const item = await Doc.find({user_id:req.body.Sender});
        if (!item) {
          res.send({"data":0});
        } else {
          res.send({"data":1,"res":item});
        }
      } catch (err) {
        console.log(err);
        res.send({"data":99});
      }

})

app.listen(port, () => {
    console.log('Server started on post ' + port)
})
