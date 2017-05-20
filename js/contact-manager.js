var btn_add_view = document.querySelector('button#btn_add_view');
var add_view = document.querySelector('section#add_view');
var details_view = document.querySelector('section#details_view');

add_view.style.display = 'none';
details_view.style.display = 'none';

(function() {
	 var contacts =[
	   { id : 1,
         nom : 'Dia',
         prenom : 'Aliou',
         phone : '77 645 21 53',
         email : 'aliou.dia@server.sn'
	   },
	   { id : 2,
         nom : 'Sané',
         prenom : 'Khady',
         phone : '76 644 12 35',
         email : 'khady.sow@server.sn'
	   },
	   { id : 3,
         nom : 'Dia',
         prenom : 'Yero',
         phone : '78 456 78 53',
         email : 'yero.dia@server.sn'
	   },
	   { id : 4,
         nom : 'Ndiaye',
         prenom : 'Samba',
         phone : '77 544 14 18',
         email : 'samba.ndiaye@server.sn'
	   },
	   { id : 5,
         nom : 'Diouf',
         prenom : 'Nafi',
         phone : '75 545 58 45',
         email : 'nafi.diouf@server.sn'
	   }
	];

	if(sessionStorage.getItem("contacts")==null){
		sessionStorage.setItem("contacts",JSON.stringify(contacts));
	}

	list();
})();

function list() {
	var ul = document.querySelector("ul.contactlist");
	if(sessionStorage.getItem("contacts")!==""){
		var contacts = JSON.parse(sessionStorage.getItem("contacts"));

		ul.innerHTML='';
		for(let contact of contacts){
			let li = document.createElement('li'); 
			li.innerHTML='<a href="#" title="Editez ses coordonnées" onclick="details('+contact.id+')">'+contact.nom+' '+contact.prenom+'</a>';
			ul.appendChild(li);
		}
	}
	else{
		ul.innerHTML='<p>Liste vide</p>';
	}
	
	btn_add_view.style.display = 'block';
	details_view.style.display = 'none';
	add_view.style.display = 'none';
}

function add() {    	
    	var contact={
    		id: Math.random(),
    		nom: document.getElementById("nom").value,
    		prenom : document.getElementById("prenom").value,
    		phone : document.getElementById("phone").value,
    		email : document.getElementById("email").value
    	};

		if(sessionStorage.getItem("contacts")!==null){
		    var contacts = JSON.parse(sessionStorage.getItem("contacts"));
			contacts.push(contact);
		}
		else{
			var contacts=[contact];
		}
		sessionStorage.setItem("contacts",JSON.stringify(contacts));

		document.getElementById("nom").value = "";
	    document.getElementById("prenom").value = "";
	    document.getElementById("phone").value = "";
	    document.getElementById("email").value = "";

		list();
	}	

function details(id) {
    var contacts = JSON.parse(sessionStorage.getItem('contacts'));
    
    for(let i in contacts){
    	if(contacts[i].id==id){
		    document.getElementById("nom_d").value = contacts[i].nom;
		    document.getElementById("prenom_d").value = contacts[i].prenom;
		    document.getElementById("phone_d").value = contacts[i].phone;
		    document.getElementById("email_d").value = contacts[i].email;
    	}
    }

    document.getElementById("selected_id").value = id;

    details_view.style.display = 'block';   
	btn_add_view.style.display = 'none';
	add_view.style.display = 'none';
}

function remove() {
	if (confirm("Souhaitez-vous vraiment supprimer ce contact ?")){
		var selected_id = document.getElementById("selected_id").value;
		var contacts = JSON.parse(sessionStorage.getItem('contacts'));
		
		contacts = contacts.filter(function(contact) {
			return contact.id != selected_id;
		});
		
		sessionStorage.setItem("contacts",JSON.stringify(contacts));
	}
	 
	list();
}

function update() {	
	var selected_id = document.getElementById("selected_id").value;
	var contacts = JSON.parse(sessionStorage.getItem('contacts'));
    
    for(let i in contacts){
    	if(contacts[i].id == selected_id){
		    contacts[i].nom = document.getElementById("nom_d").value;
		    contacts[i].prenom = document.getElementById("prenom_d").value;
		    contacts[i].phone = document.getElementById("phone_d").value;
		    contacts[i].email = document.getElementById("email_d").value;
    	}
    }
    sessionStorage.setItem("contacts",JSON.stringify(contacts));
	
	list();
}

document.getElementById('btn_add_view').addEventListener('click',function(){
	add_view.style.display = 'block';
	document.getElementById("nom").autofocus='true';
	btn_add_view.style.display = 'none';
});

document.getElementById('btn_add').addEventListener('click',add,false);
document.getElementById('btn_remove').addEventListener('click',remove,false);
document.getElementById('btn_update').addEventListener('click',update,false);
document.getElementById('btn_annuler1').addEventListener('click',list,false);
document.getElementById('btn_annuler2').addEventListener('click',list,false);