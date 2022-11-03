import config from "../../../config.js";
import { fileURLToPath } from "url";
import path from "path";

const MODO_BD = process.env.MODO_BD;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let carrito = null;
//depende del modo para 
if (config.MODO_BD.archivos === MODO_BD) {
  const Constructor = await import("./carrito.dao.archivo.js");
  carrito = new Constructor.default(
    __dirname + "/../dao/productos/articulos.txt"
  );
}
if (config.MODO_BD.memoria == MODO_BD) {
  const Constructor = await import("./carrito.dao.memoria.js");
  carrito = new Constructor.default();
}
if (config.MODO_BD.mongodb == MODO_BD) {
  const Constructor = await import("./carrito.dao.mongodb.js");
  carrito = new Constructor.default();
}
if (config.MODO_BD.firebase == MODO_BD) {
  const Constructor = await import("./carrito.dao.firebase.js");
  carrito = new Constructor.default();
}
export default carrito; 