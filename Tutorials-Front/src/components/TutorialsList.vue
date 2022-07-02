<template >
  <div>
  <div v-if="(tutorials.length && !searchTerms.length) ||( !filteredTutorials.length == 0 )">
    <div class="list row  p-4 rounded bcolor">
          <div class="col-md-12">
            <div class="input-group mb-3">
              <input id="searchBox" :disabled="searchDisabled" type="text" class="form-control" placeholder="Buscar por titulo o descripción"
                v-model="title" v-on:keyup.enter="searchTitle"/>
              <div class="input-group-append">
                <button v-bind:class="[ searchDisabled ? 'btn btn-outline-danger' : 'btn btn-outline-info' ]" type="button" 
                  @click="searchTitle"
                >
                  <span v-if="!searchDisabled">Search</span> <span v-if="searchDisabled"> x </span>
                </button>
              </div>
            </div>
            <small class="text-danger validatorAlert" v-if="v$.title.minLength.$invalid">* La busqueda debe contener mas de cuatro caracteres</small>
          </div>
          <div class="col-md-6 mt-2">
            <h4>Tutoriales</h4>
            <hr>
            <ul class="list-group"> 
              <li class="list-group-item"
                :class="{ active: index == currentIndex }"
                v-for="(tutorial, index) in filteredList()"
                :key="index"
                @click="setActiveTutorial(tutorial, index)"
              >
                <span>{{ tutorial.title }} </span><span class="float-right text-danger">{{ !tutorial.deleted_at ? ' ' : "Deleted" }} </span>
              </li>
            </ul>
            <button class="mt-3 btn btn-sm btn-default btn-red" @click="removeAllTutorials">
              Eliminar todos
            </button>
          </div>
          <div class="col-md-6 mt-lg-2 mt-md-2 mt-sm-4">
            <div v-if="currentTutorial">
              <h4>Tutorial</h4>
              
              <hr>
              <div>
                <label><strong>Titulo:</strong></label> {{ currentTutorial.title }}
              </div>
                <img :src="currentTutorial.video_thumb" alt="" class="w-100"> 
              <div>
                <label><strong>Descripción:</strong></label> {{ currentTutorial.description }}
              </div>
              <div>
                <label><strong>Estado:</strong></label> {{ currentTutorial.published_status ? "Publicado" : "Oculto" }}
              </div>
              <router-link :to="'/tutorials/' + currentTutorial.id" class="badge badge-warning  p-2 pl-4 pr-4">Editar</router-link>
            </div>
            <div v-else>
              <h4>&nbsp;</h4>
              <hr>
              <p class="borderstyle">Seleccione un tutorial para ver su información aqui!</p>
            </div>
          </div>
      </div>
    </div>  
    <div  v-if="!tutorials.length" class="border p-5 mt-5 rounded bcolor">
        <h4>No hay tutoriales aquí</h4>
        <p>Comencemos por <router-link to="/add" >Agregar</router-link> uno </p>
    </div>
    <div  v-if="!filteredTutorials.length && searchTerms.length" class="border p-5 mt-5 rounded bcolor">
        <h4>No se encontraron tutoriales con el titulo"{{this.title}}"</h4>
        <a  @click="searchTitle" class="text-primary"><strong> Mostrar todos </strong></a>
    </div>
  </div>
</template>
<script>
import TutorialDataService from "../services/TutorialDataService";
import useVuelidate from '@vuelidate/core'
import { minLength } from '@vuelidate/validators'
export default {
  name: "tutorials-list",
  data() {
    return {
      v$: useVuelidate(),
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
      searchTerms:"",
      searchDisabled :false,
      filteredTutorials:[],
    };
  },
  validations() {
    return {
      title :{ minLength:  minLength(4), $lazy: false}
    }
  },
  methods: {
  filteredList() {
    this.filteredTutorials = this.tutorials.filter((tutorial) =>
          tutorial.title.toLowerCase().includes( this.title.toLowerCase()) //Filter using Title
      ||  tutorial.description.toLowerCase().includes( this.searchTerms.toLowerCase()) // Filter using Description
      &&  tutorial.deleted_at == null // Logically hide the deleted tutorials if it has not deleted_at date.
  )
    return this.filteredTutorials;
 
},
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },
    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;//-----------------------------
      this.currentTutorial.video_thumb = "https://img.youtube.com/vi/" + this.youtube_parser(this.currentTutorial.video_url) +"/hqdefault.jpg";
      this.currentIndex = tutorial ? index : -1;
    },
    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    searchTitle() {
      this.currentIndex=-1; //Deselects current tutorial
      this.currentTutorial = null; // Also removes the current tutorial preview
      this.searchTerms = this.title;
      this.searchDisabled = !this.searchDisabled; //Enables/Disables search button 
      if (!this.searchDisabled) {this.searchTerms = ""; this.title = "";}
      //this.tutorials = this.tutorials.filter(tutorial => tutorial.title == this.title)
    },
    youtube_parser(url){   
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    },
    getVideoThumbs(){

      this.tutorials.forEach(function (element) {
          element.Active = "false";
        });
      console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    }

  },
  mounted() {
    this.retrieveTutorials();
        this.getVideoThumbs();

  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 1500px;
  margin: auto;
}

.borderstyle{

  border-left: 4px solid #17a2b8;
  padding: 5px;
}

.btn-red{
  border-color: #d43f3a;
  color: #d43f3a;
}

.bcolor{
  background-color: #f5f5f5;
}

.validatorAlert{
  position: absolute;
  margin-top: -15px;

}
</style>
