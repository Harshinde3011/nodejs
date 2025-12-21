import EventEmitter from "events";

// create class, This means MyEmitter inherits methods like:
// .on()
// .emit()
// .once()
class MyEmitter extends EventEmitter { };

// Creates an object that can:
// emit events
// listen to events
const myEmitter = new MyEmitter();

// event listner, When 'event' is emitted, this callback will run
myEmitter.on('event', () => console.log("Event Fired!"));

myEmitter.on('read', () => console.log("Event read Fired!"));

// Triggers the 'event', All listeners registered for 'event' will execute
myEmitter.emit('event');