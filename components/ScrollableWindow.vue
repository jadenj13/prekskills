<template>
  <v-sheet class="mx-auto pa-4" elevation="2">
    <h6 class="headline text-center mb-4">{{ heading }}</h6>
    <v-slide-group multiple show-arrows>
      <v-slide-item v-if="addItem">
        <v-card
          outlined
          width="160"
          height="140"
          class="mx-4 card"
          color="#efefef"
          @click="addItem()"
        >
          <v-card-text class="text-center mt-8">
            <v-icon x-large>add</v-icon>
          </v-card-text>
        </v-card>
      </v-slide-item>

      <v-slide-item v-for="(item, i) in items" :key="`${item.name}-${i}`">
        <v-card
          outlined
          width="160"
          height="140"
          class="mx-4 card"
          color="#efefef"
        >
          <v-card-text>
            <p class="subtitle-1 text-center mt-8">{{ item.name }}</p>
          </v-card-text>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    addItem: {
      type: Function,
      default: undefined,
    },
  },
};
</script>

<style scoped>
.card {
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
}
</style>
