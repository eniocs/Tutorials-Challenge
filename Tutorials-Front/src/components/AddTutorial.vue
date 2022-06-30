<template>
  <div class="submit-form text-left align-middle">
    <h4>Nuevo tutorial</h4>
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Titulo</label>
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
        <label for="description">Descripción</label>
        <input
          class="form-control"
          id="description"
          v-model="tutorial.description"
          name="description"
        />
      </div>
      <label class="m-1"> ¿Como quiero mantener el tutorial? </label>
      <div class="form-group">
        <input class="m-1" type="radio" id="tutorial.published_status_false" value="false" v-model="tutorial.published_status">
        <label class="m-1" for="uno"> Oculto </label>
        <input class="m-1" type="radio" id="tutorial.published_status_true" value="true" v-model="tutorial.published_status">
        <label class="m-1" for="Dos"> Público </label>
      </div>
      <div class="form-group">
        <label for="deleted_at">Deleted_at</label>
        <input
          type="text"
          class="form-control"
          id="deleted_at"
          v-model="tutorial.deleted_at"
          name="deleted_at"
        />
      </div>
      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>El tutorial se agregó correctamente!</h4>
      <button class="btn btn-success btn-block" @click="newTutorial">Agregar otro tutorial</button>
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
      submitted: false,
      toggle_status : true
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
  max-width: 1000px;
  margin: auto;
}
</style>
