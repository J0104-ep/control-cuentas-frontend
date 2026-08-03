import {useEffect,useState} from "react";
import {useNavigate,useParams} from "react-router-dom";

import api from "../api/axios";
import "../styles/nuevatienda.css";


function EditarTienda(){


const navigate=useNavigate();

const {id}=useParams();


const [nombre,setNombre]=useState("");




useEffect(()=>{


cargarTienda();


},[]);





const cargarTienda=async()=>{


try{


const respuesta=
await api.get(`/clientes/${id}`);



setNombre(respuesta.data.nombre);



}catch(error){

console.log(error);

}


};






const actualizar=async(e)=>{


e.preventDefault();


try{


await api.put(`/clientes/${id}`,{

nombre

});



alert("Tienda actualizada");


navigate("/tiendas");



}catch(error){


alert("Error actualizando");


}


};






return(


<div className="tienda-container">


<div className="tienda-card">



<div className="factura-header">


<div className="titulo-factura">

<h1>
✏ Editar Tienda
</h1>


<p>
Actualizar información
</p>


</div>



<button

className="btn-dashboard-factura"

onClick={()=>navigate("/dashboard")}

>

🏠 Volver al Dashboard


</button>


</div>






<form onSubmit={actualizar}>


<div className="form-grupo">


<label>
Nombre tienda
</label>


<input

value={nombre}

onChange={(e)=>setNombre(e.target.value)}

required

/>


</div>




<div className="botones">


<button

className="btn-guardar"

>

💾 Guardar Cambios


</button>



<button

type="button"

className="btn-cancelar"

onClick={()=>navigate("/tiendas")}

>

Cancelar


</button>



</div>


</form>


</div>


</div>


);


}


export default EditarTienda;