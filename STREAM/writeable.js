import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
console.log("_direname: ", _dirname);

const inputFile = path.join(_dirname, "input.txt");
const outputFile = path.join(_dirname, "output.txt");

const readStream = fs.createReadStream(inputFile, { encoding: "utf-8" });
const writeStream = fs.createWriteStream(outputFile);  // writes data from input.txt into output.txt

readStream.pipe(writeStream); // here backpressure handle automatically

writeStream.on("finish", () => {
    console.log("data has been written");
})

writeStream.on("error", (error) => {
    console.log("error occured while write into the file: ", error);
})

