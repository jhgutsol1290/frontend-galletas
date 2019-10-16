import React, { Fragment } from 'react';

const FormCantidadProducto = (props) => {

    const { producto, restarProductos, aumentarProductos, index, eliminarProductoPedido} = props

    return (
        <Fragment>
            <div className="card my-2">
                <div className="card-header cantidad-producto-header font-weight-bold">
                    <p className="nombre">{producto.nombre}</p>
                    <p className="precio">$ {producto.precio}</p>
                </div>
                <div className="card-body">
                    <div className="contenedor-cantidad">
                        <i 
                            className="fas fa-minus"
                            onClick={() => restarProductos(index)}
                        ></i>

                        <p>{producto.cantidad}</p>

                        <i 
                            className="fas fa-plus"
                            onClick={() => aumentarProductos(index)}
                        ></i>
                    </div>
                    <button 
                        type="button" 
                        className="btn btn-danger text-white"
                        onClick={() => eliminarProductoPedido(producto._id)}
                    ><i className="fas fa-minus-circle text-white mr-1"></i>
                             Eliminar Producto
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export default FormCantidadProducto