import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import "../styles/trabajadores.css";


function Trabajadores() {


  const navigate = useNavigate();


  const [trabajadores,setTrabajadores] = useState([]);




  useEffect(()=>{

    cargarTrabajadores();

  },[]);





  const cargarTrabajadores = async()=>{


    try{


      const respuesta =
      await api.get("/trabajadores");


      setTrabajadores(
        respuesta.data
      );


    }catch(error){


      console.error(
        "Error cargando trabajadores:",
        error
      );


    }


  };









  // ===============================
  // REGISTRAR ENTREGA
  // ===============================


  const registrarEntrega = async(id)=>{


    const valor = prompt(
      "Ingrese el dinero entregado por el trabajador:"
    );



    if(!valor)
      return;




    try{


      await api.post(
        `/trabajadores/${id}/entrega`,
        {
          valor:Number(valor)
        }
      );



      alert(
        "Entrega registrada correctamente"
      );



      cargarTrabajadores();



    }catch(error){


      console.error(error);


      alert(
        "No se pudo registrar la entrega"
      );


    }


  };









  const eliminarTrabajador = async(id)=>{


    const confirmar =
    window.confirm(
      "¿Desea eliminar este trabajador?"
    );



    if(!confirmar)
      return;




    try{


      await api.delete(
        `/trabajadores/${id}`
      );



      cargarTrabajadores();



    }catch(error){


      console.error(
        "Error eliminando trabajador:",
        error
      );


    }


  };









return(


<div className="trabajadores-page">





<div className="trabajadores-header">



<div>


<h1>
👷 Trabajadores
</h1>


<p>
Administración de trabajadores del sistema
</p>


</div>






<button

className="btn-nuevo"

onClick={()=>
navigate("/nuevo-trabajador")
}

>

+ Nuevo Trabajador

</button>







<button

className="btn-volver"

onClick={()=>
navigate("/dashboard")
}

>

🏠 Volver

</button>




</div>









<div className="tabla-trabajadores">



<table>


<thead>


<tr>


<th>
Nombre
</th>


<th>
Estado
</th>


<th>
Ventas realizadas
</th>


<th>
Dinero entregado
</th>


<th>
Pendiente
</th>


<th>
Acciones
</th>


</tr>


</thead>









<tbody>



{

trabajadores.length===0 ? (


<tr>

<td colSpan="6">

No hay trabajadores registrados

</td>

</tr>



):(



trabajadores.map((trabajador)=>(


<tr key={trabajador.id}>



<td>

{trabajador.nombre}

</td>







<td>


<span

className={
trabajador.activo
?
"estado-activo"
:
"estado-inactivo"
}

>

{
trabajador.activo
?
"Activo"
:
"Inactivo"
}

</span>


</td>








<td>


$

{
Number(
trabajador.total_ventas || 0
)
.toLocaleString("es-CO")
}


</td>








<td>


$

{
Number(
trabajador.dinero_entregado || 0
)
.toLocaleString("es-CO")
}


</td>








<td>


<strong>


$

{
Number(
trabajador.saldo_pendiente || 0
)
.toLocaleString("es-CO")
}


</strong>


</td>









<td>




<button

className="btn-entrega"

onClick={()=>
registrarEntrega(
trabajador.id
)
}

>

💵 Entrega

</button>








<button

className="btn-editar"

onClick={()=>
navigate(
`/editar-trabajador/${trabajador.id}`
)
}

>

✏ Editar

</button>







<button

className="btn-eliminar"

onClick={()=>
eliminarTrabajador(
trabajador.id
)
}

>

🗑 Eliminar

</button>





</td>







</tr>


))


)


}



</tbody>



</table>



</div>






</div>


);



}


export default Trabajadores;