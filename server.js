require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const carImage = require('./models/seeds/cars')




mongoose.connect(
  process.env.MONGODB_URL,
  {useNewUrlParser: true, useUnifiedTopology: true}
  ) 
  .then(function(){
    console.log('Connected to Database...')
  })
  .catch(function(err){
    console.log(err)
  })
app.use(express.static('public'))

  //Define schema for image properties
  const carSchema = new mongoose.Schema({
    id: Number,
    title: String,
    Description: String,
    linkURL: String,
    creditURL: String,
    credit: String,
  });
  //compile schema into model
  const car = mongoose.model('car', carSchema);


// List entry route
app.get('/api/cars', (req, res) => {
  // car array
  let cars = null
  car.find((err, data) => {
    if (err) {
      console.log(err)
      res.sendStatus(404);
    }
    else {
      cars = data

    } if (typeof cars !== 'undefined' && Array.isArray(cars)) {
    
        // array valid
        res.send(cars)
    
      } else {
    
        res.status(404)
        res.send({error: 'File Not Found'})
        
      }
    }
);

})

// Item route
app.get('/api/cars/:title', (req, res) => {
  let cars
  car.findOne({name: req.params.name}, function(err, data) {
    if(err) {
      console.log(err)
      res.sendStatus(404);
    } else {
      cars = data
      console.log(cars)
      if (typeof cars === 'object' && cars !== null) {
        res.send(cars)
      } else {
        res.status(404)
        res.send({error: 'File Not Found'})
      }
    }
  });
})
//Handle 404
app.use((req, res) => {
  //if path starts with '/api' send JSON 404
  if (req.url.startsWith('/api')){
    res.status(404)
    res.send({error: 'File Not found'})
  }else{
    console.log(car)
    res.status(404)
    app.use(express.static('public'))
  }


});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server Started'))