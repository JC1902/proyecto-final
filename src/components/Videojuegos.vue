<template>
  <v-flex>
    <div class="titulo-primario">Conoce videojuegos</div>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" class="carousel-item">
        <div class="overlay">{{ item.group }}</div>
      </v-carousel-item>
    </v-carousel>

    <v-spacer class="mb-4"></v-spacer>

    <container>
      <b-row>
        <b-col v-for="genre in genres" :key="genre">
          <v-btn rounded color="#AA00FF" @click="filterByGenre(genre)">
            {{ genre }}
          </v-btn>
        </b-col>
      </b-row>
    </container>

    <v-spacer class="mb-4"></v-spacer>
    <v-spacer class="mb-4"></v-spacer>
    <v-layout row wrap>
      <v-flex xs4 v-for="videojuego in videojuegos" :key="videojuego._id">
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">{{ videojuego.nombre }}</div>
              <div>
                <v-img :src="videojuego.imagen" class="imagen-juego"></v-img>
              </div>
              <span class="grey--text">Año &middot; {{ videojuego.anhopub }}</span>
            </div>
          </v-card-title>
          <v-card-text>
            {{ videojuego.sinopsis }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-spacer class="mb-4"></v-spacer>

    <v-btn
    color="#00B0FF"
    v-bind:to="{name: 'AgregarJuego'}"
    >Agrega un videojuego</v-btn>
    <v-spacer class="mb-4"></v-spacer>
  </v-flex>
</template>

<script>
import axios from 'axios';

const img1 = require('@/assets/images/gow.jpg');
const img2 = require('@/assets/images/zelda.jpg');
const img3 = require('@/assets/images/darsouls.jpg');

export default {
  name: 'Videojuegos',
  data() {
    return {
      items: [
        {
          src: img1,
          group: 'God of war',
        },
        {
          src: img2,
          group: 'The legend of zelda',
        },
        {
          src: img3,
          group: 'Dark Souls',
        },
      ],
      videojuegos: [],
      genres: ['Acción/Aventuras', 'Fromsoftware', 'SantaMonica', 'Hack n slash', 'Shooter', 'All'],

    };
  },
  mounted() {
    this.obtenerVideojuegos();
  },
  methods: {
    async obtenerVideojuegos() {
      return axios({
        method: 'get',
        url: 'http://localhost:8081/videojuegos',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((respuesta) => {
          this.videojuegos = respuesta.data;
        })
        .catch(() => {
        });
    },
    filterByGenre(genre) {
      if (genre === 'All') {
        // If 'All' is selected, fetch all video games
        this.obtenerVideojuegos();
      } else {
        // Fetch video games based on the selected genre
        axios({
          method: 'get',
          url: `http://localhost:8081/videojuegos/genero/${genre}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((respuesta) => {
            this.videojuegos = respuesta.data.videojuegos;
            this.$router.push({ name: 'VideojuegoGenero' });
          })
          .catch(() => {
            // Handle error
          });
      }
    },
  },
};
</script>