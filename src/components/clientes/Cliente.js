import React from 'react';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import clienteAxios from '../../config/axios';

const Cliente = ({cliente}) => {

    const eliminarCliente = id => {
        Swal.fire({
            title: '¿Seguro que desea eliminar?',
            text: "No es posible recuperar un cliente eliminado",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Sí, quiero eliminar al cliente ${cliente.nombre} ${cliente.apellido}`
          }).then((result) => {
            if (result.value) {
              clienteAxios.delete(`/clientes/${id}`)
                .then(res => {
                    Swal.fire(
                        '¡Cliente eliminado!',
                        res.data.mensaje,
                        'success'
                      )
                })
            }
          })
    }

    return (
        <div className="card mb-3">
            <div className="card-header text-center">
                <h5 className="card-title">{cliente.nombre} {cliente.apellido}</h5>
            </div>
            <div className="card-body">
                <p className="card-text">Teléfono: {cliente.telefono}</p>
                    <Link to={`/cliente/editar/${cliente._id}`} className="btn btn-info mx-4 my-2"><i className="fas fa-edit text-white"></i> Editar info.</Link>
                    <Link to={`/pedidos/nuevo/${cliente._id}`} className="btn btn-warning mx-4 my-2 text-white"><i className="fas fa-plus-circle text-white"></i> Añadir Pedido</Link>
                    <button 
                        className="btn btn-danger mx-4 my-2"
                        onClick={() => eliminarCliente(cliente._id)}
                    > 
                    <i className="fas fa-trash text-white mr-1"></i>
                         Eliminar cliente
                    </button>
            </div>
        </div>
    )
}

export default Cliente