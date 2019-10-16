import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'

import clienteAxios from '../../config/axios'

const NuevoProducto = (props) => {

    const [ producto, guardarProducto ] = useState({
        nombre: '',
        precio: ''
    })
    const [ archivo, guardarArchivo ] = useState('')

    const leerDatosProducto = e => {
        guardarProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    const leerArchivo = e => {
        guardarArchivo(e.target.files[0])
    }

    const agregarProducto = async e => {
        e.preventDefault()

        //crear form data para enviar
        const formData = new FormData()
        formData.append('nombre', producto.nombre)
        formData.append('precio', producto.precio)
        formData.append('imagen', archivo)

        //almacenar en DB
        try {
            
            const res = await clienteAxios.post('/productos', formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            if ( res.status === 200 ) {
                Swal.fire(
                    'Agregado correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            //redireccionar
            props.history.push('/productos')

        } catch (error) {
            
            //lanzar alerta
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            })

        }

    }

    const validarProdcuto = () => {

        const { nombre, precio} = producto

        let valido = !nombre.length || !precio.length || !archivo

        return valido
    }

    return (
        <Fragment>
            <h2>Nuevo Producto</h2>
                <div className="card p-2 bg-light">
                <form
                    onSubmit={agregarProducto}
                >
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre producto</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Ingresa nombre del producto"
                            name="nombre"
                            onChange={leerDatosProducto}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">Precio producto</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Ingresa precio del producto"
                            name="precio"
                            onChange={leerDatosProducto}                            
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imagen">Imagen</label>
                        <input 
                            type="file" 
                            className="form-control-file" 
                            name="imagen"
                            onChange={leerArchivo}
                        />
                    </div>
                    <input 
                        type="submit" 
                        className="btn btn-primary" 
                        value="Agregar Producto" 
                        disabled={validarProdcuto()}
                    />
                </form>
            </div>
        </Fragment>
    )
}

export default withRouter(NuevoProducto)