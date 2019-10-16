import React, { Fragment } from 'react';
import Swal from 'sweetalert2'

import clienteAxios from '../../config/axios'
import Galletas from './Galletas';

const Pedido = ({pedido}) => {

    const eliminarPedido = async id => {

        Swal.fire({
            title: '¿Seguro que deseas eliminar el pedido?',
            text: "No se podrá recuperar el pedido eliminado",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, eliminar!'
          }).then((result) => {
            if (result.value) {
                clienteAxios.delete(`/pedidos/${id}`)
                    .then(res => {
                        Swal.fire(
                            'Eliminado!',
                            res.data.mensaje,
                            'success'
                          )
                    })
              
            }
          })
        
        
        

    }

    return (
        <Fragment>
            <div className="card my-2">
                <div className="card-header">
                    <p className="card-title">
                        ID de pedido: #{pedido._id}
                    </p>
                    <button 
                        type="button" 
                        className="btn btn-danger offset-sm-11"
                        onClick={() => eliminarPedido(pedido._id)}
                    >
                        <i className="fas fa-times-circle text-white"></i>
                    </button>
                </div>
                <div className="card-body">
                    <h2 className="card-title">Cliente: {pedido.cliente.nombre} {pedido.cliente.apellido}</h2>
                    <ul className="list-group">
                        {
                            pedido.pedido.map(articulo => (
                                <Galletas 
                                    key={articulo._id}
                                    articulo={articulo}
                                />
                            ))
                        }
                    </ul>
                </div>
                <div className="card-footer">
                    <p className="font-weight-bold">Total : $ {pedido.total}</p>

                </div>
            </div>
        </Fragment>
    )
}

export default Pedido