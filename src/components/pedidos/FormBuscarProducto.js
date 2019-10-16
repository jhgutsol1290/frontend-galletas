import React, { Fragment } from 'react';

const FormBuscarProducto = (props) => {
    return (
        <Fragment>
            <div className="card">
                <div className="card-body">
                    <form
                        className="form-inline"
                        onSubmit={props.buscarProducto}
                    >
                        <p>Buscar productos</p>
                        <div className="form-group mx-md-4 mb-2">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Palabra clave..."
                                    name="productos"
                                    onChange={props.leerDatosBusqueda}
                                />
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary mb-2" 
                        ><i className="fas fa-search text-white"></i>
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FormBuscarProducto