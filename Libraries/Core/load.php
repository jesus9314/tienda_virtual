<?php 
	
	//cambia a mayúscula la primera letra del nombre del controlador
	$controller = ucwords($controller);

	//asigna la ruta del archivo que contiene al controlador
	$controllerFile="Controllers/".$controller.".php";
	if(file_exists($controllerFile))
	{
		//importa el controlador asignado en la url
		require_once($controllerFile);

		//instancia un nuevo objeto con la clase del controlador
		$controllers= new $controller();

		if(method_exists($controller, $method))
			{
				//llama a la función correspondiente dentro del controlador asignado los parámetros
				$controllers->{$method}($params);
			}
			else
			{
				require_once("Controllers/Error.php"); //Página que se muestra si no hay el método asignado
			}
	}
	else
	{
		require_once("Controllers/Error.php"); //Página que se muestra si no hay el controlador asignado
	}
	
 ?>