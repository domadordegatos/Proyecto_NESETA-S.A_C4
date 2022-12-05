import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { findProductById, loadProductos, saveProduct, deleteProductById} from "../server/server";
import Button from "react-bootstrap/Button";
import Swal from 'sweetalert2';
import Table from 'react-bootstrap/Table';

function Productos() {

  const[producto, setProducto]= useState({
    nombre: "",
    precio: 0,
    marca: "",
    color: "",
    direccion: "",
    fingreso:"",
    proveedor:"",
    disponibles:"",
    referencia:"",
	  iva:""
})
  const [listaProductos, setListaProductos] = useState([]);

  async function listProductos() {
    try {
      const res = await loadProductos();
      setListaProductos(res);
    } catch (error) {
      console.log(error);
    }
  }
  console.log("lista Productos", listaProductos);
  useEffect(
    () => {
      listProductos();
    },[]
  );

  function Editar(id) {
    const getProducto = async () => {
      const data = await findProductById(id);
      setProducto(data);
    };
    getProducto();
}

async function guardarProducto() {
  producto.disponibles = producto.disponibles.split(" ").join("").split(',');
  await saveProduct(producto);
  Swal.fire({
      icon: 'success',
      title: 'Producto agregado',
      showConfirmButton: false,
      timer: 1500
    })
    listProductos();/* volver a cargar la tabla */
    setTimeout(function(){
      window.location.reload()
  }, 2000);
}

function handleChange({target}) {
  setProducto({
      ...producto,
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
          await deleteProductById(id);
          setListaProductos(listaProductos.filter(producto=>producto.id!==id))

        Swal.fire(
          'Borrado!',
          'Producto Eliminado',
          'success'
        )
      }
    })
}


  return (
    <div className="contenedor d-flex  mt-3">
      <div className="secciones1 w-75 mx-4 ">
        <h3>Productos</h3>
        <Table className="table table-bordered table-sm">
          <thead>
          <tr className="table-warning">
            <td>Nombre</td>
            <td>Precio</td>
            <td>Marca</td>
            <td>Color</td>
            <td>Fecha Ingreso</td>
            <td>Proveedor</td>
            <td>Tipo</td>
            <td>Referencia</td>
            <td>Options</td>
          </tr>
          </thead>
          <tbody>
          {listaProductos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{"$" + producto.precio}</td>
              <td>{producto.marca}</td>
              <td>{producto.color}</td>
              <td>{producto.fingreso}</td>
              <td>{producto.proveedor}</td>
              <td>
                <Form.Select  size="sm">
                  {producto.disponibles.map((disponible) => (
                    <option value="">{disponible}</option>
                  ))}
                </Form.Select>
              </td>

              <td>{producto.referencia}</td>
              <td className="text-center">
                <Button
                  className="mx-1"
                  size="sm"
                  variant="outline-warning"
                  onClick={() => Editar(producto.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => eliminar(producto.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                  </svg>
                </Button>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>

      <div className="secciones2 w-25 mx-4">
        <h3>Gestion de Productos</h3>
        <div className="row">
          <div className="col-6">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Id</Form.Label>
              <Form.Control size="sm" name="id" value={producto.id} type="text" disabled onChange={handleChange} required />
            </Form.Group>
          </div>
          <div className="col-6">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Iva</Form.Label>
              <Form.Select  size="sm" name="iva" onChange={handleChange} value={producto.iva} aria-label="Default select example">
                <option value="A" selected>Seleccionar..</option>
                <option value="aplica">Aplica</option>
                <option value="no-aplica">N/A</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control  size="sm" name="nombre" value={producto.nombre} type="text" placeholder="nombre" onChange={handleChange} required />
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Precio</Form.Label>
              <Form.Control  size="sm" name="precio" value={producto.precio} type="number" placeholder="$000..." onChange={handleChange} required />
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Marca</Form.Label>
              <Form.Control  size="sm" name="marca" value={producto.marca} type="text" placeholder="gao..." onChange={handleChange} required />
            </Form.Group>
          </div>
          <div className="col-6">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Referencia</Form.Label>
              <Form.Control  size="sm" name="referencia" value={producto.referencia} type="text" placeholder="tipo..." onChange={handleChange} required/>
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Color</Form.Label>
              <Form.Control  size="sm" name="color" value={producto.color} type="text" placeholder="Red..." onChange={handleChange} required />
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Fecha Ingreso</Form.Label>
              <Form.Control  size="sm" name="fingreso" id="date" value={producto.fingreso} type="date" placeholder="2022..." onChange={handleChange} required/>
            </Form.Group>
          </div>
          <div className="col-7">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Proveedor</Form.Label>
              <Form.Control  size="sm" name="proveedor" value={producto.proveedor} type="text" placeholder="norma..." onChange={handleChange} required/>
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tipo</Form.Label>
              <Form.Control  size="sm" name="disponibles" value={producto.disponibles} type="text" placeholder="tipo..." onChange={handleChange} required/>
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-grid gap-1">
            <button size="sm" className="btn btn-info mx-2" onClick={()=>guardarProducto()}>
              Agregar
            </button>
            <button size="sm" className="btn btn-secondary mx-2">
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Productos };
