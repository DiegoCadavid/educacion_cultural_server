import { Schema, model } from "mongoose";

const schoolSchema = new Schema({
  tipo : String, 
  cantidad_alumnos: Number,
  localidad_id: Schema.Types.ObjectId
});

import idPlugin from "mongoose-id";
schoolSchema.plugin(idPlugin);

const School = model("School", schoolSchema);
export default School;