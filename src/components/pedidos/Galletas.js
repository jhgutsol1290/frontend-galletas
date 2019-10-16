import React, { Fragment } from 'react';

const Galletas = ({articulo}) => {

    return (
        <Fragment>
            <li className="list-group-item">
                <h3 className="card-text">{articulo.producto.nombre}</h3>
                <p className="card-text">Precio: $ {articulo.producto.precio}</p>
                <p className="card-text">Cantidad: {articulo.cantidad}</p>
            </li>
        </Fragment>
    )
}

export default Galletas