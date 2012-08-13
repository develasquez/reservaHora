/* Author:

*/

var bloque;

$(function(){

$(".btnAtras").on("click",function(){
	$(".ui-overlay").hide();
	$("#frmReserva_content").hide();
})

$(".btnAccion").on("click",function(){
	$(".ui-overlay").hide();
	$("#frmReserva_content").hide();
	$(bloque).data({
		nombre:$("#txtNombreSolicitante").val(),
		email:$("#txtEmail").val(),
		telefono:$("#txtTelefono").val(),
		notas:$("#tarNotas").val()
	}).children().removeClass("bloque-ocupado")
})

$(".bloque").on("click",function(){
	$(".ui-overlay").show();
	$("#frmReserva_content").show();
	bloque = $(this)

})

});

