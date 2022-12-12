import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { findClientById, loadClientes, saveClient} from "../server/server";
import { findProductById, loadProductos } from "../server/server";
import $ from 'jquery';

function Facturacion() {
    
    async function listClientes() {
        try {
            const res = await loadClientes();
            setListaClientes(res);
        } catch (error) {
            console.log(error);
        }
    };
    
    async function listProductos() {
        try {
            const res = await loadProductos();
            setListaProductos(res);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(
        () => {
            listProductos();
            listClientes();
        }, []
        );
        
        const [producto, setProducto] = useState({
            nombre: "",
            precio: 0,
            marca: "",
            color: "",
            direccion: "",
            fingreso: "",
            proveedor: "",
            disponibles: "",
            referencia: "",
            iva: ""
        })
        const [cliente, setCliente] = useState({
            nombre: "",
            nit: "",
            correo: "",
            celular: "",
            direccion: ""
        })
        
        const [listaProductos, setListaProductos] = useState([])
        const [listaClientes, setListaClientes] = useState([])
        const [listaFacturas, setListaFacturas] = useState([])
        const [idFactura, setidFactura] = useState(0)

    const [factura, setFactura] = useState({
        id:0,
        nombres: [],
        precio: [],
        producto: [],
        cantidad: [],
        iva: [],
        referencia: []
    })

    function addProduct() {
        var cantidad = $('#cantidad').val();
        if (cantidad == '') {
            alert("faltan campos");
        } else {
            setidFactura(idFactura +1)
            setFactura({
                ...factura,
                /* [factura.id]:idFactura, */
                [factura.nombres]: producto.nombre,
                [factura.precio]: producto.precio,
                [factura.producto]: producto.id,
                [factura.cantidad]: cantidad,
                [factura.iva]: producto.iva,
                [factura.referencia]: producto.referencia
            });
            factura.id = idFactura
            factura.producto = producto.id;
            factura.precio = producto.precio;
            factura.nombres = producto.nombre;
            factura.iva = producto.iva;
            factura.referencia = producto.referencia;
            factura.cantidad = cantidad;

            /* OPERACIONES TOTAL */
            setTotal(total + factura.precio)
            if (factura.iva == 'aplica') {
                setIva(iva + (factura.precio*0.19))
                setPagar(pagar + (factura.precio + (factura.precio*0.19)))
            }else{
                setPagar(pagar + (factura.precio))
            }
             /* OPERACIONES TOTAL */

            listaFacturas.push(factura);
        }
    }

    function eliminar(posicion){
        const filtro = listaFacturas.filter(c=> c.id == posicion);
        setTotal(total - filtro[0].precio)
        if (filtro[0].iva == 'aplica') {
            setIva(iva - (filtro[0].precio*0.19))
            setPagar(pagar - (filtro[0].precio + (filtro[0].precio*0.19)))
        }else{
            setPagar(pagar - (filtro[0].precio))
        }
        var res = listaFacturas.filter(c=> c.id != posicion);
        setListaFacturas(res)
    }


    $(document).ready(function () {
        document.getElementById("cantidad").value = 1;


        $("select[name=clientes_nombres]").change(function () {
            var id = $('select[name=clientes_nombres]').val();
            const getCliente = async () => {
                const data = await findClientById(id);
                setCliente(data);
            };
            getCliente();
        });

        $("select[name=producto_nombre]").change(function () {
            var id = $('select[name=producto_nombre]').val();
            const getProducto = async () => {
                const data = await findProductById(id);
                setProducto(data);
            };
            getProducto();
        });
    });

    function handleChange({ target }) {
        setCliente({
            ...cliente,
            [target.name]: target.value
        });
    }

    function handleChangeProducto({ target }) {
        setProducto({
            ...producto,
            [target.name]: target.value
        });
    }

    const [total, setTotal] = useState(0);
    const [iva, setIva] = useState(0);
    const [pagar, setPagar] = useState(0);

    return (
        <div className="contenedor">
            <div className="separador1 w-75 px-3">
                <h3 className="text-end">Facturación</h3>
                <div className="row">
                    {/* <div className="col-sm-5">
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre Cliente</Form.Label>
                            <Form.Control size="sm" name="nombre" type="text" placeholder="nombre cliente.." />
                        </Form.Group>
                    </div>  */}
                    <div className="col-sm-4">
                        <Form.Group className="mb-3">
                            <Form.Label>Seleccionar cliente</Form.Label>
                            <Form.Select size="sm" name="clientes_nombres">
                                <option value="A" selected>Clientes</option>
                                {listaClientes.map((client) => (
                                    <option key={client.id} value={client.id} >{client.nombre} -- {client.nit}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </div>

                    <div className="col-sm-4">
                        <Form.Group className="mb-3">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control size="sm" name="direccion" type="text" placeholder="DIRECCION.." value={cliente.direccion} onChange={handleChange} required />
                        </Form.Group>
                    </div>

                    <div className="col-sm-4 mt-4">
                        <button className="btn btn-primary btn-sm">Agregar</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control size="sm" name="nombre" type="text" placeholder="NOMBRE.." value={cliente.nombre} onChange={handleChange} required />
                        </Form.Group>
                    </div>
                    <div className="col-sm-4">
                        <Form.Group className="mb-3">
                            <Form.Label>Nit - Cedula</Form.Label>
                            <Form.Control size="sm" name="nit" type="text" placeholder="NIT.." value={cliente.nit} onChange={handleChange} required />
                        </Form.Group>
                    </div>
                    <div className="col-sm-4">
                        <Form.Group className="mb-3">
                            <Form.Label>Telefono - Celular</Form.Label>
                            <Form.Control size="sm" name="celular" type="text" placeholder="CELULAR.." value={cliente.celular} onChange={handleChange} required />
                        </Form.Group>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <Form.Group className="mb-3">
                            <Form.Label>Seleccionar producto</Form.Label>
                            <Form.Select size="sm" name="producto_nombre">
                                <option value="A" selected>Productos...</option>
                                {listaProductos.map((product) => (
                                    <option key={product.id} value={product.id} >{product.nombre} -- ${product.precio} -- {product.referencia}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className="col-sm-3">
                        <Form.Group className="mb-3">
                            <Form.Label>Producto</Form.Label>
                            <Form.Control disabled size="sm" name="id" type="text" value={producto.id} onChange={handleChangeProducto} required />
                        </Form.Group>
                    </div>
                    <div className="col-sm-1">
                        <Form.Group className="mb-2">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control size="sm" name="cantidad" id="cantidad" type="number" required />
                        </Form.Group>
                    </div>
                    <div className="col-sm-2">
                        <Button size="sm" className="btn btn-sm btn-primary px-4 mt-4" onClick={() => addProduct()}>Add
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
                                {Array.isArray(listaFacturas) ? listaFacturas.map((factu, index) => (
                                    <tr>
                                        <td>{factu.nombres}</td>
                                        <td className="text-center">{factu.cantidad}</td>
                                        <td className="text-end">$ {factu.precio}</td>
                                        <td className="text-end">$ {factu.cantidad * factu.precio}</td>
                                        <td className="text-center">
                                            <Button size="sm" variant="outline-danger" onClick={()=>eliminar(factu.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                </svg>
                                            </Button>
                                        </td>
                                    </tr>
                                )) : []}
                            </tbody>
                            <tbody>
                                <tr className="table-primary text-center table-primary">
                                    <td className="text-end" colSpan={4}>IVA</td>
                                    <td>$ {iva}</td>
                                </tr>
                                <tr className="table-primary text-center">
                                    <td className="text-end" colSpan={4}>TOTAL</td>
                                    <td>$ {total}</td>
                                </tr>
                                <tr className="table-primary text-center">
                                    <td className="text-end" colSpan={4}><b>TOTAL PAGAR</b></td>
                                    <td><b>$ {pagar}</b></td>
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