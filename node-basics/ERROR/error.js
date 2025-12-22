// ERROR OBJECT

const error = new Error("Something went wrong");
// console.log(error.message);
throw new Error("we can write error in this way can too");


// handle exception using try and catch
try {
    doSomthing()
} catch (error) {
    console.log("Error caught");
    console.log("error: ", error);
}

// Uncaught exception
process.on("uncaughtException", (error) => {
    console.log("There was an uncaught error");
    process.exit(1);
})

// using promise
async function doSomething() {
    const response = await fetch("http://localhost:3000/api");
    return response.json();
}

doSomething()
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });


// Exception with async await
const someFunction = async() => {
    try {
        await doSomething()
    } catch (error) {
        throw new Error("async error: ", error);
    }
}

someFunction();

// Custom error
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

throw new AppError("User not found", 404);


