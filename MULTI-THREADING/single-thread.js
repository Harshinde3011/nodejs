import path from "node:path";
import { mkdir, readdir } from "node:fs/promises";
import { Jimp } from "jimp"
import { fileURLToPath } from "node:url";

const __filername = fileURLToPath(import.meta.url);
const __direname = path.dirname(__filername);

const INPUT_DIR = path.join(__direname, 'input-images')
const OUTPUT_DIR = path.join(__direname, 'normal-output');

async function processImage(imagePath, filename) {
    const outputSubDirPath = path.join(OUTPUT_DIR, filename.split(".")[0]);
    await mkdir(outputSubDirPath, { recursive: true });

    const image = await Jimp.read(imagePath);

    const tasks = [
        {
            task: 'thumbnail',
            operation: async () => {
                const clonedImage = image.clone();
                clonedImage.resize({ w: 100, h: 100 })
                await clonedImage.write(path.join(outputSubDirPath, 'thumbnail.jpg'))
                console.log("thumbnail task is executed");
            }
        },
        {
            task: 'small',
            operation: async () => {
                const clonedImage = image.clone();
                clonedImage.resize({ w: 300, h: 300 })
                await clonedImage.write(path.join(outputSubDirPath, 'small.jpg'));
                console.log("small task is executed");
            }
        },
        {
            task: 'medium',
            operation: async () => {
                const clonedImage = image.clone();
                clonedImage.resize({ w: 600, h: 600 })
                await clonedImage.write(path.join(outputSubDirPath, 'medium.jpg'))
                console.log("medium task is executed");
            }
        },
        {
            task: 'large',
            operation: async () => {
                const clonedImage = image.clone();
                clonedImage.resize({ w: 1000, h: 1000 })
                await clonedImage.write(path.join(outputSubDirPath, 'large.jpg'))
                console.log("large task is executed");
            }
        },
        {
            task: 'grayscale',
            operation: async () => {
                const clonedImage = image.clone();
                clonedImage.greyscale()
                await clonedImage.write(path.join(outputSubDirPath, 'grayscale.jpg'))
                console.log("grayscale task is executed");
            }
        },
        {
            task: 'blur',
            operation: async () => {
                const clonedImage = image.clone();
                clonedImage.blur(5)
                await clonedImage.write(path.join(outputSubDirPath, 'blur.jpg'))
                console.log("blur task is executed");
            }
        },
    ]

    for (const task of tasks) {
        await task.operation()
    }

    console.log("operation done...");
    
}

async function main() {
    const allFiles = await readdir(INPUT_DIR);
    const allImages = allFiles.filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

    const start = process.hrtime.bigint();

    for (const image of allImages) {
        const filePath = path.join(INPUT_DIR, image);
        await processImage(filePath, image)
    }

    const end = process.hrtime.bigint();

    const totalTimeMs = Number(end - start) / 1_000_000;
    console.log("totalTime:", totalTimeMs, "ms");
}

main();

// It take 10-11 secs