import repl from "repl"

const local = repl.start("$");

local.on("exit", () => {
    console.log("exiting the repl");
    process.exit();
})