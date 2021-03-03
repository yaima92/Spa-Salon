var cartList=[]; // Ponemos la lista como global, así la podemos usar en todo
//el script
var envio=0; //envio es para calcular el porcentaje



function showArticlesList(cartList){

    let htmlContentToAppend = "";
    for(let i = 0; i < cartList.articles.length; i++){
        let cartArticles = cartList.articles[i];

            htmlContentToAppend += `
            <tr>
             <td scope="col-lg-12">
             <img width=100 src="${cartArticles.src}" class="img-thumbnail">
             </td>
             <td stcope="col"><strong> `+ cartArticles.name +`</strong></td>
             <td scope="col" id="productCostInput">`+ cartArticles.currency +``+ cartArticles.unitCost +`</td>
             <td scope="col"><input type="number" class="form-control" onchange="calcular()" id="productCountInput${i}" placeholder="" required="" value=${cartArticles.count} min="0"></th>
             <td scope="col"><strong id="subtotal${i}"></strong></td>
             <td scope="col"><button id="boton-vaciar" type="button" class="borrar-produto btn btn-danger" onclick="articles(${i})" name="${cartArticles.name}">X</button></td>
             </tr>
            `            
        }
        document.getElementById("articulos").innerHTML = htmlContentToAppend;
        calcular();
    };
    
    let productCost = 0;
    let productCount = 0;
    let comissionPercentage = 0.15;
    let MONEY_SYMBOL = "$";
    let DOLLAR_CURRENCY = "Dólares (USD)";
    let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
    let DOLLAR_SYMBOL = "USD ";
    let PESO_SYMBOL = "UYU ";

    function calcular(){
        var totallinea=0; //resultado de costo unitario * cantidad;
        var subtotal = 0; //resultado de sumar totallinea
        var total=0; //resultado de sumar subtotales;
        for( i = 0; i < cartList.articles.length; i++){
            var cantidad=parseInt(document.getElementById('productCountInput' + i).value); //obtengo la cantidad
            if(cartList.articles[i].currency == "UYU"){ 
            totallinea= parseFloat((cartList.articles[i].unitCost)*cantidad/ 40);//calculo el precio
            } else if(cartList.articles[i].currency == "USD"){
                totallinea= parseFloat(cartList.articles[i].unitCost)*cantidad;
            }
            document.getElementById('subtotal'+i).innerHTML= totallinea + "USD";//escribo
            subtotal+=totallinea; //sumo al subtotal
        }
        envio=subtotal * comissionPercentage;
        total=subtotal + envio;
        document.getElementById('envio').innerHTML= MONEY_SYMBOL + envio.toFixed(2);   
        document.getElementById('subtotal').innerHTML= MONEY_SYMBOL + subtotal.toFixed(2);
        document.getElementById('total').innerHTML= MONEY_SYMBOL + total.toFixed(2); 
    }

    //Función borrar 
    function articles(i){ 
        cartList.articles.splice(i, 1)
            showArticlesList(cartList);
            calcular();
   }

    const cliente = document.getElementById('cliente');
    const correo = document.getElementById('correo');
    const pago = document.getElementById('pago')

    function procesarCompra(e){
        e.preventDefault();

        if(cartList.articles.length === 0){
            Swal.fire({ 
                icon: 'error',
                title: 'Oops...',
                text: 'No hay productos, seleccione alguno',
                timer: 2000,
                showConfirmButton: false
            }).then(function(){
                window.location = 'cart.html';
            })
        }
        else if(cliente.value === '' || correo.value === '' || cname.value === '' || ccnum.value === '' || expmonth.value === '' || expyear.value === '' || cvv.value === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Complete todos los campos requeridos',
                timer: 2000,
                showConfirmButton: false 
        })
        correo.classList.add('is-invalid');
          correo.classList.remove('is-valid');
          cliente.classList.add('is-invalid');
          cliente.classList.remove('is-valid');
          cname.classList.add('is-invalid');
          cname.classList.remove('is-valid');
          ccnum.classList.add('is-invalid');
          ccnum.classList.remove('is-valid');
          expmonth.classList.add('is-invalid');
          expmonth.classList.remove('is-valid');
          expyear.classList.add('is-invalid');
          expyear.classList.remove('is-valid');
          cvv.classList.add('is-invalid');
          cvv.classList.remove('is-valid');
    }else{

        correo.classList.remove('is-invalid');
          correo.classList.add('is-valid');
          cliente.classList.remove('is-invalid');
         cliente.classList.add('is-valid');
         cname.classList.remove('is-invalid');
         cname.classList.add('is-valid');
         ccnum.classList.remove('is-invalid');
         ccnum.classList.add('is-valid');
         expmonth.classList.remove('is-invalid');
         expmonth.classList.add('is-valid');
         expyear.classList.remove('is-invalid');
         expyear.classList.add('is-valid');
        cvv.classList.remove('is-invalid');
        cvv.classList.add('is-valid');

        const cargandoGif = document.querySelector('#cargando');
        cargandoGif.style.display = 'block';

        const enviado = document.createElement('img');
        enviado.src = 'img/mail.gif';
        enviado.style.display = 'block';
        enviado.width = '150';

        setTimeout(()=>{
            cargandoGif.style.display = 'none';
            document.querySelector('#loaders').appendChild(enviado);
            setTimeout(()=>{
                  enviado.remove();
                window.location = "cover.html";
            },1500);
        }, 3000);
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.*/
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            cartList = resultObj.data;
            //Muestro la lista de articulos.
            showArticlesList(cartList);
    }

    //Calculo la comisión de envío.
    document.getElementById("premium").addEventListener("change", function(){
        comissionPercentage = 0.15;
        calcular();
    });
    
    document.getElementById("express").addEventListener("change", function(){
        comissionPercentage = 0.07;
        calcular();
    });

    document.getElementById("standard").addEventListener("change", function(){
        comissionPercentage = 0.05;
        calcular();
    });

    //Cambio según tipo de monedas.
    document.getElementById("productCurrency").addEventListener("change", function(){
        if (this.value == DOLLAR_CURRENCY)
        {
            MONEY_SYMBOL = DOLLAR_SYMBOL;
        } 
        else if (this.value == PESO_CURRENCY)
        {
            MONEY_SYMBOL = PESO_SYMBOL;
        }

        calcular();
    });

    document.getElementById("boton-vaciar").addEventListener("click", function(){
        
        calcular();
    });

    document.getElementById('procesar-compra').addEventListener('click', procesarCompra);
});
});