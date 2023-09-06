<template>
  <div class="py-8">
    <h1 class="text-center text-4xl font-bold text-amber-500">News</h1>
  </div>
</template>

<script setup>
// Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../main";

const colRef = collection(db, "berita");

getDocs(colRef)
  .then((snapshot) => {
    let berita = [];

    snapshot.docs.forEach((doc) => {
      berita.push({ ...doc.data(), id: doc.id });
      console.log(berita);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
</script>
