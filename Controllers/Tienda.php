<?php 
	/**
	 * 
	 */
	require_once("Models/TCategoria.php");
	require_once("Models/TProducto.php");
	class Tienda extends Controllers
	{
		use TCategoria, TProducto;
		public function __construct()
		{
			parent::__construct();
		}
		public function tienda()
		{	
			$data['page_tag']=NOMBRE_EMPRESA;
			$data['page_tittle']=NOMBRE_EMPRESA;
			$data['page_name']="tienda";
			$data['productos']=$this->getProductosT();
			$this->views->getView($this,"tienda",$data);
		}
        public function categoria($params)
        {
            if(empty($params))
            {
                header("location:".base_url());
            }
            else
            {
				$arrParams = explode(",",$params);
				$idcategoria = intval($arrParams[0]);
				$ruta = strClean($arrParams[1]);
				$infoCategoria =$this->getProductosCategoriaT($idcategoria, $ruta);
                $data['page_tag']=NOMBRE_EMPRESA." | ".$infoCategoria['categoria'];
                $data['page_tittle']=$infoCategoria['categoria'];
                $data['page_name']="categoria";
                $data['productos']=$infoCategoria['productos'];
                $this->views->getView($this,"categoria",$data);
            }
        }
        public function producto($params){
			if(empty($params)){
				header("Location:".base_url());
			}else{
				$arrParams = explode(",",$params);
				$idproducto = intval($arrParams[0]);
				$ruta = strClean($arrParams[1]);
				$infoProducto = $this->getProductoT($idproducto,$ruta);
				if(empty($infoProducto))
				{
					header("Location:".base_url());
				}
				$data['page_tag'] = NOMBRE_EMPRESA." - ".$infoProducto['nombre'];
				$data['page_title'] = $infoProducto['nombre'];
				$data['page_name'] = "producto";
				$data['producto'] = $infoProducto;
				$data['productos'] = $this->getProductosRandom($infoProducto['categoriaid'],8,"r");
				$this->views->getView($this,"producto",$data);
			}
		}
		public function addCarrito()
		{
			if($_POST){
				$idproducto = openssl_decrypt($_POST['id'],METHODENCRIPT,KEY);
				$cantidad = $_POST['cant'];
				if(is_numeric($idproducto) and is_numeric($cantidad))
				{
					$arrInfoProducto = $this->getProductoIDT($idproducto);
				}
				else
				{
					$arrResponse = array("status" => false, "msg" => "Dato incorrecto");
				}
				echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
			}
			die();
		}
	}
 ?>