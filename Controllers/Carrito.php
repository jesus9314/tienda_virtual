<?php 
	/**
	 * 
	 */
	require_once("Models/TCategoria.php");
	require_once("Models/TProducto.php");

	class Carrito extends Controllers
	{
		use TCategoria, TProducto;
		public function __construct()
		{
			parent::__construct();
			session_start();
		}
		public function carrito()
		{	
			$data['page_tag']=NOMBRE_EMPRESA.' - Carrito';
			$data['page_tittle']='Carrito de compras';
			$data['page_name']="carrito";
			$this->views->getView($this,"carrito",$data);
		}
	}
 ?>