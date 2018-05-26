<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
                <div class="headline">Settings</div>
          </v-card-title>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSave">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="url" label="Url" id="url" v-model="url" type="url" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="username" label="Username" id="username" v-model="username" type="text" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="password" label="Password" id="password" v-model="password" type="password" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <div class="text-xs-center">
                      <v-btn block large color="secondary" type="submit" :disabled="loading" :loading="loading">
                        Save
                        <v-icon right>lock_open</v-icon>
                        <span slot="loader" class="custom-loader">
                          <v-icon light>cached</v-icon>
                         </span>
                      </v-btn>
                    </div>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      username: "",
      password: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
    settings() {
      return this.$store.getters.settings;
    }
  },
  beforeMount() {
    // call when the page is loading.
    this.onPageLoad();
  },
  methods: {
    onSave() {
      this.$store.dispatch("saveSettings", {
        url: this.url,
        username: this.username,
        password: this.password
      });
    },
    onPageLoad() {
      this.$store.dispatch("loadSettings");
      this.url = this.settings.url;
      this.username = this.settings.username;
    }
  }
};
</script>
