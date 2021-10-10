<?php
	
	require_once("Config/config.php");//requerimos archivo de configuración
	require_once("Libraries/Core/Autoload.php");//importa las clases necesarias 
	require_once("Helpers/Helpers.php");//importa el archivo helper


	//almacena los datos luego del url base
	$url=!empty($_GET['url']) ? $_GET['url'] : 'home/home';
	$arrUrl=explode("/", $url); /*extrae cada uno de los datos usando como límite el '/' */

	//variables a las que son asignados los datos extraidos de la url
	$controller = $arrUrl[0];
	$method = $arrUrl[0]; /*se asigna el mismo valor del controlador para acceder predeterminadamente a la página principal de ese controlador*/
	$params = "";



	if(!empty($arrUrl[1]))
	{
		if($arrUrl[1] != "")
		{
			$method=$arrUrl[1];
		}
	}

	//si el arreglo en la posición [2] no está vacio entonces tenemos parámetros
	if(!empty($arrUrl[2]))
	{
		if($arrUrl[2]!="")
		{	
			/* debido a que no hay valores vacios en la posición [2]
			entonces debemos guardarlos en la variable $params como un arreglo*/
			for ($i=2; $i < count($arrUrl); $i++) 
			{ 
				$params .=$arrUrl[$i].',';
			}
			$params=trim($params,',');/*se asigan los valores cómo un arreglo*/
		}
	}
	require_once("Libraries/Core/load.php");//importa la página que se va a mostrar

 ?>