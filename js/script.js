/* Author:

*/

var bloque, nroSala =1, dia , hora, mouseDown, posInicio, posFin;

$(function(){
	$(".ui-overlay").hide();
	$("#frmReserva_content").hide();
	$(".sala").on('mousedown',function(a,b,c){
		
		mouseDown=true;
		posInicio = a.pageX;

	});
	$(".sala").on('mouseup',function(a,b,c){
		
		mouseDown=false;
		posFin = a.pageX;
		var pos = parseInt($("#contenido_salas").css("left") ) ;
		if ((posInicio - posFin)> 10 && pos !=-2408  ) {
			nroSala++;
			posInicio =0;
			posFin=0;
			pos = pos - 602;
			$("#contenido_salas").css("left",pos+"px")	;
			leeHoras(nroSala);
			return true;
		}
		if (( posFin - posInicio )> 10 && pos !=0) {
			nroSala--;
			posInicio =0;
			posFin=0;
			pos = pos + 602;

			$("#contenido_salas").css("left",pos+"px")	;
			leeHoras(nroSala);
			return true;
		}
		
	});
	

function creaBloque(){
if($("#txtNombreSolicitante").val().length==0 || $("#txtEmail").val().length==0 || $("#txtTelefono").val().length==0 || $("#txtEmpresa").val().length==0 || $("#txtCargo").val().length==0 ){
alert("Debe ingresar la informacion requerida");
}else{
	$(bloque).data({
		nombre:$("#txtNombreSolicitante").val(),
		email:$("#txtEmail").val(),
		telefono:$("#txtTelefono").val(),
		notas:$("#tarNotas").val()
	}).children().removeClass("oculto")
	reservaHora();
	$(".ui-overlay").hide();
	$("#frmReserva_content").hide();
	return false;
}
}


$("#frmDatos").submit(function(){

	return false;
})
 $("#dia1").on("click",function(){
 	dia=1;
 });
 $("#dia2").on("click",function(){
 	dia=2;
 });

 $(".sala").on("click",function(){
 	sala=$(this).attr("idSala");
 })


$(".bloque").on("click",function(){
 	hora=$(this).attr("idHora");
 })

$(".btnAccion").on("mouseup",function(){
	creaBloque();
})
$(".btnAtras").on("click",function(){
	$(".ui-overlay").hide();
	$("#frmReserva_content").hide();
})



$(".bloque").on("click",function(){
	$(".ui-overlay").show();
	$("#frmReserva_content").show();
	bloque = $(this)

})

$(".bloque-ocupado").on("click",function(){
	$(".ui-overlay").hide();
	$("#frmReserva_content").hide();
})

});

function marcaHora(myHora){
	var atributo ='[idHora="'+myHora.idHora+'"]' ;
	$(atributo).children().removeClass("oculto");	
}
function leeHoras(pIdSala){

$.ajax({
	url: "ws.php",
	dataType: "json",
	type: "GET",
	contentType: "application/json; charset=utf-8",
	data:{
		metodo:"obtieneHoras",
		idSala:pIdSala
	},
	success: function (data) {
		debugger;
	data = data;
	
	}
	});

}



function reservaHora(){

var idHora = (parseInt($(bloque).attr("idHora"))>9? parseInt($(bloque).attr("idHora")) - 9 : parseInt($(bloque).attr("idHora")))
	$.ajax({
		url: "ws.php",
		dataType: "json",
		type: "GET",
		contentType: "application/json; charset=utf-8",
		data: {
			metodo:"reservaHora",
			idHora: $(bloque).attr("idHora"),
			idSala: sala,
			dia: dia, 
			hora: $($("#horas1 div")[idHora-1]).text().trim(),
			nombreSolicitante: $("#txtNombreSolicitante").val() ,
			mailSolicitante: $("#txtEmail").val() ,
			telefonoSolicitante:$("#txtTelefono").val() ,
			notas: $("#tarNotas").val() 
		},
		success: function (data) {
		
			$("#txthora").val("");
			$("#txtEmpresa").val("");
			$("#txtEmail").val("");
			$("#txtTelefono").val("");
			$("#txtCargo").val("");
			$("#txtNombreSolicitante").val("");
			$("#tarNotas").val("")


		}
		});
}
