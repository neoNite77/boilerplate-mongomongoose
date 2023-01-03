require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Assign a Mongoose Schema to a variable
const Schema = mongoose.Schema;

// Create a Person Schema
const personSchema = new Schema ({
  name : { type: String, required: true},
  age : Number,
  favoriteFoods: [String]
});

// Create a Person model from the schema
const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  var janeDoe = new Person({name: "Jane Doe", age: 50, favoriteFoods:["hamburger", "taco", "burritos"]});

  // Saves instance of person into database
  janeDoe.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  }); 
};

let arrayOfPeople = [
  {name: "John Doe", age: 50, favoriteFoods: ["Pizza"]},
  {name: "Jenny Doe",age: 50, favoriteFoods:["Hamburger"]},
  {name: "Emily Stone",age: 30, favoriteFoods:["Salad"]}
];

// Create many people by using Model.create()
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done (null, people);
  });
};

// Find people by their name using Model.Find()
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

// Find a particular food by using Model.findOne()
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, foodFound) {
    if (err) return console.log(err);
    done(null, foodFound);
  });
};

// Find Person by ID using Model.findById()
const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, idFound) {
    if (err) return console.log(err);
    done(null, idFound);
  });
};

// Find Person by Id and then edit and save data
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, person) {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

// Find a person by name and set age to XX by using Model.findAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new:true}, (err, updatedDoc) => {
    if (err) return console.log(err);
    done(null, updatedDoc);
  });
};

// Removing a person by id using model.findByIdAndRemove or model.findOneAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedId) => {
    if (err) return console.log(err);
    done(null, removedId);
  });
};

// Remove many people by using model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, removedName) => {
    if (err) return console.log(err);
    done(null, removedName);
  });
};

// Chaining a query chain
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name : "asc"}).limit(2).select("-age").exec((err, data) => {
    if (err)
      done(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
