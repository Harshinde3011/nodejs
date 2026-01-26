import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

console.log("_dirname: ", _dirname);

const inputFile = path.join(_dirname, "input.txt");

const readStream = fs.createReadStream(inputFile, { encoding: "utf-8" });

// methods on readStream
readStream.on("data", (chunk) => {
    console.log("received a chunk of data: ", chunk);
})

readStream.on("end", () => {
    console.log("Finished reading file");
})

readStream.on("error", (error) => {
    console.log("Error occured while reading the file: ", error);
})