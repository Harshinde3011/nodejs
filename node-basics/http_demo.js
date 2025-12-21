import http from "http"

const PORT = 5000;

http.createServer((req, res) => {
    res.write("Hello world!");
    res.end();
}).listen(PORT, () => console.log(`server is running on port ${PORT}`)
)