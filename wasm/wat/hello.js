const memory = new WebAssembly.Memory({ initial: 10000 });
const imports = {
    console,
    js: { mem: memory },
};
const helloModule = await WebAssembly.instantiateStreaming(fetch("hello.wasm"), imports);
console.log("helloModule", helloModule);

const MAX_AUTHORS = 10000;
const LINES = 25000000;

const linesPtr = MAX_AUTHORS * 4;



const linesByAuthor = new Int32Array(memory.buffer, 0, MAX_AUTHORS);

const lines = new Uint16Array(memory.buffer, linesPtr, 10);
lines[2] = 7;

const result = helloModule.instance.exports.blame(linesPtr, LINES, 0);
console.log("result", result, linesByAuthor, lines);

document.getElementById("runButton").addEventListener("click", () => {
    const result = helloModule.instance.exports.blame(linesPtr, LINES, 0);
    console.log("result", result, linesByAuthor, lines);
});