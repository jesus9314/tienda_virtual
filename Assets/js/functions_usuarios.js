//declaración de variables
let divLoading = document.querySelector("#divLoading"); //loading
let tableUsuarios; //tabla usuarios


//abrir modal
function openModalPerfil()
{
	$('#modalFormPerfil').modal('show');
}

//modificar modal para edición
function openModal()
{
	document.querySelector('#idUsuario').value="";
	document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
	document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
	document.querySelector('#btnText').innerHTML = "Guardar";
	document.querySelector('#titleModal').innerHTML = "Nuevo Usuario";
	document.querySelector("#formUsuario").reset();
	$('#modalFormUsuario').modal('show');
}


//funciones a cargar al momento de cargar el documento
document.addEventListener('DOMContentLoaded', function(){

//inicialización de datatable
	tableUsuarios = $('#tableUsuarios').dataTable({
        "scrollX":true,
        "stateSave":true,
        "aProcessing":true,
        "aServerSide":true,
        "stateSave": true,
        "language": 
        {
            "sProcessing":"Procesando...",
            "sLengthMenu":"Mostrar _MENU_ registros",
            "sZeroRecords":"No se encontraron resultados",
            "sEmptyTable":"Ningún dato disponible en esta tabla =(",
            "sInfo":"Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":"Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":"(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":"",
            "sSearch":"Buscar:",
            "sUrl":"",
            "sInfoThousands":",",
            "sLoadingRecords":"Cargando...",
            "oPaginate": 
            {
                "sFirst":"Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious":"Anterior"
            },
                        "oAria": {
                            "sSortAscending":  ": Actilet para ordenar la columna de manera ascendente",
                            "sSortDescending": ": Actilet para ordenar la columna de manera descendente"
                        },
                        "buttons": {
                            "copy": "Copiar",
                            "colvis": "Visibilidad"
                        }
        },
        "ajax":
        {
            "url": " "+base_url+"/Usuarios/getUsuarios",
            "dataSrc":""
        },
        "columns":
        [
            {"data":"idpersona", "width": "5%", "className": "text-center"},
            {"data":"nombres", "width": "10%", "className": "text-center"},
            {"data":"apellidos", "width": "10%", "className": "text-center"},
            {"data":"identificacion", "width": "10%", "className": "text-center"},
            {"data":"telefono", "width": "10%", "className": "text-center"},
            {"data":"email_user", "width": "10%", "className": "text-center"},
            {"data":"nombrerol",
            "render":
            function(data,row)
            {
            	if(data == 'Administrador')
            	{
            		return '<span class="badge bg-warning text-dark">'+data+'</span>';
            	}
            	else
            	{
            		return data;
            	}
            },
             "width": "10%", "className": "text-center"},
            
            {"data":"status",
            "render":
                function(data){
                    if(data==1)
                    {
                        return '<span class="badge badge-success">Activo</span>';
                    }
                    else
                    {
                        return '<span class="badge badge-danger">Inactivo</span>';
                    }
            },
             "className": "text-center", "width":"5%"},
            {"data":"options" , "width":"5%"}
        ],
        "dom": 'lBfrtip',
        "buttons": [
            {
            	"extend": "copyHtml5",
            	"text":"<i class='far fa-copy'></i> Copiar",
            	"titleAttr": "Copiar",
            	"className": "btn btn-secondary",
            	"title":"tabla_usuarios",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 5, 6, 7 ]
            	}
            },
            {
            	"extend": "excelHtml5",
            	"text":"<i class='far fa-file-excel'></i> Excel",
            	"titleAttr": "Exportar a Excel",
            	"className": "btn btn-success",
            	"title":"tabla_usuarios",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 5, 6, 7 ]
            	}
            },
            {
            	"extend": "pdfHtml5",
            	"text":"<i class='far fa-file-pdf'></i> PDF",
            	"titleAttr": "Exportar a PDF",
            	"className": "btn btn-danger",
            	"messageTop":"Tabla de usuarios",
            	"title":"tabla_usuarios",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 5, 6, 7 ]
            	}
            },
            {
            	"extend": "csvHtml5",
            	"text":"<i class='fas fa-file-csv'></i> CSV",
            	"titleAttr": "Exportar a CSV",
            	"className": "btn btn-info",
            	"title":"tabla_usuarios",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 5, 6, 7 ]
            	}
            }
        ],
        "resonsieve":"true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order":[[0,"asc"]] 
    });

	if(document.querySelector('#formUsuario'))
	{
		let formUsuario = document.querySelector('#formUsuario');
		formUsuario.onsubmit = function(e)
		{
			e.preventDefault();
			let strIdentificacion = document.querySelector('#txtIdentificacion').value;
			let strNombre = document.querySelector('#txtNombre').value;
			let strApellido = document.querySelector('#txtApellido').value;
			let strEmail = document.querySelector('#txtEmail').value;
			let intTelefono = document.querySelector('#txtTelefono').value;
			let intTipousuario = document.querySelector('#listRolid').value;
			let strPassword = document.querySelector('#txtPassword').value;

			if(strIdentificacion == '' || strApellido == '' || strNombre == '' || strEmail == '' || intTelefono == '' || intTipousuario == '')
			{
				swal("Atención", "Todos los campos son obligatorios","error");
				return false
			}
			let elementsValid = document.getElementsByClassName("valid");
			for (let i = 0; i < elementsValid.length; i++) 
			{
				if(elementsValid[i].classList.contains('is-invalid'))
				{
					swal("Atención", "Por favor verifique los campos en rojo.", "error");
					return false;
				}
			}
			divLoading.style.display ="flex"
			let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
			let ajaxUrl = base_url+'/Usuarios/setUsuario';
			let formData = new FormData(formUsuario);
			request.open("POST",ajaxUrl,true);
			request.send(formData);
			request.onreadystatechange = function(){
				if(request.readyState == 4 && request.status == 200)
				{
					let objData = JSON.parse(request.responseText);
					if(objData.status)
					{
						$('#modalFormUsuario').modal('hide');
						formUsuario.reset();
						swal("Usuarios", objData.msg, "success");
						tableUsuarios.api().ajax.reload(null,false);
					}
					else
					{
						swal("Error", objData.msg, "error");
					}
				}
				divLoading.style.display = "none";
                return false;
			}
		}
	}
	//actualizar perfil
	if(document.querySelector('#formPerfil'))
	{
		let formUsuario = document.querySelector('#formPerfil');
		formUsuario.onsubmit = function(e)
		{
			e.preventDefault();
			let strIdentificacion = document.querySelector('#txtIdentificacion').value;
			let strNombre = document.querySelector('#txtNombre').value;
			let strApellido = document.querySelector('#txtApellido').value;
			let intTelefono = document.querySelector('#txtTelefono').value;
			let strPassword = document.querySelector('#txtPassword').value;
			let strPasswordConfirm = document.querySelector('#txtPasswordConfirm').value;

			if(strIdentificacion == '' || strApellido == '' || strNombre == ''|| intTelefono == '')
			{
				swal("Atención", "Todos los campos son obligatorios","error");
				return false
			}
			let elementsValid = document.getElementsByClassName("valid");
			for (let i = 0; i < elementsValid.length; i++) 
			{
				if(elementsValid[i].classList.contains('is-invalid'))
				{
					swal("Atención", "Por favor verifique los campos en rojo.", "error");
					return false;
				}
			}
			if(strPassword != "" || strPasswordConfirm !="")
			{
				if(strPassword != strPasswordConfirm)
				{
					swal("Atencion", "Las contraseñas no son iguale.", "info");
					return false;
				}
				if(strPassword.length < 5)
				{
					swal("Atencion", "La contraseña debe tener un mínimo de 5 carácteres.", "info");
					return false;
				}
			}
			divLoading.style.display ="flex";
			let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
			let ajaxUrl = base_url+'/Usuarios/putPerfil';
			let formData = new FormData(formUsuario);
			request.open("POST",ajaxUrl,true);
			request.send(formData);
			request.onreadystatechange = function(){
				if(request.readyState != 4 ) return ;
				if(request.status == 200)
				{
					let objData = JSON.parse(request.responseText);
					if(objData.status)
					{
						$('#modalFormPerfil').modal('hide');
						swal({
							title: "",
							text: objData.msg,
							type: "success",
							confirmButtonText: "Aceptar",
							closeOnConfirm: false
						}, function(isConfirm){
							if(isConfirm)
							{
								location.reload();
							}
						});
						
					}
					else
					{
						swal("Error", objData.msg, "error");
					}
				}
				divLoading.style.display = "none";
                return false;
			}
		}
	}

	//actualizar datos fiscales
	if(document.querySelector('#formDataFiscal'))
	{
		let formDataFiscal = document.querySelector('#formDataFiscal');
		formDataFiscal.onsubmit = function(e)
		{
			e.preventDefault();
			let strNit = document.querySelector('#txtNit').value;
			let strNombreFiscal = document.querySelector('#txtNombreFiscal').value;
			let strDirFiscal = document.querySelector('#txtDirFiscal').value;


			if(strNit == '' || strNombreFiscal == '' || strDirFiscal == '')
			{
				swal("Atención", "Todos los campos son obligatorios","error");
				return false
			}
			let elementsValid = document.getElementsByClassName("valid");
			for (let i = 0; i < elementsValid.length; i++) 
			{
				if(elementsValid[i].classList.contains('is-invalid'))
				{
					swal("Atención", "Por favor verifique los campos en rojo.", "error");
					return false;
				}
			}
			divLoading.style.display ="flex";
			let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
			let ajaxUrl = base_url+'/Usuarios/putDFiscal';
			let formData = new FormData(formDataFiscal);
			request.open("POST",ajaxUrl,true);
			request.send(formData);
			request.onreadystatechange = function(){
				if(request.readyState != 4 ) return ;
				if(request.status == 200)
				{
					let objData = JSON.parse(request.responseText);
					if(objData.status)
					{
						$('#modalFormPerfil').modal('hide');
						swal({
							title: "",
							text: objData.msg,
							type: "success",
							confirmButtonText: "Aceptar",
							closeOnConfirm: false
						}, function(isConfirm){
							if(isConfirm)
							{
								location.reload();
							}
						});
						
					}
					else
					{
						swal("Error", objData.msg, "error");
					}
				}
				divLoading.style.display = "none";
                return false;
			}
		}
	}
}, false);

