<template>
  <v-dialog v-model="displayDialog" max-width="500" persistent>
    <v-card>
      <v-card-title>
        <h6 class="title">Add Lesson</h6>
        <v-spacer />
        <v-btn icon @click="displayDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-form v-if="step === 'create-lesson'" @submit.prevent="createLesson()">
        <v-card-text>
          <v-text-field v-model="name" label="Lesson Name" required />
          <v-text-field
            v-model="description"
            label="Lesson Description"
            required
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            class="ml-auto"
            :loading="loadingState === 'creating-lesson'"
            type="submit"
            >Continue</v-btn
          >
        </v-card-actions>
      </v-form>

      <v-container v-if="step === 'review-lesson'">
        <v-card-text>
          <p>Lesson Name: {{ name }}</p>
          <p>Lesson Description: {{ description }}</p>
          <p>Number of Questions: {{ lesson.questions.length }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="loadingState === 'submitting-lesson'"
            @click="() => (step = 'add-question')"
            >Add Question</v-btn
          >
          <v-btn
            :loading="loadingState === 'submitting-lesson'"
            color="primary"
            @click="submitLesson()"
            >Submit Lesson</v-btn
          >
        </v-card-actions>
      </v-container>

      <add-question
        v-if="step === 'add-question'"
        :question-number="lesson.questions.length + 1"
        @submit-question="addQuestion($event)"
      />
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import AddQuestion from '@/components/admin/lessons/AddQuestion.vue';

export default Vue.extend<any, any, any, any>({
  components: {
    AddQuestion,
  },

  props: {
    display: {
      type: Boolean,
      required: true,
    },
    toggleDisplay: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      name: '',
      description: '',
      step: 'create-lesson',
      loadingState: '',
      lesson: undefined,
    };
  },

  computed: {
    displayDialog: {
      get() {
        return this.display;
      },
      set(value: boolean) {
        this.loadingState = '';
        this.lesson = undefined;
        this.name = '';
        this.description = '';
        this.step = 'create-lesson';

        return this.toggleDisplay(value);
      },
    },
  },

  methods: {
    async createLesson() {
      this.loadingState = 'creating-lesson';

      try {
        this.lesson = await this.$axios.$post(
          `${process.env.API_BASE_URL}/lesson`,
          {
            name: this.name,
            description: this.description,
          },
        );

        this.isCreatingLesson = '';

        this.step = 'add-question';
      } catch (error) {
        this.$store.commit('snackbar/SET_SNACKBAR', {
          message: 'An error occurred. Please try again.',
          color: 'error',
        });
      }
    },

    addQuestion(question: {
      sdImgUrl: string;
      correctAnswerImgUrl: string;
      incorrectAnswerImgUrls: string;
      promptRecordingUrl: string;
    }) {
      this.step = 'review-lesson';
      this.lesson = {
        ...this.lesson,
        questions: [...this.lesson.questions, question],
      };
    },

    async submitLesson() {
      this.loadingState = 'submitting-lesson';

      try {
        await this.$axios.put(
          `${process.env.API_BASE_URL}/lesson/${this.lesson._id}`,
          this.lesson,
        );

        this.displayDialog = false;

        this.$store.commit('snackbar/SET_SNACKBAR', {
          message: 'Successfully created lesson!',
          color: 'success',
        });
      } catch (error) {
        this.$store.commit('snackbar/SET_SNACKBAR', {
          message: 'An error occurred. Please try again.',
          color: 'error',
        });
      }
    },
  },
});
</script>
