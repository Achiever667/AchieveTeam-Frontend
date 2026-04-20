<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Welcome Back'
  },
  description: {
    type: String,
    default: 'Enter your email address and password to access your account.'
  }
});
</script>

<template>
  <div class="flex min-h-screen font-sans bg-white">
    <div class="hidden lg:flex lg:w-1/2 bg-[#F3E8FF] p-12 flex-col justify-between items-center">
      <div class="w-full flex items-center space-x-3">
        <img src="../../assets/logo.png" alt="Logo" class="h-14 w-auto" />
      </div>

      <div class="w-full max-w-lg">
        <img 
          src="../../assets/hero.png" 
          alt="Team Members" 
          class="rounded-[2.5rem] shadow-sm w-full object-cover"
        />
      </div>

      <div class="text-center">
        <h2 class="text-[#4C1D95] text-2xl font-bold">Team Achieve</h2>
        <p class="text-gray-600 mt-2 font-medium">
          Your perfect solution for funding your desires
        </p>
      </div>
    </div>

    <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12">
      
      <div class="lg:hidden flex flex-col items-center mb-8">
        <img src="../../assets/logo.png" alt="Logo" class="h-16 w-auto mb-4" />
        <h2 class="text-[#4C1D95] text-xl font-bold">Team Achieve</h2>
      </div>

      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-2xl md:text-3xl font-bold text-[#4C1D95] leading-tight">
            {{ title }}
          </h1>
          <p class="text-neutral-500 mt-3 text-sm md:text-base">
            {{ description }}
          </p>
        </div>

        <slot />
      </div>
    </div>
  </div>
</template>