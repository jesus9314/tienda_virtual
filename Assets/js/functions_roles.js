'use strict'
//declaracion de variables
var tableRoles;
var divLoading = document.querySelector("#divLoading");
//
//
document.addEventListener('DOMContentLoaded', function(){

    tableRoles = $('#tableRoles').dataTable( {
        "scrollX":true,
        "stateSave":true,
        "aProcessing":true,
        "stateSave": true,
        "fixedHeader": true,
        "resonsieve":"true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order":[[0,"asc"]], 
        "language": 
        {
            url: `${base_url}/Assets/js/config/dt_es.json`
        },
        "ajax":
        {
            "url": ` ${base_url}/roles/getRoles`,
            "dataSrc":""
        },
        "columns":
        [
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
        ]
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
//objeto ROLES
let rol ={
    EditRol: (idrol) => {
        document.querySelector('#titleModal').innerHTML ="Actualizar Rol";
        document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
        document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
        document.querySelector('#btnText').innerHTML ="Actualizar";

        var idrol = idrol;
        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl  = `${base_url}/Roles/getRol/${idrol}`;
        request.open("GET",ajaxUrl ,true);
        request.send();

        request.onreadystatechange = () => {
            if (request.readyState == 4 && request.status == 200) {

                var objData = JSON.parse(request.responseText);
                if (objData.status) {
                    document.querySelector("#idRol").value = objData.data.idrol;
                    document.querySelector("#txtNombre").value = objData.data.nombrerol;
                    document.querySelector("#txtDescripcion").value = objData.data.descripcion;

                    if (objData.data.status == 1) {
                        var optionSelect = '<option value="1" selected class="notBlock">Activo</option>';
                    } else {
                         var optionSelect = '<option value="2" selected class="notBlock">Inactivo</option>';
                    }
                    var htmlSelect = `${optionSelect}
                                        <option value="1">Activo</option>
                                        <option value="2">Inactivo</option>
                                    `;
                    document.querySelector("#listStatus").innerHTML = htmlSelect;
                    $('#modalFormRol').modal('show');
                }else{
                    swal("Error", objData.msg, "error");
                }
            }
        }
    },//fin EditRol
    DelRol: (idrol) => {
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
                var ajaxUrl = `${base_url}/Roles/delRol/`;
                var strData = `idrol=${idrol}`;
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
    },//fin DelRol
    Permisos: (idpersona) => {
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
    },//fin Permisos
    SavePermisos: (evnet) => {
        evnet.preventDefault();
        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl = `${base_url}/Permisos/setPermisos`;
        var formElement = document.querySelector("#formPermisos");
        var formData = new FormData(formElement);
        request.open("POST",ajaxUrl,true);
        request.send(formData);
        request.onreadystatechange = () => {
            if (request.readyState == 4 && request.status == 200) {
                var objData = JSON.parse(request.responseText);
                if (objData.status) {
                    swal("Permisos de usuario", objData.msg, "success");
                }

                else {
                    swal("Error", objData.msg, "error");
                }
            }
        }
    }
}

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