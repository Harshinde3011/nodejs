import path from "node:path";
import { mkdir } from "node:fs/promises";
import { Jimp } from "jimp";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, "multi-threaded-output");

export default async function ({ imagePath, filename }) {
    const outputSubDirPath = path.join(
        OUTPUT_DIR,
        filename.split(".")[0]
    );

    await mkdir(outputSubDirPath, { recursive: true });

    const image = await Jimp.read(imagePath);

    const tasks = [
        async () => {
            const img = image.clone().resize({ w: 100, h: 100 });
            await img.write(path.join(outputSubDirPath, "thumbnail.jpg"));
        },
        async () => {
            const img = image.clone().resize({ w: 300, h: 300 });
            await img.write(path.join(outputSubDirPath, "small.jpg"));
        },
        async () => {
            const img = image.clone().resize({ w: 600, h: 600 });
            await img.write(path.join(outputSubDirPath, "medium.jpg"));
        },
        async () => {
            const img = image.clone().resize({ w: 1000, h: 1000 });
            await img.write(path.join(outputSubDirPath, "large.jpg"));
        },
        async () => {
            const img = image.clone().greyscale();
            await img.write(path.join(outputSubDirPath, "grayscale.jpg"));
        },
        async () => {
            const img = image.clone().blur(5);
            await img.write(path.join(outputSubDirPath, "blur.jpg"));
        }
    ];

    // Run sequentially (safe for memory)
    for (const task of tasks) {
        await task();
    }

    return {
        success: true,
        filename
    };
}
