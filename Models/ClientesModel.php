<?php 
	class ClientesModel extends Mysql
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
		public function insertCliente(string $identificacion, string $nombre, string $apellido,int $telefono, string $email,string $password,int $tipoid,string $nit, string $nombrefiscal, string $dirfiscal)
		{
			$this->strIdentificacion = $identificacion;
			$this->strNombre = $nombre;
			$this->strApellido = $apellido;
			$this->intTelefono = $telefono;
			$this->strEmail = $email;
			$this->strPassworrd = $password;
			$this->intTipoId = $tipoid;
			$this->strNit = $nit;
			$this->strNombreFiscal = $nombrefiscal;
			$this->strDirFiscal = $dirfiscal;
			$return = 0;

			$sql = "SELECT * FROM persona WHERE email_user = '{$this->strEmail}' OR identificacion =  '{$this->strIdentificacion}'";
			$request = $this->selectall($sql);

			if(empty($request))
			{
				$query_insert = "INSERT INTO persona (identificacion,nombres,apellidos,telefono,email_user,password,rolid,nit, nombrefiscal, direccionfiscal) VALUES(?,?,?,?,?,?,?,?,?,?)";
				$arrData = array($this->strIdentificacion,$this->strNombre,$this->strApellido,$this->intTelefono,$this->strEmail,$this->strPassworrd,$this->intTipoId,$this->strNit,$this->strNombreFiscal,$this->strDirFiscal);
				$request_insert = $this->insert($query_insert, $arrData);
				$return = $request_insert;
			}
			else
			{
				$return = "exist";
			}
			return $return;
		}
		public function selectClientes()
		{

			$sql = "SELECT * FROM selectClientes ";
					$request = $this->selectall($sql);
					return $request;
		}
		public function selectCliente(int $idusuario)
		{
			$this->intIdUsuario = $idusuario;
			$sql = "SELECT * FROM selectUsuario WHERE idpersona = $this->intIdUsuario";
			$request = $this->select($sql);
			return $request;
		}
		public function updateCliente(int $idUsuario, string $identificacion, string $nombre, string $apellido, int $telefono, string $email, string $password,string $nit, string $nomfiscal, string $dirfiscal)
		{
			$this->intIdUsuario = $idUsuario;
			$this->strIdentificacion =  $identificacion;
			$this->strNombre = $nombre;
			$this->strApellido = $apellido;
			$this->intTelefono = $telefono;
			$this->strEmail = $email;
			$this->strPassword = $password;
			$this->strNit = $nit;
			$this->strNombreFiscal = $nomfiscal;
			$this->strDirFiscal = $dirfiscal;
			$sql = "SELECT * FROM persona WHERE (email_user = '{$this->strEmail}' AND idpersona != '{$this->intIdUsuario}') OR (identificacion= '{$this->strIdentificacion}' AND idpersona != '{$this->intIdUsuario}')";
			$request = $this->select($sql);
			if(empty($request))
			{
				if($this->strPassword != "")
				{
					$sql = "UPDATE persona SET identificacion=?, nombres=?, apellidos=?, telefono=?, email_user=?, password=?, nit=?, nombrefiscal=?, direccionfiscal=? WHERE idpersona='{$this->intIdUsuario}'";
					$arrData= array($this->strIdentificacion,
									$this->strNombre,
									$this->strApellido,
									$this->intTelefono,
									$this->strEmail,
									$this->strPassword,
									$this->strNit,
									$this->strNombreFiscal,
									$this->strDirFiscal);
				}
				else
				{
					$sql = "UPDATE persona SET identificacion=?, nombres=?, apellidos=?, telefono=?, email_user=?, nit=?, nombrefiscal=?, direccionfiscal=? WHERE idpersona='{$this->intIdUsuario}'";
					$arrData= array($this->strIdentificacion,
									$this->strNombre,
									$this->strApellido,
									$this->intTelefono,
									$this->strEmail,
									$this->strNit,
									$this->strNombreFiscal,
									$this->strDirFiscal);
				}
				$request = $this->update($sql, $arrData);
			}
			else
			{
				$request = "exist";
			}
			return $request;
		}
		public function deleteCliente(int $idtipousuario)
		{
			$this->intIdUsuario = $idtipousuario;
			$sql = "UPDATE persona SET status = ? WHERE idpersona = $this->intIdUsuario";
			$arrData = array(0);
			$request = $this->update($sql, $arrData);
			return $request;
		}
	}
?>