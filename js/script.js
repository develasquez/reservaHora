/* Author:

*/

var bloque, nroSala =1, dia , hora, mouseDown, posInicio, posFin;
var password = "vitraux2012";

$(function(){
	$(".ui-overlay").hide();
	$("#frmReserva_content").hide();
	 $("#eliminar").hide(); 
	$(".sala").on('mousedown',function(a,b,c){
		
		mouseDown=true;
		posInicio = a.pageX;

	});
	$(".sala").on('mouseup',function(a,b,c){
		
		mouseDown=false;
		posFin = a.pageX;
		var pos = parseInt($("#contenido_salas").css("left") ) ;

		if ((posInicio - posFin)> 10 && pos !=-2008  ) {
			nroSala++;
			posInicio =0;
			posFin=0;
			pos = pos - 502;
			$("#contenido_salas").css("left",pos+"px")	;
			$(".bloque").children().addClass("oculto");
			leeHoras(nroSala);
			return true;
		}
		if (( posFin - posInicio )> 10 && pos !=0) {
			nroSala--;
			posInicio =0;
			posFin=0;
			pos = pos + 502;

			$("#contenido_salas").css("left",pos+"px")	;
			$(".bloque").children().addClass("oculto");
			leeHoras(nroSala);
			return true;
		}
		
	});
	

function creaBloque(){
if($("#txtNombreSolicitante").val().length==0 || $("#txtEmail").val().length==0 || $("#txtTelefono").val().length==0 || $("#txtEmpresa").val().length==0 || $("#txtCargo").val().length==0 ){
alert("Debe ingresar la informacion requerida");
}else{
	$(bloque).data({
	   idHora:0,
		nombre:$("#txtNombreSolicitante").val(),
		email:$("#txtEmail").val(),
		telefono:$("#txtTelefono").val(),
		empresa:$("#txtEmpresa").val(),
		cargo:$("#txtCargo").val(),
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

$("#reservar").on("mouseup",function(){
	creaBloque();
})
$(".btnAtras").on("click",function(){
	$(".ui-overlay").hide();
	$("#frmReserva_content").hide();
	$("#eliminar").hide(); 
})

 $(".bloque").on("dblclick",function(){
 	if(password == prompt("Password de Administrador"  )){
 			 bloque = $(this)
 			 $("#eliminar").show(); 
			$(".ui-overlay").show();
			$("#frmReserva_content").show();
			var idHora = (parseInt($(bloque).attr("idHora"))>9? parseInt($(bloque).attr("idHora")) - 9 : parseInt($(bloque).attr("idHora")))
			$("#txthora").val($($("#horas1 div")[idHora-1]).text().trim());
			 
	var data = $(bloque).data(); 
		$("#txtNombreSolicitante").val(data.nombre );
		$("#txtEmail").val( data.email);
		$("#txtTelefono").val( data.telefono);
		$("#txtEmpresa").val( data.empresa);
		$("#txtCargo").val(data.cargo);
		$("#tarNotas").val( data.cargo);
			
			
 	}
 }); 

$("#eliminar").on("click",function(){

	borraHora($(bloque).data().idHora)
})

$(".bloque").on("click",function(){
	bloque = $(this)
	if($(this).children().hasClass("oculto")){

	$(".ui-overlay").show();
	$("#frmReserva_content").show();
	
	var idHora = (parseInt($(bloque).attr("idHora"))>9? parseInt($(bloque).attr("idHora")) - 9 : parseInt($(bloque).attr("idHora")))
	$("#txthora").val($($("#horas1 div")[idHora-1]).text().trim())
	}

})

$(".bloque-ocupado").on("click",function(){
	$(".ui-overlay").hide();
	$("#frmReserva_content").hide();
})

leeHoras(nroSala);

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
		$.each(data,function(i,e){
			debugger;
			var idBloque="#bloque"+ e.numeroHora +"_dia" + e.dia
	$(idBloque).data({
	   idHora: e.idHora,	
		nombre:e.nombreSolicitante,
		email:e.mailSolicitante,
		telefono:e.telefonoSolicitante,
		empresa:e.empresa,
		cargo:e.cargo,
		notas:e.notas
	})
	.children().removeClass("oculto")
		})
	
	
	}
	});

}


 function borraHora(pIdHora){

$.ajax({
	url: "ws.php",
	dataType: "json",
	type: "GET",
	contentType: "application/json; charset=utf-8",
	data:{
		metodo:"borraHora",
		idHora:pIdHora
	},
	success: function (data) {
		alert("Recargue la pagina" );
		document.location.href = "index.html";
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
			idSala: nroSala,
			dia: dia, 
			hora: $($("#horas1 div")[idHora-1]).text().trim(),
			nombreSolicitante: $("#txtNombreSolicitante").val() ,
			mailSolicitante: $("#txtEmail").val() ,
			telefonoSolicitante:$("#txtTelefono").val() ,
			empresa:$("#txtEmpresa").val(),
			cargo:$("#txtCargo").val(),
			notas: $("#tarNotas").val() 
		},
		success: function (data) {
		 	$(bloque).data({
			   idHora: data.idHora,	
				nombre:data.nombreSolicitante,
				email:data.mailSolicitante,
				telefono:data.telefonoSolicitante,
				empresa:data.empresa,
				cargo:data.cargo,
				notas:data.notas
			})
 		
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