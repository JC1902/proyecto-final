import Vue from 'vue';
import Router from 'vue-router';
import Inicio from '@/components/Inicio';
import Contacto from '@/components/Contacto';
import AgregarPelicula from '@/components/AgregarPelicula';
import Pelicula from '@/components/Pelicula';
import Registro from '@/components/Registro';
import Login from '@/components/Login';
<<<<<<< HEAD

import Musica from '@/components/Musica';
import AgregarAlbum from '@/components/AgregarAlbum';
import Videojuegos from '@/components/Videojuegos';
=======
import AgregarJuego from '@/components/AgregarJuego';

import Videojuego from '@/components/Videojuego';
>>>>>>> origin/Charlie

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio,
    },
    {
      path: '/contacto',
      name: 'Contacto',
      component: Contacto,
    },
    {
      path: '/peliculas/agregar',
      name: 'AgregarPelicula',
      component: AgregarPelicula,
    },
    {
      path: '/peliculas/:id',
      name: 'Pelicula',
      component: Pelicula,
    },
    {
      path: '/usuarios/registro',
      name: 'Registro',
      component: Registro,
    },
    {
      path: '/usuarios/login',
      name: 'Login',
      component: Login,
    },
    {
<<<<<<< HEAD
      path: '/musica',
      name: 'Musica',
      component: Musica,
    },
    {
      path: '/musica/agregar',
      name: 'AgregarAlbum',
      component: AgregarAlbum,
    },
    {
      path: '/videojuegos',
      name: 'Videojuegos',
      component: Videojuegos,
=======
      path: '/videojuegos',
      name: 'Videojuego',
      component: Videojuego,
    },
    {
      path: '/videojuegos/agregar',
      name: 'AgregarJuego',
      component: AgregarJuego,
>>>>>>> origin/Charlie
    },
  ],
});
