<template>
  <div class="list row">
    <div class="col-md-12">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title or description"
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
      <h4>Tutorials List</h4>
      <hr>

      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>
      <button class="mt-3 btn btn-sm btn-default btn-red" @click="removeAllTutorials">
        Eliminar todos
      </button>
    </div>
    <div class="col-md-6">
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
          <label><strong>Estado:</strong></label> {{ currentTutorial.published ? "Publicado" : "Oculto" }}
        </div>
        <router-link :to="'/tutorials/' + currentTutorial.id" class="badge badge-warning p-2">Editar</router-link>
      </div>
      <div v-else>
        <h4>&nbsp;</h4>
        <hr>
        <p class="borderstyle">Seleccione un tutorial para ver su información aqui!</p>
      </div>
    </div>
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
      TutorialDataService.findByTitle(this.title)
        .then(response => {
          this.tutorials = response.data;
          this.setActiveTutorial(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
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
  max-width: 750px;
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

</style>
