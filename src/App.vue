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
  <div class="py-2 px-36 text-white bg-green-600">
    <a href="/" class="font-bold text-lg">S1-Ilmu Komputer</a>
  </div>

  <nav>
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <span class="flex justify-center items-center font-bold text-xl"
          ><img src="./assets/upp.png" alt="logo" class="w-12" /><a href="/"
            >Universitas Pat Petulai</a
          ></span
        >
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li><a>Link</a></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul class="p-2 bg-base-100">
                <li><a>Link 1</a></li>
                <li><a>Link 2</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped></style>
