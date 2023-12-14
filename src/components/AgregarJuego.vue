<template>
  <v-form v-model="valido" ref="formulario" lazy-validation>
    <v-text-field
      label="Videojugego:"
      v-mmodel="Nombre"
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
      :rules="reglasPublicacion"
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
    <v-btn
      @click="guardar"
      :disabled="!valido"
    >Guardar</v-btn>
    <v-btn @click="limpiar">Limpiar</v-btn>
  </v-form>
</template>

<script>

</script>
