<template>
  <div class="contenedor-registro-albums">
    <v-form v-model="valido" ref="formulario" lazy-validation>
      <v-text-field label="Álbum" v-model="nombre" :rules="reglasNombre" required></v-text-field>
      <v-text-field label="Artista:" v-model="artista" :rules="reglasArtista" required></v-text-field>
      <v-text-field label="Género:" v-model="genero" required :rules="reglasGenero"></v-text-field>
      <v-text-field label="Link de la imagen:" v-model="imagen" required></v-text-field>

      <v-combobox v-model="chips" :items="items" chips clearable label="Categorias" multiple
        prepend-icon="mdi-filter-variant" solo>
        <template v-slot:selection="{ attrs, item, select, selected }">
          <v-chip v-bind="attrs" :input-value="selected" close @click="select" @click:close="remove(item)">
            <strong>{{ item }}</strong>&nbsp;
            <span>(interest)</span>
          </v-chip>
        </template>
      </v-combobox>

      <v-title>Fecha de lanzamiento:</v-title>
      <v-row justify="center">
        <v-column>
          <v-spacer></v-spacer>
        </v-column>
        <v-column>
          <v-date-picker v-model="picker" color="pink accent-1"></v-date-picker>
        </v-column>
        <v-column>
          <v-spacer></v-spacer>
        </v-column>
      </v-row>
      <v-btn @click="guardar" :disabled="!valido">Guardar</v-btn>
      <v-btn @click="limpiar">Limpiar</v-btn>
    </v-form>
  </div>
</template>


<script>
import axios from 'axios';

/* eslint-disable */

export default {
  name: 'AgregarAlbum',
  data: () => ({
    chips: [],
    items: [],
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
  mounted() {
    this.obtenerCategorias();
  },
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
            categorias: this.chips,
          },
          url: 'http://localhost:8081/musica',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(() => {
          this.guardarCategorias();
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
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1)
    },
    async obtenerCategorias() {
      try {
        const response = await axios.get('http://localhost:8081/categorias');
        console.log(response);
        this.items = []; // Limpiar el arreglo antes de asignar nuevas categorías
        response.data.forEach((cat) => {
          this.items.push(cat.nombre);
        });
      } catch (error) {
        console.error('Error al obtener álbumes por categoría:', error);
      }
    },
    guardarCategorias() {
      try {

        const chipsAuxiliar = this.chips.filter(item => item !== this.chips[0]);
        for (const chip of chipsAuxiliar) {
          this.actualizarCategorias(this.chips[0], chip);
          this.agregarCategorias(chip);
        }

      } catch (error) {
        console.log(error);
      }
    },
    async actualizarCategorias(destino, valor) {
      return axios({
        method: 'put',
        data: {
          nombre: destino,
          nuevo_valor: valor,
        },
        url: 'http://localhost:8081/categorias',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    async agregarCategorias(categoria) {

      const response = await axios.get(`http://localhost:8081/categorias/${categoria}`);

      if (response.data.length === 0) {
        return axios({
          method: 'post',
          data: {
            nombre: categoria,
            referencias: [],
          },
          url: 'http://localhost:8081/categorias',
          headers: {
            'Content-Type': 'application/json',
          }
        });
      }

      return true;
    },
  },
};
</script>
