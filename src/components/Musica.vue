<template>
  <v-flex>
    <div class="titulo-primario">¡Conece y califica a tus artistas favoritos!</div>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" class="carousel-item">
        <div class="overlay">{{ item.group }}</div>
      </v-carousel-item>
    </v-carousel>
    <div class="button_agregar">
      <v-btn class="ma-2" v-bind:to="'/musica/agregar'" outlined color="indigo">
        Agregar un album
      </v-btn>
    </div>
    <v-layout row wrap>
      <v-flex xs4 v-for="album in albumes" :key="album._id">
        <v-card class="centrar-card">
          <v-card-title primary-title>
            <div class="centrar-elementos">
              <div class="headline">
                <v-btn v-bind:to="`/musica/${album._id}`">
                  {{ album.nombre }}
                </v-btn>
              </div>
              <div class="imagen-musica">
                <v-img :src="album.imagen"></v-img>
              </div>
              <span class="gray--text">
                {{ formatearFecha(album.picker) }} &middot; {{ album.genero }}
              </span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="purple">Calificar este álbum</v-btn>
            <!-- <v-btn @click="eliminarPelicula(pelicula._id)" text color="red">Borrar</v-btn> -->
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <v-btn @click="eliminarPeliculas()" text color="red">Borrar todo</v-btn> -->
  </v-flex>
</template>

<script>
import axios from 'axios';
import '../assets/stylesheets/main.css';

const img1 = require('@/assets/images/RedVelvet.jpeg');
const img2 = require('@/assets/images/newjeans.jpeg');
const img3 = require('@/assets/images/aespa.jpeg');
const img4 = require('@/assets/images/nct127.jpeg');

export default {
  name: 'Musica',
  data() {
    return {
      items: [
        {
          src: img1,
          group: 'RED VELVET',
        },
        {
          src: img2,
          group: 'NEWJEANS',
        },
        {
          src: img3,
          group: 'aespa',
        },
        {
          src: img4,
          group: 'NCT 127',
        },
      ],
      albumes: [],
    };
  },
  mounted() {
    this.obtenerAlbumes();
  },
  methods: {
    async obtenerAlbumes() {
      // const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: 'http://localhost:8081/musica',
        headers: {
          // Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((respuesta) => {
          this.albumes = respuesta.data;
          // this.current_user = respuesta.data.current_user;
        })
        .catch(() => {
        });
    },
    formatearFecha(fecha) {
      // Crear un objeto Date con la fecha proporcionada
      const fechaNueva = new Date(fecha);

      // Obtener los componentes individuales de la fecha
      const dia = fechaNueva.getDate() + 1;
      const mes = fechaNueva.getMonth() + 1; // Los meses van de 0 a 11, por eso sumamos 1
      const año = fechaNueva.getFullYear();

      // Crear una cadena con el formato día, mes, año
      const fechaFormateada = `${dia}/${mes}/${año}`;
      return fechaFormateada;
    },
  },
};
</script>
