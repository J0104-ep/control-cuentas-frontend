import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


// Login
import Login from "../pages/Login";


// Dashboard
import DashboardJefe from "../pages/DashboardJefe";
import DashboardTrabajador from "../pages/DashboardTrabajador";


// Facturas
import Facturas from "../pages/Facturas";
import NuevaFactura from "../pages/NuevaFactura";
import EditarFactura from "../pages/EditarFactura";


// Tiendas
import Tiendas from "../pages/Tiendas";
import NuevaTienda from "../pages/NuevaTienda";
import EditarTienda from "../pages/EditarTienda";


// Trabajadores
import Trabajadores from "../pages/Trabajadores";
import NuevoTrabajador from "../pages/NuevoTrabajador";
import EditarTrabajador from "../pages/EditarTrabajador";



function AppRouter() {


  return (


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
            DASHBOARD JEFE
        ================= */}


        <Route
          path="/dashboard"
          element={<DashboardJefe />}
        />





        {/* =================
            DASHBOARD TRABAJADOR
        ================= */}


        <Route
          path="/dashboard-trabajador"
          element={<DashboardTrabajador />}
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
            TRABAJADORES
        ================= */}


        <Route
          path="/trabajadores"
          element={<Trabajadores />}
        />


        <Route
          path="/nuevo-trabajador"
          element={<NuevoTrabajador />}
        />


        <Route
          path="/editar-trabajador/:id"
          element={<EditarTrabajador />}
        />



      </Routes>


    </BrowserRouter>


  );


}


export default AppRouter;