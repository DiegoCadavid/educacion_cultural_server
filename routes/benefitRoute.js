import express from "express";
import Benefit from "../mongodb/models/Benefit.js";
import validateResults from "./middlewares/validateResults.js";
import { body, param, matchedData } from "express-validator";

const benefitRoute = express.Router();

// Create
benefitRoute.post(
  "/",
  [
    body("nombre").exists().isString(),
    body("disponible").exists().isInt().toInt(),
    validateResults,
  ],
  async (req, res) => {
    try {
      const data = matchedData(req, {
        locations: ["body"],
      });

      const benefit = new Benefit({
        ...data,
        asignados: 0
      });

      await benefit.save();

      res.status(200).json(benefit);
    } catch (error) {
      res.status(500).json({ msg: "SERVER ERROR" });
    }
  }
);

// get alls
benefitRoute.get("/", async (req, res) => {
  try {
    const benefits = await Benefit.find();
    res.status(200).json(benefits);
  } catch (error) {
    res.status(500).json({ msg: "SERVER ERROR" });
  }
});

// get by id
benefitRoute.get(
  "/:id",
  [param("id").isMongoId(), validateResults],
  async (req, res) => {
    try {
      const { id } = req.params;
      const benefit = await Benefit.findById(id);

      if (!benefit) {
        console.log(benefit);
        return res.status(400).json({
          msg: "No existe un beneficio con ese id",
        });
      }

      res.status(200).json(benefit);
    } catch (error) {
      res.status(500).json({ msg: "SERVER ERROR" });
    }
  }
);

// update location by id
benefitRoute.put(
  "/:id",
  [
    param("id").isMongoId(),
    body("nombre").optional().isString(),
    body("disponible").optional().isInt().toInt(),
    validateResults,
  ],
  async (req, res) => {
    try {
      const { id } = req.params;

      const benefit = await Benefit.findById(id);

      if (!benefit) {
        return res.status(400).json({
          msg: "No existe un beneficio con ese id",
        });
      }

      const data = matchedData(req, {
        locations: ["body"],
      });

      await benefit.update(data);
      res.status(200).json({ _id: benefit.id, ...data });
    } catch (error) {
      res.status(500).json({ msg: "SERVER ERROR" });
    }
  }
);

// remove location by id
benefitRoute.delete(
  "/:id",
  [param("id").isMongoId(), validateResults],
  async (req, res) => {
    try {
      const { id } = req.params;

      const benefit = await Benefit.findById(id);

      if (!benefit) {
        return res.status(400).json({
          msg: "No existe una locacion con ese id",
        });
      }

      await benefit.delete();
      res.status(200).json({ _id: benefit.id });
    } catch (error) {
      res.status(500).json({ msg: "SERVER ERROR" });
    }
  }
);

export default benefitRoute;
