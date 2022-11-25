import { Schema, model } from "mongoose";

const locationSchema = new Schema({
  cantidad_colegios: { type:Schema.Types.Number, min: 0  }
});

const Location = model("Location", locationSchema);
export default Location;