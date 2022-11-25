import { Schema, model } from "mongoose";

const locationSchema = new Schema({
  cantidad_colegios: { type:Schema.Types.Number, min: 0  }
});

import idPlugin from "mongoose-id";
locationSchema.plugin(idPlugin);

const Location = model("Location", locationSchema);
export default Location;