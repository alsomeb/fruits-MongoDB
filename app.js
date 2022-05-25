const mongoose = require("mongoose");

// URL 
const url = "mongodb://localhost:27017/fruitsDB"

// Mongoose URL + database + if doesnt exist, create it!
mongoose.connect(url).then(() => console.log('Connected to: ' + url));

// Create A new Schema, Blueprint of how we want data to be structured in DB
const fruitSchema = new mongoose.Schema ({
    name: {
        // Validation
        type: String,
        required: [true, "Please Check your data entry, no name spec!"] // eller bara true
    },
    rating: {
        // Validation
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});


// CREATE
// Use schema to create a mongoose model, first param collection name, singular!!
// MONGOOSE WILL CONVERT TO PLURAL FORM
const Fruit = mongoose.model("Fruit", fruitSchema);

// Create a new fruit document from model above
const fruit = new Fruit({
    name: "Jumbo Fruit",
    rating: 7,
    review: "Its Huge"
});

// const kiwi = new Fruit({
//     name: "Kiwi",
//     rating: 5,
//     review: "Pretty solid as a Kiwi."
// });

// const banana = new Fruit({
//     name: "Banana",
//     rating: 3,
//     review: "Pretty solid as a Banana."
// });

// const orange = new Fruit({
//     name: "Orange",
//     rating: 10,
//     review: "Pretty solid as a Orange."
// });


// Save as bulk else Model.save()
// Fruit.insertMany([apple, kiwi, banana, orange], function(err){
//     if (err){
//         console.log(err);
//     } else {
//         console.log('Saved New documents in Fruits collection');
//     }
// });

// SAVE
// fruit.save();

// CREATE
// New schema Person, name and age
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favFruit: fruitSchema // embedd fruit doc inside here RELATIONSHIP
});

// Model mongoose will name it "people" so stick to singular form
const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "Agnes",
    age: 29,
    favFruit: fruit // fruit doc RELATIONSHIP
});

//SAVE
// person.save().then(() => console.log('Saved New document People Collection'));



// READ 
// 2 params, error and what it finds back
Fruit.find(function(err, fruits){
    if (err){
        console.log(err);
    } else {
        //console.log(fruits);

        fruits.forEach(fruit => {
            console.log(fruit.name);
        });

        // Close DB connection, always close it when done
        //mongoose.connection.close();
    }
});


// // UPDATE DATA

// update mango to watermelon
// Fruit.updateOne({_id: "628e2edba5b8c7a601f639e2"}, {name: "Watermelon"}, function(err){
//     if (err){
//         console.log(err);
//     } else {
//         console.log("Succesfully updated the document");
//     }
// });

// UPDATE, add favFruit Pear to Alex
// Person.updateOne({name: "Alex"}, {favFruit: fruit}, function(err){
//     if (err){
//         console.log(err);
//     } else {
//         console.log("Updated Doc");
//     }
// })


// // // Delete Banana

// Fruit.deleteOne({name: "Banana"}, function(err){
//     if (err){
//         console.log(err);
//     } else {
//         console.log("Deleted one Document");
//     }
// });


// // Delete MANY

// Person.deleteMany({name: "Alex"}, function(err){
//     if (err){
//         console.log(err);
//     } else {
//         console.log("Deleted All documents");
//     }
// });
