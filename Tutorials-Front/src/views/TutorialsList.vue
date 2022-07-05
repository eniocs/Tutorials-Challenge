<template >
  <section id="main" >
  <div v-if="(tutorials.length && !searchTerms.length) ||( !filteredTutorials.length == 0 )">
    <div class="list row  p-4 rounded bcolor">
          <div class="col-md-12 searchAdapt">
            <div class="input-group mb-3"> 
              <input id="searchBox" :disabled="searchDisabled" type="text" class="form-control inactive" placeholder="Título o descripción"
                v-model="title"/>
              <div class="input-group-append">
                <button :disabled="isDisabled" v-bind:class="[ searchDisabled ? 'btn btn-outline-danger btn-md' : 'btn btn-outline-info' ]" type="button" 
                  @click="searchTitle"
                >
                  <span v-if="!searchDisabled"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></span> <span v-if="searchDisabled"> <font-awesome-icon icon="fa-solid fa-xmark" /> </span>
                </button>
              </div>
            </div>
            <small class="text-danger validatorAlert" v-if="v$.title.minLength.$invalid">* La busqueda debe contener al menos 3 caracteres</small>
            
          </div>
          <div class="col-md-6 mt-2" style="order:3">
            <h4>Tutoriales</h4>
            <hr>
            <ul class="list-group"> 
              <li class="list-group-item"  
                :class="{ active: index == currentIndex }"
                v-for="(tutorial, index) in filteredList()"
                :key="index"
                @click="setActiveTutorial(tutorial, index)"
                href="#top" v-smooth-scroll>
                <span>{{ tutorial.title }} </span><span class="float-right text-danger">{{ !tutorial.deleted_at ? ' ' : "Deleted" }} </span>
              </li>
            </ul>
            <button class="mt-3 btn btn-md btn-default btn-red float-right" @click="removeAllTutorials">
              Eliminar todos
            </button>
          </div>
          <div class="col-md-6 mt-lg-2 mt-md-2 mt-sm-4 preview" >
            <transition
                name="fade"
                mode="out-in"
                @beforeLeave="beforeLeave"
                @enter="enter"
                @afterEnter="afterEnter"
              >
              <div v-if="currentTutorial">
                <h4>Tutorial</h4>
                
                <hr class="adapt">
                <div>
                  <label><strong>Titulo:</strong></label> {{ currentTutorial.title }}
                </div>
                  <img :src="currentTutorial.video_thumb" alt="" class="w-100"> 
                <div>
                  <label><strong>Descripción:</strong></label>  <div class="description"><current-tutorial-description> <span v-if="currentTutorial.description">{{currentTutorial.description}}</span></current-tutorial-description></div> 

                </div>
                <div>
                  <label><strong>Estado:</strong></label> {{ currentTutorial.published_status ? "Publicado" : "Oculto" }}
                </div>
                <router-link :to="'/tutorials/' + currentTutorial.id" class="btn btn-warning btn-md float-right">Editar</router-link>
              </div>            
            <div v-else>
              <h4 class="adapt">&nbsp;</h4>
              <hr class="adapt">
              <p class="borderstyle">Seleccione un tutorial para ver su información aqui!</p>
            </div>
         </transition>
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
  </section>
</template>
<script>
import CurrentTutorialDescription from "../components/currenttutorialDescription/Index"
import TutorialDataService from "../services/TutorialDataService";
import useVuelidate from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
export default {
  name: "tutorials-list",
  components :{
    CurrentTutorialDescription,

  },
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
      prevHeight: 0,
    };
  },
  validations() {
    return {
      title :{ required, minLength:  minLength(3), $lazy: false }
    }
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);
      element.style.height = this.prevHeight;
      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = 'auto';
    },
  
    filteredList() {
      this.filteredTutorials = this.tutorials.filter((tutorial) =>
            (tutorial.title.toLowerCase().includes( this.title.toLowerCase()) //Filter using Title
        ||  tutorial.description.toLowerCase().includes( this.searchTerms.toLowerCase())) // Filter using Description
        &&  tutorial.deleted_at == null // Logically hide the deleted tutorials if it has not deleted_at date.
            )
      return this.filteredTutorials;
    },
    async retrieveTutorials() {
      this.$store.dispatch('DoLoadingM') //Loading State Start
      await TutorialDataService.getAll()
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
          //setTimeout(() => { this.$store.dispatch('NotLoadingM') },3000) ; //for testing Loading Layout spinner  ?
          this.$store.dispatch('NotLoadingM') 
        })
        .catch(e => {
          console.log(e);
          this.$store.dispatch('NotLoadingM')
        });
        
        
    },
    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },
    setActiveTutorial(tutorial, index) {
      this.currentTutorial = null;
      this.currentTutorial = tutorial;
      this.currentTutorial.video_thumb = "https://img.youtube.com/vi/" + this.youtube_parser(this.currentTutorial.video_url) +"/hqdefault.jpg";
      this.currentIndex = tutorial ? index : -1;
      this.$smoothScroll({
  scrollTo: "top"})
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
    }
  },
  mounted() {
    this.retrieveTutorials();
  },
  computed: {
    isDisabled: function(){
        //enables the Submit button only if there is a valid title or pulish_status selection 
        return this.title == null || this.v$.title.required.$invalid  || this.v$.title.minLength.$invalid;
    }
  },
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

.preview{
  order: 5;
}
.searchAdapt{
  order:2;
}

.description {
      width: 100%;
      height: 18vh;
      
      overflow-y: scroll;
}

@media only screen and (max-width: 766px) {
 .preview{
  order: 2;
}
.searchAdapt{
  order:1;
}
.adapt{    
  position: absolute;
}
}

.description {
      width: 100%;
      max-height: 30vh;
      
      overflow-y: scroll;
}

 .fade-enter-active,
 .fade-leave-active {
   transition-duration: 0.3s;
  transition-property: opacity;
  transition-property: height, opacity;
   transition-timing-function: ease;
  overflow: hidden;
 }

</style>
