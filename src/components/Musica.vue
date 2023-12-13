<template>
  <v-flex>
    <div class="titulo-primario">¡Conece y califica a tus artistas favoritos!</div>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" class="carousel-item">
        <div class="overlay">{{ item.group }}</div>
      </v-carousel-item>
    </v-carousel>
  </v-flex>
</template>

<script>
const img1 = require('@/assets/images/RedVelvet.jpeg');
const img2 = require('@/assets/images/newjeans.jpeg');
const img3 = require('@/assets/images/aespa.jpeg');
const img4 = require('@/assets/images/nct127.jpeg');

export default {
  data() {
    return {
      items: [
        {
          src: img1,
          group: 'RED VELVET',
        },
        {
          src: img2,
          group: 'NEWJEANS',
        },
        {
          src: img3,
          group: 'aespa',
        },
        {
          src: img4,
          group: 'NCT 127',
        },
      ],
    };
  },
};
</script>
