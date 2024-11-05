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
  foodToAdd="hamburger";
  Person.findById(personId, (err, person) => {
  if (err) return console.log(err);
  
  person.favoriteFoods.push(foodToAdd); // Add the new food to favoriteFoods
  
  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data); // Pass the saved document to the callback
  });
});

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{ new: true},(err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId ,(err, deletedDoc) => {
    if(err) return console.log(err);   
    done(null, deletedDoc);
  })

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name : nameToRemove},(err,res)=>{
    if(err) console.log(err);
      done(null ,res);
  })
  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  var query = Person.find({ favoriteFoods: { $in: [foodToSearch] } }, (err, people) => {
    if (err) return console.error(err);
    console.log(people); // `people` will contain documents where favoriteFoods includes "hamburger"
  });

  query.sort({name : 1}).limit(2).select({age: 0}).exec((err, people) =>{
    if(err) console.log(err);
    done(null ,people);
  })
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
