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
        <img src="../assets/images/icono-juegos.png" class="imagen-inicio">
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
import '../assets/stylesheets/main.css';

export default {
  name: 'Peliculas',
  data() {
    return {
      peliculas: [],
    };
  },
};
</script>
