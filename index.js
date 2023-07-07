// Importation of the packages
const mongoose = require('mongoose');

// Connect the MongoDB database using  MONGO_URI 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create the person Schema
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});

// Create Person model using the person Schema
const Person = mongoose.model('Person', personSchema);

// Create and save  record of a model
const createPerson = (done) => {
const person = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["Pasta", "Burger"]
    });

    person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
    });
};

// Create many records using Model.create()
const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
    });
};

// Use model.find() to search for people by name
const findPeopleByName = (name, done) => {
    Person.find({ name }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
    });
};

// Use model.findOne() to find a person by favorite food
const findOnePersonByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
    });
};

// Use model.findById() to find a person by _id
const findPersonById = (personId, done) => {
    Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
    });
};

// Perform classic updates by finding a person, modifying the favoriteFoods, and saving
const findAndUpdatePerson = (personId, done) => {
    Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push("Hamburger");
    person.save((err, updatedPerson) => {
        if (err) return console.error(err);
        done(null, updatedPerson);
    });
    });
};

// Perform updates using model.findOneAndUpdate()
const findAndUpdateByName = (personName, done) => {
    Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => {
        if (err) return console.error(err);
        done(null, updatedPerson);
    }
);
};

// Delete one document using model.findByIdAndRemove()
const findAndRemovePerson = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err);
    done(null, removedPerson);
    });
};

// Delete many documents using model.remove()
const removePeople = (done) => {
    Person.remove({ name: "Mary" }, (err, result) => {
    if (err) return console.error(err);
    done(null, result);
    });
};

// Chain search query helpers to find people who like burritos
const queryChain = (done) => {
    Person.find({ favoriteFoods: "Burritos" })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec((err, data) => {
        if (err) return console.error(err);
        done(null, data);
    });
};

// Export  of all the functions
module.exports = {
    createPerson,
    createManyPeople,
    findPeopleByName,
    findOnePersonByFood,
    findPersonById,
    findAndUpdatePerson,
    findAndUpdateByName,
    findAndRemovePerson,
    removePeople,
    queryChain
};
