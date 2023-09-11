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
      <div class="flex-1 cursor-pointer flex items-center">
        <img class="w-12" src="./assets/upp.png" alt="logo" />
        <a class="text-xl font-semibold">Universitas Patpetulai</a>
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
              <summary>AKADEMIN</summary>
              <ul class="p-2 bg-emerald-500">
                <li><a>RPS</a></li>
                <li><a>Jadwal Kuliah</a></li>
                <li><a>Matakuliah</a></li>
                <li><a>Jumlah Mahasiswa</a></li>
              </ul>
            </details>
          </li>
          <li class="text-sm font-semibold"><a>KONTAK</a></li>
        </ul>
      </div>
    </div>
  </nav>
  <RouterView />
</template>
