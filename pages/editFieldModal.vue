<script setup lang="ts">
import PrimaryOrangeButton from '~/shaared/ui/buttons/PrimaryOrangeButton.vue'

import IcEmailEdit from '~/icons/IcEmailEdit.vue'
import IcPhoneEdit from '~/icons/IcPhoneEdit.vue'
import IcTelegramEdit from '~/icons/IcTelegramEdit.vue'
import BottomSheetBottomBar from '~/shaared/ui/BottomSheetBottomBar.vue'
import ErrorModal from '~/features/ErrorModal.vue'

import VueQrcode from 'vue-qrcode'

import { useUserInfo } from '~/stores/userInfo'
import IcBack from '~/icons/IcBack.vue'

const userInfoStore = useUserInfo()

const props = defineProps<{
  field: 'phoneNumber' | 'email' | 'telegramId'
  value?: string | number | null
  part?: 1 | 2
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'forcedClose'): void
}>()

const telegramLink = `https://t.me/FlowTripsBot?start=${localStorage.getItem('userId')}`

const fieldLabelMap = {
  phoneNumber: 'Телефон',
  email: 'Email',
  telegramId: 'Telegram',
}

const iconMap = {
  phoneNumber: IcPhoneEdit,
  email: IcEmailEdit,
  telegramId: IcTelegramEdit,
}

const editingLabel = computed(() => fieldLabelMap[props.field])
const editingValue = computed(() => {
  return props.value === null || props.value === undefined || props.value === ''
    ? 'Не указано'
    : String(props.value)
})

const CurrentIcon = computed(() => iconMap[props.field] || null)

const inputText = ref<string>('')

const part = ref<1 | 2>(props.part || 1)

const isErrorModalOpen = ref<boolean>(false)
const errorMessage = ref<string>('')

const openErrorModal = () => (isErrorModalOpen.value = true)
const closeErrorModal = () => (isErrorModalOpen.value = false)

const submit = async () => {
  try {
    const updatedValue = inputText.value

    await userInfoStore.updateUserInfo({
      [props.field]: updatedValue,
    })

    await userInfoStore.getUserInfo()

    emit('close')
  } catch (error) {
    errorMessage.value = 'Не удалось обновить данные. Попробуйте снова.'
    openErrorModal()
  }
}
</script>

<template>
  <div
    class="py-6 px-4 bg-(--primary-white-bg) dark:bg-(--primary-black-bg) flex flex-col h-full justify-between"
  >
    <div class="w-full">
      <div class="flex gap-[10px] pb-[15px] items-center">
        <IcBack
          class="cursor-pointer"
          @click="props.part === 2 ? emit('close') : part === 1 ? emit('close') : (part = 1)"
        />
        <h2 class="text-lg dark:text-(--primary-white) font-semibold">
          {{
            part === 1
              ? editingLabel
              : part === 2 && editingLabel.toLowerCase() === 'telegram'
                ? 'Привязка telegram'
                : ''
          }}
        </h2>
      </div>
    </div>
    <div v-show="part === 1">
      <component :is="CurrentIcon" v-if="CurrentIcon" class="mx-auto mb-4" />
      <p
        class="text-center mb-[10px] text-sm text-(--color-text) dark:text-(--primary-white) font-semibold"
      >
        {{ editingValue }}
      </p>
      <p class="text-center mb-[35px] text-[16px] text-(--primary-gray-icon)">
        Ваш {{ editingLabel.toLowerCase() }}, привязанный к Flow
      </p>
      <div class="flex items-center justify-center w-fit max-w-full mx-auto">
        <PrimaryOrangeButton class="py-[10.5px] px-[30px] rounded-(--radius-xl)" @click="part = 2">
          Изменить {{ editingLabel.toLowerCase() }}
        </PrimaryOrangeButton>
      </div>
    </div>
    <div v-show="part === 2 && editingLabel.toLowerCase() !== 'telegram'">
      <component :is="CurrentIcon" v-if="CurrentIcon" class="mx-auto mb-4 w-[70px] h-[144px]" />
      <p
        class="text-center mb-[10px] text-xl text-(--color-text) dark:text-(--primary-white) font-bold leading-6"
      >
        Введите ваш новый {{ editingLabel.toLowerCase() }}
      </p>
      <input
        v-model="inputText"
        :type="
          editingLabel.toLowerCase() === 'телефон'
            ? 'number'
            : editingLabel.toLowerCase() === 'email'
              ? 'email'
              : 'text'
        "
        :placeholder="
          editingLabel.toLowerCase() === 'телефон'
            ? '+7 (999) 999-99-99'
            : editingLabel.toLowerCase() === 'email'
              ? 'your@email.com'
              : editingLabel.toLowerCase() === 'telegram'
                ? 'username'
                : ''
        "
        class="no-spinner mt-[30px] text-sm text-center text-(--color-black) dark:text-(--primary-white) outline-none caret-(--primary-orange) py-[18px] px-[15px] rounded-2xl bg-(--primary-white) dark:bg-(--secondary-black-bg) w-full"
      />
      <BottomSheetBottomBar>
        <PrimaryOrangeButton class="px-[15px] py-3" :disabled="inputText === ''" @click="submit">
          Продолжить
        </PrimaryOrangeButton>
      </BottomSheetBottomBar>
      <ErrorModal
        :is-open="isErrorModalOpen"
        :message="errorMessage"
        button-text="OK"
        @on-click="closeErrorModal"
      />
    </div>
    <div v-show="part === 2 && editingLabel.toLowerCase() === 'telegram'">
      <div class="flex flex-col gap-[30px] items-center justify-center">
        <vue-qrcode
          :type="'image/webp'"
          :value="telegramLink"
          :width="200"
          :color="{ dark: '#353A40', light: '#00000000' }"
        />
        <div class="space-y-1.5">
          <p class="text-center text-(--color-text) dark:text-(--primary-white) font-bold">
            Отсканируйте QR код
          </p>
          <p class="text-center text-(--primary-light-gray) font-semibold">
            или перейдите <a :href="telegramLink" class="text-(--primary-orange)">по ссылке</a>
          </p>
        </div>
      </div>
    </div>
    <footer class="h-20" />
  </div>
</template>

<style>
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.no-spinner {
  -moz-appearance: textfield;
}
</style>
