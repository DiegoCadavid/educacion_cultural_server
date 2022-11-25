import express, { json } from "express";
import { body, param, matchedData } from "express-validator";

import validateResults from "./middlewares/validateResults.js";
import School from "../mongodb/models/School.js";

const schoolRouter = express.Router();

schoolRouter.post(
  "/",
  [
    body("tipo").exists().isString().trim(),
    body("cantidad_alumnos").exists().isInt().toInt(),
    body("localidad_id").exists().isMongoId(),
    validateResults,
  ],
  async (req, res) => {
    try {
      const data = matchedData(req, { locations: ["body"] });
      const school = new School(data);
      await school.save();

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ msg: "SERVER ERROR" });
    }
  }
);

// Obtener todas las escuelas
schoolRouter.get("/", async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ msg: "SERVER ERROR" });
  }
});

// Obtener una escuela mediante un id
schoolRouter.get(
  "/:id",
  [param("id").isMongoId(), validateResults],
  async (req, res) => {
    try {
      const { id } = req.params;
      const school = await School.findById(id);
      if (!school) {
        return res.status(400).json({
          msg: "No existe una escuela con ese id",
        });
      }

      res.status(200).json(school);
    } catch (error) {
      res.status(500),
        json({
          msg: "SERVER ERROR",
        });
    }
  }
);

// Actualizar una escuela mediante un id
schoolRouter.put(
  "/:id",
  [
    param("id").isMongoId(),
    body("tipo").optional().isString().trim(),
    body("cantidad_alumnos").optional().isInt().toInt(),
    body("localidad_id").optional().isMongoId(),
    validateResults,
  ],
  async (req, res) => {
    try {
      const { id } = req.params;
      const school = await School.findById(id);
      if (!school) {
        return res.status(400).json({
          msg: "No existe una escuela con ese id",
        });
      }

      const data = matchedData(req, {
        locations: ["body"],
      });

     await school.update(data);

      res.status(200).json({
        _id: school.id,
        ...data
      });
    } catch (error) {
      res.status(500),
        json({
          msg: "SERVER ERROR",
        });
    }
  }
);

// Eliminar una escuela mediante un id

// Obtener una escuela mediante un id
schoolRouter.delete(
    "/:id",
    [param("id").isMongoId(), validateResults],
    async (req, res) => {
      try {
        const { id } = req.params;
        const school = await School.findById(id);
        if (!school) {
          return res.status(400).json({
            msg: "No existe una escuela con ese id",
          });
        }

        await school.delete();
  
        res.status(200).json({
            _id: school.id
        });
      } catch (error) {
        res.status(500),
          json({
            msg: "SERVER ERROR",
          });
      }
    }
  );
  

export default schoolRouter;
