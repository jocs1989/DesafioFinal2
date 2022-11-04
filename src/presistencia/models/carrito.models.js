import mongoose from "mongoose";

const { Schema } = mongoose;
const opcionSchema=
   {
    carrito:[{
        idArticulo: Schema.Types.ObjectId,
        nombre: { type: String, required: true, minlength: 2, maxlength: 15 },
        descripcion: { type: String, required: true, maxlength: 100 },
        codigo: { type: Number, required: true, maxlength: 5, default: 1000 },
        url: { type: String, required: true, maxlength: 100 },
        precio: { type: Number, required: true, default: 100 },
        stock: { type: Number, required: true, default: 10 },
                timestamp: { type: Date, default: Date.now },
      } 
    ],
    total: { type: Number, required: true, default: 100 }
  }

const Collection='Carritos'

export  {opcionSchema,Collection}