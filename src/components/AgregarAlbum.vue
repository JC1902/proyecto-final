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
        <v-text-field
            label="Link de la imagen:"
            v-model="imagen"
            required
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
  name: 'AgregarAlbum',
  data: () => ({
    valido: true,
    nombre: '',
    artista: '',
    picker: (
      new Date(Date.now() - (new Date().getTimezoneOffset() * 60000))).toISOString().slice(0, 10),
    genero: '',
    imagen: '',
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
            picker: this.picker,
            genero: this.genero,
            imagen: this.imagen,
          },
          url: 'http://localhost:8081/musica',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              '¡Grandioso!',
              'Álbum guardado satisfactoriamente',
              'success',
            );
            this.$router.push({ name: 'Musica' });
            this.$refs.formulario.reset();
          })
          .catch(() => {
            this.$swal(
              '¡¡Oh no!!',
              'Ocurrió un error y no pudimos agregar el álbum',
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
