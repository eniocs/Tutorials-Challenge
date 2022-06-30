<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="tutorial.title"
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="video_url">Video URL</label>
        <input
          type="text"
          class="form-control"
          id="video_url"
          v-model="tutorial.video_url"
          name="video_url"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          v-model="tutorial.description"
          name="description"
        />
      </div>
      <div class="form-group">
        <label for="published_status">Published</label>
        <input
          type="checkbox"
          class="form-control"
          id="published_status"
          required
          v-model="tutorial.published_status"
          name="published_status"
        />
      </div>
      <div class="form-group">
        <label for="deleted_at">Deleted_at</label>
        <input
          type="text"
          class="form-control"
          id="deleted_at"
          v-model="tutorial.title"
          name="deleted_at"
        />
      </div>
      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>
<script>
import TutorialDataService from "../services/TutorialDataService";
export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        video_url:"",
        title: "",
        description: "",
        published_status: false,
        deleted_at: null,
      },
      submitted: false
    };
  },
  methods: {
    saveTutorial() {
      var data = {
        title: this.tutorial.title,
        video_url: this.tutorial.video_url,
        description: this.tutorial.description,
        published_status: this.tutorial.published_status,
        deleted_at: this.tutorial.deleted_at
      };
      TutorialDataService.create(data)
        .then(response => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    }
  }
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
