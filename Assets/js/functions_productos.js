'use strict'

//declaracion de variables
let tableProductos;
//agregamos el archivo
document.write(`<script src="${base_url}/Assets/js/plugins/JsBarcode.all.min.js"></script>`);
//
$(document).on('focusin', (e) => {
    if ($(e.target).closest(".tox-dialog").length) {
        e.stopImmediatePropagation();
    }
});
document.addEventListener('DOMContentLoaded', () => {

    //datatable PRODUCTOS
    tableProductos = $('#tableProductos').dataTable({
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
            "url": `${base_url}/Productos/getProductos`,
            "dataSrc":""
        },
        "columns":
        [
            {"data":"idproducto", "width": "5%", "className": "text-center"},
            {"data":"codigo", "width": "5%", "className": "text-center"},
            {"data":"nombre", "width": "30%"},
            {"data":"stock",
            render:
                (data) => {
                    if (data <= 0) {
                        return '<span class="badge badge-secondary">Sin stock</span>';
                    }
                    if (data <= 5) {
                        return '<span class="badge badge-danger">' + data + '</span>';
                    }
                    else if (data > 5 && data < 15) {
                        return '<span class="badge badge-warning">' + data + '</span>';
                    }

                    else {
                        return '<span class="badge badge-success">' + data + '</span>';
                    }
                },
            "width": "5%", "className": "text-center"},
            {"data":"precio", "width": "7%", "className": "text-center"},
            {"data":"status", "width": "5%", "className": "text-center",
            render: 
                (data) =>
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
            {"data":"options" , "width":"5%"}
        ],
        "buttons": [
            {
                "extend": "copyHtml5",
                "text":"<i class='far fa-copy'></i> Copiar",
                "titleAttr": "Copiar",
                "className": "btn-sm btn-secondary",
                "title":"tabla_productos",
                "exportOptions":{
                    "columns": [ 0, 1, 2, 3, 4, 5]
                }
            },
            {
                "extend": "excelHtml5",
                "text":"<i class='far fa-file-excel'></i> Excel",
                "titleAttr": "Exportar a Excel",
                "className": "btn-sm btn-success",
                "title":"tabla_productos",
                "exportOptions":{
                    "columns": [ 0, 1, 2, 3, 4, 5]
                }
            },
            {
                "extend": "pdfHtml5",
                "text":"<i class='far fa-file-pdf'></i> PDF",
                "titleAttr": "Exportar a PDF",
                "className": "btn-sm btn-danger",
                "messageTop":"Tabla de productos",
                "title":"tabla_productos",
                "exportOptions":{
                    "columns": [ 0, 1, 2, 3, 4, 5]
                }
            },
            {
                "extend": "csvHtml5",
                "text":"<i class='fas fa-file-csv'></i> CSV",
                "titleAttr": "Exportar a CSV",
                "className": "btn-sm btn-info",
                "title":"tabla_productos",
                "exportOptions":{
                    "columns": [ 0, 1, 2, 3, 4, 5]
                }
            }
        ]
    });//fin datatable PORDUCTOS

    if(document.querySelector("#txtCodigo")){
        let inputCodigo = document.querySelector("#txtCodigo");
        inputCodigo.onkeyup = () => {
            if(inputCodigo.value.length >= 5){
                document.querySelector('#divBarCode').classList.remove("notBlock");
                page.BarCode();
           }else{
                document.querySelector('#divBarCode').classList.add("notBlock");
           }
        };
    }
    
    tinymce.init({
        selector: '#txtDescripcion',
        language: 'es_419',
        width: "100%",
        height: 400,    
        statubar: true,
        plugins: [
            "advlist autolink link image lists charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
            "save table contextmenu directionality emoticons template paste textcolor"
        ],
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons",
    });
});//fin DOMContentLoad

