import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import clienteAxios from '../../config/axios'

const Producto = ({producto}) => {

    const elimimarProducto = async id => {
        Swal.fire({
            title: '¿Seguro que desea eliminar?',
            text: "No es posible recuperar un producto eliminado",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Sí, quiero eliminar el producto: ${producto.nombre}`
          }).then((result) => {
            if (result.value) {
              clienteAxios.delete(`/productos/${id}`)
                .then(res => {
                    Swal.fire(
                        'Producto eliminado!',
                        res.data.mensaje,
                        'success'
                      )
                })
            }
          })
    }

    return (
        <Fragment>
            
                <div className="card col-md-5 p-1 m-3 product-card">
                    {
                        producto.imagen ? (
                            <img src={`http://localhost:4000/${producto.imagen}`} className="card-img-top" alt="producto" />
                        ) : null
                    }
                    <div className="card-body">
                        <h5 className="card-title">{producto.nombre}</h5>
                        <p className="card-text">$ {producto.precio}</p>
                        <Link to={`/productos/editar/${producto._id}`} className="btn btn-info m-1"><i className="fas fa-edit text-white"></i> Editar</Link>
                        <button 
                            className="btn btn-danger m-1"
                            onClick={() => elimimarProducto(producto._id)}
                        >
                            <i className="fas fa-trash text-white"></i> Eliminar
                        </button>
                    </div>
                </div>
            
        </Fragment>
    )
}

export default Producto