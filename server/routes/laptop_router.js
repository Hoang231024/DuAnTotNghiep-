const express = require('express');
const router = express.Router();
const LapTopCtl = require('../controllers/laptop_controller'); // Đường dẫn tới controller của bạn
const multer = require('multer'); // Import multer

// Thiết lập multer để lưu file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục để lưu file
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Tên file lưu
    }
});

const Upload = multer({ storage: storage }); // Tạo middleware multer

// Định nghĩa các route
router.get("/getListLapTop", LapTopCtl.getListlaptop);
router.post("/addLapTop", Upload.single('IMG'), LapTopCtl.addlaptop);
router.put("/updateLapTop/:id", Upload.single('IMG'), LapTopCtl.updatelaptop);
router.delete("/deleteLapTop/:id", LapTopCtl.deletelaptop);
router.get("/getLapTopById/:id", LapTopCtl.getlaptopById);

module.exports = router; // Xuất router
