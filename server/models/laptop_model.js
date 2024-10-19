const db = require("./db");
const mongoose = db.mongoose; // Giả sử bạn đã export mongoose từ db.js

// Định nghĩa schema cho laptop
const laptopSchema = new mongoose.Schema(
  {
    HangSX: {
      type: String,
      required: true,
    },
    TenSP: {
      type: String,
      required: true,
    },
    Img: {
      type: String,
      required: true,
    },
    CauHinh: {
      type: String,
      required: true,
    },
    Gia: {
      type: Number,
      required: true,
    },
    MoTa: {
      type: String,
      required: true,
    },
    SoLuong: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "laptops", // Chỉnh sửa tên collection thành "laptops"
    timestamps: true,
  }
);

// Tạo model cho laptop
const laptopModel = mongoose.model("LapStore", laptopSchema);

module.exports = { laptopModel };
