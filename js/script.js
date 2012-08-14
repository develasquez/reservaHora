/* Author:

*/

var bloque, sala =1, dia , hora;

$(function(){

$("#frmDatos").on("submit",function(){
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
	url: "we.php",
	dataType: "json",
	type: "POST",
	contentType: "application/json; charset=utf-8",
	data: JSON.stringify({
		metodo:"leeHoras",
		idSala:pIdSala
	}),
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
