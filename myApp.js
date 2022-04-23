require("dotenv").config();
const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_URI;
const { Schema } = mongoose;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
    var JyothiEN = new Person({
        name: "Jyothi E N",
        age: 20,
        favoriteFoods: ["French Fries", "burger", "pizza"],
    });

    JyothiEN.save((err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

var arrayOfPeople = [
    { name: "Jordan", age: 19, favoriteFoods: "pizza" },
    { name: "John", age: 21, favoriteFoods: "burger" },
    { name: "Julie", age: 22, favoriteFoods: "icecream" },
];

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, people) => {
        if (err) return console.log(err);
        done(null, people);
    });
};

const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, (err, personFound) => {
        if (err) return console.log(err);
        done(null, personFound);
    });
};

const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: [food] }, (err, personFound) => {
        if (err) return console.log(err);
        done(null, personFound);
    });
};

const findPersonById = (personId, done) => {
    Person.findById({ _id: personId }, (err, personFound) => {
        if (err) return console.log(err);
        done(null, personFound);
    });
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";

    // .findById() method to find a person by _id with the parameter personId as search key.
    Person.findById(personId, (err, personFound) => {
        if (err) return console.log(err);

        // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
        personFound.favoriteFoods.push(foodToAdd);

        // and inside the find callback - save() the updated Person.
        personFound.save((err, updatedPerson) => {
            if (err) return console.log(err);
            done(null, updatedPerson);
        });
    });
};

const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
    Person.findOneAndUpdate(
        { name: personName },
        { $set: { age: ageToSet } },
        { new: true },
        (err, updatedPerson) => {
            if (err) return console.log(err);
            done(null, updatedPerson);
        }
    );
};

const removeById = (personId, done) => {
    Person.findOneAndRemove({ _id: personId }, (err, deletedPerson) => {
        if (err) return console.log(err);
        done(null, deletedPerson);
    });
};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.remove({ name: nameToRemove }, (err, deletedPerson) => {
        if (err) return console.log(err);
        done(null, deletedPerson);
    });
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
