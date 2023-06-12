const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/photos");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage }).single("files");

<<<<<<< HEAD
const { getCategory, storeCategory, updateCategory, deleteCategory } = require('../controllers/category');

router.get('/', getCategory);

=======
const { getCategory, storeCategory, updateCategory, deleteCategory, getCategoryById, getCategoryByIdLanguage
} = require('../controllers/category');

router.get('/', getCategory);

router.get('/:id', getCategoryById);

router.get('/lan/:id', getCategoryByIdLanguage);

>>>>>>> ba9092699b1f1431a278394d20f91173187ae595
router.post('/', upload, storeCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);


module.exports = router;