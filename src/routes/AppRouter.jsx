import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


// LOGIN
import Login from "../pages/Login";


// DASHBOARD
import Dashboard from "../pages/Dashboard";


// FACTURAS
import Facturas from "../pages/Facturas";
import NuevaFactura from "../pages/NuevaFactura";
import EditarFactura from "../pages/EditarFactura";


// TIENDAS
import Tiendas from "../pages/Tiendas";
import NuevaTienda from "../pages/NuevaTienda";
import EditarTienda from "../pages/EditarTienda";


// USUARIOS
import Usuarios from "../pages/Usuarios";
import NuevoUsuario from "../pages/NuevoUsuario";
import EditarUsuario from "../pages/EditarUsuario";





function AppRouter(){


return(


<BrowserRouter>


<Routes>



{/* =================
    LOGIN
================= */}


<Route

path="/"

element={<Login />}

/>


<Route

path="/login"

element={<Login />}

/>





{/* =================
    DASHBOARD
================= */}


<Route

path="/dashboard"

element={<Dashboard />}

/>







{/* =================
    FACTURAS
================= */}


<Route

path="/facturas"

element={<Facturas />}

/>



<Route

path="/nueva-factura"

element={<NuevaFactura />}

/>



<Route

path="/editar-factura/:id"

element={<EditarFactura />}

/>








{/* =================
    TIENDAS
================= */}


<Route

path="/tiendas"

element={<Tiendas />}

/>



<Route

path="/nueva-tienda"

element={<NuevaTienda />}

/>



<Route

path="/editar-tienda/:id"

element={<EditarTienda />}

/>









{/* =================
    USUARIOS
================= */}


<Route

path="/usuarios"

element={<Usuarios />}

/>



<Route

path="/nuevo-usuario"

element={<NuevoUsuario />}

/>



<Route

path="/editar-usuario/:id"

element={<EditarUsuario />}

/>





</Routes>


</BrowserRouter>


);


}


export default AppRouter;