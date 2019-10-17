import React, { Fragment } from 'react';

const Galletas = ({articulo}) => {

    return (
        <Fragment>
            <li className="list-group-item galletas-card my-1">
                <h3 className="card-text">{articulo.producto.nombre}</h3>
                {
                    articulo.producto.imagen ? (
                        <img src={`http://localhost:4000/${articulo.producto.imagen}`} className="card-img-top w-50 img-thumbnail" alt="producto" />
                    ) : null
                }
                <p className="card-text">Precio: $ {articulo.producto.precio}</p>
                <p className="card-text">Cantidad: {articulo.cantidad}</p>
            </li>
        </Fragment>
    )
}

export default Galletas