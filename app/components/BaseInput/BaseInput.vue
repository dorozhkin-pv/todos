<template>
    <input type="text" :value="innerValue" 
           @input="innerValue = $event.target.value" 
           @blur="handlerBlur"
           @keyup.esc="handlerKeyupEsc"
           @keyup.enter="handlerKeyupEnter">
</template>

<script>
  import defaultProps from './BaseInputDefaultProps.js';

  const props = defaultProps;

  export default {
    name: "BaseInput",

    props,

    data() {
      return {
        innerValue: this.value
      };
    },
    
    methods: {
      handlerBlur(){
        this.$emit('blur', this.innerValue);
      },
      handlerKeyupEsc(){      
        this.$emit('keyup:esc', this.innerValue);
      },
      handlerKeyupEnter(){
        this.$emit('keyup:enter', this.innerValue);
      },
      refreshInnerValue(){
        this.innerValue = this.value;
      },
      resetInnerValue(){
        this.innerValue = '';
      }
    }
  }
</script>

<style scoped>

</style>