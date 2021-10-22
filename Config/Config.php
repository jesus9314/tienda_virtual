<?php 
	//variables globales

	const BASE_URL="http://localhost/tienda_virtual";

	//zona horaria
	date_default_timezone_set('America/Lima');

	/*
	Datos de conexión a la base de datos
	*/
	const DB_HOST = "localhost";
	const DB_NAME = "db_tiendavirtual";
	const DB_USER = "root";
	const DB_PASSWORD = "";
	const DB_CHARSET = "utf8";

	//Delimitadores decimal y millar Ej. 21,1989.00
	const SPD = ".";
	const SPM = ",";

	//símbolo de moneda
	const SMONEY = "S/";

	//datos envio de correo

	const NOMBRE_REMITENTE = "Tienda Virtual";
	const EMAIL_REMITENTE = "jesus.9314@gmail.com";
	const NOMBRE_EMPRESA = "Tienda Virtual";
	const WEB_EMPRESA = "www.facebook.com";

	const CAT_SLIDER="1,2,3";
	const CAT_BANNER="4,5,6";

	const KEY="tienda_virtual";
	const METHODENCRIPT="AES-128-ECB";

	//Envío
	const COSTOENVIO = 10;


 ?>