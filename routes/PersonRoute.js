import express from "express";
import Person from "../mongodb/models/Person.js";
import Benefit from '../mongodb/models/Benefit.js'
import validateResults from "./middlewares/validateResults.js";
import { body, param, matchedData } from "express-validator";

const locationRoute = express.Router();

// Create
locationRoute.post(
  "/",
  [
    body("di").exists().isString().isLength({ min: 8, max: 10 }),
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

      const { bppi, bpps } = data;

      if(bppi) {
        const bppiObject = await Benefit.findOne({
          nombre: "bppi"
        })

        await bppiObject.update({
          disponible: bppiObject.disponible - 1,
          asignados: bppiObject.disponible + 1,
        })
      }

      if(bpps) {
        const bppiObject = await Benefit.findOne({
          nombre: "bpps"
        })

        await bppiObject.update({
          disponible: bppiObject.disponible - 1,
          asignados: bppiObject.disponible + 1,
        })
      }

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

      const person = await Person.findById(id);

      if (!person) {
        return res.status(400).json({
          msg: "No existe una persona con ese id",
        });
      }

      res.status(200).json(person);
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
    body("di").optional().isString().isLength({ min: 8, max: 10 }),
    body("fecha_nacimiento").optional().isString(),
    body("localidad").optional().isInt().toInt(),
    body("genero").optional().isString(),
    body("bppi").optional().isBoolean().toBoolean(),
    body("bpps").optional().isBoolean().toBoolean(),
    body("pe").optional().isBoolean().toBoolean(),
    body("localidad_id").optional().isMongoId(),
    body("colegio_id").optional().isMongoId(),
    body("indicador_socio_economico").optional().isInt().toInt(),
    validateResults,
  ],
  async (req, res) => {
    try {
      const { id } = req.params;

      const person = await Person.findById(id);

      if (!person) {
        return res.status(400).json({
          msg: "No existe una persona con ese id",
        });
      }

      const data = matchedData(req, {
        locations: ["body"],
      });
      
          
      if(data?.bppi) {
        const bppiObject = await Benefit.findOne({
          nombre: "bppi"
        })

        if(data.bppi){
          await bppiObject.update({
            disponible: bppiObject.disponible - 1,
            asignados: bppiObject.disponible + 1,
          })
        }else{
          await bppiObject.update({
            disponible: bppiObject.disponible + 1,
            asignados: bppiObject.disponible - 1,
          })
        }
      }

      if(data?.bpps) {
        const bppsObject = await Benefit.findOne({
          nombre: "bpps"
        })

        if(data.bpps) {
          await bppsObject.update({
            disponible: bppsObject.disponible - 1,
            asignados: bppsObject.disponible + 1,
          })
        }
      }

      await person.update(data);
      res.status(200).json({ _id: person.id, ...data });
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

      const persona = await Person.findById(id);

      if (!persona) {
        return res.status(400).json({
          msg: "No existe una persona con ese id",
        });
      }

      await persona.delete();
      res.status(200).json({ _id: persona.id });
    } catch (error) {
      res.status(500).json({ msg: "SERVER ERROR" });
    }
  }
);

export default locationRoute;
