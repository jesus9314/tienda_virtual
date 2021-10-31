'use strict'

document.addEventListener('DOMContentLoaded', () => {

	//inicialización de datatable
		tableUsuarios = $('#tableUsuarios').dataTable({
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
            "url": `${base_url}/Usuarios/getUsuarios`,
            "dataSrc":""
        },
        "columns":
        [
            {"data":"idpersona", "width": "5%", "className": "text-center"},
            {"data":"nombres", "width": "10%", "className": "text-center"},
            {"data":"apellidos", "width": "10%", "className": "text-center"},
            {"data":"identificacion", "width": "5%", "className": "text-center"},
            {"data":"telefono", "width": "5%", "className": "text-center"},
            {"data":"email_user", "width": "5%"},
            {"data":"nombrerol",
            "render":
            (data) => {
					if (data == 'Administrador') {
						return '<span class="badge bg-warning text-dark">' + data + '</span>';
					}

					else {
						return data;
					}
				},
             "width": "10%", "className": "text-center"},
            
            {"data":"status",
            "render":
                (data) => {
					if (data == 1) {
						return '<span class="badge badge-success">Activo</span>';
					}

					else {
						return '<span class="badge badge-danger">Inactivo</span>';
					}
				},
             "className": "text-center", "width":"5%"},
            {"data":"options" , "width":"5%"}
        ],
        "buttons": [
            {
            	"extend": "copyHtml5",
            	"text":"<i class='fa fa-copy'></i> Copiar",
            	"titleAttr": "Copiar",
            	"className": "btn-sm btn-secondary",
            	"title":"tabla_usuarios",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 5, 6, 7 ]
            	}
            },
            {
            	"extend": "excelHtml5",
            	"text":"<i class='fa fa-file-excel'></i> Excel",
            	"titleAttr": "Exportar a Excel",
            	"className": "btn-sm btn-success",
            	"title":"tabla_usuarios",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 5, 6, 7 ]
            	}
            },
            {
            	"extend": "pdfHtml5",
            	"text":"<i class='fa fa-file-pdf'></i> PDF",
            	"titleAttr": "Exportar a PDF",
            	"className": "btn-sm btn-danger",
            	"messageTop":"Tabla de usuarios",
            	"title":"tabla_usuarios",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 5, 6, 7 ]
            	}
            },
            {
            	"extend": "csvHtml5",
            	"text":"<i class='fa fa-file-csv'></i> CSV",
            	"titleAttr": "Exportar a CSV",
            	"className": "btn-sm btn-info",
            	"title":"tabla_usuarios",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 5, 6, 7 ]
            	}
            }
        ] 
		});
	
		if(document.querySelector('#formUsuario'))
		{
			let formUsuario = document.querySelector('#formUsuario');
			formUsuario.onsubmit = (e) => {
				e.preventDefault();
				let strIdentificacion = document.querySelector('#txtIdentificacion').value;
				let strNombre = document.querySelector('#txtNombre').value;
				let strApellido = document.querySelector('#txtApellido').value;
				let strEmail = document.querySelector('#txtEmail').value;
				let intTelefono = document.querySelector('#txtTelefono').value;
				let intTipousuario = document.querySelector('#listRolid').value;
				let strPassword = document.querySelector('#txtPassword').value;

				if (strIdentificacion == '' || strApellido == '' || strNombre == '' || strEmail == '' || intTelefono == '' || intTipousuario == '') {
					swal("Atención", "Todos los campos son obligatorios", "error");
					return false;
				}
				let elementsValid = document.getElementsByClassName("valid");
				for (let i = 0; i < elementsValid.length; i++) {
					if (elementsValid[i].classList.contains('is-invalid')) {
						swal("Atención", "Por favor verifique los campos en rojo.", "error");
						return false;
					}
				}
				//divLoading.style.display = "flex";
				let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
				let ajaxUrl = `${base_url}/Usuarios/setUsuario`;
				let formData = new FormData(formUsuario);
				request.open("POST", ajaxUrl, true);
				request.send(formData);
				request.onreadystatechange = () => {
					if (request.readyState == 4 && request.status == 200) {
						let objData = JSON.parse(request.responseText);
						if (objData.status) {
							$('#modalFormUsuario').modal('hide');
							formUsuario.reset();
							swal("Usuarios", objData.msg, "success");
							tableUsuarios.api().ajax.reload(null, false);
						}
						else {
							swal("Error", objData.msg, "error");
						}
					}
					//divLoading.style.display = "none";
					return false;
				};
			}
		}
		//actualizar perfil
		if(document.querySelector('#formPerfil'))
		{
			let formUsuario = document.querySelector('#formPerfil');
			formUsuario.onsubmit = (e) => {
				e.preventDefault();
				let strIdentificacion = document.querySelector('#txtIdentificacion').value;
				let strNombre = document.querySelector('#txtNombre').value;
				let strApellido = document.querySelector('#txtApellido').value;
				let intTelefono = document.querySelector('#txtTelefono').value;
				let strPassword = document.querySelector('#txtPassword').value;
				let strPasswordConfirm = document.querySelector('#txtPasswordConfirm').value;

				if (strIdentificacion == '' || strApellido == '' || strNombre == '' || intTelefono == '') {
					swal("Atención", "Todos los campos son obligatorios", "error");
					return false;
				}
				let elementsValid = document.getElementsByClassName("valid");
				for (let i = 0; i < elementsValid.length; i++) {
					if (elementsValid[i].classList.contains('is-invalid')) {
						swal("Atención", "Por favor verifique los campos en rojo.", "error");
						return false;
					}
				}
				if (strPassword != "" || strPasswordConfirm != "") {
					if (strPassword != strPasswordConfirm) {
						swal("Atencion", "Las contraseñas no son iguale.", "info");
						return false;
					}
					if (strPassword.length < 5) {
						swal("Atencion", "La contraseña debe tener un mínimo de 5 carácteres.", "info");
						return false;
					}
				}
				//divLoading.style.display = "flex";
				let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
				let ajaxUrl = `${base_url}/Usuarios/putPerfil`;
				let formData = new FormData(formUsuario);
				request.open("POST", ajaxUrl, true);
				request.send(formData);
				request.onreadystatechange = () => {
					if (request.readyState != 4)
						return;
					if (request.status == 200) {
						let objData = JSON.parse(request.responseText);
						if (objData.status) {
							$('#modalFormPerfil').modal('hide');
							swal({
								title: "",
								text: objData.msg,
								type: "success",
								confirmButtonText: "Aceptar",
								closeOnConfirm: false
							}, function (isConfirm) {
								if (isConfirm) {
									location.reload();
								}
							});

						}
						else {
							swal("Error", objData.msg, "error");
						}
					}
					//divLoading.style.display = "none";
					return false;
				};
			}
		}
	
		//actualizar datos fiscales
		if(document.querySelector('#formDataFiscal'))
		{
			let formDataFiscal = document.querySelector('#formDataFiscal');
			formDataFiscal.onsubmit = (e) => {
				e.preventDefault();
				let strNit = document.querySelector('#txtNit').value;
				let strNombreFiscal = document.querySelector('#txtNombreFiscal').value;
				let strDirFiscal = document.querySelector('#txtDirFiscal').value;
				if (strNit == '' || strNombreFiscal == '' || strDirFiscal == '') {
					swal("Atención", "Todos los campos son obligatorios", "error");
					return false;
				}
				let elementsValid = document.getElementsByClassName("valid");
				for (let i = 0; i < elementsValid.length; i++) {
					if (elementsValid[i].classList.contains('is-invalid')) {
						swal("Atención", "Por favor verifique los campos en rojo.", "error");
						return false;
					}
				}
				//divLoading.style.display = "flex";
				let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
				let ajaxUrl = `${base_url}/Usuarios/putDFiscal`;
				let formData = new FormData(formDataFiscal);
				request.open("POST", ajaxUrl, true);
				request.send(formData);
				request.onreadystatechange = () => {
					if (request.readyState != 4)
						return;
					if (request.status == 200) {
						let objData = JSON.parse(request.responseText);
						if (objData.status) {
							$('#modalFormPerfil').modal('hide');
							swal({
								title: "",
								text: objData.msg,
								type: "success",
								confirmButtonText: "Aceptar",
								closeOnConfirm: false
							}, (isConfirm) => {
									if (isConfirm) {
										location.reload();
									}
								});
						}
						else {
							swal("Error", objData.msg, "error");
						}
					}
					//divLoading.style.display = "none";
					return false;
				};
			}
		}
	
		if(document.querySelector("#foto")){
			var foto = document.querySelector("#foto");
			foto.onchange = (e) => {
				var uploadFoto = document.querySelector("#foto").value;
				var fileimg = document.querySelector("#foto").files;
				var nav = window.URL || window.webkitURL;
				var contactAlert = document.querySelector('#form_alert');
				if(uploadFoto !=''){
					var type = fileimg[0].type;
					var name = fileimg[0].name;
					if(type != 'image/jpeg' && type != 'image/jpg' && type != 'image/png'){
						contactAlert.innerHTML = '<p class="errorArchivo">El archivo no es válido.</p>';
						if(document.querySelector('#img')){
							document.querySelector('#img').remove();
						}
						document.querySelector('.delPhoto').classList.add("notBlock");
						foto.value="";
						return false;
					}else{  
							contactAlert.innerHTML='';
							if(document.querySelector('#img')){
								document.querySelector('#img').remove();
							}
							document.querySelector('.delPhoto').classList.remove("notBlock");
							var objeto_url = nav.createObjectURL(this.files[0]);
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
		
		if(document.querySelector(".delPhoto")){
			var delPhoto = document.querySelector(".delPhoto");
			delPhoto.onclick = (e) => {
				removePhoto();
			}
		}
		
		function removePhoto(){
			document.querySelector('#foto').value ="";
			document.querySelector('.delPhoto').classList.add("notBlock");
			document.querySelector('#img').remove();
		}
	}, false);
window.addEventListener('load', () => {
		usuario.RolesUsuario();
	}, false);
//declaracion de variables
let divLoading = document.querySelector("#divLoading"); //loading
let tableUsuarios; //tabla usuarios

//objeto Usuario
let usuario = {
	RolesUsuario: () => {
		if(document.querySelector('#listRolid'))
		{
			let ajaxUrl = `${base_url}/Roles/getSelectRoles`;
			let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
			request.open("GET", ajaxUrl, true);
			request.send();

			request.onreadystatechange = () => {
				if (request.readyState == 4 && request.status == 200) {
					document.querySelector('#listRolid').innerHTML = request.responseText;
					document.querySelector('#listRolid').value = 2;
					$('#listRolid').selectpicker('render');
				}
			}
		}
	},//fin RolesUsuario
	ViewUsuario: (idusuario) => {
		let request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
		let ajaxUrl = `${base_url}/Usuarios/getUsuario/${idusuario}`;
		request.open("GET", ajaxUrl, true);
		request.send();
		request.onreadystatechange = () => {
			if (request.readyState == 4 && request.status == 200) {
				let objData = JSON.parse(request.responseText);
				if (objData.status) {
					let estadoUsuario = objData.data.status == 1 ?
						'<span class="badge badge-success">Activo</span>' :
						'<span class="badge badge-	danger">Inactivo</span>';
					document.querySelector('#celIdentificacion').innerHTML = objData.data.identificacion;
					document.querySelector('#celNombre').innerHTML = objData.data.nombres;
					document.querySelector('#celApellido').innerHTML = objData.data.apellidos;
					document.querySelector('#celTelefono').innerHTML = objData.data.telefono;
					document.querySelector('#celEmail').innerHTML = objData.data.email_user;
					document.querySelector('#celTipoUsuario').innerHTML = objData.data.nombrerol;
					document.querySelector('#celEstado').innerHTML = estadoUsuario;
					document.querySelector('#celFechaRegistro').innerHTML = objData.data.fechaRegistro;
					document.querySelector('#imgperfil').src = `${base_url}/Assets/images/uploads/users_img/${objData.data.img_perfil}`;
				}

				else {
					swal("Error", objData.msg, "error");
				}
			}
		}
		$('#modalViewUser').modal('show');
	},//fin ViewUsuario
	EditUsuario: (element,idusuario) => {
		document.querySelector('#titleModal').innerHTML = "Actualizar Usuario";
		document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
		document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
		document.querySelector('#btnText').innerHTML = "Actualizar";

		let request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
		let ajaxUrl = `${base_url}/Usuarios/getUsuario/${idusuario}`;
		request.open("GET", ajaxUrl, true);
		request.send();
		request.onreadystatechange = () => {
			if (request.readyState == 4 && request.status == 200) {
				let objData = JSON.parse(request.responseText);
				if (objData.status) {
					document.querySelector('#idUsuario').value = objData.data.idpersona;
					document.querySelector('#txtIdentificacion').value = objData.data.identificacion;
					document.querySelector('#txtNombre').value = objData.data.nombres;
					document.querySelector('#txtApellido').value = objData.data.apellidos;
					document.querySelector('#txtTelefono').value = objData.data.telefono;
					document.querySelector('#txtEmail').value = objData.data.email_user;
					document.querySelector('#listRolid').value = objData.data.idrol;
					$('#listRolid').selectpicker('render');
					if (objData.data.status == 1) {
						document.querySelector('#listStatus').value = 1;
					}

					else {
						document.querySelector('#listStatus').value = 2;
					}
					$('#listStatus').selectpicker('render');
				}
			}
			$('#modalFormUsuario').modal('show');
		}
	},//fin EditUsuario
	DelUsuario: (idusuario) => {
		swal({
			title: "Eliminar Usuario",
			text:"¿Realmente desea eliminar este Usuario?",
			type: "warning",
			showCancelButton:true,
			confirmButtonText: "Si, eliminar!",
			cancelButtonText: "No, Cancelar!",
			closeOnConfirm: false,
			closeOnCancel:true
		}, (isConfirm) => {
				if (isConfirm) {
					let request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
					let ajaxUrl = `${base_url}/Usuarios/delUsuario/`;
					let strData = `idUsuario=${idusuario}`;
					request.open("POST", ajaxUrl, true);
					request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					request.send(strData);
					request.onreadystatechange = () => {
						if (request.readyState == 4 && request.status == 200) {
							let objData = JSON.parse(request.responseText);
							if (objData.status) {
								swal("Eliminar!", objData.msg, "success");
								tableUsuarios.api().ajax.reload(null, false);
							}
							else {
								swal("Atención!", objData.msg, "error");
							}
						}
					};
				}
			});
	}//fin DelUsuario
}
	function openModalPerfil(){
		$('#modalFormPerfil').modal('show');
	}
 	function openModal() {
		document.querySelector('#idUsuario').value="";
		document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
		document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
		document.querySelector('#btnText').innerHTML = "Guardar";
		document.querySelector('#titleModal').innerHTML = "Nuevo Usuario";
		document.querySelector("#formUsuario").reset();
		$('#modalFormUsuario').modal('show');
 	}


