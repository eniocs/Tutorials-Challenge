<template>
  <div class="text-left align-middle" @closed="v$.$reset()">
    <div v-if="!submitted" class="border p-4 rounded bcolor" >
        <h5 class="text-dark">Nuevo tutorial</h5>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="title">Titulo</label>
              <input
                type="text"
                class="form-control"
                id="title"
                required
                v-model="v$.tutorial.title.$model"
                name="title"
              />
              <small class="text-danger" v-if="v$.tutorial.title.required.$invalid">* Ingrese un título</small>
              <small class="text-danger" v-if="v$.tutorial.title.minLength.$invalid">* El titulo debe contener mas de cuatro caracteres</small>
            </div>
            <div class="form-group">
              <label for="video_url">Video URL</label>
              <input
                type="url"
                class="form-control"
                id="video_url"
                v-model="v$.tutorial.video_url.$model"
                name="video_url"
              />
              <small class="text-danger" v-if="v$.tutorial.video_url.url.$invalid">* URL incorrecta</small>
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
              <div>
                <input class="m-1 mb-0" type="radio" id="tutorial.published_status_false" value="false" v-model="v$.tutorial.published_status.$model">
                <label class="m-1 mb-0" for="uno"> Oculto </label>
                <input class="m-1 mb-0" type="radio" id="tutorial.published_status_true" value="true" v-model="v$.tutorial.published_status.$model">
                <label class="m-1 mb-0" for="Dos"> Público </label>
              </div>
              <small class="text-danger" v-if="!v$.tutorial.published_status.required.$response">* Seleccionar estado</small>
            </div>
            <button @click="saveTutorial" class="btn btn-info btn-md float-right fix-btn" :disabled="isDisabled">Guardar</button>
        </form>
    </div>
    <div class="border p-5 mt-5 rounded bcolor" v-else>
      <h4>El tutorial se agregó correctamente!</h4>
      <button class="btn btn-success btn-md" @click="newTutorial">Agregar otro tutorial</button>
    </div>
  </div>
</template>
<script>
import TutorialDataService from "../services/TutorialDataService";
import jwtService from "../services/jwtService";
import useVuelidate from '@vuelidate/core'
import { required, url, minLength } from '@vuelidate/validators'
export default {
  name: "add-tutorial",
  data() {
    return {
      v$: useVuelidate(),
      alloiswsubmit: false,
      tutorial: {
        id: null,
        video_url:"",
        title: null,
        description: "",
        published_status: null,
        deleted_at: null,
        token: jwtService.create(), //creates the timestamp for later use in backend
      },
      submitted: false,
      toggle_status : true
    };
  },
  validations() {
    return {
      tutorial :{
        title : { required, minLength:  minLength(4), $lazy: false},
        video_url : { url, $lazy: true},
        published_status: { required, $lazy: true},
        
      } 
    }
  },
  methods: {
  saveTutorial() {          
      var data = {
        title: this.tutorial.title,
        video_url: this.tutorial.video_url,
        description: this.tutorial.description,
        published_status: this.tutorial.published_status,
        deleted_at: this.tutorial.deleted_at,
        token :  this.tutorial.token,
      };
      TutorialDataService.create(data)
        .then(response => {
          this.tutorial.id = response.data.id;
          //console.log(response);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
          confirm("Error "+e.response.status+": "+e.response.statusText +"!!!")
          this.$router.push("/");
        });
    },
    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
      this.tutorial.token = jwtService.create();
      
    }
  }, 
  computed: {
    isDisabled: function(){
        //enables the Submit button only if there is a valid title or pulish_status selection 
        return this.tutorial.title == null || this.tutorial.published_status == null || this.v$.tutorial.title.required.$invalid  || this.v$.tutorial.title.minLength.$invalid;
    }
  },
};
</script>
<style>
.submit-form {
  max-width: 1500px;
  margin: auto;
}

.bcolor{
  background: rgba(255, 255, 255, 0.48);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(11.5px);
-webkit-backdrop-filter: blur(11.5px);
border: 1px solid rgba(255, 255, 255, 0.41);
}

.fix-btn{
margin-top: -33px;

}
</style>



