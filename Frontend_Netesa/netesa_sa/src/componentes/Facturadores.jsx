import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { loadFacturador, findFacturadorById, saveFacturador } from "../server/server";
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';

function Facturadores() {

    const[facturador, setFacturador]= useState({
        nombre: "",
        usuario: "",
        correo: "",
        contraseña: "",
        rol: "",
        estado:"",
        telefono:""
    })

    const [listaFacturador, setListaFacturador] = useState([])
    async function listFacturador() {
        try {
            const res = await loadFacturador();
            setListaFacturador(res);
        } catch (error) {
            console.log(error);
        }
    };
    console.log("lista Facturador", listaFacturador);
    useEffect(() => {
        listFacturador();
    }, [/* listFacturador */]);

    function Editar(id) {
        const getFacturador = async () => {
          const data = await findFacturadorById(id);
          setFacturador(data);
        };
        getFacturador();
    }
    
    async function guardarFacturador() {
      await saveFacturador(facturador);
      Swal.fire({
          icon: 'success',
          title: 'Usuario agregado',
          showConfirmButton: false,
          timer: 1500
        })
        listFacturador();/* volver a cargar la tabla */
        setTimeout(function(){
            window.location.reload()
        }, 2000);
    }
    
    function handleChange({target}) {
        setFacturador({
          ...facturador,
          [target.name]:target.value
      });
      /* console.log(cliente) */
    }

    return (
        <div className="contenedor d-flex  mt-3">

            <div className="secciones1 w-75 mx-4 ">
            <h3>Facturadores</h3>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr className="table-danger text-center">
                        <td>Nombre</td>
                        <td>Correo</td>
                        <td>Usuario</td>
                        <td>Contraseña</td>
                        <td>Email</td>
                        <td>Rol</td>
                        <td>Estado</td>
                        <td>Edit</td>
                    </tr>
                    </thead>
                    <tbody>
                    {listaFacturador.map((facturador => (
                        <tr key={facturador.id}>
                            <td>{facturador.nombre}</td>
                            <td>{facturador.correo}</td>
                            <td>{facturador.usuario}</td>
                            <td>{facturador.contraseña}</td>
                            <td>{facturador.correo}</td>
                            <td>{facturador.rol}</td>
                            <td>{facturador.estado}</td>
                            <td className="text-center"><button onClick={() => Editar(facturador.id)} className="btn btn-outline-warning btn-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                            </button></td>

                        </tr>
                    )))
                    }
                    </tbody>
                </Table>
            </div>

            <div className="secciones2 w-25 mx-4">
                <h3>Gestion de Usuarios</h3>
                <div className="row">
                    <div className="col-12">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control onChange={handleChange} required  name="nombre" value={facturador.nombre} size="sm" type="text" placeholder="nombre" />
                        </Form.Group>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control onChange={handleChange} required  name="telefono" value={facturador.telefono}  size="sm" type="number" placeholder="300...." />
                        </Form.Group>
                    </div>
                    <div className="col-6">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Id</Form.Label>
                            <Form.Control disabled onChange={handleChange} name="id" value={facturador.id}  size="sm" type="text"/>
                        </Form.Group>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control onChange={handleChange} required  name="correo" value={facturador.correo} size="sm" type="email" placeholder="a@a...." />
                        </Form.Group>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control onChange={handleChange} required  name="usuario" value={facturador.usuario} size="sm" type="text" placeholder="user...." />
                        </Form.Group>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control onChange={handleChange} required  name="contraseña" value={facturador.contraseña} size="sm" type="password" placeholder="****" />
                        </Form.Group>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Rol</Form.Label>
                            <Form.Select onChange={handleChange} required  name="rol" value={facturador.rol} size="sm">
                                <option value="Admin">Admin</option>
                                <option value="Cajero">Cajero</option>
                            </Form.Select>
                    </Form.Group>
                </div>
                <div className="col-6">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select onChange={handleChange} required  name="estado" value={facturador.estado} size="sm">
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                        </Form.Select>
                    </Form.Group>
                </div>
            </div>

            <div className="row">
                <div className="col-12 d-grid gap-1">
                    <button className="btn btn-lg btn-sm btn-block btn-info mx-2" onClick={()=>guardarFacturador()}>Agregar</button>
                    <button className="btn btn-lg btn-sm btn-block btn-secondary mx-2">Editar</button>
                </div>
            </div>
        </div>
        </div >
    )
}

export { Facturadores }