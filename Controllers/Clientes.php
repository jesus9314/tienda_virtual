<?php 
	/**
	 * 
	 */
	class Clientes extends Controllers
	{
		
		public function __construct()
		{
			parent::__construct();
			session_start();
			if(empty($_SESSION['login']))
			{
				header('location:'.base_url().'/Login');
			}
			getPermisos(3);
		}
		
		public function clientes()
		{	
			if(empty($_SESSION['permisosMod']['r'])){
				header("Location: ".base_url().'/dashboard');
			}

			$data['page_tag']="Clientes";
			$data['page_tittle']="Clientes <small>Tienda Virtual</small>";
			$data['page_name']="clientes";
			$data['page_functions_js']="functions_clientes.js";
			$this->views->getView($this,"clientes",$data);
		}

		public function setCliente()
		{
			if($_POST)
			{
				if(empty($_POST['txtIdentificacion']) ||empty($_POST['txtNombre']) ||empty($_POST['txtApellido']) ||
			empty($_POST['txtTelefono']) ||empty($_POST['txtEmail']) ||empty($_POST['txtNit']) ||empty($_POST['txtNombreFiscal'])||empty($_POST['txtDirFiscal']))
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
					$strNit = strClean($_POST['txtNit']);
					$strNombreFiscal = strClean($_POST['txtNombreFiscal']);
					$strDirFiscal = strClean($_POST['txtDirFiscal']);
					$intTipoId = 7;
					$request = "";

					if($idUsuario == 0)
					{
						$option = 1;
						$strPassworrd = empty($_POST['txtPassword']) ? passGenerator() : $_POST['txtPassword'];
						$strPassworrdEncript= hash("SHA256", $strPassworrd);
						if($_SESSION['permisosMod']['w'])
						{	
							$request = $this->model->insertCliente($strIdentificacion,$strNombre,$strApellido,$intTelefono,$strEmail,$strPassworrdEncript,$intTipoId,$strNit,$strNombreFiscal,$strDirFiscal);
						}
					}
					else
					{
						$option = 2;
						$strPassworrd = empty($_POST['txtPassword']) ? "" : hash("SHA256", $_POST['txtPassword']);
						if($_SESSION['permisosMod']['u'])
						{
							$request = $this->model->updateCliente($idUsuario,$strIdentificacion,$strNombre,$strApellido,$intTelefono,$strEmail,$strPassworrd,$strNit,$strNombreFiscal,$strDirFiscal);
						}
					}
					if($request > 0)
					{
						if($option == 1)
						{
							$arrResponse = array('status' => true, 'msg' => 'Datos guardados correctamente.');
							$nombreUsuario = $strNombre.' '.$strApellido;
							$dataUsuario = array('nombreUsuario' => $nombreUsuario, 'email' => $strEmail,'password' => $strPassworrd, 'asunto' => 'Bienvenido a tu tienda en l??nea');
							sendEmail($dataUsuario, 'email_bienvenida');
						}
						else
						{
							$arrResponse = array('status' => true, 'msg' => 'Datos Actualizados correctamente.');
						}
					}else if ($request == 'exist')
					{
						$arrResponse = array('status' => false, 'msg' => '??Atenci??n!, el email o la identificaci??n ya existe, ingrese uno distinto.');
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
		public function getClientes()
		{
			if($_SESSION['permisosMod']['r'])
			{
				$arrData = $this->model->selectClientes();
				for ($i=0; $i < count($arrData); $i++) {
					$btnView = '';
					$btnEdit = '';
					$btnDelete ='';

					if($_SESSION['permisosMod']['r'])
					{
						$btnView = '<button class="btn btn-info btn-sm btnViewUsuario" onClick="fntViewInfo('.$arrData[$i]['idpersona'].')" title="Ver usuario"><i class="far fa-eye"></i></button>';
					}
					if($_SESSION['permisosMod']['u'])
					{
						$btnEdit = '<button class="btn btn-primary  btn-sm btnEditCliente" onClick="fntEditInfo(this,'.$arrData[$i]['idpersona'].')" title="Editar cliente"><i class="fas fa-pencil-alt"></i></button>';
					}

					if($_SESSION['permisosMod']['d'])
					{
						$btnDelete = '<button class="btn btn-danger btn-sm btnDeCliente" onClick="fntDelCliente('.$arrData[$i]['idpersona'].')" title="Eliminar usuario"><i class="far fa-trash-alt"></i></button>';		
					}


					$arrData[$i]['options'] = '<div class="text-center"><div class="btn-group">'.$btnView.' '.$btnEdit.' '.$btnDelete.'</div></div>';
				}
				echo json_encode($arrData,JSON_UNESCAPED_UNICODE);
			}
			die();
		}
		public function getCliente($idusuario)
		{
			if($_SESSION['permisosMod']['r'])
			{
				$idusuario = intval($idusuario);
				if($idusuario > 0 )
				{
					$arrData = $this->model->selectCliente($idusuario);
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
				die();
			}
		}
		public function delCliente()
		{	
			if($_POST)
			{
				if($_SESSION['permisosMod']['d'])
				{
					$intIdpersona = intval($_POST['idUsuario']);
					$requestDelete = $this->model->deleteCliente($intIdpersona);
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
	}

?>