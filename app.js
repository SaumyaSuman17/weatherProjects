const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){



});
app.post("/", function(req,res){
    const query=req.body.cityName;
    const appid= "10b2e69b1dd41843c4b666192431d3ad";
    const unit="metric";
    res.sendFile(__dirname + "/index.html");
   const url="https://api.openweathermap.org/data/2.5/weather?q="+query+",&appid="+ appid +"&units=" + unit;

    https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const dataVal= JSON.parse(data);
      console.log(dataVal);

      const val= dataVal.main.temp_max;
      const val1=dataVal.weather[0].description;   //value fetched by copying path of the data from json format
      console.log(val1);
      console.log(val);
      const icon= dataVal.weather[0].icon;
      const iconUrl="http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The max temperature in"+ query + " is " + val + " degree celcius</h1>");
      res.write("<img src=" +iconUrl+ ">");
    });

  });
  // console.log("post request!");
})
app.listen(3000,function(){
  console.log("Listening to 3000 port!");
});
