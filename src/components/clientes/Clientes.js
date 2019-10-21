import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Cliente from './Cliente'
import clientAxios from '../../config/axios'
import Paginacion from '../layout/Paginacion'
import Spinner from '../layout/Spinner'

const Clientes = () => {

    const [clientes, guardarClientes] = useState([])
    const [paginaActual, guardarPaginaActual] = useState(1);
    const [elementosPorPagina] = useState(8);

    useEffect(() => {
        const source = axios.CancelToken.source()
        const consultarAPI = async () => {
            try {
                const respuesta = await clientAxios.get('/clientes', {
                    cancelToken: source.token
                  })
                  guardarClientes(respuesta.data)
            } catch (error) {
                console.log('Request cancelled')                
            }
            
        }

        consultarAPI()

        return () => {
            source.cancel()
        }

    }, [clientes])

    //obtener los clientes actuales
    const indexUltimoCliente = paginaActual * elementosPorPagina
    const indexPrimerCliente = indexUltimoCliente - elementosPorPagina
    const elementosTotales = clientes.slice(indexPrimerCliente, indexUltimoCliente)

    //cambiar pagina
    const paginar = (numeroPagina) => {
        guardarPaginaActual(numeroPagina)
    }

    if(!clientes.length) return <Spinner />

    return (
        <Fragment>
            <h2 className="mb-2">Clientes</h2>
            <Link to={"/cliente/nuevo"} className="btn btn-success my-2"><i className="fas fa-plus-circle text-white"></i> Agregar cliente</Link>
            {
                elementosTotales.map(cliente => (
                    <Cliente 
                        key={cliente._id}
                        cliente={cliente}
                    />
                ))
            }
            <Paginacion 
                elementosPorPagina={elementosPorPagina}
                elementosTotales={clientes.length}
                paginar={paginar}
            />
        </Fragment>
    )
}

export default Clientes

