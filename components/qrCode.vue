<script setup>

import {ColorPicker} from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import {UploadOutlined} from "@ant-design/icons-vue";

const userInput = ref("");
const size = ref(128);
const image = ref(false);
const colourFull = ref(false);
const pureColor = ref("black");
const gradientColor = ref("");
const fileList = ref([]);
const imageURL = ref("https://www.antdv.com/assets/logo.1ef800a8.svg");
const segmentedData = ['L', 'M', 'Q', 'H'];
const level = ref(segmentedData[0]);
const typeData= ['canvas','svg'];
const type = ref(typeData[0]);
const qrcodeCanvasRef = ref();


const uploadImage = (file) => {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/jpg'];
  if (validFileTypes.includes(file.type)) {
    fileList.value = [file];
    imageURL.value = URL.createObjectURL(file);
  } else {
    message.error("Please upload a valid image file (SVG, PNG, JPG, JPEG)");
    return false;
  }
};



const increase = () => {
  if (size.value >= 250) return;
  size.value = size.value + 10;
};

const decline = () => {
  if (size.value <= 100) return;
  size.value = size.value - 10;
};

const handleChange = info => {
  if (info.file.status === 'done') {
    message.success(` file uploaded`);
  } else if (info.file.status === 'error') {
    message.error(` file uploaded`);
  }
};

const dowloadChange = async () => {
  let url;
  const a = document.createElement("a");

  if (type.value === 'svg') {
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(qrcodeCanvasRef.value.$el);
    const blob = new Blob([svgStr], {type: 'image/svg+xml'});
    url = URL.createObjectURL(blob);
    a.download = 'QRCode.svg';
  } else {
    url = await qrcodeCanvasRef.value.toDataURL('image/png', 1.0);
    a.download = 'QRCode.png';
  }
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
</script>

<template>
  <div>
    <a-card>
      <div>
        <h1 style="margin-bottom: 0px">QR Code Generator</h1>
        <p style="margin-top: 0px; margin-bottom: 20px;">Generate QR code with any style you want</p>
      </div>
      <div class="marginBottom">
        <h3 style="margin-bottom: 0">
          Options:
        </h3>
        <a-checkbox v-model:checked="image">Show image</a-checkbox>
        <a-checkbox v-model:checked="colourFull">Custom color</a-checkbox>
      </div>
      <div class="marginBottom">
        <h3 style="margin-bottom: 0">
          Error level:
        </h3>
        <a-segmented v-model:value="level" :options="segmentedData" />
      </div>
      <div class="marginBottom">
        <h3 style="margin-bottom: 0">
          Type:
        </h3>
        <a-segmented v-model:value="type" :options="typeData" />
      </div>
      <div v-if="colourFull" class="marginBottom">
        <h3 style="margin-bottom: 0">
          Color:
        </h3>
        <color-picker v-model:pureColor="pureColor" v-model:gradientColor="gradientColor"/>
      </div>
      <div v-if="image" class="marginBottom">
        <h3 style="margin-bottom: 0">
          Upload:
        </h3>
        <a-tooltip placement="right">
          <template #title>
            <span>Please upload just <br> images(SVG preferred)</span>
          </template>
        <a-upload
            :maxCount="1"
            :before-upload="uploadImage"
            :file-list="fileList"
            :showUploadList="false"
            accept="image/png, image/jpeg, image/jpg, image/svg+xml"
            @change="handleChange"
        >
          <a-button :icon="h(UploadOutlined)">Click to Upload</a-button>
        </a-upload>
        </a-tooltip>
      </div>
      <div>
      <h3 style="margin-bottom: 0">
        Size:
      </h3>
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
      </div>

      <div class="marginBottom">
        <h3 style="margin-bottom: 0">
          Text:
        </h3>
      <a-input v-model:value="userInput" placeholder="Enter the text " :maxlength="60" style="width: 50%"/>
      </div>

      <div class="marginBottom">
        <h3 style="margin-bottom: 5px">
          Our Magic 🪄:
        </h3>
        <a-space direction="vertical" align="center">
          <a-qrcode  ref="qrcodeCanvasRef" v-if="!image" :value="userInput" :size="size" :color="pureColor" :error-level="level" :type="type"/>
          <a-qrcode  ref="qrcodeCanvasRef" v-if="image" :value="userInput" :size="size" :icon-size="size / 4" :error-level="level" :icon="imageURL" :color="pureColor" :type="type"/>
        </a-space>
      </div>
      <div>
        <a-button type="primary" @click="dowloadChange">Downlaod</a-button>
      </div>
    </a-card>
  </div>
</template>

<style scoped>
.marginBottom {
  margin-bottom: 20px;
}
.marginTop{
  margin-top: 20px;
}
</style>