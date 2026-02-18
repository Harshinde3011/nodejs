import { fileURLToPath } from "node:url";
import { readdir } from "node:fs/promises"
import path from "node:path";
import os from "node:os";
import Piscina from "piscina";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const INPUT_DIR = path.join(__dirname, 'input-images');
const MAX_WORKERS = os.cpus().length
const WORKER_FILE_PATH = path.join(__dirname, 'worker.js')

const piscina = new Piscina({
    filename: path.join(WORKER_FILE_PATH),
    minThreads: 1,
    maxThreads: MAX_WORKERS - 1
})

async function main() {
    const allFiles = await readdir(INPUT_DIR);
    const allImages = allFiles.filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

    const start = process.hrtime.bigint();

    const result = await Promise.all(
        allImages.map((file) => {
            const filename = path.join(INPUT_DIR, file);

            return piscina.run({
                imagePath: filename,
                filename: file
            })
        })
    )

    const end = process.hrtime.bigint();
    const totalMs = Number(end - start) / 1_000_000;

    console.log("Processed:", result.length);
    console.log("Total time:", (totalMs / 1000).toFixed(2), "seconds");

    await piscina.destroy();
}

main()