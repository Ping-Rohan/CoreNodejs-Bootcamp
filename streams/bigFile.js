// const fs = require("node:fs/promises");
// promise version and async took 200mb and time is 11s around
// console.time("ended");
// (async function () {
//   const filePointer = await fs.open("./bigText.txt", "w");
//   for (let i = 0; i < 1000000; i++) {
//     filePointer.write(`${i}`);
//   }
//   console.timeEnd("ended");
// })();

// const fs = require("node:fs");
// this took around 3s for 1 lakh write but taken more than 1gb
// (function () {
//   console.time("ended");
//   fs.open("./bigText.txt", "w", (error, fd) => {
//     for (let i = 0; i < 1000000; i++) {
//       fs.write(fd, `${i} `, () => {});
//     }
//     console.timeEnd("ended");
//   });
// })();

// ========================= with stream =================
// fast but taken 1gb e
const fs = require("fs");
let i = 0;

console.time("ended");
const writeStream = fs.createWriteStream("./bigText.txt");

function write() {
  while (i < 100000000) {
    let buff = Buffer.from(`${i} `);

    if (i === 99999999) {
      return writeStream.end();
    }

    if (!writeStream.write(buff)) {
      break;
    }
    i++;
  }
}

writeStream.on("drain", () => {
  write();
});

writeStream.on("finish", () => {
  console.log("Finished");
  console.timeEnd("ended");
});

write();
