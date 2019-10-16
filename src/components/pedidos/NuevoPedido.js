import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { withRouter} from 'react-router-dom'

import clienteAxios from '../../config/axios';
import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto'

const NuevoPedido = (props) => {

    const { id } = props.match.params

    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState({})
    const [productos, guardarProductos] = useState([]);
    const [total, guardarTotal] = useState(0);

    useEffect(() => {
        const consultarAPI = async () => {
            const res = await clienteAxios.get(`/clientes/${id}`)
            guardarCliente(res.data)
        }

        consultarAPI()
        actualizarTotal()
    }, [productos]);

    const buscarProducto = async e => {
        e.preventDefault()

        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`)

        if(resultadoBusqueda.data[0]) {
            let productoResultado = resultadoBusqueda.data[0]

            //agregar la llave 'producto' (copia del ID)
            productoResultado.producto = resultadoBusqueda.data[0]._id
            productoResultado.cantidad = 0
            
            //ponerlo en el state
            guardarProductos([...productos, productoResultado])

        } else {
            //no hay resultados
            Swal.fire({
                type: 'error',
                title: 'No Resultados',
                text: 'No hay resultados'
            })
        }

    }

    const leerDatosBusqueda = e => {
        guardarBusqueda(e.target.value)
    }   

    const restarProductos = i => {

        //copia del state
        const totalProductos = [...productos]

        if (totalProductos[i].cantidad === 0) return

        //decremento
        totalProductos[i].cantidad--

        //guardarProductos almacena en el state
        guardarProductos(totalProductos)
    }

    const aumentarProductos = i => {
        //copia del state
        const totalProductos = [...productos]

        //incremento
        totalProductos[i].cantidad++

        //guardarProductos almacena en el state
        guardarProductos(totalProductos)
    }

    const eliminarProductoPedido = id => {
        const todosProductos = productos.filter(producto => producto._id !== id)

        guardarProductos(todosProductos)
    }

    //actualizar total a pagar
    const actualizarTotal = () => {
        // si el arreglo de productos es igual a 0: el total es 0
        if(productos.length === 0) {
            guardarTotal(0)
            return
        }

        //calucular el nuevo total
        let nuevoTotal = 0
        
        //recorrer los productos y sus cantidades y precios
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio))

        //almacenar toal
        guardarTotal(nuevoTotal)
    }

    const realizarPedido = async e => {
        e.preventDefault()

        //construir el objeto
        const pedido = {
            "cliente": id,
            "pedido": productos,
            "total": total
        }

        //almacenarlo en la DB
        const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido)

        //leer resultado
        if( resultado.status === 200) {
            //alerta de todo bien
            Swal.fire({
                type: 'success',
                title: 'Correcto',
                text: resultado.data.mensaje
            })
        } else {
            //alerta de error
            Swal.fire({
                type: 'error',
                title: 'Correcto',
                text: 'Vuelva a intentarlo'
            })
        }
        
        props.history.push('/pedidos')
    }

    return (
        <Fragment>
            <h2>Nuevo pedido para:</h2>
            <div className="card mb-2">
                <div className="card-header text-center">
                    Ficha cliente
                </div>
                <div className="card-body">
                    Nombre: {cliente.nombre} { cliente.apellido } <br />
                    Teléfono: {cliente.telefono}
                </div>
            </div>

            <FormBuscarProducto 
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}
            />

            
            {
                productos.map((producto, index) => (
                    <FormCantidadProducto 
                        key={producto.producto}
                        producto={producto}
                        restarProductos={restarProductos}
                        aumentarProductos={aumentarProductos}
                        index={index}
                        eliminarProductoPedido={eliminarProductoPedido}
                    />
                ))
            }

            <div className="card text-center my-2 p-2 bg-info font-weight-bold">
                <p>Total: $ <span>{total}</span></p>
            </div>
            {
                total > 0 ? (
                    <form
                        onSubmit={realizarPedido}
                    >
                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btn btn-success" 
                                value="Realizar Pedido"
                            />
                        </div>
                    </form>
                ) : null
            }
            

        </Fragment>
    )
}

export default withRouter( NuevoPedido )