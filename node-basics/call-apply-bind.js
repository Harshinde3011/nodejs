//call, apply, and bind are Function methods in JavaScript used to control the value of "this" explicitly.
function printFullName(hometown) {
    console.log(`${this.firstName} ${this.lastName} from ${hometown}`); // "this" refers to object cause it used in method
}
const objectOne = {
    firstName: "Harsh",
    lastName: "Shinde",
}

const objectTwo = {
    firstName: "Raj",
    lastName: "Shinde"
}

// call, is used to invoke a function by passing 1st argument as reference to "this"
// in objectTwo we can write printName function to print full name: one way, and another way is using call method, which mwans borrowing the function
// each every method in js has access to use special funciton i,e call()
printFullName.call(objectTwo, "pune") // in the call 1st argument is reference, or where we want to point "this", in our case we are pointing "this" to object "objectTwo"
printFullName.call(objectOne, "sangli") // 1st argument is reference, and remaining arguments are arguments to the function

// the only difference between call and apply is the way pass an arguments, in call we is comma ",", and in apply we use array of argruments ["", "", ...]

// call and apply involkes functions immedeatly

// Bind
// In bind methods looks exactly same as call method, the only difference is instead of calling the method directly, it returns a new function, it will copy the function and bind to where we want to bind

const printMyName = printFullName.bind(objectOne);
console.log(printMyName);
printMyName();

// bind give you copy of function you can invoke it later
