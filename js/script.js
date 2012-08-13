/* Author:

*/

var bloque;

$(function(){

$("#frmDatos").on("submit",function(){
	$(bloque).data({
		nombre:$("#txtNombreSolicitante").val(),
		email:$("#txtEmail").val(),
		telefono:$("#txtTelefono").val(),
		notas:$("#tarNotas").val()
	}).children().removeClass("oculto")
	$(".ui-overlay").hide();
	$("#frmReserva_content").hide();
	return false;
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

});

