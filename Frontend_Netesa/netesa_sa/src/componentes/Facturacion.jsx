import { React } from "react";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

function Facturacion() {
    return (
        <div className="contenedor">
            <div className="separador1 w-75 px-3">
                <h3 className="text-end">Facturación</h3>
                <div className="row">
                    <div className="col-sm-5">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre Cliente</Form.Label>
                            <Form.Control size="sm" name="nombre" type="text" placeholder="nombre cliente.." />
                        </Form.Group>
                    </div>
                    <div className="col-sm-4">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Seleccionar cliente</Form.Label>
                            <Form.Select size="sm" name="iva">
                                <option value="A" selected>Clientes..</option>
                                <option value="aplica">Aplica</option>
                                <option value="no-aplica">N/A</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control size="sm" name="nombre" type="text" placeholder="NOMBRE.." />
                        </Form.Group>
                    </div>
                    <div className="col-sm-4">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control size="sm" name="nombre" type="text" placeholder="NIT.." />
                        </Form.Group>
                    </div>
                    <div className="col-sm-4">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control size="sm" name="nombre" type="text" placeholder="CELULAR.." />
                        </Form.Group>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control size="sm" name="nombre" type="text" placeholder="DIRECCION.." />
                        </Form.Group>
                    </div>
                    <div className="col-sm-4">
                        <button className="btn btn-primary btn-sm">Agregar</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-3">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Producto</Form.Label>
                            <Form.Control size="sm" name="nombre" type="text" placeholder="nombre cliente.." />
                        </Form.Group>
                    </div>
                    <div className="col-sm-4">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Seleccionar producto</Form.Label>
                            <Form.Select size="sm" name="iva">
                                <option value="A" selected>Clientes..</option>
                                <option value="aplica">Aplica</option>
                                <option value="no-aplica">N/A</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className="col-sm-1">
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control size="sm" name="nombre" type="number" placeholder="1.." />
                        </Form.Group>
                    </div>
                    <div className="col-sm-2">
                        <Button size="sm" className="btn btn-sm btn-primary px-4 mt-4">Add  
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-2 bi bi-plus-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </Button>
                    </div>
                    <div className="col-sm-2">
                        <Button size="sm" className="btn btn-sm btn-danger px-4 mt-4">Facturar
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-2 bi bi-printer" viewBox="0 0 16 16">
                                <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                                <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                            </svg>
                        </Button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr className="table-primary text-center">
                                    <td>Item Nombre Detalle</td>
                                    <td>Cant</td>
                                    <td>Val * U</td>
                                    <td>Total</td>
                                    <td>Options</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>Marcador sharpie azul</td>
                                <td className="text-center d-flex justify-content-center">
                                    <Form.Group size="sm">
                                        <Form.Control style={{ width: 50, paddingTop: 0, paddingBottom: 0 }} size="sm" name="nombre" type="number" value="6" />
                                    </Form.Group>
                                </td>
                                <td className="text-end">$ 1.200</td>
                                <td className="text-end">$ 7.200</td>
                                <td className="text-center">
                                    <Button className="mx-1" size="sm" variant="outline-warning" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                        </svg>
                                    </Button>
                                    <Button size="sm" variant="outline-danger">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                        </svg>
                                    </Button>
                                </td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr className="table-primary text-center table-primary">
                                    <td className="text-end" colSpan={4}>IVA</td>
                                    <td>$ ######</td>
                                </tr>
                                <tr className="table-primary text-center">
                                    <td className="text-end" colSpan={4}>TOTAL</td>
                                    <td>$ ######</td>
                                </tr>
                                <tr className="table-primary text-center">
                                    <td className="text-end" colSpan={4}><b>TOTAL PAGAR</b></td>
                                    <td><b>$ ######</b></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>


            </div>
            <div className="separador2 w-25">

            </div>
        </div>
    )
}

export { Facturacion }