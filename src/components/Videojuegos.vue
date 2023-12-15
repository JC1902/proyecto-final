<template>
  <v-flex>
    <div class="titulo-primario">Conoce videojuegos</div>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" class="carousel-item">
        <div class="overlay">{{ item.group }}</div>
      </v-carousel-item>
    </v-carousel>

    <v-spacer class="mb-4"></v-spacer>

    <v-btn
    color="#00B0FF"
    v-bind:to="{name: 'AgregarJuego'}"
    >Agrega un videojuego</v-btn>

    <v-spacer class="mb-4"></v-spacer>

    <v-layout row wrap>
      <v-flex xs4 v-for="videojuego in videojuegos" :key="videojuego._id">
        <v-card>
          <v-card-title primary-title class="d-flex justify-center">
            <div class="centrar-elementos">
              <div class="headline">
                <v-btn v-bind:to="`videojuegos/${videojuego._id}`" class="espacio-boton">
                  {{ videojuego.nombre }}
                </v-btn>
              </div>
              <div class="imagen-cada-juego">
                <v-img :src="videojuego.imagen"></v-img>
              </div>
              <span class="grey--text">
                {{ formatearFecha(videojuego.anhopub) }} &middot; {{ videojuego.genero }}
              </span>
            </div>
          </v-card-title>
          <v-card-text>
            {{ videojuego.sinopsis }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

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
