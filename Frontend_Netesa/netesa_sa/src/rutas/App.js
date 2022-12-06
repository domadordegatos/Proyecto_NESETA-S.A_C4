import '../App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from '../componentes/NavBar';
import { HomePage } from "../paginas/HomePage";
import { ContactPage } from "../paginas/ContactPage";
import { BlogPage } from '../paginas/BlogPage';
import { NotFound } from '../paginas/NotFound';
import { Productos } from '../componentes/Productos';
import { Clientes } from '../componentes/Clientes';
import { Facturadores } from '../componentes/Facturadores';
import { Facturacion } from '../componentes/Facturacion';

function App() {
  return (
    <HashRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/contacto' element={<ContactPage></ContactPage>}/>
        <Route path='/blog' element={<BlogPage></BlogPage>}></Route>
        <Route path='/productos' element={<Productos></Productos>}></Route>
        <Route path='/clientes' element={<Clientes></Clientes>}></Route>
        <Route path='/facturadores' element={<Facturadores></Facturadores>}></Route>
        <Route path='/facturacion' element={<Facturacion></Facturacion>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
