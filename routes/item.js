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

const upload = multer({ storage: storage }).array("files");

const item = require("../controllers/item");

router.post("/", upload, item.storeItem);

router.delete("/:id", item.deleteItem);

router.put("/:id", item.updateItem);

module.exports = router;
