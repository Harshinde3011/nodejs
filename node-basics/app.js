import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        const fileName = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(fileName);

        fs.readFile(path.join( __dirname, 'public', 'index.html'), (err, content) => {
        
        if (err) throw end;

        res.end(content);
        res.writeHead(200, { 'content-type': 'text/html' })
        console.log("currently users reaches to: ", req.url);
        })
    }
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server is running in port ${PORT}`));