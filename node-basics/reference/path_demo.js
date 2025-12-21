import path from "path";
import { fileURLToPath } from "url";

// base file name
const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

console.log("file name: ", fileName);
console.log("directory name: ", dirName);
console.log("base name: ", path.basename(fileName));


// file extention
console.log("file extention: ", path.extname(fileName));

// create path object 
console.log("object: ", path.parse(fileName));
// you can access object prop using "." operator

// concatenate path
console.log(path.join(dirName, 'test', 'test.html'));  /* folder name "test", file name "test.html" */

// separate 
console.log("separate by /", dirName.split(path.sep));

// opposite to parse
const myNewFile = {
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt',
}
console.log(path.format(myNewFile))


