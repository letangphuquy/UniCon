// Phuc tap hoa van de
import { Schema, model, models } from "mongoose";
const InstitutitionSchema = new Schema({
    name: {
        type: String,
    },
    suffixes: {
        type: Array
    }
    // shoud do some regex match on user?
})
const Institutition = models.Institutition || model("Institutition", InstitutitionSchema);
export default Institutition;