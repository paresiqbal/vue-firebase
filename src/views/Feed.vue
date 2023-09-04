<template>
  <div>
    <h1 class="text-center">FEED</h1>
  </div>
</template>

<script setup>
import { collection, getDocs } from "firebase/firestore";
import { db } from "../main";

const colRef = collection(db, "berita");

getDocs(colRef).then((snapshot) => {
  console.log(snapshot.docs);
});
</script>
