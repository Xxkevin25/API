let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});

const cargarPleiculas = async() => {

    try{

    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=25dd6b23f14c7a5dbaf9228279d1f342&language=es-MX&page=${pagina}`);

     console.log(respuesta);

    //Si la respuestas esta correcat
     if(respuesta.status === 200){    
       const datos = await respuesta.json();

       let peliculas = '';
       datos.results.forEach(pelicula => {
           peliculas +=`
                    <div class="pelicula">
                        <img class='poster' src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>`;
       });


       document.getElementById('contenedor').innerHTML = peliculas;

     }else if(respuesta.status === 401){
         console.log('Nombre mal escrito')
     }else if(respuesta.status === 404){
         console.log('La pelicula no existe')
     }else{
         console.log('algo paso y no sabemos que paso')
     }

    }catch(error){
        console.log(error)
    }

}


cargarPleiculas();