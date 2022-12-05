const API_URL_CLIENTES="http://localhost:8080/clientes/";
const API_URL_PRODUCTOS="http://localhost:8080/productos/";
const API_URL_FACTURADORES="http://localhost:8080/facturador/";

/* ==================== CLIENTES ======================== */
export async function loadClientes(){
    const res = await fetch (API_URL_CLIENTES);
    const data = await res.json();
    return data;
}
export async function findClientById(id){
    const options = {method: 'GET'};
    const res= await fetch(API_URL_CLIENTES+id,options);
    return await res.json();
}
export async function deleteClientById(id){
    const options = {method: 'DELETE'}; //cuando es metodo GET no es necesario especificarlo
    const res= await fetch(API_URL_CLIENTES+id,options);
    const text =await res.text();
    return text;
}
export async function saveClient(cliente){
    const options = {
        method: 'POST',
        headers:{"Content-type":"application/json"},
        body: JSON.stringify(cliente)
    };
    const response = await fetch(API_URL_CLIENTES, options);
    return await response.text();    
}
/* ==================== CLIENTES ======================== */
/* ==================== FACTURADORES ======================== */

export async function loadFacturador(){
    const res = await fetch (API_URL_FACTURADORES);
    const data = await res.json();
    return data;
}
export async function findFacturadorById(id){
    const options = {method: 'GET'};
    const res= await fetch(API_URL_FACTURADORES+id,options);
    return await res.json();
}
export async function saveFacturador(facturador){
    const options = {
        method: 'POST',
        headers:{"Content-type":"application/json"},
        body: JSON.stringify(facturador)
    };
    const response = await fetch(API_URL_FACTURADORES, options);
    return await response.text();    
}
/* ==================== FACTURADORES ======================== */
/*======================PRODUCTOS=====================-========*/
export async function loadProductos(){
    const res = await fetch (API_URL_PRODUCTOS);
    const data = await res.json();
    return data;
}
export async function findProductById(id){
    const options = {method: 'GET'};
    const res= await fetch(API_URL_PRODUCTOS+id,options);
    return await res.json();
}
export async function deleteProductById(id){
    const options = {method: 'DELETE'}; //cuando es metodo GET no es necesario especificarlo
    const res= await fetch(API_URL_PRODUCTOS+id,options);
    const text =await res.text();
    return text;
}
export async function saveProduct(producto){
    const options = {
        method: 'POST',
        headers:{"Content-type":"application/json"},
        body: JSON.stringify(producto)
      };
      const response = await fetch(API_URL_PRODUCTOS, options);
      return await response.text();  
}  