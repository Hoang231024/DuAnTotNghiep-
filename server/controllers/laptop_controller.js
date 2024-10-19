const { laptopModel } = require('../models/laptop_model');

exports.getListlaptop = async (req, res, next) => {
    try {
        let listlaptop = await laptopModel.find({});
        res.status(200).json({ status: 200, data: listlaptop });
    } catch (error) {
        res.status(500).json({ status: "lỗi", result: error.message });
    }
};


exports.addlaptop = async (req, res, next) => {
    try {
        const { file } = req;
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;

        const data = req.body;
        const newlaptop = new laptopModel({
            HangSX: data.HangSX,
            TenSP: data.TenSP,
            Img: imageUrl,
            CauHinh: data.CauHinh,
            Gia: data.Gia,
            MoTa: data.MoTa,
            SoLuong: data.SoLuong,
        });
        
        const savelaptop = await newlaptop.save();
        res.status(201).json(savelaptop);
    } catch (error) {
        res.json({ status: "lỗi", result: error });
    }
};

exports.updatelaptop = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { file } = req;
        
        if (!file) {
            return res.status(400).json({ message: 'Không có tệp được gửi' });
        }
        
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
        const data = req.body;

        const updatelaptop = {
            HangSX: data.HangSX,
            TenSP: data.TenSP,
            Img: imageUrl,
            CauHinh: data.CauHinh,
            Gia: data.Gia,
            MoTa: data.MoTa,
            SoLuong: data.SoLuong,
        };

        let result = await laptopModel.findByIdAndUpdate(id, updatelaptop, { new: true });

        if (result) {
            return res.status(200).json({
                status: 200,
                message: "Cập nhật laptop thành công",
                data: result,
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: "Không thể cập nhật laptop",
                data: [],
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Lỗi server", result: error });
    }
};

exports.deletelaptop = async (req, res) => {
    try {
        const deletedlaptop = await laptopModel.findByIdAndDelete(req.params.id);
        if (!deletedlaptop) {
            return res.status(404).json({ message: 'Không tìm thấy' });
        }
        res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getlaptopById = async (req, res, next) => {
    try {
        const laptop = await laptopModel.findById(req.params.id);
       
        if (!laptop) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        
        res.status(200).json({ status: 200, data: laptop });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Lỗi server", result: error });
    }
};
