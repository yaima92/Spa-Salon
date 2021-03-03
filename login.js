//Funcion para Iniciar Sesión
function login(usuario){
   var usuario = document.getElementById("usuario").value;
   var contrasena = document.getElementById("pass").value;

   if(usuario == "" || contrasena ==""){
      alert("Los datos que ingresó no están correctos.");
   }else{
      localStorage.setItem("usuario", usuario);
      alert ("Se guardó " + localStorage.getItem("usuario"));
      location.href="cover.html";
   }
   
    if (usuario!=""&& contrasena!=""){
      location.href="cover.html";
      auxi = 1;
   }else{
      alert("Usuario y/o contraseña incorrectos. Por favor intente nuevamente");
         }
       };