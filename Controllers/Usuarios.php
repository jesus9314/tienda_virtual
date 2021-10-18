<?php 
	/**
	 * 
	 */
	class Usuarios extends Controllers
	{
		
		public function __construct()
		{
			parent::__construct();
			session_start();
			if(empty($_SESSION['login']))
			{
				header('location:'.base_url().'/Login');
			}
			getPermisos(2);
		}
		
		public function usuarios()
		{	
			if(empty($_SESSION['permisosMod']['r'])){
				header("Location: ".base_url().'/dashboard');
			}

			$data['page_tag']="Usuarios";
			$data['page_tittle']="USUARIOS <small>Tienda Virtual</small>";
			$data['page_name']="usuarios";
			$data['page_functions_js']="functions_usuarios.js";
			$this->views->getView($this,"usuarios",$data);
		}

		public function setUsuario()
		{
			if($_POST)
			{
				if(empty($_POST['txtIdentificacion']) ||empty($_POST['txtNombre']) ||empty($_POST['txtApellido']) ||
			empty($_POST['txtTelefono']) ||empty($_POST['txtEmail']) ||empty($_POST['listRolid']) ||empty($_POST['listStatus']))
				{
					$arrResponse = array("status" => false, "msg" =>'Datos incorrectos.');
				}
				else
				{
					$idUsuario = intval($_POST['idUsuario']);
					$strIdentificacion = strClean($_POST['txtIdentificacion']);
					$strNombre = ucwords(strClean($_POST['txtNombre']));
					$strApellido = ucwords(strClean($_POST['txtApellido']));
					$intTelefono = intval(strClean($_POST['txtTelefono']));
					$strEmail = strtolower(strClean($_POST['txtEmail']));
					$intTipoId = intval(strClean($_POST['listRolid']));
					$intStatus = intval(strClean($_POST['listStatus']));
					$request = "";

					if($idUsuario == 0)
					{
						$option = 1;
						$strPassworrd = empty($_POST['txtPassword']) ? hash("SHA256", passGenerator()) : hash("SHA256", $_POST['txtPassword']);
						if($_SESSION['permisosMod']['w'])
						{	
							$request = $this->model->insertUsuario($strIdentificacion,$strNombre,$strApellido,$intTelefono,$strEmail,$strPassworrd,$intTipoId,$intStatus);
						}
					}
					else
					{
						$option = 2;
						$strPassworrd = empty($_POST['txtPassword']) ? "" : hash("SHA256", $_POST['txtPassword']);
						if($_SESSION['permisosMod']['u'])
						{
							$request = $this->model->updateUsuario($idUsuario,$strIdentificacion,$strNombre,$strApellido,$intTelefono,$strEmail,$strPassworrd,$intTipoId,$intStatus);
						}
					}
					if($request > 0)
					{
						if($option == 1)
						{
							$arrResponse = array('status' => true, 'msg' => 'Datos guardados correctamente.');
						}
						else
						{
							$arrResponse = array('status' => true, 'msg' => 'Datos Actualizados correctamente.');
						}
					}else if ($request == 'exist')
					{
						$arrResponse = array('status' => false, 'msg' => '¡Atención!, el email o la identificación ya existe, ingrese uno distinto.');
					}
					else
					{
						$arrResponse = array('status' => false, 'msg' => 'No es posible almacenar los datos.');
					}
				}
				echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
			}
			die();
		}

		public function getUsuarios()
		{
			if($_SESSION['permisosMod']['r'])
			{
				$arrData = $this->model->selectUsuarios();
				for ($i=0; $i < count($arrData); $i++) {
					$btnView = '';
					$btnEdit = '';
					$btnDelete ='';

					if($_SESSION['permisosMod']['r'])
					{
						$btnView = '<button class="btn-sm btn-info btn-sm btnViewUsuario" onClick="fntViewUsuario('.$arrData[$i]['idpersona'].')" title="Ver usuario"><i class="fa fa-eye"></i></button>';
					}
					if($_SESSION['permisosMod']['u'])
					{
						if(($_SESSION['idUser'] == 1 and $_SESSION['userData']['idrol'] ==1) || ($_SESSION['userData']['idrol'] == 1 and $arrData[$i]['idrol'] !=1))
						{
							$btnEdit = '<button class="btn-sm btn-primary  btn-sm btnEditUsuario" onClick="fntEditUsuarios(this,'.$arrData[$i]['idpersona'].')" title="Editar usuario"><i class="fa fa-pencil"></i></button>';
						}
						else
						{
							$btnEdit = '<button class="btn-sm btn-primary  btn-sm btnEditUsuario" disabled title="Editar usuario"><i class="fa fa-pencil"></i></button>';
						}
					}

					if($_SESSION['permisosMod']['d'])
					{
						if(($_SESSION['idUser'] == 1 and $_SESSION['userData']['idrol'] ==1) || ($_SESSION['userData']['idrol'] == 1 and $arrData[$i]['idrol'] !=1) and 
							($_SESSION['userData']['idpersona'] != $arrData[$i]['idpersona']))
						{
						$btnDelete = '<button class="btn-sm btn-danger btn-sm btnDelCliente" onClick="fntDelUsuario('.$arrData[$i]['idpersona'].')" title="Eliminar usuario"><i class="fa fa-trash"></i></button>';	
						}
						else
						{
						$btnDelete = '<button class="btn-sm btn-danger btn-sm btnDelCliente" disabled title="Eliminar usuario"><i class="fa fa-trash"></i></button>';
						}
						
					}


					$arrData[$i]['options'] = '<div class="text-center"><div class="btn-group">'.$btnView.' '.$btnEdit.' '.$btnDelete.'</div></div>';
				}
				echo json_encode($arrData,JSON_UNESCAPED_UNICODE);
			}
			die();
		}

		public function getUsuario($idusuario)
		{
			if($_SESSION['permisosMod']['r'])
			{
				$idusuario = intval($idusuario);
				if($idusuario > 0 )
				{
					$arrData = $this->model->selectUsuario($idusuario);
					if(empty($arrData))
					{
						$arrResponse = array('status' => false, 'msg' => 'Datos no encontrados');
					}
					else
					{
						$arrResponse = array('status' => true, 'data' => $arrData);
					}
					echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
				}
			}
			die();
		}

		public function delUsuario()
		{	
			if($_POST)
			{
				if($_SESSION['permisosMod']['d'])
				{
					$intIdpersona = intval($_POST['idUsuario']);
					$requestDelete = $this->model->deleteUsuario($intIdpersona);
					if($requestDelete)
					{
						$arrResponse = array('status' =>true , 'msg' => 'Se ha eliminado el usuario.');
					}
					else
					{
						$arrResponse = array('status' =>false , 'msg' => 'Error al eliminar el usuario.');
					}
					echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
				}
			}
			die();
		}

		public function perfil()
		{
			$data['page_tag']="Perfil";
			$data['page_tittle']="Perfil de usuario";
			$data['page_name']="perfil";
			$data['page_functions_js']="functions_usuarios.js";
			$this->views->getView($this,"perfil",$data);
		}

		public function putPerfil()
		{
			if($_POST)
			{
				if(empty($_POST['txtIdentificacion']) ||empty($_POST['txtNombre']) ||empty($_POST['txtApellido']) ||empty($_POST['txtTelefono']))
				{
					$arrResponse =array("status" => false, "msg" => "Por favor llena todos los campos.");
				}
				else
				{
					$idUsuario = $_SESSION['idUser'];
					$strIdentificacion =strClean($_POST['txtIdentificacion']);
					$strNombre = strClean($_POST['txtNombre']);
					$strApellido = strClean($_POST['txtApellido']);
					$intTelefono = intval(strClean($_POST['txtTelefono']));
					$strPassword ="";
					if(!empty($_POST['txtPassword']))
					{
						$strPassword = hash("SHA256", $_POST['txtPassword']);
					}
					$request_user = $this->model->updatePerfil($idUsuario,$strIdentificacion,$strNombre,$strApellido,$intTelefono,$strPassword);

					if($request_user)
					{
						sessionUser($_SESSION['idUser']);
						$arrResponse = array('status' => true, 'msg' => 'Datos Actualizados correctamente.');
					}
					else
					{
						$arrResponse = array('status' => false, 'msg' => 'Ha ocurrido un error al actualizar los datos.');
					}
				}
				echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
			}
			die();
		}

		public function putDFiscal()
		{
			if($_POST)
			{
				if(empty($_POST['txtNit']) ||empty($_POST['txtNombreFiscal']) ||empty($_POST['txtDirFiscal']))
				{
					$arrResponse = array('status' => false, 'msg' => 'Datos incorrectos.');
				}
				else
				{
					$idUsuario = $_SESSION['idUser'];
					$strNit = strClean($_POST['txtNit']);
					$strNombreFiscal = strClean($_POST['txtNombreFiscal']);
					$strDirFiscal = strClean($_POST['txtDirFiscal']);
					$request_datafiscal = $this->model->updateDataFiscal($idUsuario,$strNit,$strNombreFiscal,$strDirFiscal);
					if($request_datafiscal)
					{
						sessionUser($_SESSION['idUser']);
						$arrResponse = array('status' => true, 'msg' => 'Datos actualizados correctamente.');
					}
					else
					{
						$arrResponse = array('status' =>false, 'msg' => 'no es posible almacenar los datos.');
					}
				}
				echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
			}
			die();
		}
	}
 ?>