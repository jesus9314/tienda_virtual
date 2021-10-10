<?php 
	class Mysql extends Conexion
	{
		private $conexion;
		private $strquery;
		private $arrValues;

		function __construct()
		{
			//instanciamos un objeto de la clase conexión para inicializar la conexión
			$this->conexion = new conexion();
			$this->conexion =$this->conexion->conect();
		}


		//método para insertar un registro
		public function insert(string $query, array $arrValues)
		{
			//asignamos los parámetros a las variables de la clase
			$this->strquery = $query; 
			$this->arrValues = $arrValues;
			$insert = $this->conexion->prepare($this->strquery);//prepara la sentencia sql y la mantiene esperando los datos
			$resInsert = $insert->execute($this->arrValues);//ejecuta la sentencia ingresando los valores de los parámetros
			if($resInsert)
			{
				$lastInsert= $this->conexion->lastInsertId();//asigna el id del último registro en la tabla
			}
			else
			{
				$lastInsert = 0;
			}
			return $lastInsert;//retorna el valor del id indicando que se ha insertado correctamente
		}


		//método para buscar un registro
		public function select(string $query)
		{
			//asignamos los parámetros a las variables de la clase
			$this->strquery = $query;
			$result = $this->conexion->prepare($this->strquery);//prepara la sentencia sql y la mantiene esperando los datos
			$result->execute();//ejecuta la sentencia ingresando los valores de los parámetros
			$data=$result->fetch(PDO::FETCH_ASSOC);//devuelve el array con los valores solicitados y los asigna al arreglo $data
			return $data;
		}

		//método para devolver todos los registgros
		public function selectall(string $query)
		{
			//asignamos los parámetros a las variables de la clase
			$this->strquery = $query;
			$result = $this->conexion->prepare($this->strquery);//prepara la sentencia sql y la mantiene esperando los datos
			$result->execute();//ejecuta la sentencia ingresando los valores de los parámetros
			$data=$result->fetchall(PDO::FETCH_ASSOC);//devuelve el array con los valores solicitados y los asigna al arreglo $data
			return $data;
		}

		//método para actualizar registros
		public function update(string $query, array $arrValues)
		{
			//asignamos los parámetros a las variables de la clase
			$this->strquery = $query;
			$this->arrValues =$arrValues;
			$update = $this->conexion->prepare($this->strquery);//prepara la sentencia sql y la mantiene esperando los datos
			$resExecute=$update->execute($this->arrValues);//ejecuta la sentencia ingresando los valores de los parámetros
			return $resExecute; //imprime la respuesta del servidor
		}

		//método para eliminar registros
		public function delete(string $query)
		{
			//asignamos los parámetros a las variables de la clase
			$this->strquery = $query;
			$result = $this->conexion->prepare($this->strquery);//prepara la sentencia sql y la mantiene esperando los datos
			$del = $result -> execute();//ejecuta la sentencia ingresando los valores de los parámetros
			return $del;//imprime la respuesta del servidor
		}

	}//fin clase Mysql
 ?>