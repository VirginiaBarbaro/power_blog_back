import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { UploadImage } from "../types/uploadImage";

const supabaseUrl = `${process.env.SUPABASE_URL}`;
const supabaseKey = `${process.env.API_KEY}`;
const supabase = createClient(supabaseUrl, supabaseKey);

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/webp"
    ) {
      cb(null, true); // Aceptar el archivo
    } else {
      cb(null, false); // Rechazar el archivo
    }
  },
});

export const handleUpload = async (file: Express.Multer.File): Promise<UploadImage> => {
  try {
    // Sube el archivo a Supabase Storage
    const { data, error } = await supabase.storage
      .from("image")
      .upload(`${uuidv4()}${path.extname(file.originalname)}`, file.buffer);

    if (error) {
      throw new Error("Error uploading file.");
    }
    // Extraigo la URL de la img
    const imgUrl = data.path;
    // creo un objeto con la prop url
    const uploadedImage: UploadImage = { url: imgUrl };

    return uploadedImage; // Retorna los datos del archivo si es necesario
  } catch (error) {
    console.error(error);
    throw new Error("Server error.");
  }
};

/* const storage = multer.diskStorage({
  destination: "public",
  filename: (_req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
 */
export default multer({ storage });
