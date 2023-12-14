<template>
  <v-flex>
    <div class="titulo-primario">Conoce videojuegos</div>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" class="carousel-item">
        <div class="overlay">{{ item.group }}</div>
      </v-carousel-item>
    </v-carousel>

    <v-spacer class="mb-4"></v-spacer>

    <v-layout row wrap>
      <v-flex xs4>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">God of War</div>
              <div>
                <img src="../assets/images/gow.jpg" class="imagen-juego">
              </div>
              <span class="grey--text">Año &middot; 2018</span>
            </div>
          </v-card-title>
          <v-card-text>
            sinopsis
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">God of War</div>
              <div>
                <img src="../assets/images/gow.jpg" class="imagen-juego">
              </div>
              <span class="grey--text">Año &middot; 2018</span>
            </div>
          </v-card-title>
          <v-card-text>
            sinopsis
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-spacer class="mb-4"></v-spacer>

    <v-btn color="#00B0FF">Agrega un videojuego</v-btn>
  </v-flex>
</template>

<script>
const img1 = require('@/assets/images/gow.jpg');
const img2 = require('@/assets/images/zelda.jpg');
const img3 = require('@/assets/images/darsouls.jpg');

export default {
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
    };
  },
};
</script>
