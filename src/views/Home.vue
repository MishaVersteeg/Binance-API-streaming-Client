<template>
<div>
      <router-view></router-view>
</div>
</template>

<script>

  import createPair from '../components/CreatePair';
  import DetailPairs from '../components/DetailPairs';

  export default {
    components: {
      createPair,
      DetailPairs

    }
  }

</script>
