

var tableRoles;
var divLoading = document.querySelector("#divLoading");
document.addEventListener('DOMContentLoaded', function(){

    tableRoles = $('#tableRoles').dataTable( {
        "scrollX":true,
        "stateSave":true,
        "aProcessing":true,
        "aServerSide":true,
        "stateSave": true,
        "language": {
            "sProcessing":     "Procesando...",
                        "sLengthMenu":     "Mostrar _MENU_ registros",
                        "sZeroRecords":    "No se encontraron resultados",
                        "sEmptyTable":     "Ningún dato disponible en esta tabla =(",
                        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                        "sInfoPostFix":    "",
                        "sSearch":         "Buscar:",
                        "sUrl":            "",
                        "sInfoThousands":  ",",
                        "sLoadingRecords": "Cargando...",
                        "oPaginate": {
                            "sFirst":    "Primero",
                            "sLast":     "Último",
                            "sNext":     "Siguiente",
                            "sPrevious": "Anterior"
                        },
                        "oAria": {
                            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                        },
                        "buttons": {
                            "copy": "Copiar",
                            "colvis": "Visibilidad"
                        }
        },
        "ajax":{
            "url": " "+base_url+"/roles/getRoles",
            "dataSrc":""
        },
        "columns":[
            {"data":"idrol", width: "5%", className: "text-center"},
            {"data":"nombrerol", width: "10%", className: "text-center"},
            {"data":"descripcion"},
            {"data":"status",
            "render":
                function(data,type,row){
                    if(data==1){
                        return '<span class="badge badge-success">Activo</span>';
                    }else{
                        return '<span class="badge badge-danger">Inactivo</span>';
                    }
            },
             "className": "text-center", width:"5%"},
            {
                "data":"options", "width":"5%"}
        ],
        "resonsieve":"true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order":[[0,"asc"]]
    });

     //NUEVO ROL
    var formRol = document.querySelector("#formRol");
    formRol.onsubmit = function(e) {
        e.preventDefault();

        var intIdRol = document.querySelector('#idRol').value;
        var strNombre = document.querySelector('#txtNombre').value;
        var strDescripcion = document.querySelector('#txtDescripcion').value;
        var intStatus = document.querySelector('#listStatus').value;        
        if(strNombre == '' || strDescripcion == '' || intStatus == '')
        {
            swal("Atención", "Todos los campos son obligatorios." , "error");
            return false;
        }
        divLoading.style.display ="flex"
        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl = base_url+'/Roles/setRol'; 
        var formData = new FormData(formRol);
        request.open("POST",ajaxUrl,true);
        request.send(formData);
        request.onreadystatechange = function(){
           if(request.readyState == 4 && request.status == 200){
                
                var objData = JSON.parse(request.responseText);
                if(objData.status)
                {
                    $('#modalFormRol').modal("hide");
                    formRol.reset();
                    swal("Roles de usuario", objData.msg ,"success");
                    tableRoles.api().ajax.reload(null,false);
                }else{
                    swal("Error", objData.msg , "error");
                }              
            }
            divLoading.style.display = "none";
            return false; 
        }

        
    }



});

function openModal()
{
    document.querySelector('#idRol').value = "";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML = "Guardar";
    document.querySelector('#titleModal').innerHTML = "Nuevo Rol";
    document.querySelector('#formRol').reset();
    $('#modalFormRol').modal('show');
}

function fntEditRol(idrol){

            document.querySelector('#titleModal').innerHTML ="Actualizar Rol";
            document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
            document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
            document.querySelector('#btnText').innerHTML ="Actualizar";

            var idrol = idrol;
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl  = base_url+'/Roles/getRol/'+idrol;
            request.open("GET",ajaxUrl ,true);
            request.send();

            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    
                    var objData = JSON.parse(request.responseText);
                    if(objData.status)
                    {
                        document.querySelector("#idRol").value = objData.data.idrol;
                        document.querySelector("#txtNombre").value = objData.data.nombrerol;
                        document.querySelector("#txtDescripcion").value = objData.data.descripcion;

                        if(objData.data.status == 1)
                        {
                            var optionSelect = '<option value="1" selected class="notBlock">Activo</option>';
                        }else{
                            var optionSelect = '<option value="2" selected class="notBlock">Inactivo</option>';
                        }
                        var htmlSelect = `${optionSelect}
                                          <option value="1">Activo</option>
                                          <option value="2">Inactivo</option>
                                        `;
                        document.querySelector("#listStatus").innerHTML = htmlSelect;
                        $('#modalFormRol').modal('show');
                    }else{
                        swal("Error", objData.msg , "error");
                    }
                }
            }
            
}

function fntDelRol(idrol){
            var idrol = idrol;  
            swal({
                title: "Eliminar Rol",
                text:"¿Realmente desea eliminar este Rol?",
                type: "warning",
                showCancelButton:true,
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "No, Cancelar!",
                closeOnConfirm: false,
                closeOnCancel:true
            }, function(isConfirm){
                if(isConfirm)
                {
                    var request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
                    var ajaxUrl = base_url+'/Roles/delRol/';
                    var strData = "idrol="+idrol;
                    request.open("POST",ajaxUrl,true);
                    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    request.send(strData);
                    request.onreadystatechange = function(){
                        if(request.readyState == 4 && request.status == 200){
                            var objData = JSON.parse(request.responseText);
                            if(objData.status)
                            {
                                swal("Eliminar!", objData.msg, "success");
                                tableRoles.api().ajax.reload(function(){
                                });
                            }else
                            {
                                swal("Atención!", objData.msg, "error")
                            }
                        }
                    }
                }
            });
}

function fntPermisos(idpersona){
            var idrol = idpersona;
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url+'/Permisos/getPermisosRol/'+idrol;
            request.open("GET", ajaxUrl, true);
            request.send();
            request.onreadystatechange = function()
            {
                if(request.readyState == 4 && request.status == 200)
                {
                    document.querySelector('#contentAjax').innerHTML = request.responseText;
                    $('.modalPermisos').modal('show');
                    document.querySelector('#formPermisos').addEventListener('submit', fntSavePermisos,false);
                }
            }
}

function fntSavePermisos(evnet)
{
    evnet.preventDefault();
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var ajaxUrl = base_url+'/Permisos/setPermisos';
    var formElement = document.querySelector("#formPermisos");
    var formData = new FormData(formElement);
    request.open("POST",ajaxUrl,true);
    request.send(formData);
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200)
        {
            var objData = JSON.parse(request.responseText);
            if(objData.status)
            {
                swal("Permisos de usuario", objData.msg, "success");
            }
            else
            {
                swal("Error", objData.msg, "error");
            }
        }
    }
}
 //actualizar en tiempo real la tabla cada 3 segundos
 /*setInterval(function () {
    tableRoles.api().ajax.reload(null,false);
    }, 3000 );*/

