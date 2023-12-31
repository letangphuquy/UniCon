import { Schema, model, models } from "mongoose";
const ModelSchema = new Schema({
    field: {
        type: String,
        unique: [true, '`name` already exists!'],
        required: [true, '`name` must not be empty']
    },
})
const Model = models.Model || model("Model", ModelSchema);
export default Model;