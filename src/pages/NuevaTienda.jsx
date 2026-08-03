import {useState} from "react";
import {useNavigate} from "react-router-dom";

import api from "../api/axios";
import "../styles/nuevatienda.css";


function NuevaTienda(){


const navigate=useNavigate();



const [nombre,setNombre]=useState("");




const guardarTienda=async(e)=>{


e.preventDefault();


try{


await api.post("/clientes",{

    nombre

});



alert("Tienda creada correctamente");


navigate("/tiendas");



}catch(error){


console.error(error);


alert("Error creando tienda");


}



};




return(

<div className="tienda-container">


<div className="tienda-card">



<div className="factura-header">


<div className="titulo-factura">

<h1>
🏪 Nueva Tienda
</h1>


<p>
Registro de nueva tienda
</p>


</div>



<button

className="btn-dashboard-factura"

onClick={()=>navigate("/dashboard")}

>

🏠 Volver al Dashboard


</button>


</div>





<form onSubmit={guardarTienda}>


<div className="form-grupo">


<label>
Nombre de la tienda
</label>


<input

type="text"

value={nombre}

onChange={(e)=>setNombre(e.target.value)}

placeholder="Ej: Tienda El Centro"

required

/>


</div>





<div className="botones">


<button

className="btn-guardar"

>

💾 Guardar Tienda


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


export default NuevaTienda;