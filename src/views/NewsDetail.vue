<template>
  <div class="py-8">
    <h1 class="text-4xl font-bold text-amber-500">{{ newsItem.title }}</h1>
    <p>{{ newsItem.body }}</p>

    <!-- Display the uploaded image -->
    <img :src="newsItemImageUrl" alt="News Image" v-if="newsItemImageUrl" />
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
      newsItem.value = { ...docSnapshot.data(), id: docSnapshot.id };
      newsItemImageUrl.value = newsItem.value.imageUrl; // Set the image URL
    } else {
      // Handle the case where the news item doesn't exist
    }
  } catch (error) {
    console.error("Error fetching news item: ", error);
  }
});
</script>
