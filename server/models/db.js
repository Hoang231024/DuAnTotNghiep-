const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://Hg231024:Hg231024@atlascluster.n3xocaf.mongodb.net/LapStore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("đã kết nối thành công");
  })
  .catch((err) => {
    console.error("lỗi kết nối " + err);
  });
module.exports = mongoose;