require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })


// Define the personSchema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String]
  }
});

let Person  = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
    // Create a new document instance using the Person model
    const person = new Person({ 
      name: "John", 
      age: 25, 
      favoriteFoods: ["Pizza", "Burger"]
     });
     // Save the document to the database
    person.save((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  };
 


const createManyPeople = (arrayOfPeople, done) => {
  // Use Model.create() to insert multiple documents
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      // If there's an error, pass it to the callback
       return done(err);
      }
        // If successful, pass the saved data to the callback
    done(null, data);
  });
   
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    done(null , data);
  });
  
};

const findPersonById = (personId, done) => {
  Person.findById( personId, (err, data) => {
    if (err) return done(err);
    done(null , data);
  });
  };

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson); 
    });
  });
 
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet }, 
    { new: true },
    (err, updatedPerson) => {
      if(err) return done(err);
      done(null, updatedPerson);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if(err) return done(err);
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, (err, result) => {
    if(err){ return done(err);}
    done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec((err, data) => {
    if(err) {
      return done(err);
    }
    done(null, data);
  })
};

console.log('Server is running Quite well');

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
