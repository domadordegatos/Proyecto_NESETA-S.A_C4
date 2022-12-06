import { React } from "react";
import { NavLink } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <a className="navbar-brand" href="#">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/N_on_green_and_black.svg/2048px-N_on_green_and_black.svg.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
                    </a>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>

                    <NavDropdown id="nav-dropdown-dark-example" title="Gestión" menuVariant="light">
                        <NavDropdown.Item><NavLink className="nav-link text-dark" to="/facturadores">Facturadores</NavLink></NavDropdown.Item>
                        <NavDropdown.Item><NavLink className="nav-link text-dark" to="/productos">Productos</NavLink></NavDropdown.Item>
                        <NavDropdown.Item><NavLink className="nav-link text-dark" to="/clientes">Clientes</NavLink></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item><NavLink className="nav-link text-dark" to="/facturacion">Facturacion</NavLink></NavDropdown.Item>
                    </NavDropdown>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export { NavBar }