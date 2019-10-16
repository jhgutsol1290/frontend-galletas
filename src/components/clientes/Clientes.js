import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Cliente from './Cliente'
import clientAxios from '../../config/axios'
import Spinner from '../layout/Spinner'

const Clientes = () => {

    const [clientes, guardarClientes] = useState([])

    useEffect(() => {
        const consultarAPI = async () => {
            const respuesta = await clientAxios.get('/clientes')
            guardarClientes(respuesta.data)
        }

        consultarAPI()
    }, [clientes])

    if(!clientes.length) return <Spinner />

    return (
        <Fragment>
            <h2 className="mb-2">Clientes</h2>
            <Link to={"/cliente/nuevo"} className="btn btn-success my-2"><i className="fas fa-plus-circle text-white"></i> Agregar cliente</Link>
            {
                clientes.map(cliente => (
                    <Cliente 
                        key={cliente._id}
                        cliente={cliente}
                    />
                ))
            }
        </Fragment>
    )
}

export default Clientes

