import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

  console.log("========== UPLOAD DEBUG ==========");
  console.log("Headers:", req.headers["content-type"]);
  console.log("Body:", req.body);
  console.log("File:", req.file);


  if (file.mimetype !== "application/pdf") {
    return cb(new Error("Only PDF files are allowed."), false);
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },
});

export default upload;