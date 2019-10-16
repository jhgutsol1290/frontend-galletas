import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <Fragment >
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3 navbar-bar">
                <Link className="navbar-brand text-uppercase font-weight-bold" to={"/"}>Galletas Gtz.</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
        </Fragment>
    )
}

export default Header