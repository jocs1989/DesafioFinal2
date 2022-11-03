import config from "../../../config.js";
import { fileURLToPath } from "url";
import path from "path";

const MODO_BD = process.env.MODO_BD;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let articulos = null;
//depende del modo para 
if (config.MODO_BD.archivos === MODO_BD) {
  const Constructor = await import("./productos.dao.archivo.js");
  articulos = new Constructor.default(
    __dirname + "/../dao/productos/articulos.txt"
  );
}
if (config.MODO_BD.memoria == MODO_BD) {
  const Constructor = await import("./productos.dao.memoria.js");
  articulos = new Constructor.default();
}
if (config.MODO_BD.mongodb == MODO_BD) {
  const Constructor = await import("./productos.dao.mongodb.js");
  articulos = new Constructor.default();
}
if (config.MODO_BD.firebase == MODO_BD) {
  const Constructor = await import("./productos.dao.firebase.js");
  articulos = new Constructor.default();
}
export default articulos; 