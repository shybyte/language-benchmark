import fs from "fs";

const wasm = fs.readFileSync("./hello.wasm");

const hello = await WebAssembly.instantiate(new Uint8Array(wasm)).then((res) => res.instance.exports);

console.log("hello", hello.square(4));
