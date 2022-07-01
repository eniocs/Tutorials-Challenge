<template>
  <div v-if="currentTutorial" class="edit-form text-left align-middle border p-4 rounded bcolor" @closed="v$.$reset()">
    <h4>Editar Tutorial
    <button v-if="!this.currentTutorial.deleted_at" class="badge badge-danger float-right mr-2"
      @click="deleteTutorial"
      >
      Delete
    </button>
    </h4>
    <form>
      <div class="form-group">
        
              <label for="title">Titulo</label>
              <input
                type="text"
                class="form-control"
                id="title"
                required
                v-model="v$.currentTutorial.title.$model"
                name="title"
              />
              <small class="text-danger" v-if="v$.currentTutorial.title.required.$invalid">* Ingrese un título</small>
              <small class="text-danger" v-if="v$.currentTutorial.title.minLength.$invalid">* El titulo debe contener mas de cuatro caracteres</small>
            </div>
            <div class="form-group">
              <label for="video_url">Video URL</label>
              <input
                type="url"
                class="form-control"
                id="video_url"
                v-model="v$.currentTutorial.video_url.$model"
                name="video_url"
              />
              <small class="text-danger" v-if="v$.currentTutorial.video_url.url.$invalid">* URL incorrecta</small>
            </div>
      <div class="form-group">
              <label for="description">Descripción</label>
              <input
                class="form-control"
                id="description"
                v-model="currentTutorial.description"
                name="description"
              />
      </div>
      <label class="m-1"> ¿Como quiero mantener el tutorial? </label>
      <div class="form-group">
        <div>
          <input class="m-1 mb-0" type="radio" id="tutorial.published_status_false" value="false" v-model="v$.currentTutorial.published_status.$model">
          <label class="m-1 mb-0" for="uno"> Oculto </label>
          <input class="m-1 mb-0" type="radio" id="tutorial.published_status_true" value="true" v-model="v$.currentTutorial.published_status.$model">
          <label class="m-1 mb-0" for="Dos"> Público </label>
        </div>
      </div>
      <div v-if="this.currentTutorial.deleted_at" class="text-center text-danger">Borrado el {{currentTutorial.deleted_at}}</div>
  </form>
    
    
    <button  v-if="!this.currentTutorial.deleted_at" type="submit" class="badge badge-primary"
      @click="updateTutorial"
    >
      Actualizar
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>
<script>
import TutorialDataService from "../services/TutorialDataService";
import useVuelidate from '@vuelidate/core'
import { required, url, minLength } from '@vuelidate/validators'

export default {
  name: "tutorial",
  data() {
    return {
      v$: useVuelidate(),
      currentTutorial: null,
      message: ''
    };
  }, 
   validations() {
    return {
      currentTutorial :{
        title : { required, minLength:  minLength(4), $lazy: false},
        video_url : { url, $lazy: true},
        published_status: { required, $lazy: true},
      } 
    }
  },
  methods: {
    getTutorial(id) {
      TutorialDataService.get(id)
        .then(response => {
          this.currentTutorial = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        video_url: this.currentTutorial.video_url,
        description: this.currentTutorial.description,
        published: this.currentTutorial.published_status,
      };
      TutorialDataService.update(this.currentTutorial.id, data)
        .then(response => {
          console.log(response.data);
          this.currentTutorial.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateTutorial() {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then(response => {
          console.log(response.data);
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteTutorial() {
      this.currentTutorial.deleted_at = new Date().toLocaleDateString();
      //Setting the date on erased_at means that for us, the Tutorial is logically erased
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  
  mounted() {
    this.message = '';
    this.getTutorial(this.$route.params.id);
  }
};
</script>
<style>
.edit-form {
  max-width: 1500px;
  margin: auto;
}
</style>
