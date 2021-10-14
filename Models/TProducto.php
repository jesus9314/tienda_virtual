<?php 
require_once("Libraries/Core/Mysql.php");

    trait TProducto{
        private $con;
        
        public function selectProductosT(){
            $this->con = new Mysql();
			$sql = "SELECT p.idproducto,
							p.codigo,
							p.nombre,
							p.descripcion,
							p.categoriaid,
							c.nombre as categoria,
							p.precio,
							p.stock
					FROM producto p 
					INNER JOIN categoria c
					ON p.categoriaid = c.idcategoria
					WHERE p.status != 0 ";
					$request = $this->con->selectall($sql);
                    if(count($request)>0)
                    {
                        for ($c=0; $c < count($request) ; $c++) { 
                            $intIdProducto = $request[$c]['idproducto'];
                            $sqlImg = "SELECT img
                                    FROM imagen
                                    WHERE productoid = $intIdProducto";
                            $arrImg = $this->con->selectall($sqlImg);
                            if(count($arrImg) > 0)
                            {
                                for ($i=0; $i < count($arrImg) ; $i++) { 
                                    $arrImg[$i]['url_image'] = media().'/images/uploads/'.$arrImg[$i]['img'];
                                }
                            }
                            $request[$c]['images'] = $arrImg;
                        }
                        
                    }
			return $request;
		}	

    }

?>