<script setup>
// Vue
import { RouterLink, RouterView, useRouter } from "vue-router";
import { onMounted, ref } from "vue";

// Firebase
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const isLogged = ref(false);
const router = useRouter();

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLogged.value = true;
    } else {
      isLogged.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
</script>

<template>
  <div class="py-4 px-36 text-white bg-green-600">
    <a href="/" class="font-bold text-lg">S1-Ilmu Komputer</a>
  </div>
  <nav
    class="flex gap-8 justify-center py-6 bg-green-500 text-white font-5xl font-bold"
  >
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/feed">Feed</RouterLink>
    <RouterLink to="/addnews" v-if="isLogged">Add News</RouterLink>
    <RouterLink to="/register" v-if="!isLogged">Register</RouterLink>
    <RouterLink to="/signin" v-if="!isLogged">Sign In</RouterLink>
    <button @click="handleSignOut" v-if="isLogged">Sign Out</button>
  </nav>
  <RouterView />
</template>

<style scoped></style>
