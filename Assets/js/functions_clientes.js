'use strict'
//funciones al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
	tableClientes = $('#tableClientes').dataTable({
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
            "url":`${base_url}/Clientes/getClientes`,
            "dataSrc":""
        },
        "columns":
        [
            {"data":"idpersona", "width": "5%", "className": "text-center"},
            {"data":"identificacion", "width": "10%", "className": "text-center"},
            {"data":"nombres", "width": "10%", "className": "text-center"},
            {"data":"apellidos", "width": "10%", "className": "text-center"},
            {"data":"email_user", "width": "10%", "className": "text-center"},
            {"data":"telefono", "width": "10%", "className": "text-center"},
            {"data":"options" , "width":"5%"}
        ],
        "buttons": [
            {
            	"extend": "copyHtml5",
            	"text":"<i class='far fa-copy'></i> Copiar",
            	"titleAttr": "Copiar",
            	"className": "btn-sm btn-secondary",
            	"title":"tabla_clientes",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 3]
            	}
            },
            {
            	"extend": "excelHtml5",
            	"text":"<i class='far fa-file-excel'></i> Excel",
            	"titleAttr": "Exportar a Excel",
            	"className": "btn-sm btn-success",
            	"title":"tabla_clientes",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 3]
            	}
            },
            {
            	"extend": "pdfHtml5",
            	"text":"<i class='far fa-file-pdf'></i> PDF",
            	"titleAttr": "Exportar a PDF",
            	"className": "btn-sm btn-danger",
            	"messageTop":"Tabla de Clientes",
            	"title":"tabla_clientes",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 3]
            	}
            },
            {
            	"extend": "csvHtml5",
            	"text":"<i class='fas fa-file-csv'></i> CSV",
            	"titleAttr": "Exportar a CSV",
            	"className": "btn-sm btn-info",
            	"title":"tabla_clientes",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 3]
            	}
            }
        ]
	});//fin Datatable Clientes
});//fin DOM

//declaracion de variables
let divLoading = document.querySelector("#divLoading"); //loading
let tableClientes; //tabla usuarios
//
//
//objeto CLIENTES
let cliente = 
{
	ViewCliente: (idusuario) => {
		let request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
		let ajaxUrl = `${base_url}/Clientes/getCliente/${idusuario}`;
		request.open("GET", ajaxUrl, true);
		request.send();
		request.onreadystatechange = () =>{
			if(request.readyState == 4 && request.status == 200)
			{
				let objData = JSON.parse(request.responseText);
				if(objData.status)
				{
					document.querySelector('#celIdentificacion').innerHTML = objData.data.identificacion;
					document.querySelector('#celNombre').innerHTML = objData.data.nombres;
					document.querySelector('#celApellido').innerHTML = objData.data.apellidos;
					document.querySelector('#celTelefono').innerHTML = objData.data.telefono;
					document.querySelector('#celEmail').innerHTML = objData.data.email_user;
					document.querySelector('#celIde').innerHTML = objData.data.nit;
					document.querySelector('#celNomFiscal').innerHTML = objData.data.nombrefiscal;
					document.querySelector('#celDirFiscal').innerHTML = objData.data.direccionfiscal;
					document.querySelector('#celFechaRegistro').innerHTML = objData.data.fechaRegistro;
					document.querySelector('#imgperfil').src=`${base_url}/Assets/images/uploads/users_img/${objData.data.img_perfil}`;
					$('#modalViewCliente').modal('show');
				}
				else
				{
					swal("Error", objData.msg, "error");
				}
			}
		}
	},//fin ViewCliente
	EditCliente: (element,idusuario) =>{
		document.querySelector('#titleModal').innerHTML = "Actializar Cliente";
		document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
		document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
		document.querySelector('#btnText').innerHTML = "Actualizar";

		let request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
		let ajaxUrl = `${base_url}/Clientes/getCliente/${idusuario}`;
		request.open("GET", ajaxUrl, true);
		request.send();
		request.onreadystatechange = () =>
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
					document.querySelector('#txtNit').value = objData.data.nit;
					document.querySelector('#txtNombreFiscal').value = objData.data.nombrefiscal;
					document.querySelector('#txtDirFiscal').value = objData.data.direccionfiscal;
					
				}
			}
			$('#modalFormCliente').modal('show');
		}
	},//fin EditCliente
	DelCliente: (idusuario) => {
		swal({
			title: "Eliminar Cliente",
			text:"¿Realmente desea eliminar este Cliente?",
			type: "warning",
			showCancelButton:true,
			confirmButtonText: "Si, eliminar!",
			cancelButtonText: "No, Cancelar!",
			closeOnConfirm: false,
			closeOnCancel:true
		}, (isConfirm) => {
			if(isConfirm)
			{
				let request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
				let ajaxUrl = `${base_url}/Clientes/delCliente/`;
				let strData = "idUsuario="+idusuario;
				request.open("POST",ajaxUrl,true);
				request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				request.send(strData);
				request.onreadystatechange = () => {
					if(request.readyState == 4 && request.status == 200){
						let objData = JSON.parse(request.responseText);
						if(objData.status)
						{
							swal("Eliminar!", objData.msg, "success");
							tableClientes.api().ajax.reload();
						}else
						{
							swal("Atención!", objData.msg, "error")
						}
					}
				}
			}
		});
	}//fin DelCliente
}//fin categorias
//
//
//abrir modal
function openModal()
{
	document.querySelector('#idUsuario').value="";
	document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
	document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
	document.querySelector('#btnText').innerHTML = "Guardar";
	document.querySelector('#titleModal').innerHTML = "Nuevo Cliente";
	document.querySelector("#formCliente").reset();
	$('#modalFormCliente').modal('show');
}//fin openModal
//
//


