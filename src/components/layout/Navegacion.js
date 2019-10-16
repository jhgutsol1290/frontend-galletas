import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

const Navegacion = () => {
    return (
        <Fragment>
            <div className="container mt-5 mb-4">
                <ul className="list-group list-group-flush">
                    <Link to={"/"} className="nav-list-item"><li className="list-group-item navigation-aside"><i className="fas fa-user-friends"></i> Clientes</li></Link>
                    <Link to={"/productos"} className="nav-list-item"><li className="list-group-item navigation-aside"><i className="fas fa-cookie"></i> Productos</li></Link>
                    <Link to={"/pedidos"} className="nav-list-item"><li className="list-group-item navigation-aside"><i className="fas fa-search-dollar"></i> Pedidos</li></Link>
                </ul>
            </div>
        </Fragment>
    )
}

export default Navegacion

