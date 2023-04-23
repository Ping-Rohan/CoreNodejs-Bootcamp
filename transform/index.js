const { createReadStream, createWriteStream } = require("fs");
const { createGzip } = require("zlib");

async function readAndCompress(dest, src) {
  const readStream = createReadStream(src);
  const zip = createGzip();
  const writeStream = createWriteStream(dest);

  // pipe
  readStream.pipe(zip).pipe(writeStream);
}

const [, , dest, src] = process.argv;

readAndCompress(dest, src);
