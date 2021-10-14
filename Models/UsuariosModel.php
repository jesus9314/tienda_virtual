<?php 
	class UsuariosModel extends Mysql
	{
		private $intIdUsuario;
		private $strIdentificacion;
		private $strNombre;
		private $strApellido;
		private $intTelefono;
		private $strEmail;
		private $strPassworrd;
		private $strToken;
		private $intTipoId;
		private $intStatus;
		private $strNit;
		private	$strNombreFiscal;
		private	$strDirFiscal;

		public function __construct()
		{
			parent::__construct();
		}
		public function insertUsuario(string $identificacion, string $nombre, string $apellido,int $telefono, string $email,string $password,int $tipoid,int $status)
		{
			$this->strIdentificacion = $identificacion;
			$this->strNombre = $nombre;
			$this->strApellido = $apellido;
			$this->intTelefono = $telefono;
			$this->strEmail = $email;
			$this->strPassworrd = $password;
			$this->intTipoId = $tipoid;
			$this->intStatus = $status;
			$return = 0;

			$sql = "SELECT * FROM persona WHERE email_user = '{$this->strEmail}' OR identificacion =  '{$this->strIdentificacion}'";
			$request = $this->selectall($sql);

			if(empty($request))
			{
				$query_insert = "INSERT INTO persona (identificacion,nombres,apellidos,telefono,email_user,password,rolid,status) VALUES(?,?,?,?,?,?,?,?)";
				$arrData = array($this->strIdentificacion,$this->strNombre,$this->strApellido,$this->intTelefono,$this->strEmail,$this->strPassworrd,$this->intTipoId,$this->intStatus);
				$request_insert = $this->insert($query_insert, $arrData);
				$return = $request_insert;
			}
			else
			{
				$return = "exist";
			}
			return $return;
		}
		public function selectUsuarios()
		{
			$whereAdmin = "";
			if($_SESSION['idUser'] !=1){
				$whereAdmin = " AND p.idpersona !=1";
			}
			$sql = "SELECT * FROM selectUsuarios ".$whereAdmin;
					$request = $this->selectall($sql);
					return $request;
		}
		public function selectUsuario(int $idusuario)
		{
			$this->intIdUsuario = $idusuario;
			$sql = "SELECT * FROM selectUsuario WHERE idpersona = $this->intIdUsuario";
			$request = $this->select($sql);
			return $request;
		}
		public function updateUsuario(int $idUsuario, string $identificacion, string $nombre, string $apellido, int $telefono, string $email, string $password,int $tipoid, int $status)
		{
			$this->intIdUsuario = $idUsuario;
			$this->strIdentificacion =  $identificacion;
			$this->strNombre = $nombre;
			$this->strApellido = $apellido;
			$this->intTelefono = $telefono;
			$this->strEmail = $email;
			$this->strPassword = $password;
			$this->intTipoId = $tipoid;
			$this->intStatus = $status;
			$sql = "SELECT * FROM persona WHERE (email_user = '{$this->strEmail}' AND idpersona != '{$this->intIdUsuario}') OR (identificacion= '{$this->strIdentificacion}' AND idpersona != '{$this->intIdUsuario}')";
			$request = $this->select($sql);
			if(empty($request))
			{
				if($this->strPassword != "")
				{
					$sql = "UPDATE persona SET identificacion=?, nombres=?, apellidos=?, telefono=?, email_user=?, password=?, rolid=?, status=? WHERE idpersona='{$this->intIdUsuario}'";
					$arrData= array($this->strIdentificacion,
									$this->strNombre,
									$this->strApellido,
									$this->intTelefono,
									$this->strEmail,
									$this->strPassword,
									$this->intTipoId,
									$this->intStatus);
				}
				else
				{
					$sql = "UPDATE persona SET identificacion=?, nombres=?, apellidos=?, telefono=?, email_user=?, rolid=?, status=? WHERE idpersona='{$this->intIdUsuario}'";
					$arrData= array($this->strIdentificacion,
									$this->strNombre,
									$this->strApellido,
									$this->intTelefono,
									$this->strEmail,
									$this->intTipoId,
									$this->intStatus);
				}
				$request = $this->update($sql, $arrData);
			}
			else
			{
				$request = "exist";
			}
			return $request;
		}

		public function deleteUsuario(int $idtipousuario)
		{
			$this->intIdUsuario = $idtipousuario;
			$sql = "UPDATE persona SET status = ? WHERE idpersona = $this->intIdUsuario";
			$arrData = array(0);
			$request = $this->update($sql, $arrData);
			return $request;
		}
		public function updatePerfil(int $idusuario, string $identificacion, string $nombre,string $apellido, int $telefono, string $password)
		{
			$this->intIdUsuario = $idusuario;
			$this->strIdentificacion = $identificacion;
			$this->strNombre = $nombre;
			$this->strApellido = $apellido;
			$this->intTelefono = $telefono;
			$this->strPassword = $password;

			if($this->strPassword != "")
			{
				$sql = "UPDATE persona SET identificacion=?, nombres=?, apellidos=?, telefono=?, password=? WHERE idpersona = $this->intIdUsuario";
				$arrData = array($this->strIdentificacion,$this->strNombre,$this->strApellido,$this->intTelefono,$this->strPassword);
			}
			else
			{
				$sql = "UPDATE persona SET identificacion=?, nombres=?, apellidos=?, telefono=? WHERE idpersona = $this->intIdUsuario";
				$arrData = array($this->strIdentificacion,$this->strNombre,$this->strApellido,$this->intTelefono);
			}
			$request = $this->update($sql, $arrData);
			return $request;
		}
		public function updateDataFiscal(int $idusuario, string $nit, string $nombrefiscal, string $dirfiscal)
		{
			$this->intIdUsuario = $idusuario;
			$this->strNit = $nit;
			$this->strNombreFiscal = $nombrefiscal;
			$this->strDirFiscal = $dirfiscal;
			$sql="UPDATE persona SET nit=?, nombrefiscal=?, direccionfiscal=? WHERE idpersona =$this->intIdUsuario";
			$arrData = array($this->strNit,$this->strNombreFiscal,$this->strDirFiscal);
			$request = $this->update($sql, $arrData);
			return $request;
		}

	}
 ?>