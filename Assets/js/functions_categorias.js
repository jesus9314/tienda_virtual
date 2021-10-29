'use strict'

//declaración de variables
let divLoading = document.querySelector("#divLoading");
let tableCategorias;
//
//
//objeto CATEGORIAS
let categorias = 
{
  ViewInfo: (idcategoria) => {
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = `${base_url}/Categorias/getCategoria/${idcategoria}`;
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
          let objData = JSON.parse(request.responseText);
          if(objData.status)
            {
                let estado = objData.data.status == 1 ? 
                '<span class="badge badge-success">Activo</span>' : 
                '<span class="badge badge-danger">Inactivo</span>';
                document.querySelector("#celId").innerHTML = objData.data.idcategoria;
                document.querySelector("#celNombre").innerHTML = objData.data.nombre;
                document.querySelector("#celDescripcion").innerHTML = objData.data.descripcion;
                document.querySelector("#celEstado").innerHTML = estado;
                document.querySelector("#imgCategoria").innerHTML = `<img src="${objData.data.url_portada}" height="100px" class="img-thumbnail"></img>`;
                $('#modalViewCategoria').modal('show');
            }else{
                swal("Error", objData.msg , "error");
            }
        }
    }
  },  
  EditInfo: (idcategoria) => {
    document.querySelector('#titleModal').innerHTML ="Actualizar Categoría";
    document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
    document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
    document.querySelector('#btnText').innerHTML ="Actualizar";
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = `${base_url}/Categorias/getCategoria/${idcategoria}`;
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            let objData = JSON.parse(request.responseText);
            if (objData.status) {
                document.querySelector("#idCategoria").value = objData.data.idcategoria;
                document.querySelector("#txtNombre").value = objData.data.nombre;
                document.querySelector("#txtDescripcion").value = objData.data.descripcion;
                document.querySelector('#foto_actual').value = objData.data.portada;
                document.querySelector("#foto_remove").value = 0;

                if (objData.data.status == 1) {
                    document.querySelector("#listStatus").value = 1;
                } else {
                    document.querySelector("#listStatus").value = 2;
                }
                $('#listStatus').selectpicker('render');

                if (document.querySelector('#img')) {
                    document.querySelector('#img').src = objData.data.url_portada;
                } else {
                    document.querySelector('.prevPhoto div').innerHTML = "<img id='img' src=" + objData.data.url_portada + " height='20px' class='img-thumbnail'>";
                }

                if (objData.data.portada == 'portada_categoria.png') {
                    document.querySelector('.delPhoto').classList.add("notBlock");
                } else {
                    document.querySelector('.delPhoto').classList.remove("notBlock");
                }

                $('#modalFormCategorias').modal('show');

            } else {
                swal("Error", objData.msg, "error");
            }
        }
    }
  },
  DelInfo: (idcategoria) => {
    swal({
        title: "Eliminar Categoría",
        text: "¿Realmente quiere eliminar al categoría?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        closeOnConfirm: false,
        closeOnCancel: true
    }, (isConfirm) => {
        if (isConfirm) 
        {
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = `${base_url}/Categorias/delCategoria`;
            let strData = "idCategoria="+idcategoria;
            request.open("POST",ajaxUrl,true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(strData);
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    let objData = JSON.parse(request.responseText);
                    if(objData.status)
                    {
                        swal("Eliminar!", objData.msg , "success");
                        tableCategorias.api().ajax.reload(null,false);
                    }else{
                        swal("Atención!", objData.msg , "error");
                    }
                }
            }
        }
    });
  }
};
//fin CATEGORIAS
//
//
//objeto PAGE
let page = 
{
  openModal: () => {
    document.querySelector('#idCategoria').value="";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML = "Guardar";
    document.querySelector('#titleModal').innerHTML = "Nueva Categoria";
    document.querySelector("#formCategoria").reset();
    $('#modalFormCategorias').modal('show'); 
  },
  removePhoto: () => {
    document.querySelector('#foto').value ="";
	  document.querySelector('.delPhoto').classList.add("notBlock");
	  document.querySelector('#img').remove();
  }
};
//fin PAGE
//
//
//funciones al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  
  //inicializamos el DATATABLE
  tableCategorias = $('#tableCategorias').dataTable({
        "scrollX":true,
        "stateSave":true,
        "aProcessing":true,
        "stateSave": true,
        "fixedHeader": true,
        "resonsieve":"true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "dom":'lBfrtip',
        "order":[[0,"asc"]], 
        "language": 
        {
            url: `${base_url}/Assets/js/config/dt_es.json`
        },
        "ajax":
        {
            "url": `${base_url}/Categorias/getCategorias`,
            "dataSrc":""
        },
        "columns":
        [
            {"data":"idcategoria", "width": "5%", "className": "text-center"},
            {"data":"nombre", "width": "10%"},
            {"data":"descripcion"},
            {"data":"status", "width": "5%", "className": "text-center", 
               render : (data) =>
                {
                  if(data == 1)
                  {
                    return '<span class="badge badge-success">Activo</span>';
                  }
                  else
                  {
                    return '<span class="badge badge-danger">Inactivo</span>';
                  }
              }

            },
            {"data":"options" , "width":"10%"}
        ],
        "buttons": [
            {
            	"extend": "copyHtml5",
            	"text":"<i class='far fa-copy'></i> Copiar",
            	"titleAttr": "Copiar",
            	"className": "btn-sm btn-secondary",
            	"title":"tabla_categorias",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 3]
            	}
            },
            {
            	"extend": "excelHtml5",
            	"text":"<i class='far fa-file-excel'></i> Excel",
            	"titleAttr": "Exportar a Excel",
            	"className": "btn-sm btn-success",
            	"title":"tabla_categorias",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 3]
            	}
            },
            {
            	"extend": "pdfHtml5",
            	"text":"<i class='far fa-file-pdf'></i> PDF",
            	"titleAttr": "Exportar a PDF",
            	"className": "btn-sm btn-danger",
            	"messageTop":"Tabla de usuarios",
            	"title":"tabla_categorias",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 3]
            	}
            },
            {
            	"extend": "csvHtml5",
            	"text":"<i class='fas fa-file-csv'></i> CSV",
            	"titleAttr": "Exportar a CSV",
            	"className": "btn-sm btn-info",
            	"title":"tabla_categorias",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 3]
            	}
            }
        ]
}, false)//fin DATATABLE
  
  //Upload FOTO
  if(document.querySelector("#foto"))
	{
    let foto = document.querySelector("#foto");
	    foto.onchange = (e) =>
	    {
	        let uploadFoto = document.querySelector("#foto").value;
	        let fileimg = document.querySelector("#foto").files;
	        let nav = window.URL || window.webkitURL;
	        let contactAlert = document.querySelector('#form_alert');
	        if(uploadFoto !='')
	        {
	            let type = fileimg[0].type;
	            let name = fileimg[0].name;
	            if(type != 'image/jpeg' && type != 'image/jpg' && type != 'image/png')
	            {
	                contactAlert.innerHTML = '<p class="errorArchivo">El archivo no es válido.</p>';
	                if(document.querySelector('#img')){
	                    document.querySelector('#img').remove();
	                }
	                document.querySelector('.delPhoto').classList.add("notBlock");
	                foto.value="";
	                return false;
	            }
	            else
	            {  
	                    contactAlert.innerHTML='';
	                    if(document.querySelector('#img'))
	                    {
	                        document.querySelector('#img').remove();
	                    }
	                    document.querySelector('.delPhoto').classList.remove("notBlock");
	                    let objeto_url = nav.createObjectURL(this.files[0]);
	                    document.querySelector('.prevPhoto div').innerHTML = `<img id='img' src=${objeto_url}>`;
	            }
	        }else{
	            alert("No selecciono foto");
	            if(document.querySelector('#img')){
	                document.querySelector('#img').remove();
	            }
	        }
	    }
	}
  //fin upload FOTO
  //
  //
  //Remover FOTO
	if(document.querySelector(".delPhoto")){
	    let delPhoto = document.querySelector(".delPhoto");
	    delPhoto.onclick = (e) => {
	        page.removePhoto();
	    }
	}
  //fin remover FOTO
  //
  //
	//Nueva Categoría
    let formCategoria = document.querySelector("#formCategoria");
    formCategoria.onsubmit = (e) => {
        e.preventDefault();
        let intIdRol = document.querySelector('#idCategoria').value;
        let strNombre = document.querySelector('#txtNombre').value;
        let strDescripcion = document.querySelector('#txtDescripcion').value;
        let intStatus = document.querySelector('#listStatus').value;        
        if(strNombre == '' || strDescripcion == '' || intStatus == '')
        {
            swal("Atención", "Todos los campos son obligatorios." , "error");
            return false;
        }
        divLoading.style.display ="flex"
        let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        let ajaxUrl = `${base_url}/Categorias/setCategoria`; 
        let formData = new FormData(formCategoria);
        request.open("POST",ajaxUrl,true);
        request.send(formData);
        request.onreadystatechange = function(){
           if(request.readyState == 4 && request.status == 200){
                let objData = JSON.parse(request.responseText);
                if(objData.status)
                {
                    $('#modalFormCategorias').modal("hide");
                    formCategoria.reset();
                    swal("Categorías", objData.msg ,"success");
                    page.removePhoto();
                    tableCategorias.api().ajax.reload(null,false);
                }else{
                    swal("Error", objData.msg , "error");
                }              
            }
            divLoading.style.display = "none";
            return false; 
        } 
    }
  //fin nueva categoria
});