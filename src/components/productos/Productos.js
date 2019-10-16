import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom'

import clienteAxios from '../../config/axios'
import Producto from './Producto'
import Spinner from '../layout/Spinner'

const Productos = () => {

    const [productos, guardarProductos] = useState([]);

    useEffect(() => {
        const consultaAPI = async () => {
            const resultado = await clienteAxios.get('/productos')
            guardarProductos(resultado.data)
        }

        consultaAPI()
    }, [productos]);

    //spinner de carga
    if(!productos.length) return <Spinner />

    return (
        <Fragment>
            <h2>Productos</h2>
            <Link to={"/productos/nuevo"} className="btn btn-success my-2"><i className="fas fa-plus-circle text-white"></i> Agregar producto</Link>
            <div className="row">
                {
                    productos.map(producto => (
                        <Producto
                            key={producto._id}
                            producto={producto}
                        />
                    ))
                }
            </div>
            
        </Fragment>
    )
}

export default Productos