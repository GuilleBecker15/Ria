	let lista 		= document.getElementById('listapublicaciones'),
		contactos 	= document.getElementById('contactos'),
		texto 		= document.getElementById('texto'),
		noticias 	= {};
		chat 		= document.getElementById('chatbox'),
		inputchat	= document.getElementById('inputchat');
		if(!!localStorage.getItem('noticias')){
			noticias = JSON.parse(localStorage.getItem('noticias'));
		}else{
			localStorage.setItem('noticias',JSON.stringify(noticias));
		}

		cargarNoticias();
		cargarContactos();


	let aceptar 	= document.getElementById('botonpublicar');
		
	aceptar.addEventListener('click', function(evt){
		if(!!texto.value){
			let post 	= document.createElement('div'),
				txt 	= document.createTextNode(texto.value),
				botoneliminar 	= document.createElement('button'), 
				textoeliminar 	= document.createTextNode('x'),
				postfooter		= document.createElement('div'),
				comentario		= document.createElement('input'),
				corazon			= document.createElement('span'),
				shared			= document.createElement('span');	
			// console.log(txt);
			// console.log(txt.value);
			post.classList.add('post');
			post.appendChild(botoneliminar);
			post.appendChild(txt);
			botoneliminar.setAttribute('type', "button");
			botoneliminar.classList.add('boton-cerrar');
			botoneliminar.appendChild(textoeliminar);



			botoneliminar.addEventListener('click', function(evt){
				post.remove();
				borrar(txt);
			});

			lista.insertBefore(post, lista.firstChild);
			agregar(txt);
			setTimeout(function(){post.classList.add('visible');},601);

			texto.value = '';

		}
	});

	function borrar(txt){
		console.log("algo borrado");
		console.log(txt);
		for(x in noticias){
			if(noticias[x] == txt.textContent){
				delete noticias[x];
				break;
			}
		}
		localStorage.setItem('noticias',JSON.stringify(noticias));
	}

	function agregar(txt){
		noticias[Date.now()] = txt.textContent;
		localStorage.setItem('noticias',JSON.stringify(noticias));		
	}

	function cargarNoticias() {
		for (x in noticias) {
			let post 			= document.createElement('div'),
				txt 			= document.createTextNode(noticias[x]),
				botoneliminar 	= document.createElement('button'),
				textoeliminar	= document.createTextNode('x');

			post.classList.add('post');
			post.appendChild(botoneliminar);
			post.appendChild(txt);
			botoneliminar.setAttribute('type', "button");
			botoneliminar.classList.add('boton-cerrar');
			botoneliminar.appendChild(textoeliminar);

			botoneliminar.addEventListener('click',function(evt){
				post.remove();
				borrar(txt);
			});
			lista.insertBefore(post, lista.firstChild);
			post.classList.add('visible');
		}
	}

	function cargarContactos(){
		let xhr = new XMLHttpRequest();
		xhr.open("GET", 'https://jsonplaceholder.typicode.com/users');
		xhr.send();
		xhr.onreadystatechange = evt => {
			if(xhr.readyState == 4) {
			 	let respuestas = JSON.parse(xhr.responseText);
				for (let i = 0; i < respuestas.length; i++) {
					console.log(respuestas[i].id+" "+respuestas[i].name+" "+respuestas[i].email);
					let row 	= document.createElement('div'),
						user 	= document.createElement('div'),
						divI = document.createElement('div'),
						icono	= document.createElement('span'),
						info 	= document.createElement('div'),	
						strong	= document.createElement('strong'),
						nombre	= document.createTextNode(respuestas[i].name),
						br 		= document.createElement('br'),
						email	= document.createTextNode(respuestas[i].email),
						divD	= document.createElement('div'),
						connect	= document.createElement('div');

					row.classList.add('row');
					row.classList.add('contacto');

					divI.classList.add('seis');
					divI.classList.add('columnas');
					icono.classList.add('fa');
					icono.classList.add('fa-user-circle-o');

					info.classList.add('cuatro');
					info.classList.add('columnas');
					info.setAttribute('name', nombre.textContent);

					divD.classList.add('seis');
					divD.classList.add('columnas');
					connect.classList.add('circle')
					if(!!Math.round(Math.random())){
						connect.classList.add('conectado');
					}

					divI.appendChild(icono);

					strong.appendChild(nombre);

					info.appendChild(nombre);
					info.appendChild(br);
					info.appendChild(email);

					divD.appendChild(connect);

					user.appendChild(divI);
					user.appendChild(info);
					user.appendChild(divD);

					row.appendChild(user);

					row.addEventListener('click',(function(evt){
						console.log("recien entro");
						console.log(evt.target.getAttribute('name'));
						console.log("recien entro");
						let nombre = evt.target.getAttribute('name');
						console.log("despues de asignar");
						console.log(nombre);
						console.log("despues de asignar");
						let esVisible = chat.classList.contains('visible');
						let existe = document.getElementById(evt.target.childNodes[0].textContent);
						let unico = true;
						
						if(existe && chat.childElementCount == 1){
							chat.classList.remove('visible');
						}
						
						// if(!chat.classList.contains('visible') && )
						// let esVisible = chat.classList.toggle('visible');
						// if (esVisible){
						if(!existe){
							chat.classList.add('visible');	
							console.log(evt.target.childNodes[0].textContent);
							let div = document.createElement('div');
							div.classList.add('contenedorchat');
							div.setAttribute('id',evt.target.childNodes[0].textContent);
							let span = document.createElement('span');
							span.classList.add('zona-activa');
							let name = document.createTextNode(evt.target.childNodes[0].textContent);
							span.appendChild(name);
							let ul = document.createElement('ul');
							// ul.classList.add('visible');
							for (let i = 0; i < 3; i++) {
								let li = document.createElement('li');
								let txt = document.createTextNode("Algo"+i);
								li.appendChild(txt);
								ul.appendChild(li);
							}
							let input = document.createElement('input');

							input.addEventListener('keydown',(function(evt) {
								// console.log("Input  evento listener");
								// console.log(evt);
								// for (let i = 0; i < inputchat.length; i++) {
									if(evt.keyCode == 13){
										console.log(input.value);
										let ul = evt.target.parentElement.childNodes[1],
											li = document.createElement('li'),
											txt = document.createTextNode(input.value);
										li.appendChild(txt);
										ul.appendChild(li);

										input.value='';
									}
								// }
							}));

							div.appendChild(span);
							div.appendChild(ul);
							div.appendChild(input);

							chat.appendChild(div);
						}else{
							existe.remove();
						}
					}));

					contactos.appendChild(row);
				}
			}
		}

		
	}
	

