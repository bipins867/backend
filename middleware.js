const multer = require("multer");

const fileSizeLimit=2*1024*1024

exports.checkFileSize = (req, res, next) => {
    // Check if Content-Length header exists and is within the limit
    const contentLength = parseInt(req.headers["content-length"], 10);
  
    if (contentLength > fileSizeLimit) {
      return res.status(400).json({ error: "File size exceeds the 2MB limit." });
    }
  
    next();
  };

  
exports.fileDataMiddleware = (fields, maxFileSize) => {
  const storage = multer.memoryStorage();

  const uploads = multer({
    storage: storage,
    limits: {
      fileSize: maxFileSize, // Set the maximum file size limit
    },
  });

  return uploads.fields(fields);
};
