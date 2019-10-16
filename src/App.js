import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Header from './components/layout/Header'
import Navegacion from './components/layout/Navegacion'


import Clientes from './components/clientes/Clientes';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';

import Productos from './components/productos/Productos';
import NuevoProducto from './components/productos/NuevoProducto';
import EditarProducto from './components/productos/EditarProducto';

import Pedidos from './components/pedidos/Pedidos';
import NuevoPedido from './components/pedidos/NuevoPedido';

function App() {
  return (
    <Router>
      <Fragment>
          <Header />
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <Navegacion />
              </div>
              <div className="col-md-8">
                <Switch>

                  <Route path="/" exact component={Clientes} />
                  <Route path="/cliente/nuevo" exact component={NuevoCliente} />
                  <Route path="/cliente/editar/:id" exact component={EditarCliente} />

                  <Route path="/productos" exact component={Productos} />
                  <Route path="/productos/nuevo" exact component={NuevoProducto} />
                  <Route path="/productos/editar/:id" exact component={EditarProducto} />

                  <Route path="/pedidos" exact component={Pedidos} />
                  <Route path="/pedidos/nuevo/:id" exact component={NuevoPedido} />

                </Switch>
              </div>
            </div>
          </div>
      </Fragment>
    </Router>
  )
}

export default App;
