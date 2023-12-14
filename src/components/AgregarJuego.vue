<template>
  <v-form v-model="valido" ref="formulario" lazy-validation>
    <v-text-field
      label="Videojuego:"
      v-model="nombre"
      :rules="reglasNombre"
      required
    ></v-text-field>
    <v-text-field
      label="Sinopsis:"
      v-model="sinopsis"
      multi-line
    ></v-text-field>
    <v-select
      label="Año de publicación:"
      v-model="anhopub"
      required
      :items="anhos"
    ></v-select>
    <v-text-field
      label="Desarrolladora:"
      v-model="desarrolladora"
      required
    ></v-text-field>
    <v-text-field
      label="Género:"
      v-model="genero"
      required
      :rules="reglasGenero"
    ></v-text-field>
    <v-text-field
      label="Url de la imagen:"
      v-model="imagen"
      required
    ></v-text-field>
    <v-btn
      @click="guardar"
      :disabled="!valido"
    >Guardar</v-btn>
    <v-btn @click="limpiar">Limpiar</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    valido: true,
    nombre: '',
    sinopsis: '',
    anhopub: '',
    desarrolladora: '',
    genero: '',
    imagen: '',
    reglasNombre: [
      v => !!v || 'El nombre es requerido',
    ],
    reglasGenero: [
      v => !!v || 'Género de película requerido',
      v => (v && v.length <= 80) || 'Género debe ser menor o igual a 80 caracteres',
    ],
    select: null,
    anhos: [
      '2016',
      '1997',
      '2001',
      '2008',
      '1999',
      '2018',
    ],
  }),

  methods: {
    guardar() {
      if (this.$refs.formulario.validate()) {
        return axios({
          method: 'post',
          data: {
            nombre: this.nombre,
            sinopsis: this.sinopsis,
            anhopub: this.anhopub,
            desarrolladora: this.desarrolladora,
            genero: this.genero,
            imagen: this.imagen,
          },
          url: 'http://localhost:8081/videojuegos',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Ma-ra-vi-llo-so!',
              'Videojuego agregado correctamente',
              'success',
            );
            this.$router.push({ name: 'Inicio' });
            this.$refs.formulario.reset();
          })
          .catch(() => {
            this.$swal(
              'Oh oh!',
              'No se pudo agregar el videojuego',
              'error',
            );
          });
      }

      return true;
    },
    limpiar() {
      this.$refs.formulario.reset();
    },
  },
};

</script>
