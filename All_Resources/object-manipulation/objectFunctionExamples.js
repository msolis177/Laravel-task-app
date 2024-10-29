const person = {
    name: "Dom"
}
console.log("person started as ", person);
// Object.assign() can overwrite an existing object
// Object.assign(obj, {new obj});
Object.assign(person, {
    name: "Ryan",
    age: 37
});


console.log("person is now ", person);

const newPerson = Object.assign({}, person, {
    name: "Andy",
    age: 19
});
console.log("person now is ", newPerson);

// Using the spread operator

const newPersonUsingSpread = {
    ...person, ...{
        name: "Molly",
        age: 24
    }
};
console.log("person now is ", newPersonUsingSpread);

const animal = {};

Object.defineProperty(animal, "type", {
    value: "Dog",
    writable: true,
    enumerable: true // enumerable is the default except for when using defineProperty
});

console.log("animal is ", animal);

Object.defineProperty(animal, "DOB", {
    get() {
        return new Date();
    }
});


// Turn an array of arrays with 2 values into an object of entries

const phone = [
    ["brand", "Samsung"],
    ["model", "Galaxy S21"]
];

const phoneAsObject = Object.fromEntries(phone);
console.log(phoneAsObject);

// Object.freeze(obj)

const user = {
    name: "Kingpin",
    age: 45,
    occupation: "Kingpin",
    salary: 500000000
}
// delete items off of an object
delete user.age;
console.log("kingpin data ", user);
Object.freeze(user);
person.prisonSentence = "100 years";
console.log(user);