window.addEventListener('load', () => {
    if(document.querySelector("#formProductos")){
        let formProductos = document.querySelector("#formProductos");
        formProductos.onsubmit = (e) => {
            e.preventDefault();
            let strNombre = document.querySelector('#txtNombre').value;
            let intCodigo = document.querySelector('#txtCodigo').value;
            let strPrecio = document.querySelector('#txtPrecio').value;
            let intStock = document.querySelector('#txtStock').value;
            let intStatus = document.querySelector('#listStatus').value;
            if(strNombre == '' || intCodigo == '' || strPrecio == '' || intStock == '' )
            {
                swal("Atención", "Todos los campos son obligatorios." , "error");
                return false;
            }
            if(intCodigo.length < 5){
                swal("Atención", "El código debe ser mayor que 5 dígitos." , "error");
                return false;
            }
            divLoading.style.display = "flex";
            tinyMCE.triggerSave();
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() :  new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = `${base_url}/Productos/setProducto`; 
            let formData = new FormData(formProductos);
            request.open("POST",ajaxUrl,true);
            request.send(formData);
            request.onreadystatechange = () =>{
                if(request.readyState == 4 && request.status == 200){
                    let objData = JSON.parse(request.responseText);
                    if(objData.status)
                    {
                        swal("", objData.msg ,"success");
                        document.querySelector("#idProducto").value = objData.idproducto;
                        document.querySelector("#containerGallery").classList.remove("notBlock");
                        tableProductos.api().ajax.reload(null,false);
                        htmlStatus = intStatus == 1 ? '<span class="badge badge-success">Activo</span>' : '<span class="badge badge-danger">Inactivo</span>';
                    }else{
                        swal("Error", objData.msg , "error");
                    }
                }
                divLoading.style.display = "none";
                return false;
            }
        }
    }

    if(document.querySelector(".btnAddImage")){
       let btnAddImage =  document.querySelector(".btnAddImage");
       btnAddImage.onclick = (e) => {
        let key = Date.now();
        let newElement = document.createElement("div");
        newElement.id= "div"+key;
        newElement.innerHTML = `
            <div class="prevImage"></div>
            <input type="file" name="foto" id="img${key}" class="inputUploadfile">
            <label for="img${key}" class="btnUploadfile"><i class="fas fa-upload "></i></label>
            <button class="btnDeleteImage notblock" type="button" onclick="page.DelItem('#div${key}')"><i class="fas fa-trash-alt"></i></button>`;
        document.querySelector("#containerImages").appendChild(newElement);
        document.querySelector(`#div${key} .btnUploadfile`).click();
        page.fntInputFile();
       }
    }
    page.fntInputFile();
    page.Categorias();
}, false);

