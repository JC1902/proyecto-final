<template>
  <v-flex>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" class="carousel-item">
        <div class="overlay">{{ item.group }}</div>
      </v-carousel-item>
    </v-carousel>
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
