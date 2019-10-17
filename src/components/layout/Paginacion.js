import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Paginacion = ({ elementosPorPagina, elementosTotales, paginar }) => {

    const numerosPagina = []

    for(let i = 1; i <= Math.ceil(elementosTotales / elementosPorPagina); i++) {
        numerosPagina.push(i)
    }

    return (
        <Fragment>
            <nav className="pagination my-5">
            {
                numerosPagina.map(numero => (
                    <li key={numero} className="page-item">
                        <Link onClick={() => paginar(numero)} to={"#"} className="page-link">{numero}</Link>
                    </li>
                ))
            }
            </nav>
        </Fragment>
    )
}

export default Paginacion
