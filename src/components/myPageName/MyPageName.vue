<template>
  <div class="test-container">
    <pcTaobaoHeaderDevelope0></pcTaobaoHeaderDevelope0>
    <pcCarouselDevelope1></pcCarouselDevelope1>
    <pcPaddingSelectDevelope2></pcPaddingSelectDevelope2>
    <pcTitleDevelope3></pcTitleDevelope3>
    <pcTitleDevelope4></pcTitleDevelope4>
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// 组件
import pcTaobaoHeaderDevelope0 from './components/pcTaobaoHeaderDevelope0.vue'
import pcCarouselDevelope1 from './components/pcCarouselDevelope1.vue'
import pcPaddingSelectDevelope2 from './components/pcPaddingSelectDevelope2.vue'
import pcTitleDevelope3 from './components/pcTitleDevelope3.vue'
import pcTitleDevelope4 from './components/pcTitleDevelope4.vue'


export default defineComponent({
  name: 'Test',
  components: {
    pcTaobaoHeaderDevelope0,
    pcCarouselDevelope1,
    pcPaddingSelectDevelope2,
    pcTitleDevelope3,
    pcTitleDevelope4,
    
  },
  setup() {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
})
</script>
<style scoped lang="scss">
.test-container {
}
</style>
