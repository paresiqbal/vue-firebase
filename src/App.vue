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
  <nav class="flex gap-4 justify-center py-8">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/feed">Feed</RouterLink>
    <RouterLink to="/register">Register</RouterLink>
    <RouterLink to="/signin">Sign In</RouterLink>
    <button @click="handleSignOut" v-if="isLogged">Sign Out</button>
  </nav>
  <RouterView />
</template>

<style scoped></style>
