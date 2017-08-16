<template>
  <div>
    <div class="left-menu">
      <left-menu></left-menu>
    </div>
    <div class="body">
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
    </div>
  </div>
</template>

<script>
  import env from "@/env";
  import leftMenu from "@/components/common/left.menu";
  import {mapGetters, mapActions} from 'vuex';
  export default {
    components: {
      leftMenu
    },
    data(){
      return {};
    },
    mounted () {
      let self = this;
      self.dtId = self.$route.query.dtId;
      self.type = self.$route.query.type;
      self.dataId = self.$route.query.dataId;
      console.log(self.$route.query);
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
