const { createReadStream, createWriteStream } = require("fs");
const { randomBytes, createHash, createCipheriv } = require("crypto");

function encrypt(dest, src, secret) {
  const readsrc = createReadStream(dest);
  const writesrc = createWriteStream(src);

  const cipherText = createHash("md5").update(secret).digest("hex");
  const vector = randomBytes(16);

  const encryptStream = createCipheriv("aes256", cipherText, vector);

  readsrc.pipe(encryptStream).pipe(writesrc);
}

const [, , dest, src, secret] = process.argv;

encrypt(dest, src, secret);
