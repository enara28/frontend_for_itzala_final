import React from "react";

export default function() {
    return(
        <div className="reservation-container">
            This is the reservation modal
            <form>
                <select className="day-selecction">
                    <option>
                        Lunes   
                    </option>
                    <option>
                        Martes   
                    </option>  
                    <option>
                        Miércoles   
                    </option>  
                    <option>
                        Jueves  
                    </option>  
                    <option>
                        Viernes   
                    </option>
                    <option>
                        Sábado   
                    </option>
                    <option>
                        Domingo  
                    </option>    
                </select>
                <input placeholder="¿Cuántas personas seréis?"/> 
            </form> 
        </div>
    )
}