//objeto PRODUCTOS
let producto = {
    ViewProduct: (idProducto) => {
        let request = (window.XMLHttpRequest) ? 
                        new XMLHttpRequest() : 
                        new ActiveXObject('Microsoft.XMLHTTP');
        let ajaxUrl = `${base_url}/Productos/getProducto/${idProducto}`;
        request.open("GET",ajaxUrl,true);
        request.send();
        request.onreadystatechange = function(){
            if(request.readyState == 4 && request.status == 200){
                let objData = JSON.parse(request.responseText);
                if(objData.status)
                {
                    let htmlImage = "";
                    let objProducto = objData.data;
                    let estadoProducto = objProducto.status == 1 ? 
                    '<span class="badge badge-success">Activo</span>' : 
                    '<span class="badge badge-danger">Inactivo</span>';

                    document.querySelector("#celCodigo").innerHTML = objProducto.codigo;
                    document.querySelector("#celNombre").innerHTML = objProducto.nombre;
                    document.querySelector("#celPrecio").innerHTML = objProducto.precio;
                    document.querySelector("#celStock").innerHTML = objProducto.stock;
                    document.querySelector("#celCategoria").innerHTML = objProducto.categoria;
                    document.querySelector("#celStatus").innerHTML = estadoProducto;
                    document.querySelector("#celDescripcion").innerHTML = objProducto.descripcion;

                    if(objProducto.images.length > 0){
                        let objProductos = objProducto.images;
                        for (let p = 0; p < objProductos.length; p++) {
                            htmlImage +=`<img src="${objProductos[p].url_image}" class="img-thumbnail"></img>`;
                        }
                    }
                    document.querySelector("#celFotos").innerHTML = htmlImage;
                    $('#modalViewProducto').modal('show');

                }else{
                    swal("Error", objData.msg , "error");
                }
            }
        }
    },//fin ViewProduct
    EditProduct: (element,idProducto) => {
        document.querySelector('#titleModal').innerHTML ="Actualizar Producto";
        document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
        document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
        document.querySelector('#btnText').innerHTML ="Actualizar";
        let request = (window.XMLHttpRequest) ? 
                        new XMLHttpRequest() : 
                        new ActiveXObject('Microsoft.XMLHTTP');
        let ajaxUrl = `${base_url}/Productos/getProducto/${idProducto}`;
        request.open("GET",ajaxUrl,true);
        request.send();
        request.onreadystatechange = () => {
            if(request.readyState == 4 && request.status == 200){
                let objData = JSON.parse(request.responseText);
                if(objData.status)
                {
                    let htmlImage = "";
                    let objProducto = objData.data;
                    document.querySelector("#idProducto").value = objProducto.idproducto;
                    document.querySelector("#txtNombre").value = objProducto.nombre;
                    document.querySelector("#txtDescripcion").value = objProducto.descripcion;
                    document.querySelector("#txtCodigo").value = objProducto.codigo;
                    document.querySelector("#txtPrecio").value = objProducto.precio;
                    document.querySelector("#txtStock").value = objProducto.stock;
                    document.querySelector("#listCategoria").value = objProducto.categoriaid;
                    document.querySelector("#listStatus").value = objProducto.status;
                    document.querySelector("#divBarCode").classList.remove("notBlock");
                    document.querySelector("#containerGallery").classList.remove("notblock");
                    tinymce.activeEditor.setContent(objProducto.descripcion); 
                    $('#listCategoria').selectpicker('render');
                    $('#listStatus').selectpicker('render');
                    page.BarCode();

                    if(objProducto.images.length > 0){
                        let objProductos = objProducto.images;
                        for (let p = 0; p < objProductos.length; p++) {
                            let key = Date.now()+p;
                            htmlImage +=`<div id="div${key}">
                                <div class="prevImage">
                                <img src="${objProductos[p].url_image}"></img>
                                </div>
                                <button type="button" class="btnDeleteImage" onclick="page.DelItem('#div${key}')" imgname="${objProductos[p].img}">
                                <i class="fas fa-trash"></i></button></div>`;
                        }
                    }
                    document.querySelector("#containerImages").innerHTML = htmlImage; 
                    document.querySelector("#divBarCode").classList.remove("notblock");
                    document.querySelector("#containerGallery").classList.remove("notBlock");           
                    $('#modalFormProductos').modal('show');
                }else{
                    swal("Error", objData.msg , "error");
                }
            }
        }
    },//fin EditProduct
    DelProduct: (idProducto) => {
        swal({
            title: "Eliminar Producto",
            text: "¿Realmente quiere eliminar el producto?",
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
                let ajaxUrl = `${base_url}/Productos/delProducto`;
                let strData = "idProducto="+idProducto;
                request.open("POST",ajaxUrl,true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(strData);
                request.onreadystatechange = () => {
                    if (request.readyState == 4 && request.status == 200) {
                        let objData = JSON.parse(request.responseText);
                        if (objData.status) {
                            swal("Eliminar!", objData.msg, "success");
                            tableProductos.api().ajax.reload();
                        } else {
                            swal("Atención!", objData.msg, "error");
                        }
                    }
                }
            }
    
        });
    }//fin DelProduct
};

