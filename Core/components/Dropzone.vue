<template>
  <div class="dropzone-block" v-if="user">
    <div class="widget--subtitle"></div>
    <ul class="dropzone_list">
      <li v-for="img in list">
        <i class="fas fa-file-import"></i>
        {{ img.name }}
      </li>
    </ul>
    <div class="dropzone_block">
      <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-error="onError"/>
    </div>
    <div class="widget--tip widget--tip__small">{{ filesize_text }}</div>
  </div>
</template>
<script> 
import vue2Dropzone from "vue2-dropzone";
import Api from '../services/Api.js'

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  props: ['user'],
  data: function() {
    return {
      list: [],
      filesize_text: "Максимальный размер загружаемого файла: 5 МВ",
      dropzoneOptions: {
        url: `/api/doctor/${this.user.doctor_id}/file`,
        maxFilesize: 5,
        _self: this,
        autoDiscover: false,
        thumbnailWidth: 150,
        headers: {
          "X-CSRF-TOKEN": document
            .querySelector('[name="csrf-token"]')
            .getAttribute("content")
        },
        dictDefaultMessage:
          "<img src='/img/upload.svg'></br>\n\
                    <span class='dropzone_text'>Перетащите сюда файл</span>\n\
                    <div class='dropzone_separator'><span>или нажмите</span></div>\n\
                    <div class='btn btn--primary'>Загрузить <i class='fas fa-arrow-circle-up'></i></div>"
      }
    };
  },
  watch: {
    id: function(val) {
      this.$refs.myVueDropzone.setOption("url", `/api/doctor/${val}/file`);
      this.getFiles();
    }
  },
  computed: {
    id: function() {
      return this.user.doctor_id;
    }
  },
  mounted: function() {
    if (this.user.doctor_id) {
      this.getFiles();
    }
  },
  methods: {
    onError(file, response) {
      if (response.includes("File is too big")) {
        this.filesize_text = "Загрузите файл меньшего размера";
      } else {
        this.filesize_text = response;
      }
    },
    getFiles() {
      Api().get("/doctor/" + this.user.doctor_id + "/files").then(res => {
        this.list = res.data.data;
      });
    }
  }
};
</script>