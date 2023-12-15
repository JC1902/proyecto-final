<template>
  <div>
    <b-container class="sombra" xs4 v-for="videojuego in videojuegos" :key="videojuego._id">
      <b-row>
        <b-col lg="4">
          <div>
            <img
            class="sombra imagen"
            :src="videojuego.imagen"
            :width="300"
            :radius-border="2.5">
          </div>
        </b-col>
        <b-col>
          <v-card-title primary-title :dislpay="inherit">
            {{ videojuego.nombre }}
          </v-card-title>
          <v-card-text>
          <span class="grey--text" >
              {{ videojuego.anhopub }} &middot; {{ videojuego.genero }}  &middot; {{ videojuego.imagen }}
            </span>
        </v-card-text>
        <v-text class="texto" scoped>
          {{ videojuego.sinopsis }}
        </v-text>

        <div>
          <v-btn text color="purple">Calificar este videojuego</v-btn>
        </div>
        
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import StarRating from 'vue-star-rating';
import '../assets/stylesheets/videojuego.css';

const img1 = require('@/assets/images/God_of_War.jpg');

const wrapper = document.createElement('div');
// estado compartido
const estado = {
  nota: 0,
};
// crear componente en contenido
const ComponenteCalif = Vue.extend({
  data() {
    return {
      calif: 0,
    };
  },
  watch: {
    calif(nuevoValor) {
      estado.nota = nuevoValor;
    },
  },
  template: `
    <div class="rating">
      ¿Cuál fue su expriencia juego este videojuego?
      <star-rating v-model="calif" :show-rating="false"></star-rating>
    </div>   
  `,
  components: {
    'star-rating': StarRating,
  },
});

const componente = new ComponenteCalif().$mount(wrapper);

export default {
  name: 'Videojuego',
  data() {
    return {
      videojuego: [],

      items: [
      {
        src: img1,
        group: 'God of war',
      }
    ]
    };
    
  },
  mounted() {
    this.obtenerVideojuego();
  },
  methods: {
    async calificar() {
      this.$swal({
        content: componente.$el,
        buttons: {
          confirm: {
            value: 0,
          },
        },
      })
        .then(() => {
          const videojuegoId = this.$route.params.id;
          return axios({
            method: 'post',
            data: {
              calif: estado.nota,
            },
            url: `/videojuego/calif/${videojuegoId}`,
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(() => {
              this.$swal(`¡Gracias por calificar! ${estado.nota}`, 'success');
            })
            .catch((error) => {
              const mensaje = error.respuesta.data.message;
              this.$swal('Oh no puede ser!', `${mensaje}`, 'error');
            });
        });
    },
    async obtenerVideojuego() {
      return axios({
        method: 'get',
        url: `/videojuego/${this.route.params.id}`,
      })
        .then((respuesta) => {
          this.videojuego = respuesta.data;
        })
        .catch(() => {

        });
    },
  },
};
</script>

