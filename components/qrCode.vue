<script setup>

const userInput = ref("");
const size = ref(128);
const image = ref(false);
const colourFull = ref(false);

const increase = () => {
  if (size.value >= 250) return;
  size.value = size.value + 10;
};

const decline = () => {
  if (size.value <= 100) return;
  size.value = size.value - 10;
};

</script>

<template>
  <div>

    <a-card>
      <div>
        <h1>QR Code Generator</h1>
        <p>Generate QR code with custom size</p>
      </div>
      <div style="margin-bottom: 20px">
        <a-checkbox v-model:checked="image">Show image</a-checkbox>
        <a-checkbox v-model:checked="colourFull">Custom color</a-checkbox>
      </div>
      <a-button-group>
        <a-button @click="decline">
          <template #icon><MinusOutlined /></template>
          small
        </a-button>
        <a-button @click="increase">
          <template #icon><PlusOutlined /></template>
          large
        </a-button>
      </a-button-group>
      <br />
      <br />
      <a-space direction="vertical" align="center">
        <a-input v-model:value="userInput" placeholder="Enter the text " :maxlength="60" />
        <a-qrcode :value="userInput" :size="size" />
      </a-space>
    </a-card>
  </div>
</template>

<style scoped>

</style>