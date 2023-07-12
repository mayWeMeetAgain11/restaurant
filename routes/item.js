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


router.get("/", item.getAllItems);

router.post("/", upload, item.storeItem);

router.delete("/:id", item.deleteItem);

router.get("/by/:id", item.getitemById);

router.put("/:id", item.updateItemWithoutImage);

router.post("/add-images", upload, item.storeImages);

router.delete("/delete-image/:id", item.deleteImage);

router.get("/top-show", item.getActiveItem);

router.put("/top-show/update", item.updateTopShow);

router.put("/top-show/new-list", item.updateToActive);




module.exports = router;
