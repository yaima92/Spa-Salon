var contenido = JSON.parse(localStorage.getItem("list"));//Obtengo datos de localStorage.
var list = "";
var cantidad = 0;
if (contenido != null && contenido.length > 0) {
  cantidad = contenido.length;
  contenido.forEach(producto => {
    list += `<div class="nombre"><strong>Nombre:</strong> ` + producto.nombre + ` ` + producto.snombre + ` ` + producto.papellido + ` ` + producto.sapellido + `</div>
        <div><strong>Fecha de nacimiento:</strong> `+ producto.fecha + `</div>
        <div><strong>Correo Electrónico:</strong> `+ producto.email + `</div>
        <div><strong>Teléfono:</strong> `+ producto.phone + `</div>
        `
  });
}
document.getElementById('info').innerHTML = list;

//declarando los elementos de html

const imgDiv = document.querySelector('.avatar');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');


//usuario mousehover de img
imgDiv.addEventListener('load',function(){
  localStorage.imagen = imgDiv.src;
});
imgDiv.addEventListener('mouseenter', function () {
  uploadBtn.style.display = "block"
});

//usuario hover out de la img
imgDiv.addEventListener('mouseleave', function () {
  uploadBtn.style.display = "none"
});

//cuando elegimos cambiar la foto

file.addEventListener('change', function () {
  const choosedFile = this.files[0];

  if (choosedFile) {
    const reader = new FileReader();

    reader.addEventListener('load', function () {
      img.setAttribute('src', reader.result);
    });

    reader.readAsDataURL(choosedFile);
  }
});

document.addEventListener('DOMContentLoaded', () => {

  // Input File
  const inputImage = document.querySelector('#file');
  // Nodo donde estará el editor
  const editor = document.querySelector('#editor');
  // El canvas donde se mostrará la previa
  const miCanvas = document.querySelector('#preview');
  // Contexto del canvas
  const contexto = miCanvas.getContext('2d');
  // Ruta de la imagen seleccionada
  let urlImage = undefined;
  // Evento disparado cuando se adjunte una imagen
  inputImage.addEventListener('change', abrirEditor, false);

  /**
   * Método que abre el editor con la imagen seleccionada
   */
  function abrirEditor(e) {
      // Obtiene la imagen
      urlImage = URL.createObjectURL(e.target.files[0]);

      // Borra editor en caso que existiera una imagen previa
      editor.innerHTML = '';
      let cropprImg = document.createElement('img');
      cropprImg.setAttribute('id', 'croppr');
      editor.appendChild(cropprImg);

      // Limpia la previa en caso que existiera algún elemento previo
      contexto.clearRect(0, 0, miCanvas.width, miCanvas.height);

      // Envia la imagen al editor para su recorte
      document.querySelector('#croppr').setAttribute('src', urlImage);

      // Crea el editor
      new Croppr('#croppr', {
          aspectRatio: 1,
          startSize: [70, 70],
          onCropEnd: recortarImagen
      })
  }

  /**
   * Método que recorta la imagen con las coordenadas proporcionadas con croppr.js
   */
  function recortarImagen(data) {
      // Variables
      const inicioX = data.x;
      const inicioY = data.y;
      const nuevoAncho = data.width;
      const nuevaAltura = data.height;
      const zoom = 1;
      let imagenEn64 = '';
      // La imprimo
      miCanvas.width = nuevoAncho;
      miCanvas.height = nuevaAltura;
      // La declaro
      let miNuevaImagenTemp = new Image();
      // Cuando la imagen se carge se procederá al recorte
      miNuevaImagenTemp.onload = function() {
          // Se recorta
          contexto.drawImage(miNuevaImagenTemp, inicioX, inicioY, nuevoAncho * zoom, nuevaAltura * zoom, 0, 0, nuevoAncho, nuevaAltura);
          // Se transforma a base64
          imagenEn64 = miCanvas.toDataURL("image/jpeg");
          // Mostramos el código generado
          document.querySelector('#base64').textContent = imagenEn64;
      }
      // Proporciona la imagen cruda, sin editarla por ahora
      miNuevaImagenTemp.src = urlImage;
  }
});