//agregar función para mostrar lista de roles
window.addEventListener('load', function() {
        fntRolesUsuario();
}, false);

//funciones manejo usuarios

//función obtener roles
function fntRolesUsuario()
{
	if(document.querySelector('#listRolid'))
	{
		let ajaxUrl = base_url+'/Roles/getSelectRoles';
		let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
		request.open("GET", ajaxUrl, true);
		request.send();

		request.onreadystatechange = function(){
			if(request.readyState == 4 && request.status == 200)
			{
				document.querySelector('#listRolid').innerHTML = request.responseText;
				document.querySelector('#listRolid').value = 2;
				$('#listRolid').selectpicker('render');
			}
		}
	}
}
function fntViewUsuario(idusuario)
{
	let request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
	let ajaxUrl = base_url+'/Usuarios/getUsuario/'+idusuario;
	request.open("GET", ajaxUrl, true);
	request.send();
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200)
		{
			let objData = JSON.parse(request.responseText);
			if(objData.status)
			{
				let estadoUsuario = objData.data.status == 1 ?
				'<span class="badge badge-success">Activo</span>' :
				'<span class="badge badge-danger">Inactivo</span>';
				document.querySelector('#celIdentificacion').innerHTML = objData.data.identificacion;
				document.querySelector('#celNombre').innerHTML = objData.data.nombres;
				document.querySelector('#celApellido').innerHTML = objData.data.apellidos;
				document.querySelector('#celTelefono').innerHTML = objData.data.telefono;
				document.querySelector('#celEmail').innerHTML = objData.data.email_user;
				document.querySelector('#celTipoUsuario').innerHTML = objData.data.nombrerol;
				document.querySelector('#celEstado').innerHTML = estadoUsuario;
				document.querySelector('#celFechaRegistro').innerHTML = objData.data.fechaRegistro;
			}
			else
			{
				swal("Error", objData.msg, "error");
			}
		}
	}
	$('#modalViewUser').modal('show');
}
function fntEditUsuarios(element,idusuario)
{
	document.querySelector('#titleModal').innerHTML = "Actializar Usuario";
	document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
	document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
	document.querySelector('#btnText').innerHTML = "Actualizar";

	let request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
	let ajaxUrl = base_url+'/Usuarios/getUsuario/'+idusuario;
	request.open("GET", ajaxUrl, true);
	request.send();
	request.onreadystatechange = function()
	{
		if(request.readyState == 4 && request.status == 200)
		{
			let objData = JSON.parse(request.responseText);
			if(objData.status)
			{
				document.querySelector('#idUsuario').value = objData.data.idpersona;
				document.querySelector('#txtIdentificacion').value = objData.data.identificacion;
				document.querySelector('#txtNombre').value = objData.data.nombres;
				document.querySelector('#txtApellido').value = objData.data.apellidos;
				document.querySelector('#txtTelefono').value = objData.data.telefono;
				document.querySelector('#txtEmail').value = objData.data.email_user;
				document.querySelector('#listRolid').value = objData.data.idrol;
				$('#listRolid').selectpicker('render');
				if(objData.data.status == 1)
				{
					document.querySelector('#listStatus').value = 1;
				}
				else
				{
					document.querySelector('#listStatus').value = 2;
				}
				$('#listStatus').selectpicker('render');
			}
		}
		$('#modalFormUsuario').modal('show');
	}
}
function fntDelUsuario(idusuario)
{ 
	            swal({
	                title: "Eliminar Usuario",
	                text:"¿Realmente desea eliminar este Usuario?",
	                type: "warning",
	                showCancelButton:true,
	                confirmButtonText: "Si, eliminar!",
	                cancelButtonText: "No, Cancelar!",
	                closeOnConfirm: false,
	                closeOnCancel:true
	            }, function(isConfirm){
	                if(isConfirm)
	                {
	                    let request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
	                    let ajaxUrl = base_url+'/Usuarios/delUsuario/';
	                    let strData = "idUsuario="+idusuario;
	                    request.open("POST",ajaxUrl,true);
	                    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	                    request.send(strData);
	                    request.onreadystatechange = function(){
	                        if(request.readyState == 4 && request.status == 200){
	                            let objData = JSON.parse(request.responseText);
	                            if(objData.status)
	                            {
	                                swal("Eliminar!", objData.msg, "success");
	                                tableUsuarios.api().ajax.reload(null,false);
	                            }else
	                            {
	                                swal("Atención!", objData.msg, "error")
	                            }
	                        }
	                    }
	                }
	            });
}

/*setInterval(function () {
    tableUsuarios.api().ajax.reload(null,false);
    }, 3000 );*/



