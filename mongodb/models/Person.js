import { Schema, model } from "mongoose";

const PersonSchema = new Schema({
  di: String,
  fecha_nacimiento: String,
  localidad: Number,
  genero: String,
  bppi: Boolean,
  bpps: Boolean,
  pe: Boolean,
  localidad_id: Schema.Types.ObjectId,
  colegio_id: Schema.Types.ObjectId,
  indicador_socio_economico: Number
});

const Person = model("Person", PersonSchema);
export default Person;