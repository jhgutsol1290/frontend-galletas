import React, { useEffect, useState, Fragment } from 'react';
import Swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'

import clienteAxios from '../../config/axios'

const EditarProducto = (props) => {

    const { id } = props.match.params

    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    });

    const [archivo, guardarArchivo] = useState('');

    useEffect(() => {
        const consultarAPI = async () => {
            const respuesta = await clienteAxios.get(`/productos/${id}`)
            guardarProducto(respuesta.data)
        }

        consultarAPI()
    }, []);

    const leerDatosProducto = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const leerArchivo = e => {
        guardarArchivo( e.target.files[0] )
    }

    const actualizarProducto = async e => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('nombre', producto.nombre)
        formData.append('precio', producto.precio)
        formData.append('imagen', archivo)

        try {
            
            const res = await clienteAxios.put(`/productos/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })

            if ( res.status === 200 ) {
                Swal.fire(
                    'Actualizado',
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

    return (
        <Fragment>
            <h2>Editar Producto</h2>
                <div className="card p-2 bg-light">
                <form
                    onSubmit={actualizarProducto}
                >
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre producto</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Ingresa nombre del producto"
                            name="nombre"
                            onChange={leerDatosProducto}
                            value={producto.nombre}
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
                            value={producto.precio}                        
                        />
                    </div>
                    <div className="form-group">
                        {
                            producto.imagen ? (
                                <img src={`http://localhost:4000/${producto.imagen}`} alt="imagen" width="300" className="img-thumbnail img-fluid mb-2" />
                            ) : null
                        }
                        
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
                        value="Actualizar Producto" 
                        
                    />
                </form>
            </div>
        </Fragment>
    )
}

export default withRouter( EditarProducto )