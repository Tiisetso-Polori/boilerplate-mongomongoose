// Kx8KLiDGb9NFJeIk
// 41.4.13.98/32
// tiisetsopolori13
// 

require('dotenv').config();
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  var person = new Person({ 
    name: "Jane Fonda", 
    age: 84, 
    favoriteFoods: ["eggs", "fish", "fresh fruit"]
  });

  // Save the document to the database
  person.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data); // Pass the saved document to the callback
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null, people); // Pass the saved array of documents to the callback
  });
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name : personName}, (err, people) => {
    if (err) return console.error(err);
    done(null , people);  
  });
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : food}, (err, person) =>
  {
    if (err) return console.log(err);
    done(null, person);
  })
  
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) =>{
    if (err) return console.log(err);
    done(null , person);
  })
  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
