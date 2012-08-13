<?
function Conectarse() 
{ 
   
   if (!($link=mysql_connect("localhost","linode","devenew1"))) 
   { 
      echo '{"success":true, "data":[], "errors":"Error al conectar con la Base de Datos" }'; 
      exit(); 
   } 
   if (!mysql_select_db("abedules",$link)) 
   { 
      echo '{"success":true, "data":[], "errors":"Error seleccionando la base de datos" }'; 
      exit(); 
   } 
   return $link; 
}
function validaParam($param){
	$valida = strpos(strtoupper($param),"INSERT") +  strpos(strtoupper($param),"UPDATE") + strpos(strtoupper($param),"DELETE") + strpos(strtoupper($param),"DROP") ; 
	if($valida == false){
		return $param;
	}else{
		return "noValido";
	}
}

$metodo = validaParam($_REQUEST["metodo"]);

switch ($metodo) {
    case "noValido":
        echo '{"Error":"sql injection"}';
        break;
    case "isertaHora":
    	$idHora = validaParam($_REQUEST["idHora"]);
    	$idSala = validaParam($_REQUEST["idSala"]);
    	$dia = validaParam($_REQUEST["dia"]);
		$hora = validaParam($_REQUEST["hora"]);
		$nombreSolicitante = validaParam($_REQUEST["nombreSolicitante"]);
		$mailSolicitante = validaParam($_REQUEST["mailSolicitante"]);
		$telefonoSolicitante = validaParam($_REQUEST["telefonoSolicitante"]);
		$notas = validaParam($_REQUEST["notas"]);

		if($idHora != "noValido" || $idSala != "noValido" || $dia != "noValido" || $hora != "noValido"){
		$query = "INSERT INTO `horas`(`idHora`, `idSala`, `dia`, `hora`, `nombreSolicitante`, `mailSolicitante`, `telefonoSolicitante`, `notas`) ".
				 "VALUES (".$idHora.",".$idSala.",".$dia.",".$hora.",".$nombreSolicitante.",".$mailSolicitante.",".$telefonoSolicitante.",".$notas.")"	;
    	$link = Conectarse();
    	$result=mysql_query($query,$link); 
    	$query ="SELECT idHora, idSala, dia, hora, nombreSolicitante, mailSolicitante, telefonoSolicitante, notas FROM horas";
    	$result=mysql_query($query,$link); 
    	$rows = array();
    	$rows = mysql_fetch_array($result) 
    	echo json_encode($rows);
		}
      break;
    case 2:
        echo "i equals 2";
        break;
}







//KM MARZO 97 SEPT 05
?>



