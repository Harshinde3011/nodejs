// this behaves different in strict mode and in non-strict mode

//1. this in global space (whatever write outside the block is called global space)
console.log(this); // this keyword in global space points to global object i,e "window" in browser

//2. this inside the function 
function x() {
    // the value depends on strict / non-strict mode, in non-strict mode value of "this" is "window", and "undefined" in strict mode
    console.log(this);
}
// if the value of "this" keyword is undefined or null, then "this" will be replaced with global object, only in non-strict mode
// "this" keywords value is depend on how the function is called
x(); 

//3. This inside the object's methods
// when you create in function inside the object is called as method 
const obj = {
    a : 10,
    x : function () {
        console.log("This inside object: ",this);
        console.log("a: ",this.a);
    }
}
obj.x();
// whenever you use "this" inside method then value of this, is the a object, where "this" method is present

//4. This inside the arrow function
// arrow function dont have their own "this" binding, but value of this will be its enclosing lexical context(where the code is present)
const objOne = {
    a: 20,
    x: () => {
        console.log("This inside arrow function:",this);  // points to global object
    }
}
objOne.x();

//5. This is nested arrow function
const objecTwo = {
    a: 10,
    x: function () {
        // enclosing lexical context
        const y = () => {
            console.log("This inside nested arrow function: ", this);
        }

        y();
    }
}
objecTwo.x();
// here "this" value will contains the object cause "enclosing lexical context", "this" is present inside method "x" and "this" inside method points to object