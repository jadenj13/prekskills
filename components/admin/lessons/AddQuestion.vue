<template>
  <form>
    <v-card-text>
      <h6 class="subtitle-1 my-2">Question #{{ questionNumber }}</h6>
      <v-container v-if="step === 'upload-images'">
        <v-file-input
          v-model="images"
          chips
          accept="image/*"
          multiple
          counter
          label="Select Images"
        />
        <v-btn
          :loading="isUploadingImages"
          color="primary"
          :disabled="!images.length"
          @click="uploadImages"
          >Upload</v-btn
        >
      </v-container>

      <h6 v-if="step === 'select-sd'" class="title">Select SD</h6>
      <h6 v-if="step === 'select-correct-answer'" class="title">
        Select Correct Answer
      </h6>

      <v-container v-if="step !== 'upload-images' && step !== 'confirm'" fluid>
        <v-row>
          <v-col
            v-for="(url, i) in imgUrls"
            :key="`selectable-image-${i}`"
            class="d-flex child-flex"
            cols="4"
          >
            <v-card
              flat
              tile
              class="d-flex selectable-image"
              @click="selectImage(i)"
            >
              <v-img :src="url" aspect-ratio="1" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-container v-if="step === 'add-recording'">
        <h6 class="title">Add Recording</h6>
        <audio-recorder
          class="mx-auto my-4"
          :headers="{ 'Content-Type': 'audio/mpeg' }"
          :show-download-button="false"
          :show-upload-button="signedRequestForRecording"
          :filename="recordingFilename"
          :upload-url="signedRequestForRecording"
          :after-recording="getSignedRequestForRecording"
          :successful-upload="() => (step = 'confirm')"
        />
      </v-container>

      <v-container v-if="step === 'confirm'">
        <h6 class="title">SD Image</h6>
        <v-row>
          <v-col class="d-flex child-flex" cols="4">
            <v-card flat tile class="d-flex">
              <v-img :src="sdImgUrl" aspect-ratio="1" />
            </v-card>
          </v-col>
        </v-row>

        <h6 class="title">Correct Answer Image</h6>
        <v-row>
          <v-col class="d-flex child-flex" cols="4">
            <v-card flat tile class="d-flex">
              <v-img :src="correctAnswerImgUrl" aspect-ratio="1" />
            </v-card>
          </v-col>
        </v-row>

        <h6 class="title">
          Incorrect Answer Images
        </h6>
        <v-row>
          <v-col
            v-for="(url, i) in incorrectAnswerImgUrls"
            :key="`incorrect-answer-${i}`"
            class="d-flex child-flex"
            cols="4"
          >
            <v-card flat tile class="d-flex">
              <v-img :src="url" aspect-ratio="1" />
            </v-card>
          </v-col>
        </v-row>

        <h6 class="title">Prompt Recording</h6>
        <audio-player :src="recordingUrl" />
      </v-container>
    </v-card-text>

    <v-card-actions v-if="step === 'confirm'">
      <v-btn color="primary" @click="submit()">Submit</v-btn>
    </v-card-actions>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  props: {
    questionNumber: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      isUploadingImages: false,
      step: 'upload-images',
      images: [] as File[],
      imgUrls: [] as string[],
      sdImgUrl: '',
      correctAnswerImgUrl: '',
      incorrectAnswerImgUrls: [] as string[],
      recordingFilename: 'prompt-recording',
      signedRequestForRecording: '',
      recordingUrl: '',
    };
  },

  methods: {
    async uploadImages() {
      this.isUploadingImages = true;

      const urls = await Promise.all(
        this.images.map(async (image) => {
          const { name, type } = image;

          const { signedRequest, url } = await this.$axios.$get<{
            signedRequest: string;
            url: string;
          }>(`/upload?filename=${name}&fileType=${type}`);

          await axios.put(signedRequest, image, {
            headers: {
              'Content-Type': type,
            },
          });

          return url;
        }),
      );

      this.isUploadingImages = false;
      this.imgUrls = urls;
      this.images = [];
      this.step = 'select-sd';
    },

    selectImage(index: number) {
      switch (this.step) {
        case 'select-sd':
          this.sdImgUrl = this.imgUrls[index];
          this.imgUrls.splice(index, 1);
          this.step = 'select-correct-answer';
          break;
        case 'select-correct-answer':
          this.correctAnswerImgUrl = this.imgUrls[index];
          this.imgUrls.splice(index, 1);
          this.incorrectAnswerImgUrls = this.imgUrls;
          this.imgUrls = [];
          this.step = 'add-recording';
          break;
      }
    },

    async getSignedRequestForRecording() {
      const { signedRequest, url } = await this.$axios.$get<{
        signedRequest: string;
        url: string;
      }>(`/upload?filename=${this.recordingFilename}&fileType=audio/mpeg`);

      this.signedRequestForRecording = signedRequest;
      this.recordingUrl = url;
    },

    submit() {
      this.$emit('submit-question', {
        sdImgUrl: this.sdImgUrl,
        correctAnswerImgUrl: this.correctAnswerImgUrl,
        incorrectAnswerImgUrls: this.incorrectAnswerImgUrls,
        promptRecordingUrl: this.recordingUrl,
      });
    },
  },
});
</script>

<style scoped>
.selectable-image {
  cursor: pointer;
}
</style>
