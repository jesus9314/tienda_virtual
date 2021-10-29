<?php 
	/**
	 * 
	 */
	class Roles extends Controllers
	{
		
		public function __construct()
		{
			parent::__construct();
			session_start();
			if(empty($_SESSION['login']))
			{
				header('location:'.base_url().'/login');
			}
			getPermisos(7);
		}
		public function roles()
		{	
			if(empty($_SESSION['permisosMod']['r'])){
				header("Location: ".base_url().'/dashboard');
			}
			$data['page_id']=3;
			$data['page_tag']="Roles Usuario";
			$data['page_tittle']="rol_usuario";
			$data['page_name']="Roles Usuario <small> Tienda Virtual</small>";
			$data['page_functions_js']="functions_roles.js";
			$this->views->getView($this,"roles",$data);
		}
		public function getRoles()
		{
			if($_SESSION['permisosMod']['r'])
			{
				$arrData = $this->model->selectRoles();

				for ($i=0; $i < count($arrData); $i++) {
					$btnView = '';
					$btnEdit = '';
					$btnDelete = '';
					if($_SESSION['permisosMod']['u']){
						$btnView ='<button class="btn btn-secondary btn-sm btnPermisosRol" onClick="rol.Permisos('.$arrData[$i]['idrol'].')" title="Ver Permisos del Rol"><i class="fas fa-key"></i></button>';
						$btnEdit ='<button class="btn btn-primary btn-sm btnEditRol" onClick="rol.EditRol('.$arrData[$i]['idrol'].')" title="Editar Rol"><i class="fas fa-pencil-alt"></i></button>';
					}
					else
					{
						$btnView ='<span class="badge bg-warning">Sin Acceso</span>';
					}
					if($_SESSION['permisosMod']['d']){
						$btnDelete ='<button class="btn btn-danger btn-sm btnDelRol" onClick="rol.DelRol('.$arrData[$i]['idrol'].')" title="Eliminar Rol"><i class="far fa-trash-alt"></i></button>';
					}

					$arrData[$i]['options'] = '<div class="text-center"><div class="btn-group">'.$btnView.$btnEdit.$btnDelete.'</div></div>';
				}
				echo json_encode($arrData,JSON_UNESCAPED_UNICODE);
			}
			die();
		}
		public function getSelectRoles()
		{
			$htmlOptions = "";
			$arrData = $this->model->selectRoles();
			if(count($arrData) > 0)
			{
				for ($i=0; $i < count($arrData) ; $i++) { 
					if($arrData[$i]['status'] == 1 )
					{
						$htmlOptions .= '<option value="'.$arrData[$i]['idrol'].'">'.$arrData[$i]['nombrerol'].'</option>';
					}				
				}
			}
			echo $htmlOptions;
			die();
		}
		public function setRol(){
			if($_SESSION['permisosMod']['w'])
			{
				$intIdrol = intval($_POST['idRol']);
				$strRol = strClean($_POST['txtNombre']);
				$strDescripcion = strClean($_POST['txtDescripcion']);
				$intStatus = intval($_POST['listStatus']);

				if($intIdrol == 0)
				{
					//clear
					$request = $this->model->insertRol($strRol, $strDescripcion, $intStatus);
					$option = 1; 
				}
				else
				{
					$request = $this->model->updateRol($intIdrol, $strRol, $strDescripcion, $intStatus);
					$option = 2; 
				}

				if($request>0)//respuesta cuando se realiza la insercción con éxito
				{
					if($option == 1)
					{
						$arrResponse = array('status' => true, 'msg' => 'Datos guardados correctamente');
					}
					else
					{
						$arrResponse = array('status' => true, 'msg' => 'Datos Actualizados correctamente');
					}
				}
				else if ($request == "exist") //respuesta cuando el registro ya existe
				{
					$arrResponse = array('status' => false, 'msg' => '¡Atención! EL rol ya existe');
				}
				else if($request == "empty")//respuesta cuando alguno de los campos está vacio
				{
					$arrResponse = array('status' => false, 'msg' => '¡Atención! es necesario todos los datos');
				}
				else//respuesta cuando el servidor envía algun mensaje distinto y no se pueden ingresar los registros
				{
					$arrResponse = array('status' => false, 'msg' => 'No es posible almacenar los datos');
				}
				echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
			}
			die();
		}
		public function getRol(int $idrol){
			if($_SESSION['permisosMod']['r'])
			{
				$intIdrol = intval(strClean($idrol));
				if($intIdrol > 0)
				{
					$arrData = $this->model->selectRol($intIdrol);
					if(empty($arrData))
					{
						$arrData = array('status' => false, 'msg' => 'Datos no encontrados');
					}else
					{
						$arrData = array('status' => true, 'data' => $arrData);
					}
					echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
				}
			}
			die();
		}
		public function delRol()
		{
			if($_POST)
			{
				if($_SESSION['permisosMod']['r'])
				{
					$intIdrol = intval($_POST['idrol']);
					$requestDelete = $this->model->deleteRol($intIdrol);
					if($requestDelete == 'ok')
					{
						$arrResponse = array('status' => true, 'msg' =>'Se ha eliminado el rol');
					}
					else if($requestDelete == 'exist')
					{
						$arrResponse = array('status' => false, 'msg' =>'No es posible eliminar un Rol asociado a usuarios');
					}
					else
					{
						$arrResponse = array('status' => false, 'msg' =>'Erro al eliminar el Rol!');
					}
					echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
				}
			}
			die();
		}

	}
 ?>