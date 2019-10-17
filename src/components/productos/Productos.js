import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom'

import clienteAxios from '../../config/axios'
import Producto from './Producto'
import Spinner from '../layout/Spinner'
import Paginacion from '../layout/Paginacion'


const Productos = () => {

    const [productos, guardarProductos] = useState([]);
    const [paginaActual, guardarPaginaActual] = useState(1);
    const [elementosPorPagina] = useState(4);

    useEffect(() => {
        const consultaAPI = async () => {
            const resultado = await clienteAxios.get('/productos')
            guardarProductos(resultado.data)
        }

        consultaAPI()
    }, [productos]);

    //obtener los clientes actuales
    const indexUltimoCliente = paginaActual * elementosPorPagina
    const indexPrimerCliente = indexUltimoCliente - elementosPorPagina
    const elementosTotales = productos.slice(indexPrimerCliente, indexUltimoCliente)

    //cambiar pagina
    const paginar = (numeroPagina) => {
        guardarPaginaActual(numeroPagina)
    }

    //spinner de carga
    if(!productos.length) return <Spinner />

    return (
        <Fragment>
            <h2>Productos</h2>
            <Link to={"/productos/nuevo"} className="btn btn-success my-2"><i className="fas fa-plus-circle text-white"></i> Agregar producto</Link>
            <div className="row">
                {
                    elementosTotales.map(producto => (
                        <Producto
                            key={producto._id}
                            producto={producto}
                        />
                    ))
                }
            </div>
            <Paginacion 
                elementosPorPagina={elementosPorPagina}
                elementosTotales={productos.length}
                paginar={paginar}
            />
        </Fragment>
    )
}

export default Productos