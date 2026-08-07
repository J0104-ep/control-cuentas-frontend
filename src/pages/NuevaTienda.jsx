import {useState} from "react";
import {useNavigate} from "react-router-dom";

import api from "../api/axios";
import "../styles/nuevatienda.css";


function NuevaTienda(){


const navigate = useNavigate();


const [nombre,setNombre] = useState("");

const [dia,setDia] = useState("");





const guardarTienda = async(e)=>{


e.preventDefault();


try{


await api.post("/clientes",{

    nombre,

    dia

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



<h1>
🏪 Nueva Tienda
</h1>





<button

className="btn-dashboard-factura"

onClick={()=>navigate("/dashboard")}

>

🏠 Volver al Dashboard


</button>





<form onSubmit={guardarTienda}>


<div className="form-grupo">


<label>
Nombre de la tienda
</label>



<input

type="text"

value={nombre}

onChange={(e)=>
setNombre(e.target.value)
}

placeholder="Ej: Tienda El Centro"

required

/>


</div>







<div className="form-grupo">


<label>
Día de visita
</label>



<select

value={dia}

onChange={(e)=>
setDia(e.target.value)
}

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