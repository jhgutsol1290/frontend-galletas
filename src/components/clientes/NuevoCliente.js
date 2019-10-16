import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'

import clientAxios from '../../config/axios'

const NuevoCliente = ({history}) => {

    //state = cliente, guardarCliente = función para actualizarlo
    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: ''
    });

    //Función que asigna al state los valores de los campos
    const actualizarState = e => {
        guardarCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    //Función que se ejecuta al hacer submit en el form, agrega el state cliente al backend
    const agregarCliente = async e => {
        e.preventDefault()
        const respuesta = await clientAxios.post('/clientes', cliente)
        //validar si hay errores de mongo
        if( respuesta.data.code === 11000 ) {
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
              history.push('/')
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
            <h2 className="text-center mb-2">Nuevo Cliente</h2>
            <div className="card p-2 bg-light">
                <form
                    onSubmit={agregarCliente}
                >
                <div className="form-group">
                    <label htmlFor="nombre">Nombre cliente</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Ingresa nombre del cliente"
                        name="nombre"
                        onChange={actualizarState}
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
                    />
                </div>
                <input 
                    type="submit" 
                    className="btn btn-primary" 
                    value="Agregar" 
                    disabled={validarCliente()}
                />
                </form>
            </div>
        </Fragment>
    )
}

export default withRouter(NuevoCliente)