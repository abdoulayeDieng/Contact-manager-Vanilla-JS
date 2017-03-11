function all() {
	if(sessionStorage.getItem("todos")!=null){
		todos = JSON.parse(sessionStorage.getItem("todos"));
		document.querySelector("ul").innerHTML='';
		for(let todo of todos){
			let li = document.createElement('li');
			let status = todo.status?'Pending':'Done'; 
			li.innerHTML=todo.name+' <button onclick="edit('+todo.id+')">'+status+'</button>&nbsp;<button id="remove" onclick="remove('+todo.id+')">DELETE</button>';
			document.querySelector("ul").appendChild(li);
		}
	}
};

function add(e) {
	// prevent form submittion
    e.preventDefault();

	todo={
       "name": document.getElementById("name").value,
       "id": Math.random(),
       "status":true
	};

	if(sessionStorage.getItem("todos")!=null){
		todos = JSON.parse(sessionStorage.getItem("todos"));
		todos.push(todo);
		sessionStorage.setItem("todos",JSON.stringify(todos));
	}
	else{
		todos=[todo];
		sessionStorage.setItem("todos",JSON.stringify(todos));
	}

	document.getElementById("name").value="";
	all();
}

function remove(id) {
	todos = JSON.parse(sessionStorage.getItem("todos"));
	for(let i in todos){
		if(todos[i].id==id){
			todos.splice(i,1);
		}
	}
	sessionStorage.setItem("todos",JSON.stringify(todos));
	all();
}

function edit(id) {
	todos = JSON.parse(sessionStorage.getItem("todos"));
	for(var i=0; i<todos.length; i++){
		if(todos[i].id==id){
			todos[i].status = !todos[i].status;
		}
	}
	sessionStorage.setItem("todos",JSON.stringify(todos));
	all();
}
document.getElementById('taskform').addEventListener('submit',add,false);
//document.getElementById('delete').addEventListener('click',remove(),false);
