// promise : is concept in node js that represents the eventual completion or failure of asynchronous operation ans its resulting value

const promise = new Promise((resolve, reject) => {
    console.log("Async task execution");
    const isChecked = false;
    if (isChecked) {
        const user = {
            name: "Harsh"
        }
        resolve(user);
    }else{
        const error = {
            errorCode : 404
        }
        reject(error);
    }
})

// Consuming a Promise
promise
    .then((val) => {
            console.log("Passed!", val);
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        console.log("clean up");
    })


const sampleApiCall = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("this API is executed in: " + time)
        }, time)
    })
}

let multipleCall = [sampleApiCall(1000), sampleApiCall(2000), sampleApiCall(3000)];


// run simultaneously, ❌ If even one fails, Promise.all() fails immediately.
Promise.all(multipleCall).then((val) => {
    console.log(val);
}).catch(() => {
    console.log("error in sampleApiCall");
})

// returns the result of the first Promise that settles (success or failure).
Promise.race(multipleCall).then((val) => {
    console.log(val);
})

// waits for ALL (no matter what), 👉 Returns status + value/error for each
Promise.allSettled(multipleCall).then((val) => {
    console.log(val);
})