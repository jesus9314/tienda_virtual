<?php 
	//al instanciar un objeto de una clase importa el archivo que contiene esa clase
	spl_autoload_register(function($class)
	{
		if(file_exists('Libraries/Core/'.$class.".php"))
		{
			require_once('Libraries/Core/'.$class.".php");//importa el archivo de clase con la que se ha instanciado el objeto
		}
	});
 ?>