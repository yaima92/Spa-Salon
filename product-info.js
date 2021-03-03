var product = [];

//Muestro las imágenes que aparecen en el json
function showImagesGallery(array){

    let htmlContentToAppend = "";
        
    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
               <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
          </div>
       </div>
       `
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
         }
    }


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productCostHTML = document.getElementById("productCost");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productsoldCountHTML = document.getElementById("soldCount");
            let productCategoryHTML = document.getElementById("category");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productsoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            productCostHTML.innerHTML = product.cost;
             
            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);


       //Muestro los Productos Relacionados
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){ 
            let products = resultObj.data;

            let html = "";
                product.relatedProducts.forEach(function(productIndex) {
                let productIterator = products[productIndex];
                html += `
                <div class="card" style= "width: 18rem;">
                    <img src="${productIterator.imgSrc}" class="card-img-top" alt="">
                    <div class= "card-body">
                        <h5 class="card-title">${productIterator.name}</h5>
                        <p class="card-text">${productIterator.description}</p>
                        <a href="" class="btn btn-link">Ver</a>
                    </div>
                </div>
                `
                document.getElementById("relatedProducts").innerHTML = html;
                });
            }
        });
    }
});
});
