import { Schema, model } from "mongoose";

const benefitSchema = new Schema({
  nombre: String, 
  disponible: Number, 
  asignados: Number
});

const Location = model("benefit", benefitSchema);
export default Location;