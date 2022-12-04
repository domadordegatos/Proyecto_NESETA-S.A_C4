import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { findProductById, loadProductos, saveProduct, deleteProductById} from "../server/server";
import Button from "react-bootstrap/Button";
import Swal from 'sweetalert2';


function Productos() {

  const[producto, setProducto]= useState({
    id: "",
    nombre: "",
    precio: 0,
    marca: "",
    color: "",
    direccion: "",
    fIngreso:Date(),
    proveedor:"",
    disponibles:[],
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
    },
    [
      /* listProductos */
    ]
  );

  function Editar(id) {
    const getProducto = async () => {
      const data = await findProductById(id);
      setProducto(data);
    };
    getProducto();
}

async function guardarProducto() {
  await saveProduct(producto);
  Swal.fire({
      icon: 'success',
      title: 'Producto agregado',
      showConfirmButton: false,
      timer: 1500
    })
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
    <div className="contenedor d-flex">
      <div className="secciones1 w-75 mx-4 ">
        <h3>Productos</h3>
        <table className="table table-bordered table-sm">
          <tr className="table-info">
            <td>Nombre</td>
            <td>Precio</td>
            <td>Marca</td>
            <td>Color</td>
            <td>Fecha Ingreso</td>
            <td>Proveedor</td>
            <td>Tipo</td>
            <td>Referencia</td>
          </tr>
          {listaProductos.map((producto) => (
            <tr>
              <td>{producto.nombre}</td>
              <td>{"$" + producto.precio}</td>
              <td>{producto.marca}</td>
              <td>{producto.color}</td>
              <td>{producto.fIngreso}</td>
              <td>{producto.proveedor}</td>
              <td>
                <Form.Select>
                  {producto.disponibles.map((disponible) => (
                    <option>{disponible}</option>
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
        </table>
      </div>

      <div className="secciones2 w-25 mx-4">
        <h3>Gestion de Productos</h3>
        <div className="row">
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Id</Form.Label>
              <Form.Control name="id" value={producto.id} type="text" disabled onChange={handleChange} required />
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="nombre" value={producto.nombre} type="text" placeholder="nombre" onChange={handleChange} required />
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Precio</Form.Label>
              <Form.Control name="precio" value={producto.precio} type="number" placeholder="$000..." onChange={handleChange} required />
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Marca</Form.Label>
              <Form.Control name="marca" value={producto.marca} type="text" placeholder="gao..." onChange={handleChange} required />
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Color</Form.Label>
              <Form.Control name="color" value={producto.color} type="text" placeholder="Red..." onChange={handleChange} required />
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Fecha Ingreso</Form.Label>
              <Form.Control name="fechaingreso" value={producto.fIngreso} type="text" placeholder="2022..." onChange={handleChange} required/>
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Proveedor</Form.Label>
              <Form.Control name="proveedor" value={producto.proveedor} type="text" placeholder="aaa..." onChange={handleChange} required/>
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tipo</Form.Label>
              <Form.Control name="tipo" value={producto.disponibles} type="text" placeholder="tipo..." onChange={handleChange} required/>
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Referencia</Form.Label>
              <Form.Control name="referencia" value={producto.referencia} type="text" placeholder="tipo..." onChange={handleChange} required/>
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button className="btn btn-lg btn-sm btn-block btn-info mx-2" onClick={()=>guardarProducto()}>
              Agregar
            </button>
            <button className="btn btn-lg btn-sm btn-block btn-secondary mx-2">
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
    /*<div className="container mt-4">
            <table class="table table-bordered table-info">
                <tr>
                    <td>Nombre</td>
                    <td>Marca</td>
                    <td>Precio</td>
                </tr>
                {listaProductos.map((producto)=>(
                    <tr>
                    <td>{producto.nombre}</td>
                    <td>{producto.marca}</td>
                    <td>{producto.precio}</td>
                    </tr>
                ))}
            </table>
        </div>*/
  );
}

export { Productos };
