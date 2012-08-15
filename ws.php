<?php
function Conectarse() 
{ 
   
   if (!($link=mysql_connect("localhost","root","devenew1"))) 
   { 
      echo '{"success":true, "data":[], "errors":"Error al conectar con la Base de Datos" }'; 
      exit(); 
   } 
   if (!mysql_select_db("reservasalas",$link)) 
   { 
      echo '{"success":true, "data":[], "errors":"Error seleccionando la base de datos" }'; 
      exit(); 
   } 
   return $link; 
}
function validaParam($param){
  $valida = strpos(strtoupper($param),"INSERT") +  strpos(strtoupper($param),"UPDATE") + strpos(strtoupper($param),"DELETE") + strpos(strtoupper($param),"DROP") ; 

  if($valida == 0){
		return $param;
	}else{
		return "noValido";
	}
}

$metodo = validaParam($_GET["metodo"]);

switch ($metodo) {
    case "noValido":
        echo '{"Error":"sql injection"}';
        break;
    case "reservaHora":

    	$idHora = validaParam($_GET["idHora"]);
    	$idSala = validaParam($_GET["idSala"]);
    	$dia = validaParam($_GET["dia"]);
		$hora = validaParam($_GET["hora"]);
		$nombreSolicitante = validaParam($_GET["nombreSolicitante"]);
		$mailSolicitante = validaParam($_GET["mailSolicitante"]);
		$telefonoSolicitante = validaParam($_GET["telefonoSolicitante"]);
		$notas = validaParam($_GET["notas"]);

		if($idHora != "noValido" || $idSala != "noValido" || $dia != "noValido" || $hora != "noValido"){
		$query = "INSERT INTO `horas`(`idSala`, `dia`, `hora`, `nombreSolicitante`, `mailSolicitante`, `telefonoSolicitante`, `notas`, `numeroHora`) ".
				 "VALUES (".$idSala.",".$dia.",'".$hora."','".$nombreSolicitante."','".$mailSolicitante."','".$telefonoSolicitante."','".$notas."',".$idHora.")"	;
    	$link = Conectarse();
     
    	$result=mysql_query($query,$link); 

    	$query2 ="SELECT idHora, idSala, dia, hora, nombreSolicitante, mailSolicitante, telefonoSolicitante, notas , numeroHora FROM horas";
    	$result2=mysql_query($query2,$link); 
    	 $arr = array();

    while ($obj = mysql_fetch_object($result2)) {

    $arr[] = $obj;

    }

    echo json_encode($arr[sizeof($arr)-1]) ;

  
		}
    break;
    case "obtieneHoras":

      $idSala = validaParam($_GET["idSala"]);
      $dia = validaParam($_GET["dia"]);
    
    if($idSala != "noValido" || $dia != "noValido"){
      $query = "SELECT idHora, idSala, dia, hora, nombreSolicitante, mailSolicitante, telefonoSolicitante, notas , numeroHora FROM horas ".
       " Where idSala=" .$idSala . " ;" ;
      $link = Conectarse();
      $result=mysql_query($query,$link); 
      $arr = array();
      while ($obj = mysql_fetch_object($result)) {
        $arr[] = $obj;
      }
      echo json_encode($arr) ;
    }
      break;
    case 2:
        echo "i equals 2";
        break;
}







//KM MARZO 97 SEPT 05
?>



