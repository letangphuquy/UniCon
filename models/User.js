import { REGEX } from "@/CONST";
import { Schema, model, models } from "mongoose";
const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email must not be empty']
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [REGEX, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    about: {
        type: String
    },
    institution: {
        type: String
    },
    is_boss: {
        type: Boolean,
        required: true
    },
    image: {
        type: String
    }
    // added support for unicode name: https://www.regular-expressions.info/unicode.html 
})
const User = models.User || model("User", UserSchema);
export default User;