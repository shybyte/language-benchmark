const imports = {
    env: {
        time: () => console.time(),
        timeEnd: () => console.timeEnd(),
    }
};
const helloModule = await WebAssembly.instantiateStreaming(fetch("main.wasm"), imports);
console.log("helloModule", helloModule);

helloModule.instance.exports.blame();

document.getElementById("runButton").addEventListener("click", () => {
    helloModule.instance.exports.blame();
});