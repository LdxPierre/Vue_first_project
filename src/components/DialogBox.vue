<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  title?: string,
  message?: string,
  success?: string,
  show: boolean
}
interface Emits {
  (e: 'closeDialog'): void,
  (e: 'success'): void
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const boxRef = ref<null | HTMLElement>()
</script>

<template>
  <Teleport to="body">
    <Transition name="calc">
      <div class="calc" @click="emits('closeDialog')" v-if="show"></div>
    </Transition>
    <Transition name="modal">
      <div class="modal" ref="boxRef" v-if="show">
        <div class="header">
          <h6>{{ props.title }}</h6>
          <button @click="emits('closeDialog')" class="closeToggle">
            <span class="material-symbols-outlined">
              close
            </span>
          </button>
        </div>
        <div class="body">
          <slot name="message">
            {{ props.message }}
          </slot>
        </div>
        <div class="footer">
          <button @click="emits('closeDialog')" class="cancel">Nope</button>
          <slot name="success">
            <button type="button" @click="emits('success')" class="confirm">{{ props.success ?? 'Valider' }}</button>
          </slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
@use '../assets/css/media-queries' as mq;
@import '../assets/css/variables';
@import '../assets/css/components/modalBox.scss';
</style>