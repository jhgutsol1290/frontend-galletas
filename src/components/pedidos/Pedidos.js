import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios'

import clienteAxios from '../../config/axios'
import Spinner from '../layout/Spinner'
import Pedido from './Pedido'
import Paginacion from '../layout/Paginacion'


const Pedidos = () => {

    const [pedidos, guardarPedidos] = useState([]);
    const [paginaActual, guardarPaginaActual] = useState(1);
    const [elementosPorPagina] = useState(10);

    useEffect(() => {
        const source = axios.CancelToken.source()
        const consultarAPI = async () => {
            try {
                const respuesta = await clienteAxios.get('/pedidos', {
                    cancelToken: source.token
                  })
                  guardarPedidos(respuesta.data)
            } catch (error) {
                console.log('Request cancelled')                
            }
            
        }

        consultarAPI()

        return () => {
            source.cancel()
        }
    }, [pedidos]);

    //obtener los clientes actuales
    const indexUltimoCliente = paginaActual * elementosPorPagina
    const indexPrimerCliente = indexUltimoCliente - elementosPorPagina
    const elementosTotales = pedidos.slice(indexPrimerCliente, indexUltimoCliente)

    //cambiar pagina
    const paginar = (numeroPagina) => {
        guardarPaginaActual(numeroPagina)
    }


    if(pedidos.length === 0) return <Spinner />

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