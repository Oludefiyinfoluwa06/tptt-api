function bufferToDataUri(file) {
  return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
}

module.exports = bufferToDataUri;
