import path from "path";
import { fileURLToPath } from "url";

export const defaultR = (req, res) => {
  res.render("index.ejs");
};

export const contactoDefault = (req, res) => {
  res.render("Contacto.ejs");
};
