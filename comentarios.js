var commentArray = [];

document.getElementById("spinner-wrapper").style.display = "block";

//Muestro los comentarios
function showCommentList(array){
           
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let comentario = array[i];

        var estrellas = '';

        for(a=0; a<comentario.score; a++){
            estrellas += `<input id="r${a}" type="radio" name="puntuacion" value="1">
            <label class="puntuacion" for="r${a}">★</label>`;
        }

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                <h4 class="mb-1">`+ comentario.user +`</h4>
                </div>
                <div class="col"> 
                    <div class="d-flex w-100 justify-content-between">
                    <p class="mb-1">`+ comentario.dateTime +`</p>
                        <small class="puntuacion">` + estrellas + `</small>
                    </div>
                    <small class="text-muted">` + comentario.description + `</small>
                </div>
            </div>
        </div>
        `
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
}

//Funcion para enviar comentario nuevo
function enviar(){
    var comentario = [];
    var nombreusuario = document.getElementById("usercoment").value;
    var description = document.getElementById("descriptioncoment").value;

    var estrella = document.getElementsByName("puntuacion");
    for (let star of estrella){
        if(star.checked){
            var puntuacion = star.value;
        }
    }

    var fechahrs = new Date();
    var d = fechahrs.getDate();
    var día = (d < 10) ? '0' + d : d;
    var m = fechahrs.getMonth() + 1;
    var mes = (m < 10) ? '0' + m : m;
    var fecha = fechahrs.getFullYear() + `-` + mes + `-` + día ;
    var hora = fechahrs.getHours()  + `:` + fechahrs.getMinutes() + `:` + fechahrs.getSeconds();

    comentario.user = nombreusuario;
    comentario.dateTime = fecha + ` ` + hora;
    comentario.score = puntuacion;
    comentario.description = description;

    commentArray.push(comentario);
    mostrar(commentArray);
}

//Función Mostrar Comentario Nuevo
function mostrar(commentArray){
    let commentlist= "";

    for(i=0; i<commentArray.length; i++){
        let comentario = commentArray[i];

        var estrellas = '';

        for(a=0; a<comentario.score; a++){
            estrellas += `<input id="r${a}" type="radio" name="puntuacion" value="1">
            <label class="puntuacion" for="r${a}">★</label>`;
        }

        commentlist += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                <h4 class="mb-1">`+ comentario.user +`</h4>
                </div>
                <div class="col"> 
                    <div class="d-flex w-100 justify-content-between">
                    <p class="mb-1">`+ comentario.dateTime +`</p>
                    <span class="puntuacion">` + estrellas +`</span>
                    </div>
                    <small class="text-muted">` + comentario.description + `</small>
                </div>
            </div>
        </div>`

        document.getElementById("comentarios").innerHTML = commentlist;
    } 
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        document.getElementById("spinner-wrapper").style.display = "none";
        if (resultObj.status === "ok")
        {
            commentArray = resultObj.data;
            //Muestro los comentarios ordenados
            showCommentList(commentArray);
        }
    });
});
