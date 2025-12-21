import fs, { writeFile } from "fs"
import path from "path"
import { fileURLToPath } from "url";

// // create folder: (async method)
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename)

fs.mkdir(path.join(_dirname, 'test'), {}, (err) => {
    if (err) throw err;
    console.log("folder created...");
})

// create and write in file
fs.writeFile(path.join(_dirname, 'test', 'hello.txt'), "this file is created using 'writeFile',", (err) => {
    if (err) throw err;

    console.log("file created and text is written in file");
    
    fs.appendFile(path.join(_dirname, 'test', 'hello.txt'), "this line inserted using 'appendFile'", (err) => {
        if(err) throw err;

        console.log("new line is appended in hello.txt file");
    })
})
// you can write appendFile in separate also

// read file
fs.readFile(path.join(_dirname, 'test', 'hello.txt'), 'utf8', (err, data) => {
    if(err) throw err;

    console.log("data inside file: ", data);
})

// rename file
fs.rename(
    path.join(_dirname, 'test', 'hello.txt'),
    path.join(_dirname, 'test', 'helloWorld.txt'),
    (err) => {
        if(err) throw err;
        console.log("file renamed...");
    }
)
