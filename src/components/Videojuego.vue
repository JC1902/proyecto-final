<template>
  <div>
    <b-container class="sombra">
      <b-row>
        <b-col lg="4">
          <div>
            <v-img
            class="sombra imagen"
            :src="videojuego.imagen"
            :width="300"
            :radius-border="2.5"></v-img>
          </div>
        </b-col>
        <b-col>
          <v-card-title primary-title>
            {{ videojuego.nombre }}
          </v-card-title>
          <v-card-text>
          <span class="grey--text" >
              {{ formatearFecha(videojuego.anhopub) }} &middot; {{ videojuego.genero }}
              &middot; {{ videojuego.desarrolladora }}
            </span>
        </v-card-text>
        <v-card-text class="texto" scoped>
          {{ videojuego.sinopsis }}
        </v-card-text>

        <div>
          <v-btn text color="purple" @click="calificar()">Calificar</v-btn>
        </div>

        <div>
          <v-btn text @click="resenhar()">Reseñar</v-btn>
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

const wrapper = document.createElement('div');
const wrapperResena = document.createElement('div');

// estado compartido
const estado = {
  nota: 0,
  resenas: [],
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
      <star-rating
        v-model="calif"
        :show-rating="false"
        inactive-color="#B388FF"
        active-color="#4A148C"
      ></star-rating>
    </div>   
  `,
  components: {
    'star-rating': StarRating,
  },
});

const ComponenteResenha = Vue.extend({
  data() {
    return {
      resena: '',
    };
  },
  watch: {
    resena(nuevaResena) {
      estado.resenas.push(nuevaResena);
    },
  },
  template: `
    <div>
      <v-text-field
        v-model="resena"
        label="Escribe tu reseña"
        multi-line
      ></v-text-field>
    </div>
  `,
});

const componente = new ComponenteCalif().$mount(wrapper);
const componenteResenha = new ComponenteResenha().$mount(wrapperResena);

export default {
  name: 'Videojuego',
  data() {
    return {
      videojuego: [],
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
            url: `http://localhost:8081/videojuegos/calif/${videojuegoId}`,
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
    async resenhar() {
      this.$swal({
        content: componenteResenha.$el,
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
              resena: estado.resenas,
            },
            url: `http://localhost:8081/videojuegos/resena/${videojuegoId}`,
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(() => {
              this.$swal('Ma-ra-vi-llo-so!', 'Gracias por darnos tu opinión', 'success');
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
        url: `http://localhost:8081/videojuegos/${this.$route.params.id}`,
      })
        .then((respuesta) => {
          this.videojuego = respuesta.data;
          // eslint-disable-next-line no-console
          console.log(this.videojuego);
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

