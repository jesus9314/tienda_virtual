//declaración de variables
let divLoading = document.querySelector("#divLoading"); //loading
let tableClientes; //tabla usuarios

function openModal()
{
	document.querySelector('#idUsuario').value="";
	document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
	document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
	document.querySelector('#btnText').innerHTML = "Guardar";
	document.querySelector('#titleModal').innerHTML = "Nuevo Cliente";
	document.querySelector("#formCliente").reset();
	$('#modalFormCliente').modal('show');
}

document.addEventListener('DOMContentLoaded', function(){

	tableClientes = $('#tableClientes').dataTable({
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
            "url": " "+base_url+"/Clientes/getClientes",
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
        "dom": 'lBfrtip',
        "buttons": [
            {
            	"extend": "copyHtml5",
            	"text":"<i class='far fa-copy'></i> Copiar",
            	"titleAttr": "Copiar",
            	"className": "btn-sm btn-secondary",
            	"title":"tabla_clientes",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 3, 4, 5]
            	}
            },
            {
            	"extend": "excelHtml5",
            	"text":"<i class='far fa-file-excel'></i> Excel",
            	"titleAttr": "Exportar a Excel",
            	"className": "btn-sm btn-success",
            	"title":"tabla_clientes",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 3, 4, 5]
            	}
            },
            {
            	"extend": "pdfHtml5",
            	"text":"<i class='far fa-file-pdf'></i> PDF",
            	"titleAttr": "Exportar a PDF",
            	"className": "btn-sm btn-danger",
            	"messageTop":"Tabla de usuarios",
            	"title":"tabla_clientes",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 3, 4, 5]
            	}
            },
            {
            	"extend": "csvHtml5",
            	"text":"<i class='fas fa-file-csv'></i> CSV",
            	"titleAttr": "Exportar a CSV",
            	"className": "btn-sm btn-info",
            	"title":"tabla_clientes",
            	"exportOptions":{
            		"columns": [ 0, 1, 2, 3, 4, 5]
            	}
            }
        ],
        "resonsieve":"true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order":[[0,"asc"]] 
    });
	//función para crear un nuevo cliente
    if(document.querySelector('#formCliente'))
	{
		let formCliente = document.querySelector('#formCliente');
		formCliente.onsubmit = function(e)
		{
			e.preventDefault();
			let strIdentificacion = document.querySelector('#txtIdentificacion').value;
			let strNombre = document.querySelector('#txtNombre').value;
			let strApellido = document.querySelector('#txtApellido').value;
			let strEmail = document.querySelector('#txtEmail').value;
			let intTelefono = document.querySelector('#txtTelefono').value;

			let strNit = document.querySelector('#txtNit').value;
			let strNombreFiscal = document.querySelector('#txtNombreFiscal').value;
			let strDirFiscal = document.querySelector('#txtDirFiscal').value;

			let strPassword = document.querySelector('#txtPassword').value;

			if(strIdentificacion == '' || strApellido == '' || strNombre == '' || strEmail == '' || intTelefono == '' || strNit == ''|| strNombreFiscal == ''|| strDirFiscal == '')
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
			let ajaxUrl = base_url+'/Clientes/setCliente';
			let formData = new FormData(formCliente);
			request.open("POST",ajaxUrl,true);
			request.send(formData);
			request.onreadystatechange = function(){
				if(request.readyState == 4 && request.status == 200)
				{
					let objData = JSON.parse(request.responseText);
					if(objData.status)
					{
						$('#modalFormCliente').modal('hide');
						formCliente.reset();
						swal("Clientes", objData.msg, "success");
						tableClientes.api().ajax.reload(null,false);
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

//función para ver información de los clientes
function fntViewInfo(idusuario)
{
	let request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
	let ajaxUrl = base_url+'/Clientes/getCliente/'+idusuario;
	request.open("GET", ajaxUrl, true);
	request.send();
	request.onreadystatechange = function(){
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
				$('#modalViewCliente').modal('show');
			}
			else
			{
				swal("Error", objData.msg, "error");
			}
		}
	}
	
}
//función para editar un cliente
function fntEditInfo(element,idusuario)
{
	document.querySelector('#titleModal').innerHTML = "Actializar Cliente";
	document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
	document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
	document.querySelector('#btnText').innerHTML = "Actualizar";

	let request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
	let ajaxUrl = base_url+'/Clientes/getCliente/'+idusuario;
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
				document.querySelector('#txtNit').value = objData.data.nit;
				document.querySelector('#txtNombreFiscal').value = objData.data.nombrefiscal;
				document.querySelector('#txtDirFiscal').value = objData.data.direccionfiscal;
				
			}
		}
		$('#modalFormCliente').modal('show');
	}
}

function fntDelCliente(idusuario)
{ 
	            swal({
	                title: "Eliminar Cliente",
	                text:"¿Realmente desea eliminar este Cliente?",
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
	                    let ajaxUrl = base_url+'/Clientes/delCliente/';
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
	                                tableClientes.api().ajax.reload();
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
    tableClientes.api().ajax.reload(null,false);
    }, 3000 );*/