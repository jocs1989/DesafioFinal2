export function isAdmin(req, res, next) {
    if (req.body.administrador) {
      next();
    } else {
      res.status(403).json({
        error: `-1,descripcion:  ruta ${req.url} método ${req.method}  no autorizada`,
      });
    }
  }

