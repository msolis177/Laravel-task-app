let numArray = [1, 5, 11, 32];

for (let num of numArray) {
    // console.log(num);
}
let user = {
    name: 'Juan',
    age: 20,
    occupation: "Developer"
}
for (let prop in user) {
    console.log('user props ', prop, ":", user[prop]);
}
// Loop over property names
// with keys

// use the Object construct
// Object.keys(obj)
// returns an array of the keys

let userProperties = Object.keys(user);
for (let prop of userProperties) {
    console.log(prop);
}

// Object.values(obj)
// returns an array of the values
let userValues = Object.values(user);
console.log(userValues);
for (let val in userValues) {
    console.log("val in", val);
}

// Object.entries(obj)
// return an array of key value pairs
let userEntries = Object.entries(user);
console.log(userEntries);
for (let entry of userEntries) {
    // console.log(entry);
    console.log(`${entry[0]}:${entry[1]}`)
}
// we can destructure the entry to an array of key and val
for (let [key, val] of userEntries) {
    console.log(`${key}:${val}`)
}