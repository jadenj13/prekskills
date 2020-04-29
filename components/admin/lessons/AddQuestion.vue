<template>
  <v-container>
    <v-card-subtitle class="subtitle-1 py-0"
      >Question #{{ questionNumber }}</v-card-subtitle
    >

    <v-col v-if="step === 'add-sd'" cols="12">
      <v-card-subtitle class="subtitle-1 py-0">Add SD</v-card-subtitle>
      <v-card-text>
        <v-text-field v-model="sdText" label="SD Text (Optional)" />
        <v-file-input
          v-model="sdImg"
          chips
          accept="image/*"
          label="Select SD Image (Optional)"
        />
        <audio-recorder
          class="mx-auto my-4"
          :headers="{ 'Content-Type': 'audio/mpeg' }"
          :show-download-button="false"
          :show-upload-button="!!signedRequestForRecording"
          :filename="recordingFilename"
          :upload-url="signedRequestForRecording"
          :after-recording="getSignedRequestForRecording"
          :before-upload="() => (fileUploadingState = 'uploading')"
          :successful-upload="() => (fileUploadingState = 'complete')"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn
          class="ml-auto"
          color="primary"
          :disabled="!validSd"
          @click="() => (step = 'add-answers')"
          >Continue</v-btn
        >
      </v-card-actions>
    </v-col>

    <v-col v-if="step === 'add-answers'" cols="12">
      <v-card-subtitle class="subtitle-1 py-0">Add Answers</v-card-subtitle>
      <v-card-text v-if="!answers.length">
        <v-file-input
          v-model="answerImages"
          chips
          multiple
          counter
          accept="image/*"
          label="Select Answer Images"
        />
        <v-btn
          color="primary"
          :disabled="!answerImages.length"
          :loading="uploadingImages"
          @click="uploadImages()"
          >Upload</v-btn
        >
      </v-card-text>

      <v-card-text v-else>
        <v-card-subtitle class="subtitle-1"
          >Select Correct Answer</v-card-subtitle
        >
        <v-row>
          <v-col
            v-for="({ imgUrl, isCorrect }, i) in answers"
            :key="`selectable-image-${i}`"
            :class="{
              'd-flex': true,
              'child-flex': true,
              'correct-answer': isCorrect,
            }"
            cols="4"
            @click="markImageAsCorrectAnswer(i)"
          >
            <v-card flat tile class="d-flex selectable-image">
              <v-img :src="imgUrl" aspect-ratio="1" />
            </v-card>
          </v-col>
        </v-row>

        <v-btn
          class="ml-auto mt-4"
          color="primary"
          :disabled="!correctAnswerSelected"
          @click="submit()"
          >Submit Question</v-btn
        >
      </v-card-text>
    </v-col>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    questionNumber: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      step: 'add-sd',
      sdText: undefined,
      sdImg: undefined,
      recordingUploadingState: '',
      recordingFilename: 'prompt-recording',
      signedRequestForRecording: '',
      recordingUrl: undefined,
      answerImages: [],
      uploadingImages: false,
      answers: [],
    };
  },

  computed: {
    validSd() {
      return (
        this.fileUploadingState !== 'uploading' &&
        (this.sdText || this.sdImg || this.fileUploadingState === 'complete')
      );
    },

    correctAnswerSelected() {
      return !!this.answers.find((answer) => answer.isCorrect);
    },
  },

  methods: {
    async uploadImages() {
      this.uploadingImages = true;

      const urls = await Promise.all(
        this.answerImages.map(async (image) => {
          const { name, type } = image;

          const { signedRequest, url } = await this.$axios.$get(
            `/upload?filename=${name}&fileType=${type}`,
          );

          await axios.put(signedRequest, image, {
            headers: {
              'Content-Type': type,
            },
          });

          return url;
        }),
      );

      this.uploadingImages = false;
      this.answers = urls.map((url) => ({
        isCorrect: false,
        imgUrl: url,
      }));
      this.answerImages = [];
    },

    markImageAsCorrectAnswer(index) {
      this.answers = this.answers.map(({ imgUrl }, i) => ({
        imgUrl,
        isCorrect: i === index,
      }));
    },

    async getSignedRequestForRecording() {
      const { signedRequest, url } = await this.$axios.$get(
        `/upload?filename=${this.recordingFilename}&fileType=audio/mpeg`,
      );

      this.signedRequestForRecording = signedRequest;
      this.recordingUrl = url;
    },

    submit() {
      this.$emit('submit-question', {
        sd: {
          text: this.sdText,
          imgUrl: this.sdImgUrl,
          recordingUrl: this.recordingUrl,
        },
        answers: this.answers,
      });
    },
  },
};
</script>

<style>
.selectable-image {
  cursor: pointer;
}

.correct-answer {
  border: 8px solid #373737;
}

.ar-content {
  height: 260px !important;
}
</style>
