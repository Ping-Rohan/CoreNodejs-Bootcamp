const fs = require("fs");

(async function () {
  const readStream = fs.createReadStream("./srcfile.txt");
  const result = await calculateLength(readStream);
  console.log(result);
})();

async function calculateLength(readStream) {
  return new Promise((resolve, reject) => {
    let bytes = 0;
    readStream.on("error", reject);
    readStream.on("data", (chunk) => {
      bytes += chunk.length;
    });
    readStream.on("end", () => {
      resolve(bytes);
    });
  });
}
