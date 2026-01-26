import fs from "fs";
import path from "path";
import { Transform } from "stream";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _direname = path.dirname(_filename);

const inputFile = path.join(_direname, "input.txt");
const transformFile = path.join(_direname, "transform.txt");

const readStream = fs.createReadStream(inputFile, { encoding: "utf-8" });
const writeStream = fs.createWriteStream(transformFile);

const upperCase = new Transform({
    transform(chunk, encoding, callback){
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

readStream.pipe(upperCase).pipe(writeStream);