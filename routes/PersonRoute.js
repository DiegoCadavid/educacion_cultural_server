import express from "express";
import Person from "../mongodb/models/Person.js";
import validateResults from "./middlewares/validateResults.js";
import { body, param, matchedData } from "express-validator";

const locationRoute = express.Router();

// Create
locationRoute.post(
  "/",
  [
    body("di").exists().isString().isLength({min: 8, max:10}),
    body("fecha_nacimiento").exists().isString(),
    body("localidad").exists().isInt().toInt(),
    body("genero").exists().isString(),
    body("bppi").exists().isBoolean().toBoolean(),
    body("bpps").exists().isBoolean().toBoolean(),
    body("pe").exists().isBoolean().toBoolean(),
    body("localidad_id").exists().isMongoId(),
    body("colegio_id").exists().isMongoId(),
    body("indicador_socio_economico").exists().isInt().toInt(),
    validateResults,
  ],
  async (req, res) => {
    try {
      const data = matchedData(req, { locations: ["body"] });
      const person = new Person(data);

      await person.save();

      res.status(200).json(person);
    } catch (error) {
      res.status(500).json({ msg: "SERVER ERROR" });
    }
  }
);

// get alls
locationRoute.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ msg: "SERVER ERROR" });
  }
});

// get by id
locationRoute.get(
  "/:id",
  [param("id").isMongoId(), validateResults],
  async (req, res) => {
    try {
      const { id } = req.params;

      const location = await Person.findById(id);

      if (!location) {
        return res.status(400).json({
          msg: "No existe una locacion con ese id",
        });
      }

      res.status(200).json(location);
    } catch (error) {
      res.status(500).json({ msg: "SERVER ERROR" });
    }
  }
);

// update location by id
locationRoute.put(
  "/:id",
  [
    param("id").isMongoId(),
    body("cantidad_colegios")
      .optional()
      .isInt()
      .withMessage("Debe ser un numero")
      .toInt(),
    validateResults,
  ],
  async (req, res) => {
    try {
      const { id } = req.params;

      const location = await Person.findById(id);

      if (!location) {
        return res.status(400).json({
          msg: "No existe una locacion con ese id",
        });
      }

      const data = matchedData(req, {
        locations: ["body"],
      });

      await location.update(data);
      res.status(200).json({ _id: location.id, ...data });
    } catch (error) {
      res.status(500).json({ msg: "SERVER ERROR" });
    }
  }
);

// remove location by id
locationRoute.delete(
  "/:id",
  [param("id").isMongoId(), validateResults],
  async (req, res) => {
    try {
      const { id } = req.params;

      const location = await Person.findById(id);

      if (!location) {
        return res.status(400).json({
          msg: "No existe una locacion con ese id",
        });
      }

      await location.delete();
      res.status(200).json({ _id: location.id});
    } catch (error) {
      res.status(500).json({ msg: "SERVER ERROR" });
    }
  }
);

export default locationRoute;
