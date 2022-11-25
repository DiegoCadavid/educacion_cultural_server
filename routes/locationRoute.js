import express from "express";
import Location from "../mongodb/models/Location.js";
import validateResults from "./middlewares/validateResults.js";
import { body, param, matchedData } from "express-validator";

const locationRoute = express.Router();

// Create
locationRoute.post(
  "/",
  [
    body("cantidad_colegios")
      .exists()
      .isInt()
      .withMessage("Debe ser un numero")
      .toInt(),
    validateResults,
  ],
  async (req, res) => {
    try {
      const { cantidad_colegios } = req.body;
      const location = new Location({
        cantidad_colegios,
      });

      await location.save();

      res.status(200).json(location);
    } catch (error) {
      res.status(500).json({ msg: "SERVER ERROR" });
    }
  }
);

// get alls
locationRoute.get("/", async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
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

      const location = await Location.findById(id);

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

      const location = await Location.findById(id);

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

      const location = await Location.findById(id);

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
