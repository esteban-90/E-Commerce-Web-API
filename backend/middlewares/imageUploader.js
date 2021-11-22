import multer, { diskStorage } from "multer";
import uniqid from "uniqid";

const IMAGE_TYPE_MAP = { "image/jpg": "jpg", "image/jpeg": "jpeg", "image/png": "png" };

const storage = diskStorage({
  destination(_, file, callback) {
    const isValidImage = IMAGE_TYPE_MAP[file.mimetype];
    let error = null;
    if (!isValidImage) {
      error = new Error("Tipo de imagen inválido.");
      error.name = "MulterError";
    }
    callback(error, "public/uploads");
  },
  filename(_, file, callback) {
    const imageName = file.originalname.replace(/\s/g, "-").replace(/(\..*)$/, "");
    const imageExtension = IMAGE_TYPE_MAP[file.mimetype];
    callback(null, `${uniqid(`${imageName}-`)}.${imageExtension}`);
  },
});

export const imageArrayUploader = multer({ storage }).array("images", 5);

export const singleImageUploader = multer({ storage }).single("image");
