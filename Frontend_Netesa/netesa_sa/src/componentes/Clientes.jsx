import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { findClientById, loadClientes, saveClient, deleteClientById } from "../server/server";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

function Clientes() {

    const[cliente, setCliente]= useState({
        nombre: "",
        nit: "",
        correo: "",
        celular: "",
        direccion: ""
    })

    const [listaClientes, setListaClientes] = useState([])

    async function listClientes() {
        try {
            const res = await loadClientes();
            setListaClientes(res);
        } catch (error) {
            console.log(error);
        }
    };
    console.log("lista Clientes", listaClientes);
    useEffect(() => {
        listClientes();
    }, [/* listClientes */]);
    

    function Editar(id) {
        const getCliente = async () => {
          const data = await findClientById(id);
          setCliente(data);
        };
        getCliente();
    }

    async function guardarCliente() {
        await saveClient(cliente);
        Swal.fire({
            icon: 'success',
            title: 'Cliente agregado',
            showConfirmButton: false,
            timer: 1500
          })
          listClientes();
          setTimeout(function(){
            window.location.reload()
        }, 2000);
    }

    /* async function ActualizarCliente() {
        await updateClient(cliente);
        Swal.fire({
            icon: 'success',
            title: 'Cliente agregado',
            showConfirmButton: false,
            timer: 1500
          })
          listClientes();
    } */

    function handleChange({target}) {
        setCliente({
            ...cliente,
            [target.name]:target.value
        });
        /* console.log(cliente) */
    }
    

    async function eliminar(id) {
        Swal.fire({
            title: 'Eliminar',
            text: "Seguro de eliminar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteClientById(id);
                setListaClientes(listaClientes.filter(cliente=>cliente.id!==id))

              Swal.fire(
                'Borrado!',
                'Cliente Eliminado',
                'success'
              )
            }
          })
    }


    return (
        <div className="contenedor d-flex mt-3">

            <div className="seccion1 w-25 mx-3">
                <h3>Gestion de clientes</h3>
                <div className="row">
                    <div className="col-12">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Id</Form.Label>
                            <Form.Control size="sm" name="id" value={cliente.id} type="text" disabled onChange={handleChange} required />
                        </Form.Group>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control size="sm" name="nombre" value={cliente.nombre} type="text" placeholder="nombre" onChange={handleChange} required />
                        </Form.Group>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nit</Form.Label>
                            <Form.Control size="sm" name="nit" type="text" value={cliente.nit} placeholder="900....." onChange={handleChange} required />
                        </Form.Group>
                    </div>
                    <div className="col-6">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Celular</Form.Label>
                            <Form.Control size="sm" name="celular" type="text" value={cliente.celular} placeholder="300..." onChange={handleChange} required />
                        </Form.Group>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control size="sm" name="correo" type="text" value={cliente.correo} placeholder="a@a.com" onChange={handleChange} required />
                        </Form.Group>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control size="sm" name="direccion" type="text" value={cliente.direccion} placeholder="cll...." onChange={handleChange} required />
                        </Form.Group>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-grid gap-1">
                        <button size="sm" className="btn btn-block btn-warning mx-2" onClick={()=>guardarCliente()}>Agregar</button>
                        <button size="sm" className="btn btn-block btn-success mx-2"/*  onClick={()=>ActualizarCliente()} */>Actualizar</button>
                    </div>
                </div>
            </div>

            <div className="seccion2 w-75 mx-4">
                <h3>Clientes Registrados</h3>
                <Table striped bordered hover size="sm">
                <thead>
                    <tr className="table-primary text-center">
                        <td>Nit</td>
                        <td>Nombre</td>
                        <td>Celular</td>
                        <td>Correo</td>
                        <td>Direccion</td>
                        <td>Edit</td>
                    </tr>
                    </thead>
                    <tbody>
                    {listaClientes.map((cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.nit}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.celular}</td>
                            <td>{cliente.correo}</td>
                            <td>{cliente.direccion}</td>
                            <td className="text-center"><Button className="mx-1" size="sm" variant="outline-warning" onClick={() => Editar(cliente.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                            </Button>
                                <Button size="sm" variant="outline-danger" onClick={() => eliminar(cliente.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                    </svg>
                                </Button></td>

                        </tr>
                    )))
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export { Clientes }