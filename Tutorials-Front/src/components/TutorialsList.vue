<template >
  <div v-if="tutorials.length">
  <div class="list row  p-4 rounded bcolor">
    
        <div class="col-md-12">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Buscar por titulo o descripción"
              v-model="title"/>
            <div class="input-group-append">
              <button class="btn btn-outline-info" type="button"
                @click="searchTitle"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-6">
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
        <div class="col-md-6 mt-lg-0 mt-md-0 mt-sm-4">
          <div v-if="currentTutorial">
            <h4>Tutorial</h4>
            
            <hr>
            <div>
              <label><strong>Titulo:</strong></label> {{ currentTutorial.title }}
            </div>
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
     <div class="border p-5 mt-5 rounded bcolor" v-else>
      <h4>No hay tutoriales aquí</h4>
      <p>Comencemos por <router-link to="/add" >Agregar</router-link> uno </p>
  </div>
</template>
<script>
import TutorialDataService from "../services/TutorialDataService";
export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
  filteredList() {
  return this.tutorials.filter((tutorial) =>
     tutorial.title.toLowerCase().includes( this.title.toLowerCase())
  )
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
      this.currentTutorial = tutorial;
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
      
      this.tutorials = this.tutorials.filter(tutorial => tutorial.title == this.title)
    }
  },
  mounted() {
    this.retrieveTutorials();
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
</style>
