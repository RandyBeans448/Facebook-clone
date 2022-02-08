import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";

const fs = require('fs');
import FileType from 'file-type'

import path = require('path');
import { from, Observable, of, switchMap } from "rxjs";

type vaildFileExtension = 'png' | 'jpeg' | 'jpg';
type vaildMimeType = 'image/png' | 'image/jpeg' | 'image/jpg';

const vaildFileExtensions: vaildFileExtension[] = ['png', 'jpeg','jpg'];
const vaildMimeTypes: vaildMimeType[] = ['image/png','image/jpeg', 'image/jpg'];


export const postsImageToStorage = {
    storage: diskStorage({
        destination: './public/posts',
        filename: (req, file, cb) => {
            const fileExtension: string = path.extname(file.originalname)
            const fileName: string = uuidv4() + fileExtension;   
            cb(null, fileName);
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedMineTypes: vaildMimeType[] = vaildMimeTypes;
        allowedMineTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false)
    }
}