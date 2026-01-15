// In JavaScript, many operations like API calls or database queries are asynchronous.
// Traditionally, we handled them using Promises with .then() and .catch().
// async/await is syntactic sugar over Promises that improves readability.
// An async function always returns a Promise, and await pauses the execution of that function until the Promise resolves or rejects.
// We handle errors using try/catch, just like synchronous code.

async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
getData();