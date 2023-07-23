<script setup lang="ts"></script>

<template>
  <div class="h-100 d-flex justify-content-center align-items-center">
    <span class="material-symbols-outlined">
      progress_activity
    </span>
  </div>
</template>

<style scoped lang="scss">
.material-symbols-outlined {
  animation: spinningAnim 1s linear infinite;
  font-size: 50px;
  color: var(--primary);

  @keyframes spinningAnim {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
}
</style>