import React, { useState, useEffect, Fragment } from 'react';

import clienteAxios from '../../config/axios'
import Spinner from '../layout/Spinner'
import Pedido from './Pedido'

const Pedidos = () => {

    const [pedidos, guardarPedidos] = useState([]);

    useEffect(() => {
        const consultarAPI = async () => {
            const res = await clienteAxios.get('/pedidos')
            guardarPedidos(res.data)
        }

        consultarAPI()
    }, [pedidos]);

    if(!pedidos) return <Spinner />

    return (
        <Fragment>
            <h2>Pedidos</h2>
            {
                pedidos.map(pedido => (
                    <Pedido 
                        key={pedido._id}
                        pedido={pedido}
                    />
                ))
            }
        </Fragment>
    )
}

export default Pedidos