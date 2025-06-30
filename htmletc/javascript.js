const hamburguer = document.querySelector('.hamburguer')
const menu = document.querySelector('.menu-navegacion')

// console.log (menu)
// console.log (hamburguer)

hamburguer.addEventListener('click' , ()=>{
   menu.classList.toggle("spread")
})

window.addEventListener('click', e => {
    if(menu.classList.contains('spread') && e.target != menu &&   e.target != hamburguer  ){
           
        menu.classList.toggle("spread")
    }
})

  

    document.addEventListener('DOMContentLoaded', () => {
        const gaValue = getGAValue();
        const glValue = getGLValue();

        if (gaValue) {
            appendQueryParameterToLinks('_ga', gaValue);
            pushHiddenInputField('_ga', gaValue);
        }

        if (glValue) {
            appendQueryParameterToLinks('_gl', glValue);
            pushHiddenInputField('_gl', glValue);
        }
    });


/* fechas */ 
let fechaSeleccionada = null;

        flatpickr("#calendar", {
            mode: "range",
            dateFormat: "Y-m-d",
            minDate: "today",
            onClose: function(selectedDates) {
                if (selectedDates.length === 2) {
                    fechaSeleccionada = {
                        inicio: selectedDates[0].toISOString().split('T')[0],
                        fin: selectedDates[1].toISOString().split('T')[0]
                    };
                }
            }
        });

        function reservar() {
            if (fechaSeleccionada) {
                document.getElementById("resultado").innerText =
                    `Has reservado del ${fechaSeleccionada.inicio} al ${fechaSeleccionada.fin}`;
            } else {
                alert("Por favor, selecciona un rango de fechas.");
            }
        }

        /* boton con la base de datos sql */ 


/* formulario */
    document.getElementById('formulario_reserva').addEventListener('submit', async function(e) {
  e.preventDefault();

  const datos = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    telefono: document.getElementById('telefono').value,
    identrada: document.getElementById('identrada').value,
    idsaida: document.getElementById('idsaida').value,
    idadultos: document.getElementById('idadultos').value
  };

  const response = await fetch('http://localhost:3000/reservas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });

  const resultado = await response.json();
  alert(resultado.mensaje);
});


        /*  */ 

     