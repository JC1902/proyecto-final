<!-- <template>
  <v-layout row wrap>
    <v-flex xs4 v-for="pelicula in peliculas" :key="pelicula._id">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">
              <v-btn v-bind:to="`/peliculas/${pelicula._id}`">
                {{ pelicula.nombre }}
              </v-btn>
            </div>
            <span class="gray--text">{{ pelicula.anhopub }} &middot; {{ pelicula.genero }}</span>
          </div>
        </v-card-title>
        <v-card-text>
          {{ pelicula.sinopsis }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="purple">Calificar esta película</v-btn>
          <v-btn @click="eliminarPelicula(pelicula._id)" text color="red">Borrar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-btn @click="eliminarPeliculas()" text color="red">Borrar todo</v-btn>
  </v-layout>
</template> -->

<template>
  <v-layout row justify-center align-center>
    <v-flex xs4>
      <v-card
        elevation="24"
        outlined
        shaped
        color="cyan lighten-4"
      >
        <v-card-title primary-title class="d-flex justify-center">
          <div class="headline font-weight-bold">Videojuegos</div>
        </v-card-title>
        <img src="../assets/images/icono-juegos.png" class="imagen-incio">
        <v-card-text>
          <v-btn
            rounded
            color="#AA00FF"
            class="font-weight-bold white--text"
            v-bind:to="{name: 'Videojuegos'}"
          >Ver Videojuegos</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs4>
      <v-card
        elevation="24"
        outlined
        shaped
        color="purple lighten-4"
      >
        <v-card-title primary-title class="d-flex justify-center">
          <div class="headline font-weight-bold">Canciones y álbumes</div>
        </v-card-title>
        <img src="../assets/images/icono-musica.png" class="imagen-inicio">
        <v-card-text>
          <v-btn
            rounded
            color="#AA00FF"
            class="font-weight-bold white--text"
            v-bind:to="{name: 'Musica'}"
          >Ver Música</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';
import '../assets/stylesheets/main.css';

export default {
  name: 'Peliculas',
  data() {
    return {
      peliculas: [],
    };
  },
  mounted() {
    this.obtenerPeliculas();
  },
  methods: {
    async obtenerPeliculas() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: 'http://localhost:8081/peliculas',
        headers: {
          Authorization: `JWT ${token}`,
          'Çontent-Type': 'application/json',
        },
      })
        .then((respuesta) => {
          this.peliculas = respuesta.data.albumes;
          this.current_user = respuesta.data.current_user;
        })
        .catch(() => {
        });
    },
    async eliminarPelicula(_id) {
      return axios({
        method: 'delete',
        url: `http://localhost:8081/peliculas/${_id}`,
      })
        .then(() => {
          this.obtenerPeliculas();
        })
        .catch(() => {

        });
    },
    async eliminarPeliculas() {
      return axios({
        method: 'delete',
        url: 'http://localhost:8081/peliculas',
      })
        .then(() => {
          this.obtenerPeliculas();
        });
    },
  },
};
</script>
