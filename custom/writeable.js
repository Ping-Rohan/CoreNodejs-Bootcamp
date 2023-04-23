const { Writable } = require("node:stream");
const fs = require("fs");

class writeStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
    this.chunks = [];
    this.chunkSize = 0;
  }

  // runs right after constructor
  _construct(callback) {
    fs.open(this.fileName, "w", (error, fd) => {
      if (error) return callback(error);
      this.fd = fd;
      callback();
    });
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);

    // when we are done with the chunks
    console.log(this.fd);
    callback();
  }
}

const writeInstance = new writeStream({ highWaterMark: 1, fileName: "rohan.txt" });
writeInstance.on("drain", () => {
  console.log("draining");
});
writeInstance.write("rohantiwari");
