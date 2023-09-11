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
  <div class="py-2 px-36 text-white bg-emerald-600">
    <a href="/" class="font-bold text-lg">S1-Ilmu Komputer</a>
  </div>

  <nav class="px-36 bg-emerald-500">
    <div class="navbar text-white">
      <div class="flex-1 flex items-center">
        <img class="w-12 cursor-pointer" src="./assets/upp.png" alt="logo" />
        <a class="text-xl font-semibold cursor-pointer" href="/"
          >Universitas Patpetulai</a
        >
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li class="text-sm font-semibold flex">
            <details>
              <summary>PROFIL</summary>
              <ul class="p-2 bg-emerald-500">
                <li><RouterLink to="/sejarah">Sejarah</RouterLink></li>
                <li><RouterLink to="/visimisi">Visi & Misi</RouterLink></li>
                <li><RouterLink to="/dosen">Dosen</RouterLink></li>
              </ul>
            </details>
          </li>
          <li class="text-sm font-semibold flex">
            <details>
              <summary>INFORMASI</summary>
              <ul class="p-2 bg-emerald-500">
                <li><RouterLink to="/feed">Berita</RouterLink></li>
                <li><RouterLink to="/beasiswa">Beasiswa</RouterLink></li>
              </ul>
            </details>
          </li>
          <li class="text-sm font-semibold flex">
            <details>
              <summary>AKADEMIK</summary>
              <ul class="p-2 bg-emerald-500">
                <li><RouterLink to="/rps">RPS</RouterLink></li>
                <li><RouterLink to="/jadwal">Jadwal Kuliah</RouterLink></li>
                <li><RouterLink to="/matakuliah">Matakuliah</RouterLink></li>
                <li>
                  <RouterLink to="/mahasiswa">Jumlah Mahasiswa</RouterLink>
                </li>
              </ul>
            </details>
          </li>
          <li class="text-sm font-semibold">
            <RouterLink to="/kontak">KONTAK</RouterLink>
          </li>
          <li class="text-sm font-semibold">
            <RouterLink to="/addnews" v-if="isLogged">ADD NEWS</RouterLink>
          </li>
          <!-- <li class="text-sm font-semibold">
            <RouterLink to="/register" v-if="!isLogged">REGISTER</RouterLink>
          </li> -->
          <li
            class="text-sm font-semibold text-gray-900 bg-white ring-2 ring-amber-500 rounded-md"
          >
            <RouterLink to="/signin" v-if="!isLogged">SIGN IN</RouterLink>
          </li>
          <li class="text-sm font-semibold">
            <button
              class="bg-white border-2 border-amber-500 text-gray-800"
              @click="handleSignOut"
              v-if="isLogged"
            >
              SIGN OUT
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <RouterView />
</template>
