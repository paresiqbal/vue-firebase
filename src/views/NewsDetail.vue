<template>
  <div class="py-8">
    <h1 class="text-4xl font-bold text-amber-500">{{ newsItem.title }}</h1>
    <p>{{ newsItem.body }}</p>

    <!-- Display the image if an image URL is available -->
    <img v-if="newsItemImageUrl" :src="newsItemImageUrl" alt="News Image" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { collection, doc, getDoc } from "firebase/firestore";

import { useRouter } from "vue-router";
import { db } from "../main";

const router = useRouter();
const newsItemId = router.currentRoute.value.params.id; // Get the news item ID from the route parameter
const newsItem = ref({ title: "", body: "" }); // Create a reactive data property to store the full news item
const newsItemImageUrl = ref("");

onMounted(async () => {
  try {
    const newsItemDoc = doc(collection(db, "berita"), newsItemId);
    const docSnapshot = await getDoc(newsItemDoc);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      const imageUrl = data.image; // Assuming you store the image URL in the 'image' field in Firestore

      // Set the news item data and image URL
      newsItem.value = { ...data, id: docSnapshot.id };
      newsItemImageUrl.value = imageUrl; // Set the image URL property
    } else {
      // Handle the case where the news item doesn't exist
    }
  } catch (error) {
    console.error("Error fetching news item: ", error);
  }
});
</script>
