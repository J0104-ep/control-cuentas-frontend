import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import "./../styles/dashboard.css";


function DashboardTrabajador() {


  const navigate = useNavigate();


  const hoy = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });



  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );




  const [datos,setDatos] = useState({

    totalVentas:0,

    totalFacturas:0,

    saldoPendiente:0,

    ultimasFacturas:[]

  });







  useEffect(()=>{


    if(usuario){

      cargarDashboard();

    }


  },[]);







  const cargarDashboard = async()=>{


    try{


      const respuesta =
      await api.get(
        `/dashboard/trabajador/${usuario.id}`
      );


      setDatos(respuesta.data);



    }catch(error){


      console.error(
        "Error cargando dashboard trabajador",
        error
      );


    }


  };







return(


<div className="dashboard">






<aside className="sidebar">



<div className="logo">


<h2>
CONTROL
</h2>


<span>
CUENTAS
</span>


</div>






<nav>

<ul>


<li className="active">

🏠 Inicio

</li>





<li
onClick={()=>
navigate("/facturas")
}
>

🧾 Mis Facturas

</li>





<li
onClick={()=>
navigate("/nueva-factura")
}
>

➕ Nueva Factura

</li>



<li
onClick={() => {

localStorage.removeItem("usuario");
localStorage.removeItem("usuario_id");
localStorage.removeItem("usuario_nombre");
localStorage.removeItem("usuario_rol");
localStorage.removeItem("sesion");

navigate("/login");

}}
>

🚪 Cerrar sesión

</li>




</ul>


</nav>


</aside>









<main className="content">






<div className="topbar">


<div>


<h1>

Inicio

</h1>


<p>

<p>
Bienvenido {JSON.parse(localStorage.getItem("usuario"))?.nombre}
</p>

</p>


</div>




<div className="fecha">

{hoy}

</div>


</div>









<div className="total-card">


<h3>

💰 Mis ventas de hoy

</h3>



<h1>

$

{
Number(datos.totalVentas)
.toLocaleString("es-CO")
}


</h1>



<p>

Ventas realizadas durante la jornada.

</p>


</div>









<div className="acciones">


<button

onClick={()=>
navigate("/nueva-factura")
}

>

🧾 Nueva Factura

</button>


</div>









<div className="cards">



<div className="card">


<h4>

🧾 Facturas Hoy

</h4>


<span>

{datos.totalFacturas}

</span>


</div>







<div className="card">


<h4>

💵 Dinero pendiente

</h4>


<span>

$

{
Number(datos.saldoPendiente || 0)
.toLocaleString("es-CO")
}


</span>


</div>




</div>









<div className="ultimas">



<div className="titulo-ultimas">


<h2>

Mis últimas facturas

</h2>



<button

className="btn-ver-todas"

onClick={()=>
navigate("/facturas")
}

>

Ver todas →

</button>



</div>









{

datos.ultimasFacturas.length===0 ? (


<div className="sinDatos">

No hay facturas registradas.

</div>


):(



datos.ultimasFacturas.map((factura)=>(


<div

className="factura"

key={factura.id}

>



<div>


<strong>

Factura #
{
String(factura.id)
.substring(0,8)

}

</strong>





<p>

Cliente:

{" "}

{
factura.clientes?.nombre ||
"Sin cliente"

}

</p>





<p>

👤 Subido por:

{" "}

{
factura.usuarios?.nombre ||
usuario?.nombre ||
"Usuario"

}

</p>





<p>

📅 {factura.fecha}

</p>





<p>

🕒 {factura.hora?.substring(0,5)}

</p>


</div>







<strong className="valor-dashboard">


$

{
Number(factura.valor)
.toLocaleString("es-CO")

}


</strong>





</div>


))


)

}






</div>







</main>




</div>



);


}



export default DashboardTrabajador;