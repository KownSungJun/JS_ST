const mogoose = require("mongoose");
//mogo의 스키마(데이터 설계도 만듦)
const userSchema = new mogoose.Schema({
    name: {
        type: String,
        required: [true, "User must type name"],
        unique: true,
    },
    token: {
        type: String,
    },
    online: {
        type: Boolean,
        default: false,
    },
});
module.exports = mogoose.model("User", userSchema);