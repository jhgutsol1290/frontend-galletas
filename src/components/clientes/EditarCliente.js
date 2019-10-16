import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'

import clienteAxios from '../../config/axios'


const EditarCliente = (props) => {

    //obtener ID del cliente
    const { id } = props.match.params

    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: ''
    });

    const consultarAPI = async () => {
        const respuesta = await clienteAxios.get(`/clientes/${id}`)
        guardarCliente(respuesta.data)
    }

    useEffect(() => {
        
        consultarAPI()
    }, []);

    const actualizarState = e => {
        guardarCliente({
            ...cliente,
            [e.target.name] : e.target.value
        })
    }

    const actualizarCliente = async e => {
        e.preventDefault()
        const respuesta = await clienteAxios.put(`/clientes/${id}`, cliente)
        if ( respuesta.data.code === 11000) {
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Ese correo ya está registrado'
            })
        } else {
            Swal.fire(
                'Éxito',
                respuesta.data.mensaje,
                'success'
              )
              props.history.push('/')
        }
        
    }

    //Función que valida si los campos están llenos, se hace destructuring al state cliente para saber si tienen información
    const validarCliente = () => {

        const { nombre, apellido, email, telefono } = cliente

        let valido = !nombre.length || !apellido.length || !email.length || !telefono.length

        return valido
    }

    return (
        <Fragment>
            <h2 className="text-center mb-2">Editar Cliente</h2>
            <div className="card p-2 bg-light">
                <form
                    onSubmit={actualizarCliente}
                >
                <div className="form-group">
                    <label htmlFor="nombre">Nombre cliente</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Ingresa nombre del cliente"
                        name="nombre"
                        onChange={actualizarState}
                        value={cliente.nombre}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="apellido">Apellido cliente</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Ingresa apellido del cliente" 
                        name="apellido"
                        onChange={actualizarState}
                        value={cliente.apellido}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email cliente</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Ingresa email del cliente" 
                        name="email"
                        onChange={actualizarState}
                        value={cliente.email}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">Teléfono cliente</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Ingresa teléfono del cliente" 
                        name="telefono"
                        onChange={actualizarState}
                        value={cliente.telefono}
                    />
                </div>
                <input 
                    type="submit" 
                    className="btn btn-primary" 
                    value="Actualizar" 
                    disabled={validarCliente()}
                />
                </form>
            </div>
        </Fragment>
    )
}

export default withRouter(EditarCliente)