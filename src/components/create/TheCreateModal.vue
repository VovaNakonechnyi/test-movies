<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useOMDBStore } from '@/store/omdb/index'
import { v4 as uuidv4 } from 'uuid'

import type { FormInstance, FormRules, UploadProps, UploadUserFile } from 'element-plus'

import { ElMessageBox } from 'element-plus'
import type { CreatedOMDBItem } from '@/interfaces/stores/omdb-store.int'

interface RuleForm {
  title: string
  year: number
  director: string
  image: UploadUserFile[]
}
interface Props {
  modelValue: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', visible: boolean): void
}>()

const { addCreatedMovie } = useOMDBStore()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  title: '',
  year: 0,
  director: '',
  image: []
})

const rules = reactive<FormRules<RuleForm>>({
  title: [
    { required: true, message: 'Title is required!', trigger: 'blur' },
    { min: 2, message: 'Length should be min 2 characters', trigger: 'change' }
  ],
  year: [
    { required: true, message: 'Year is required!', trigger: 'change' },
    { len: 4, message: 'Length should be 4 characters', trigger: 'change' }
  ],
  director: [
    { required: true, message: 'Director is required!', trigger: 'blur' },
    { min: 2, message: 'Length should be min 2 characters', trigger: 'change' }
  ],
  image: [{ type: 'array', required: true, message: 'Image is required!', trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (!valid) return
    console.log()
    const img = await createImg(ruleForm.image[0].raw)
    const res: CreatedOMDBItem = reactive({
      ImdbID: uuidv4(),
      Title: ruleForm.title,
      Year: ruleForm.year.toString(),
      Director: ruleForm.director,
      Poster: img as string
    })
    addCreatedMovie(res)

    ruleForm.director = ''
    ruleForm.image = []
    ruleForm.title = ''
    ruleForm.year = 0
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile) =>
  ElMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ?`).then(
    () => true,
    () => false
  )

const createImg = async (f: File | undefined) => {
  if (!f) return
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(f)
  })
}
</script>
<template>
  <el-dialog
    class="el-dialog"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    title="Create movie"
    width="95%"
    align-center
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      :size="formSize"
      status-icon
    >
      <el-form-item label="Title" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item label="Year" prop="year">
        <el-input type="number" v-model="ruleForm.year" />
      </el-form-item>
      <el-form-item label="Director" prop="director">
        <el-input v-model="ruleForm.director" />
      </el-form-item>
      <el-form-item label="Image" prop="image">
        <el-upload
          v-model:file-list="ruleForm.image"
          :limit="1"
          :auto-upload="false"
          :before-remove="beforeRemove"
        >
          <el-button type="primary">Click to upload</el-button>
          <template #tip>
            <div>jpg/png files</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item class="form-item-cust" size="small">
        <el-button type="primary" @click="submitForm(ruleFormRef)"> Create </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<style lang="scss" scoped></style>
