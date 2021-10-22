$(".js-select2").each(function(){
    $(this).select2({
        minimumResultsForSearch: 20,
        dropdownParent: $(this).next('.dropDownSelect2')
    });
});
$('.parallax100').parallax100();
$('.gallery-lb').each(function() { // the containers for all your galleries
    $(this).magnificPopup({
        delegate: 'a', // the selector for gallery item
        type: 'image',
        gallery: {
            enabled:true
        },
        mainClass: 'mfp-fade'
    });
});
$('.js-addwish-b2').on('click', function(e){
    e.preventDefault();
});

$('.js-addwish-b2').each(function(){
    var nameProduct = $(this).parent().parent().find('.js-name-b2').html();
    $(this).on('click', function(){
        swal(nameProduct, "is added to wishlist !", "success");

        $(this).addClass('js-addedwish-b2');
        $(this).off('click');
    });
});

$('.js-addwish-detail').each(function(){
    var nameProduct = $(this).parent().parent().parent().find('.js-name-detail').html();

    $(this).on('click', function(){
        swal(nameProduct, "is added to wishlist !", "success");

        $(this).addClass('js-addedwish-detail');
        $(this).off('click');
    });
});

/*---------------------------------------------*/

$('.js-addcart-detail').each(function(){
    let nameProduct = $(this).parent().parent().parent().parent().find('.js-name-detail').html();
    $(this).on('click', function(){
        let id = this.getAttribute('id');
        let cant = document.querySelector('#cant-product').value;
        if(isNaN(cant) || cant < 1)
        {
            swal("","La cantidad debe ser mayor o igual que 1", "error");
            return;
        }
        swal({
            title: `${nameProduct} x ${cant}`,
            text: `¿Deseas agregar este producto a su carrito de compras?`,
            type: "info",
            showCancelButton: true,
            confirmButtonText: "Si, agregar!",
            cancelButtonText: "No, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: true
        }, function(isConfirm){
            if(isConfirm)
            {
                let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                let ajaxUrl = base_url+'/Tienda/addCarrito';
                let formData = new FormData();
                formData.append('id',id);
                formData.append('cant',cant);

                request.open("POST",ajaxUrl,true);
                request.send(formData);
                request.onreadystatechange = function(){
                    if(request.readyState != 4) return;
                    if(request.status == 200)
                    {
                        let objData = JSON.parse(request.responseText);
                        if(objData.status){
                            document.querySelector('#productosCarrito').innerHTML = objData.htmlCarrito;
                            document.querySelector('#cantCarrito').setAttribute("data-notify",objData.cantCarrito);
                            swal(`${nameProduct} x ${cant}`, "ha sido añadido a tu carrito!", "success");
                        }
                        else{
                            swal("",objData.msg, "error");
                        }
                    }
                    return false;
                }
            }
        });
    });
});
$('.js-pscroll').each(function(){
    $(this).css('position','relative');
    $(this).css('overflow','hidden');
    var ps = new PerfectScrollbar(this, {
        wheelSpeed: 1,
        scrollingThreshold: 1000,
        wheelPropagation: false,
    });

    $(window).on('resize', function(){
        ps.update();
    })
});

function fntdelItem(element){
	//Option 1 = Modal
	//Option 2 = Vista Carrito
	let option = element.getAttribute("op");
	let idpr = element.getAttribute("idpr");
	if(option == 1 || option == 2 ){

		let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	    let ajaxUrl = base_url+'/Tienda/delCarrito'; 
	    let formData = new FormData();
	    formData.append('id',idpr);
	    formData.append('option',option);
	    request.open("POST",ajaxUrl,true);
	    request.send(formData);
	    request.onreadystatechange = function(){
	        if(request.readyState != 4) return;
	        if(request.status == 200){
	        	let objData = JSON.parse(request.responseText);
	        	if(objData.status){
	        		if(option == 1){
			            document.querySelector("#productosCarrito").innerHTML = objData.htmlCarrito;
			            const cants = document.querySelectorAll("#cantCarrito");
						cants.forEach(element => {
							element.setAttribute("data-notify",objData.cantCarrito)
						});
	        		}else{
	        			element.parentNode.parentNode.remove();
	        			document.querySelector("#subTotalCompra").innerHTML = objData.subTotal;
	        			document.querySelector("#totalCompra").innerHTML = objData.total;
	        			if(document.querySelectorAll("#tblCarrito tr").length == 1){
	            			window.location.href = base_url;
	            		}
	        		}
	        	}else{
	        		swal("", objData.msg , "error");
	        	}
	        } 
	        return false;
	    }

	}
}