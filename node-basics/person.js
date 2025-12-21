// to export person class, you can also export object functions etc.

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greeting(){
        console.log(`Hey my name is ${this.name} and my age is ${this.age}`);
    }
}

export { Person };  // ES Modules (Modern / Recommended)