import {Collection, opcionSchema} from '../../models/productos.models.js';

import Contenedora from '../../contenedor/contenedora.mongodb.js';

class Productos  extends Contenedora {
    constructor() {    
      
      super(Collection, opcionSchema);
      
    }
}

export default Productos;