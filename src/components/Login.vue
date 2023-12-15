<template>
  <v-form v-model="valido" ref="formulario" lazy-validation>
    <v-text-field
     label="Email"
     v-model="email"
     :rules="reglasEmail"
     required
    ></v-text-field>
    <v-text-field
     label="Contraseña"
     v-model="contrasenha"
     type="password"
     :rules="reglasContra"
     required
    ></v-text-field>
    <v-btn
     @click="entrar"
     :disabled="!valido"
     color="success"
    >Entrar</v-btn>
    <v-btn @click="limpiar" color="warning">Limpiar</v-btn>

    <v-spacer class="mb-4"></v-spacer>

    <v-btn v-bind:to="{name: 'Registro'}" color="error">No tienes una cuenta? Registrate</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    valido: true,
    email: '',
    contrasenha: '',
    reglasEmail: [
      v => !!v || 'Email requerido',
      v => /\S+@\S+\.\S+/.test(v) || 'Email debe ser válido',
    ],
    reglasContra: [
      v => !!v || 'La contraseña no puede estar vacía',
      v => v.length > 8 || 'La contraseña debe tener 8 o más caracteres',
    ],
  }),
  mounted(){
    this.entrar();
  },
  methods: {
    async entrar() {
      return axios({
        method: 'post',
        data: {
          email: this.email,
          contrasenha: this.contrasenha,
        },
        url: 'http://localhost:8081/usuarios/login',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          window.localStorage.setItem('auth', response.data.token);
          this.$swal('Ma-ra-vi-llo-so!', 'Está listo para iniciar', 'success');
          this.$router.push({ name: 'Inicio' });
        })
        .catch((error) => {
          const mensaje = error.response.data.mensaje;
          this.$swal('Oh no!', `${mensaje}`, 'error');
          this.$router.push({ name: 'Login' });
        });
    },
    limpiar() {
      this.$refs.formulario.reset();
    },
  },
};
</script>
