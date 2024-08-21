<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue';
import type { FileUploadSelectEvent } from 'primevue/fileupload'
import PrimeFileUpload from 'primevue/fileupload'

interface Props {
  accept?: string
  extImageSrc?: string
  multiple?: boolean
}

const emit = defineEmits(['fileSelected'])
const imgSrc: Ref<string | ArrayBuffer | null> = ref('')
const isSelectedFile = ref(false)
const props = withDefaults(defineProps<Props>(), {
  accept: 'image/*',
  multiple: true
})
const onSelectedFiles = (event: FileUploadSelectEvent) => {
  if (event.files.length > 0) {
    isSelectedFile.value = true
    previewFile(event.files[0])
    emit('fileSelected', event.files[0])
  }
}

onMounted(() => {
  if(props.extImageSrc && props.extImageSrc != "") {
    imgSrc.value = props.extImageSrc
    isSelectedFile.value = true
  }
})

function clearImage() {
  imgSrc.value = ''
  isSelectedFile.value = false;
  emit('fileSelected', '')
}

function previewFile(file: File): void {
  const reader = new FileReader();
  reader.onloadend = () => {
    imgSrc.value = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    imgSrc.value = ""
  }
}
</script>

<template>
  <PrimeFileUpload
    name="files"
    @select="onSelectedFiles($event)"
    :multiple="props.multiple"
    :accept="props.accept"
  >
    <template #header="{ chooseCallback, clearCallback, files }">
      <div class="w-full flex justify-end gap-4">
        <PrimeButton @click="chooseCallback()" icon="pi pi-plus" :label="$t('labels.chooseImage')"></PrimeButton>
        <PrimeButton @click="() => { clearImage(); clearCallback() }" icon="pi pi-times" rounded outlined severity="danger" :disabled="!files || files.length === 0"></PrimeButton>
      </div>
    </template>
    <template #content>
      <div class="h-72">
        <img v-if="isSelectedFile" id="upload-img" :style="`background-image: url('${imgSrc}');`" />
  
        <div v-else class="empty-img">
          <div class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-64 mx-auto" viewBox="0 0 24 24">
              <g fill="none" stroke="#d0d7d5" stroke-width="1.5">
                <path
                  d="M2.384 13.793c-.447-3.164-.67-4.745.278-5.77C3.61 7 5.298 7 8.672 7h6.656c3.374 0 5.062 0 6.01 1.024c.947 1.024.724 2.605.278 5.769l-.422 3c-.35 2.48-.525 3.721-1.422 4.464c-.897.743-2.22.743-4.867.743h-5.81c-2.646 0-3.97 0-4.867-.743c-.897-.743-1.072-1.983-1.422-4.464z"
                />
                <path
                  d="M19.562 7a2.132 2.132 0 0 0-2.1-2.5H6.538a2.132 2.132 0 0 0-2.1 2.5M17.5 4.5c.028-.26.043-.389.043-.496a2 2 0 0 0-1.787-1.993C15.65 2 15.52 2 15.26 2H8.74c-.26 0-.391 0-.497.011a2 2 0 0 0-1.787 1.993c0 .107.014.237.043.496"
                  opacity="0.5"
                />
                <circle cx="16.5" cy="11.5" r="1.5" opacity="0.5" />
                <path
                  stroke-linecap="round"
                  d="m20 20l-2.884-2.149c-.93-.692-2.316-.761-3.34-.166l-.266.155c-.712.414-1.68.345-2.294-.164l-3.839-3.177c-.766-.634-1.995-.668-2.81-.078l-1.324.96"
                  opacity="0.5"
                />
              </g>
            </svg>
          </div>
          <span class="block text-center">{{ $t('placeholders.fileUploader') }}</span>
        </div>
      </div>
    </template>
  </PrimeFileUpload>
</template>

<style scoped>
#upload-img {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}

.p-fileupload.invalid {
  border: 1px solid red;
}
</style>