//objeto Page
let page = {
    fntInputFile: function(){
        let inputUploadfile = document.querySelectorAll(".inputUploadfile");
        inputUploadfile.forEach(function(inputUploadfile) {
            inputUploadfile.addEventListener('change', function(){
                let idProducto = document.querySelector("#idProducto").value;
                let parentId = this.parentNode.getAttribute("id");
                let idFile = this.getAttribute("id");            
                let uploadFoto = document.querySelector("#"+idFile).value;
                let fileimg = document.querySelector("#"+idFile).files;
                let prevImg = document.querySelector("#"+parentId+" .prevImage");
                let nav = window.URL || window.webkitURL;
                if(uploadFoto !=''){
                    let type = fileimg[0].type;
                    let name = fileimg[0].name;
                    if(type != 'image/jpeg' && type != 'image/jpg' && type != 'image/png'){
                        prevImg.innerHTML = "Archivo no válido";
                        uploadFoto.value = "";
                        return false;
                    }else{
                        let objeto_url = nav.createObjectURL(this.files[0]);
                        prevImg.innerHTML = `<img class="loading" src="${base_url}/Assets/images/loading.svg" >`;
    
                        let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                        let ajaxUrl = base_url+'/Productos/setImage'; 
                        let formData = new FormData();
                        formData.append('idproducto',idProducto);
                        formData.append("foto", this.files[0]);
                        request.open("POST",ajaxUrl,true);
                        request.send(formData);
                        request.onreadystatechange = function(){
                            if(request.readyState != 4) return;
                            if(request.status == 200){
                                let objData = JSON.parse(request.responseText);
                                if(objData.status){
                                    prevImg.innerHTML = `<img src="${objeto_url}">`;
                                    document.querySelector("#"+parentId+" .btnDeleteImage").setAttribute("imgname",objData.imgname);
                                    document.querySelector("#"+parentId+" .btnUploadfile").classList.add("notblock");
                                    document.querySelector("#"+parentId+" .btnDeleteImage").classList.remove("notblock");
                                }else{
                                    swal("Error", objData.msg , "error");
                                }
                            }
                        }
    
                    }
                }
    
            });
        });
    },
    DelItem :(element) => {
        let nameImg = document.querySelector(element+' .btnDeleteImage').getAttribute("imgname");
        if (nameImg == null)
        { 
            let itemRemove = document.querySelector(element);
            itemRemove.parentNode.removeChild(itemRemove);
        }
        else
        {
            let idProducto = document.querySelector("#idProducto").value;
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = `${base_url}/Productos/delFile`; 
            let formData = new FormData();
            formData.append('idproducto',idProducto);
            formData.append("file",nameImg);
            request.open("POST",ajaxUrl,true);
            request.send(formData);
            request.onreadystatechange = () => {
                if (request.readyState != 4)
                    return;
                if (request.status == 200) {
                    let objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        let itemRemove = document.querySelector(element);
                        itemRemove.parentNode.removeChild(itemRemove);
                    } else {
                        swal("", objData.msg, "error");
                    }
                }
            }
        }
    },//fin DelItem
    Categorias:() => {
        if(document.querySelector('#listCategoria')){
            let ajaxUrl = `${base_url}/Categorias/getSelectCategorias`;
            let request = (window.XMLHttpRequest) ? 
                        new XMLHttpRequest() : 
                        new ActiveXObject('Microsoft.XMLHTTP');
            request.open("GET",ajaxUrl,true);
            request.send();
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    document.querySelector('#listCategoria').innerHTML = request.responseText;
                    $('#listCategoria').selectpicker('render');
                }
            }
        }
    },//fin Categorias
    BarCode: () => {
        let codigo = document.querySelector("#txtCodigo").value;
        JsBarcode("#barcode", codigo);
    },//fin BarCode
    PrintBarCode: (area) => {
        let elemntArea = document.querySelector(area);
        let vprint = window.open(' ', 'popimpr', 'height=400,width=600');
        vprint.document.write(elemntArea.innerHTML);
        vprint.document.close();
        vprint.print();
        vprint.close();
    },//fin PrintBarCode
    openModal: () => {
        document.querySelector('#idProducto').value ="";
        document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
        document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
        document.querySelector('#btnText').innerHTML ="Guardar";
        document.querySelector('#titleModal').innerHTML = "Nuevo Producto";
        document.querySelector("#formProductos").reset();
        document.querySelector("#divBarCode").classList.add("notBlock");
        document.querySelector("#containerGallery").classList.add("notBlock");
        document.querySelector("#containerImages").innerHTML = "";
        $('#modalFormProductos').modal('show');
    }//fin openModal
};