<template>
  <div>
    <v-text-field label="Select File/Image"
                  @click='pickFile'
                  v-model='fileName'
                  prepend-icon='attach_file'></v-text-field>
    <input
      type="file"
      style="display: none"
      ref="file"
      accept="image/*"
      @change="onFilePicked"
    >
  </div>
</template>

<script>
  export default {
    data () {
      return {
        fileName: '',
        fileUrl: '',
        fileData: '',
        fileChanged: false
      }
    },
    methods: {
      pickFile () {
        this.$refs.file.click()
      },
      onFilePicked (e) {
        const files = e.target.files
        if (files[0] !== undefined) {
          this.fileName = files[0].name
          if (this.fileName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.fileUrl = fr.result
            this.fileData = files[0] // this is an image file that can be sent to server...
            this.fileChanged = true
            this.$emit('updateFileModel', this.fileData, this.fileChanged)
          })
        } else {
          this.fileName = ''
          this.fileUrl = ''
          this.fileData = ''
        }
      }
    }
  }
</script>
