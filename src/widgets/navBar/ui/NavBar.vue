<template>
  <aside class="h-4/5 w-40 shrink-0 pt-8 border-r-1 border-b-1 border-r-borderAlt border-b-borderAlt">
    <nav>
      <ul>
        <li v-for="item in navBarItems" :key="item.route" class="text py-2 pl-8 pr-2"  :class="{'bg-[#2d2d2d] border-1 border-[#a7a7a7]': isActiveNavBarItem(item, currentRoute.name)}">
          <NuxtLink v-if="item.action !== 'logout'" :to="item.route" class="text-lg">{{ item.title }}</NuxtLink>
          <button v-else @click="handleLogout" class="text-lg cursor-pointer">{{ item.title }}</button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {isActiveNavBarItem, getNavBarItems} from "~/widgets/navBar/utils/data";
import { useAuthStore } from '~/shared/store/auth'

const currentRoute = useRoute();
const authStore = useAuthStore()

const navBarItems = computed(() => getNavBarItems())

const handleLogout = () => {
  authStore.logout()
}
</script>


