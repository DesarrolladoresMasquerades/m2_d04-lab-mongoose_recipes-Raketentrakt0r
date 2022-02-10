require("dotenv").config()
const mongoose = require('mongoose');


// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(`mongodb+srv://${process.env.MG_USERNAME}:${process.env.MG_PWD}@cluster0.tz3zj.mongodb.net/recipes?retryWrites=true&w=majority`)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    //return Recipe.deleteMany()  USELESS
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  /*
  Recipe.create({
    title:"Tacos al Pastor",
    level:"Easy Peasy",
    Ingredientes:["tortilla","cebolla","cilantro","adobo","carne de cerdo"],
    cuisine:"mexican",
    dishType:"breakfast",
    image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fmx.toluna.com%2Fopinions%2F4073764%2FAlguien-que-me-explique-la-diferencia&psig=AOvVaw2CEPKU_cMLgB0_G8gSnwpz&ust=1644594464630000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCICHrPq99fUCFQAAAAAdAAAAABAD",
    duration:15,
    creator:"Me",
})*/

//to bring data from the json- juat the title
Recipe.insertMany(data)
  .then((allRecipes) =>
    allRecipes.forEach((recipe) => console.log(recipe.title))
  )
  .catch((error) => console.log(error));
  
  //
  Recipe.findOneAndUpdate(
    { title: "Rigatoni alla Genovese" },
    { duration: "100" }
  ).then((recipe) => console.log(`actualizado ${recipe.title}`));

  // to delete one element
  Recipe.deleteOne({ title: "Carrot Cake" })
  .then((del) => console.log("delete item"))
  .catch((err) => console.log(err));

// to close the connection
  mongoose.connection.close();