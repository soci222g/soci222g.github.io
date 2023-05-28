
let game_data;
let current_room = 0;
let items_picked = [];

function game (data){
game_data=data;

document.getElementById("terminal").innerHTML = "<p><strong>¡Bienvenidos a ENTIerrame!</strong> El juego de terror definitivo.</p>";

document.getElementById("terminal").innerHTML += "<p>Te encuentras en "+game_data.rooms[current_room].name+". ¿Qué quieres hacer?</p>";


}

function terminal_out(info)
{
let terminal = document.getElementById("terminal");

	terminal.innerHTML += info;

	terminal.scrollTop = terminal.scrollHeight;
}



function parseCommand(command){
	
	
	switch (command) {
	case "ver":
	terminal_out("<p>"+game_data.rooms[current_room].descriptioin+"</p>");
		break;
		
	case "coger":
		let items = "";
		let items_num = game_data.rooms[current_room].items.length;
		for (let i = 0; i < items_num; i++){
		items += game_data.rooms[current_room].items[i]+" ";
		}
		terminal_out("<p>Puedes coger: "+items+"</p>");
	break;
	case "ir":
			let doors = "";
			let doors_num = game_data.rooms[current_room].doors.length;
			for (let i = 0; i < doors_num; i++){
				doors += game_data.rooms[current_room].doors[i]+" ";
			}
			terminal_out("<p>Puedes ir a: "+doors+"</p>");
			break;
	case "inventario":
		if(items_picked.length <= 0){
			terminal_out("<p> inventario vacio</p>");
			return;
		}
			for (let i = 0; i < items_picked.length; i++){
			terminal_out("<p>"+items_picked[i]+"</p>");	
			} 
			
			break
		default:
		terminal_out("<p><strong>ERROR:</strong>"+command+" command not found</p>");
	}
}





function getRoomNumber (room){
	for (let i = 0; i < game_data.rooms.length; i++){
		if (game_data.rooms[i].id == room){
		return i;
		}
	}
	return -1;
}

function getDoorNumber (door){
for (let i = 0; i < game_data.doors.length; i++){
		if (game_data.doors[i].id == door){
		return i;
		}
	}
	return -1;
}

function getItemNumber (items){
for (let i = 0; i < game_data.items.length; i++){
		if (game_data.items[i].id == items){
		return i;
		}
	}
	return -1;
}





function parseInstruction(instruction){


switch (instruction[0]){
	case "ver":
	let objeto_num = getItemNumber(instruction[1]);
	if (objeto_num < 0){
	
	console.log("error: item no existent");
	
	return;
	}
	
	
	if (objeto_num >= 0){
	terminal_out("<p>"+game_data.items[objeto_num].description+"</p>");
	}
	break;
	
	case "ir":
	let door_num = getDoorNumber(instruction[1]);
	if (door_num < 0){
				console.log("Habitación errónea");
				return;
			}
	
	let room_num = getRoomNumber(game_data.doors[door_num].rooms[0]);
	if ( room_num == current_room){
		current_room = getRoomNumber(game_data.doors[door_num].rooms[1]);
		terminal_out("<p>"+game_data.rooms[current_room].descriptioin+"</p>");	
		}
	else{
	
	current_room = room_num;
	terminal_out("<p>"+game_data.rooms[current_room].descriptioin+"</p>");
	
	}
	
	break;
	
	case "coger":
	
	game_data.rooms[current_room].items.forEach(function(item){
		if (game_data.items[getItemNumber(items)].pickable == false) {
						terminal_out("<p>Este item no se puede recojer</p>");
						return;
		}
		

		
		if (item == instruction[1]){
			items_picked.push(game_data.rooms[current_room].items.splice(item_num, 1));
			
			let item_num = game_data.rooms[current_room].items.indexOf(item);
				if (item_num < 0){
				console.log("error al borar el item de la aplicacion");
				return;
			}
		}
		
			
			
		
		terminal_out("<p> as cogido: "+item+"</p>");
		return;
		
		
	});
	break;
	case "inventario":
	let objeto_number = getItemNumber(instruction[1]);
	if (objeto_number < 0){
		console.log("item errónea");
				return;
	}
	let descriptioin_item = game_data.items[objeto_number].descriptioin;
	
	terminal_out("<p>"+game_data.items[objeto_number].description+"</p>");
	
		
	
	default:
	terminal_out("<p><strong>Error</strong>: "+instruction[0]+" commando no encontrado</p>");
	}
}





function splitSentence(){

let frase_accion = document.getElementById("comandos").value;

let frase_accio_trim = frase_accion.trim();
let value_split = frase_accio_trim.split(" ");


	if (value_split.length == 0 || frase_accio_trim == ""){
	document.getElementById("terminal").innerHTML = "<p><strong>ERROR	</strong>: escriu una instruccio</p>";
	return
	}
	
	if (value_split.length == 1){
		console.log("comando unico");
	parseCommand(value_split[0]);
	
		}
	else {
	parseInstruction(value_split);
	}
}



fetch("https://soci222g.github.io/game.json")
	.then(response => response.json())
	.then(data => game(data));
