import React, { useState, useEffect, Fragment } from 'react';

import clienteAxios from '../../config/axios'
import Spinner from '../layout/Spinner'
import Pedido from './Pedido'
import Paginacion from '../layout/Paginacion'


const Pedidos = () => {

    const [pedidos, guardarPedidos] = useState([]);
    const [paginaActual, guardarPaginaActual] = useState(1);
    const [elementosPorPagina] = useState(10);

    useEffect(() => {
        const consultarAPI = async () => {
            const res = await clienteAxios.get('/pedidos')
            guardarPedidos(res.data)
        }

        consultarAPI()
    }, [pedidos]);

    //obtener los clientes actuales
    const indexUltimoCliente = paginaActual * elementosPorPagina
    const indexPrimerCliente = indexUltimoCliente - elementosPorPagina
    const elementosTotales = pedidos.slice(indexPrimerCliente, indexUltimoCliente)

    //cambiar pagina
    const paginar = (numeroPagina) => {
        guardarPaginaActual(numeroPagina)
    }

    if(!pedidos) return <Spinner />

    return (
        <Fragment>
            <h2>Pedidos</h2>
            {
                elementosTotales.map(pedido => (
                    <Pedido 
                        key={pedido._id}
                        pedido={pedido}
                    />
                ))
            }
            <Paginacion 
                elementosPorPagina={elementosPorPagina}
                elementosTotales={pedidos.length}
                paginar={paginar}
            />
        </Fragment>
    )
}

export default Pedidos