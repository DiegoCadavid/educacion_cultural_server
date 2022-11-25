import { Schema, model } from "mongoose";

const benefitSchema = new Schema({
  nombre: String, 
  disponible: Number, 
  asignados: Number
});
import idPlugin from "mongoose-id";
benefitSchema.plugin(idPlugin);

const Location = model("benefit", benefitSchema);
export default Location;