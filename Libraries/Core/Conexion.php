<?php 
	class Conexion {

		//las variables globales provienen del archivo de configuración
		
		private $conect;

		public function __construct()
		{

			$connectionString = "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=".DB_CHARSET;

			try
			{
					$this->conect= new PDO($connectionString,DB_USER,DB_PASSWORD);
					$this->conect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //Detectar errores
			}
			catch (Exception $e)
			{
					$this->conect='Error de conexión';
					echo "Error: ".$e->getMessage();
			}
		}
		public function conect()
		{
			return $this->conect;
		}
		
	}//fin clase conectar

?>