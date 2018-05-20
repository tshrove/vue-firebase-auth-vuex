<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        Dashboard
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>
