<?php 
	//require_once("CategoriasModel.php");
	class HomeModel extends Mysql
	{
		public function __construct()
		{
			parent::__construct();
			//$this->objCategoria = new CategoriasModel();
		}
		public function getCategoriasT()
		{
			//return $this->objCategoria->selectCategorias();
		}
	}
 ?>