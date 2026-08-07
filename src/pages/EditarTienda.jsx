import {useEffect,useState} from "react";
import {useNavigate,useParams} from "react-router-dom";

import api from "../api/axios";
import "../styles/nuevatienda.css";


function EditarTienda(){

const navigate = useNavigate();

const {id} = useParams();


const [nombre,setNombre] = useState("");

const [dia,setDia] = useState("");



useEffect(()=>{

cargarTienda();

},[]);





const cargarTienda = async()=>{


try{


const respuesta = await api.get(`/clientes/${id}`);



setNombre(
    respuesta.data.nombre
);


setDia(
    respuesta.data.dia || ""
);



}catch(error){


console.log(error);


}


};







const actualizar = async(e)=>{


e.preventDefault();



try{


await api.put(`/clientes/${id}`,{


nombre,

dia


});



alert("Tienda actualizada");


navigate("/tiendas");



}catch(error){


console.log(error);


alert("Error actualizando");


}


};






return(


<div className="tienda-container">


<div className="tienda-card">


<h1>

✏ Editar Tienda

</h1>





<button

type="button"

className="btn-dashboard-factura"

onClick={()=>navigate("/dashboard")}

>

🏠 Volver al Dashboard

</button>







<form onSubmit={actualizar}>


<div className="form-grupo">


<label>

Nombre de la tienda

</label>



<input

value={nombre}

onChange={(e)=>setNombre(e.target.value)}

required

/>



</div>








<div className="form-grupo">


<label>

Día de visita

</label>



<select

value={dia}

onChange={(e)=>setDia(e.target.value)}

required

>


<option value="">

Seleccione día

</option>


<option value="Lunes">
Lunes
</option>


<option value="Martes">
Martes
</option>


<option value="Miércoles">
Miércoles
</option>


<option value="Jueves">
Jueves
</option>


<option value="Viernes">
Viernes
</option>


<option value="Sábado">
Sábado
</option>


<option value="Domingo">
Domingo
</option>


</select>



</div>









<div className="botones">


<button

className="btn-guardar"

type="submit"

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