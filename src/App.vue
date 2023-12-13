<template>
  <v-app id="inspire" >
    <v-navigation-drawer v-model="drawer" absolute bottom temporary app>
        <v-list dense>
        <router-link v-bind:to="{name: 'Inicio'}" class="side_bar_link">
          <v-list-item>
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-content>Inicio</v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link v-bind:to="{name: 'Videojuegos'}" class="side_bar_link">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-nintendo-game-boy</v-icon>
            </v-list-item-action>
            <v-list-item-content>Videojuegos</v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link v-bind:to="{name: 'Musica'}" class="side_bar_link">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-music-box-multiple</v-icon>
            </v-list-item-action>
            <v-list-item-content>Música</v-list-item-content>
          </v-list-item>
        </router-link>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar
      absolute
      color="#FF9FF0"
      dark
      shrink-on-scroll
      prominent
      src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/SI_Hub_Zelda_Portal_image1280w.jpg"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(252,78,225,.7), rgba(107,35,96,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-app-bar-nav-icon>

      <v-app-bar-title class="font-weight-bold">GameVibe</v-app-bar-title>

      <v-spacer></v-spacer>
      <v-btn
        v-bind:to="{name: 'Login'}"
        rounded
        color="#81D4FA"
      >Login</v-btn>
    </v-app-bar>
    <v-spacer class="mb-4"></v-spacer>

    <v-main>
     <v-container fluid>
       <div id="app">
         <router-view/>
       </div>
     </v-container>
    </v-main>

    <v-footer color="#FF9FF0" app>
      <span class="black--text">&copy; 2023</span>
    </v-footer>
  </v-app>
</template>

<script>
import './assets/stylesheets/main.css';

export default {
  data: () => ({
    drawer: false,
  }),
  props: {
    source: String,
  },
};
</script>
