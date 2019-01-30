var agendaContactos = (function () {
    var botones = document.getElementById("botones");
    var msgGuardado = document.getElementById("msgGuardado");
    var msgError = document.getElementById("msgError");
    
    
    botones.onclick = function(evento){
        let nombreContacto = document.getElementById("nombreDelContacto").value;
        let detallesContacto = {};
        detallesContacto.telefono = document.getElementById("telefonoDelContacto").value;
        detallesContacto.email = document.getElementById("emailDelContacto").value;
        switch (evento.target.dataset.action) {
            case 'guardar': guardar(nombreContacto,detallesContacto); break;
            case 'recuperar': recuperar(nombreContacto); break;
            case 'eliminar': eliminar(nombreContacto); break;
            case 'eliminarTodos': eliminarTodos(); break;
        }
    }
    
    window.addEventListener('storage', function(evento){
        muestraContactos();
    });
    
    function guardar(nombre, detalles){
        const regexEmail = /[a-zA-Z0-9_-]+@(\w+\.){1,}([a-z])*/gm;
        const regexTelefono = /^[9|6]{1}([\d]{2}[-]*){3}[\d]{2}/mg;
        if(regexEmail.test(detalles.email) && regexTelefono.test(detalles.telefono)){
            localStorage.setItem(nombre, JSON.stringify(detalles));
            msgGuardado.style.display = 'block';
            msgError.style.display = 'none';
            muestraContactos();
        }else{
            msgError.style.display = 'block';
            msgGuardado.style.display = 'none';
        }
    }
    
    function recuperar(nombre){
        let contactoRecuperado = JSON.parse(localStorage.getItem(nombre));
        if(contactoRecuperado){
            document.getElementById("telefonoDelContacto").value = contactoRecuperado.telefono;
            document.getElementById("emailDelContacto").value = contactoRecuperado.email;
        }
        
    }
    
    function eliminar(nombre){
        localStorage.removeItem(nombre);
        muestraContactos();
    }
    
    function eliminarTodos(){
        localStorage.clear();
        muestraContactos();
    }
    
    function muestraContactos(){
        document.getElementById("listaContactos").innerHTML = "";
        for ( var i = 0; i < localStorage.length; i++ ) {
            let nombre = localStorage.key(i);
            let informacion = JSON.parse(localStorage.getItem(localStorage.key(i)));
            var infoContacto = DOMPurify.sanitize(`<div id = "infoContacto" class="card">
                  <div class="card-body">
                    <img id = "imagenContacto" src="https://api.adorable.io/avatars/285/${nombre}.png" alt="Avatar usuario">
                    <h6 id = "nombreRecuperado" class="card-text">${nombre}</h6>
                    <h6 id = "telefonoRecuperado" class="card-text">${informacion.telefono}</h6>
                    <h6 id = "correoRecuperado" class="card-text">${informacion.email}</h6>
                  </div>
                </div>`);
            document.getElementById("listaContactos").innerHTML += infoContacto;
        }
    }

    return {
        init: function(){
            msgError.style.display = 'none';
            msgGuardado.style.display = 'none';
            muestraContactos();
        }
    }
})();

agendaContactos.init();

