import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import "./../styles/nuevaFactura.css";


function NuevaFactura() {


const navigate = useNavigate();



const usuario = JSON.parse(
    localStorage.getItem("usuario")
);




const obtenerFechaHora =()=>{


const ahora = new Date();


return {


fecha:
`${ahora.getFullYear()}-${String(
ahora.getMonth()+1
).padStart(2,"0")}-${String(
ahora.getDate()
).padStart(2,"0")}`,


hora:
ahora.toLocaleTimeString(
"es-CO",
{
hour:"2-digit",
minute:"2-digit",
hour12:false
}
)


};


};






const volverDashboard = ()=>{


if(usuario?.rol === "trabajador"){


    navigate("/dashboard-trabajador");


}else{


    navigate("/dashboard");


}


};







const [clientes,setClientes]=useState([]);

const [busqueda,setBusqueda]=useState("");



const [formulario,setFormulario]=useState({

cliente_id:"",
valor:"",
...obtenerFechaHora()

});



const [imagen,setImagen]=useState(null);

const [vistaPrevia,setVistaPrevia]=useState(null);






useEffect(()=>{


const cargarClientes=async()=>{


try{


const respuesta =
await api.get("/clientes");


setClientes(respuesta.data);



}catch(error){


console.error(
"Error cargando clientes",
error
);


}



};


cargarClientes();


},[]);








useEffect(()=>{


const intervalo=setInterval(()=>{


setFormulario(prev=>({


...prev,

...obtenerFechaHora()


}));


},60000);



return()=>clearInterval(intervalo);


},[]);









const cambiarCampo=(e)=>{


setFormulario({


...formulario,


[e.target.name]:e.target.value


});


};









const seleccionarImagen=(e)=>{


const archivo=e.target.files[0];


if(archivo){


setImagen(archivo);


setVistaPrevia(
URL.createObjectURL(archivo)
);


}


};









const guardarFactura=async(e)=>{


e.preventDefault();



try{



if(!usuario){


alert(
"Debe iniciar sesión primero"
);


navigate("/login");


return;


}





const datos=new FormData();




datos.append(
"cliente_id",
formulario.cliente_id
);



datos.append(
"usuario_id",
usuario.id
);



datos.append(
"valor",
formulario.valor
);



datos.append(
"fecha",
formulario.fecha
);



datos.append(
"hora",
formulario.hora
);





if(imagen){


datos.append(
"imagen",
imagen
);


}







await api.post(

"/facturas",

datos,

{

headers:{

"Content-Type":
"multipart/form-data"

}

}

);






alert(
"Factura creada correctamente"
);





volverDashboard();





}catch(error){



console.error(

"Error creando factura:",

error.response?.data || error

);




alert(

error.response?.data?.mensaje ||

"Error creando factura"

);



}



};









const clientesFiltrados =

clientes.filter(cliente=>


cliente.nombre

.toLowerCase()

.includes(

busqueda.toLowerCase()

)


);









return(



<div className="factura-container">


<div className="factura-card">


<h1>
Nueva Factura
</h1>





<form onSubmit={guardarFactura}>


<div className="form-grupo">


<label>
Buscar cliente
</label>



<input


type="text"


placeholder="🔎 Buscar cliente..."


value={busqueda}


onChange={
e=>setBusqueda(e.target.value)
}


/>





<select


name="cliente_id"


value={
formulario.cliente_id
}


onChange={cambiarCampo}


required


>



<option value="">
Seleccione cliente
</option>



{

clientesFiltrados.map(cliente=>(


<option

key={cliente.id}

value={cliente.id}

>


{cliente.nombre}


</option>


))


}



</select>



</div>








<div className="form-grupo">


<label>
Valor de venta
</label>



<input


type="number"


name="valor"


value={formulario.valor}


onChange={cambiarCampo}


placeholder="Ej: 50000"


required


/>



</div>










<div className="form-grupo">


<label>
Fecha
</label>



<input


type="text"


value={

formulario.fecha

.split("-")

.reverse()

.join("/")

}


readOnly


/>



</div>









<div className="form-grupo">


<label>
Hora
</label>



<input


type="text"


value={
formulario.hora
}


readOnly


/>



</div>










<div className="form-grupo">


<label>
Imagen factura
</label>



<div className="opciones-imagen">



<label className="btn-imagen">


📷 Tomar foto


<input


type="file"


accept="image/*"


capture="environment"


hidden


onChange={seleccionarImagen}


/>


</label>






<label className="btn-imagen">


🖼️ Galería


<input


type="file"


accept="image/*"


hidden


onChange={seleccionarImagen}


/>


</label>



</div>



</div>









{
vistaPrevia &&


<img


className="preview-factura"


src={vistaPrevia}


alt="Factura"


/>


}









<div className="botones">



<button

className="btn-guardar"

type="submit"

>

💾 Guardar Factura


</button>







<button


className="btn-cancelar"


type="button"


onClick={volverDashboard}


>


Cancelar


</button>



</div>





</form>


</div>


</div>


);


}



export default NuevaFactura;