import { Router } from "express";
import carrito from "../presistencia/dao/carrito/index.js";
import express from "express";
import { fileURLToPath } from "url";
import { isAdmin } from "../middleware/permisos.js";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();


router.post("/", async (req, res) => {
  try {
    const idArticulo = req.body.idArticulo;
    const cantidad = req.body.cantidad;
    const valores = await carrito.setNewCar(idArticulo, cantidad);
    res.status(200).json(valores);
      } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await carrito.setDellCarById(req.params.id);
    res.status(200).json({});
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "datos incorrectos" });
  }
});


router.get("/:id/productos", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await carrito.getAllCar(id);
    if (result === null) {
      throw new Error("No Existe el producto");
    } else {
      res.status(200).json({ articulo: await result });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
  //
});

router.post("/:id/productos", async (req, res) => {
  try {
    const idCarrito = req.params.id;
    const idArticulo = req.body.idArticulo;
    const cantidad = req.body.cantidad;
    const producto = await carrito.setAddProductCar(
      idCarrito,
      idArticulo,
      cantidad
    );
    res.status(200).json(producto);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "datos incorrectos" });
  }
});
router.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    const idCarrito = req.params.id;
    const idArticulo = req.params.id_prod;
    const producto = await carrito.setDellProductCar(idCarrito, idArticulo);
    res.status(200).json(producto);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "datos incorrectos" });
  }
});

export default router;
