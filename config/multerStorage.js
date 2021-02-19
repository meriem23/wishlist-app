// var upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg" ||
//       file.mimetype == "image/webp"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(
//         new Error("Only these format are allowed: .png .jpg .jpeg .webp")
//       );
//     }
//   },
// });

// module.exports = upload;
