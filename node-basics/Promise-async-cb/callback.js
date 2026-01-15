// callback are synchronous in nature

console.log("task start");

function task(cb) {
    console.log("task is running");
    cb();
}

task(() => console.log("hello i am callback"));
console.log("task end");

// op:
// task start
// task is running
// hello i am callback
// task end


// we make callback as asynchronous here
console.log("task start");

function task(cb) {
    console.log("task is running");
    setTimeout(cb, 0);
}

task(() => console.log("hello i am callback"));
console.log("task end");

// op:
// task start
// task is running
// task end
// hello i am callback