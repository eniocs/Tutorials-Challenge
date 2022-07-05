<template>
    <BaseLayout>
        <template #mainmenu>
            <MainMenu/>
        </template>
        <template #default>
            <transition
                name="slide-left"
                mode="out-in"
                >
                <router-view class="container mt-3 col-lg-6"/>
            </transition>
        </template>
    </BaseLayout>
</template>

<script>
const DEFAULT_TRANSITION = 'slide';
import MainMenu from '../components/mainmenu/Index'
import BaseLayout from '../layouts/BaseLayout.vue'
export default {
    name: 'MainLayout',
    components: {
        MainMenu,
        BaseLayout
    },
    data() {
     return {
       prevHeight: 0,
    
     };
   },
  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName;

      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      }

      this.transitionName = transitionName || DEFAULT_TRANSITION;

      next();
    });
  },
   
   
}
</script>

<style>


  .topic-left-enter {
    opacity: 0;
    transform: translateX(100%);
    }

.topic-right-enter {
    opacity: 0;
    transform: translateX(-100%);
    }

.topic-left-enter-active,
.topic-right-enter-active {
    transition: all 0.75s cubic-bezier(0.19, 1, 0.22, 1);
    }

 .slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
} 



 .slide-left-enter-active,
.slide-left-leave-active
{
  transition: all .15s ease-in-out;
}

.slide-right-leave-active ,
.slide-right-center-active {
  transition: all .15s ease-in-out;
}

.slide-left-enter-to {
  position: absolute;
  right: 0;
}

.slide-left-enter-from {
  position: absolute;
  right: -100%;
}

.slide-left-leave-to {
  position: absolute;
  left: -100%;
}

.slide-left-leave-from {
  position: absolute;
  left: 0;
}


.slide-enter-to {
  position: absolute;
  left: 0;
}

.slide-enter-from {
  position: absolute;
  left: -100%;
}

.slide-leave-to {
  position: absolute;
  right: -100%;
}

.slide-leave-from {
  position: absolute;
  right: 0;
} 



</style>