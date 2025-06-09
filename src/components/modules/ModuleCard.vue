<template>
  <div>
    <div class="p-6 grid grid-cols-2 gap-2">
      <h1 class="text-xl font-bold flex items-center gap-2 text-dark-blue-text">
        <component :is="icon" class="w-6 h-6" />
        {{ title }}
      </h1>

      <h2 class="text-lg font-semibold uppercase text-dark-blue-text">Modules</h2>
    </div>

    <div class="p-6 grid grid-cols-4 gap-6">
      <div
        v-for="(item, i) in modules"
        :key="i"
        class="group w-64 h-48 relative [transform-style:preserve-3d] [perspective:1000px]"
      >
        <div
          class="absolute inset-0 flex items-center justify-center bg-white rounded-lg transition-transform duration-500 group-hover:rotate-y-180 [backface-visibility:hidden]"
        >
          <div class="flex flex-col items-center gap-2 px-4 text-center">
            <img :src="item.img" alt="icon" class="w-12 h-12 mb-2 object-contain" />

            <p class="text-md font-semibold text-gray-800">
              {{ item.text.before }}
            </p>
          </div>
        </div>

        <div
          class="absolute inset-0 overflow-hidden bg-white rounded-lg transition-transform duration-500 rotate-y-180 group-hover:rotate-y-0 [backface-visibility:hidden] flex items-center justify-center"
        >
          <div class="relative w-full h-full">
            <img :src="topImg" alt="Top Image" class="absolute max-h-64 top-0 left-0" />

            <ul
              class="text-sm text-gray-700 w-full h-full flex justify-center items-center flex-col gap-2 p-5 text-center z-10"
            >
              <li v-for="(line, index) in item.text.after" :key="index">
                {{ line }}
              </li>
            </ul>

            <img :src="bottomImg" alt="Bottom Image" class="absolute max-h-52 bottom-0 right-0" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  icon: Object,
  topImg: [String, Object],
  bottomImg: [String, Object],
  modules: Array,
})
</script>
