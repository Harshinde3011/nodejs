import { Person } from "./person.js";   // ES Modules (Modern / Recommended), include  "type": "module" in pacakge.json
import Logger from "./logger.js"

const person1 = new Person("Harsh", 24);

person1.greeting();

// object created
const logger = new Logger();

// event listner, When 'event' is emitted, this callback will run
logger.on('message', (data) => console.log(data));

logger.log("Server started");

// index.js
//   ↓
// create Logger instance
//   ↓
// register listener (.on)
//   ↓
// call log()
//   ↓
// emit("message")
//   ↓
// EventEmitter finds listeners
//   ↓
// listener callback executes







