<template>
  <div class="contenedor-registro-albums">
    <v-form v-model="valido" ref="formulario" lazy-validation>
        <v-text-field
            label="Álbum"
            v-model="nombre"
            :rules="reglasNombre"
            required
        ></v-text-field>
        <v-text-field
            label="Artista:"
            v-model="artista"
            :rules="reglasArtista"
            required
        ></v-text-field>
        <v-text-field
            label="Género:"
            v-model="genero"
            required
            :rules="reglasGenero"
        ></v-text-field>
        <v-title>Fecha de lanzamiento:</v-title>
        <v-row justify="center">
          <v-column>
            <v-spacer></v-spacer>
          </v-column>
          <v-column>
            <v-date-picker
              v-model="picker"
              color="pink accent-1"></v-date-picker>
          </v-column>
          <v-column>
            <v-spacer></v-spacer>
          </v-column>
        </v-row>
        <v-btn
            @click="guardar"
            :disabled="!valido"
        >Guardar</v-btn>
        <v-btn @click="limpiar">Limpiar</v-btn>
    </v-form>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data: () => ({
    valido: true,
    nombre: '',
    artista: '',
    picker: (
      new Date(Date.now() - (new Date().getTimezoneOffset() * 60000))).toISOString().substr(0, 10),
    genero: '',
    anhopub: '',
    reglasNombre: [
      v => !!v || 'El nombre del álbum es obligatorio',
    ],
    reglasGenero: [
      v => !!v || 'Género del álbum requerido',
      v => (v && v.length <= 80) || 'Género debe ser menor o igual a 80 caracteres',
    ],
    reglasArtista: [
      v => !!v || 'El artista es requerido',
    ],
    select: null,
    anhos: [
      '2016',
      '1967',
      '2001',
      '1958',
      '1959',
      '2018',
    ],
  }),

  methods: {
    guardar() {
      if (this.$refs.formulario.validate()) {
        // Realizar siguiente acción
        return axios({
          method: 'post',
          data: {
            nombre: this.nombre,
            artista: this.artista,
            anhopub: this.anhopub,
            genero: this.genero,
          },
          url: 'http://localhost:8081/peliculas',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              '¡Grandioso!',
              'Película guardada satisfactoriamente',
              'success',
            );
            this.$router.push({ name: 'Inicio' });
            this.$refs.formulario.reset();
          })
          .catch(() => {
            this.$swal(
              '¡¡Oh no!!',
              'Ocurrió un error y no pudimos agregar la película',
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
