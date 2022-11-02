import  { Router } from'express';
import   express  from'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();
const datosAgregados={};

const modoDB='memoria';

let articulos=null
if (modoDB==='archivos'){ 
  const Constructor=await import('../contenedor/contenedora.archivo.js')
  articulos=new Constructor.default(__dirname +'/../dao/productos/articulos.txt')
}if (modoDB==='memoria'){ 
  const Constructor=await import('../contenedor/contenedora.memoria.js')
  articulos=new Constructor.default()
}

function isAdmin(req, res, next) {
  if (req.body.administrador) {
    next();
  } else {
    res.status(403).json({
      error: `-1,descripcion:  ruta ${req.url} método ${req.method}  no autorizada`,
    });
  }
}


router.get("/", async (req, res) => {
  try {
    const respuesta = await articulos.getAll();
    res.status(200).json(respuesta);
    //res.status(200).render('partials/productos',{artuculos: respuesta});
  } catch (err) {
    console.error( err);
    res.status(400).json({error: err.toString()});
  }
  
});

router.get("/:id", async (req, res) => {
  try {
    const  id = Number(req.params.id);  
    let result = await articulos.getById(id);
    if (result === null) {
      throw new Error("No Existe el producto");
    } else {
      res.status(200).json({articulo: await result})
    }
  } catch (err) {
    console.error( err);
    res.status(400).json({error: err.toString()});
  }
  //
});

router.post("/", isAdmin,async (req, res) => {

  try {
    const nombre=req.body.nombre;
    const descripcion=req.body.precio;
    const codigo=req.body.codigo;
    const url=req.body.url;
    const precio=req.body.precio;
    const stock=Number(req.body.stock);  
    const producto = {nombre,descripcion,codigo,url,precio,stock} ;     
    const valores = await articulos.save(producto)
    res.status(200).json(valores);
  } catch (err) {
    console.error( err);
    res.status(400).json({error: err.toString()});
  }
});


router.put("/:id",isAdmin, async (req, res) => {
  try {
    const producto = req.body;
    producto.id = req.params.id;    
    res.status(200).json(await articulos.updateById(producto));
  } catch (err) {
    console.error( err);
    res.status(400).send({ error: "datos incorrectos" });
  }
});

router.delete("/:id",isAdmin, async (req, res) => {
  try {
    const id =Number(req.params.id)
    res.status(200).json(await articulos.deleteById(id));
  } catch (err) {
    console.error( err);
    res.status(400).json({ error: "datos incorrectos" });
  }
});

export default router;