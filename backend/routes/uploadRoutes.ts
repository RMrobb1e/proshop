import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
dotenv.config();

const router = express.Router();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY ?? '',
  },
  region: process.env.AWS_S3_REGION ?? '',
});

const s3Storage = multerS3({
  s3: s3, // s3 instance
  bucket: process.env.AWS_S3_BUCKET_NAME ?? '',
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
};

const upload = multer({
  storage: s3Storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5mb file size
  },
});
const uploadSingleImage = upload.single('image');

router.post('/', (req: any, res: any) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `${req.file.location}`,
    });
  });
});

export default router;
