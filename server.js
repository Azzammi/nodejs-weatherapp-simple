//import { request } from 'https';

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')
const apiKey = 'c4dbfff0e3215947821135153531e453'

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:true }));
app.set('view engine','ejs');

app.get('/', (req, res) => res.render('index'))

app.post('/', (req, res) => {
   let city = req.body.city;   
   let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}` 
   
   request(url, function(err,response,body){
        if(err){
            res.render('index',{weather: null, error: 'Error, please try again'});
        }else{
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index',{weather: null, error: 'Error, please try again'});
            }else{
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index',{weather: weatherText, error: null});
            }
        }
   });


   
    res.render('index');
   console.log(req.body.city);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))