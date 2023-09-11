<template>
  <div class="flex flex-col py-8 justify-center items-center">
    <h1 class="text-4xl text-amber-500 font-bold py-4">Edit News</h1>
    <form
      class="flex flex-col gap-4 p-4 bg-slate-800 rounded-md text-white"
      @submit.prevent="updateNews"
    >
      <label for="title">Title</label>
      <input
        class="text-sm text-gray-900 outline-none rounded-md py-1 pl-1"
        type="text"
        name="title"
        v-model="title"
        placeholder="Edit the title"
      />
      <label for="body">Body</label>
      <textarea
        class="text-sm text-gray-900 outline-none rounded-md py-1 pl-1"
        name="body"
        id="body"
        v-model="body"
        cols="30"
        rows="10"
      ></textarea>
      <label for="image">Image</label>
      <input
        class="text-sm text-gray-900 outline-none rounded-md py-1 pl-1"
        type="file"
        accept="image/*"
        id="image"
        ref="imageUpload"
        @change="handleImageUpload"
      />
      <button
        class="text-gray-900 px-4 py-2 bg-white rounded-md font-bold"
        type="submit"
      >
        Update News
      </button>
      <button
        class="text-red-500 px-4 py-2 bg-white rounded-md font-bold"
        type="button"
        @click="deleteNews"
      >
        Delete News
      </button>
    </form>
  </div>
</template>

<script setup>
// Vue
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

// Firebase library
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"; // Import deleteDoc
import { db, storage } from "../main";
import { ref as imageRef, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage from Firebase

// uuid
import { v4 } from "uuid";

const route = useRoute();
const router = useRouter();

const newsId = ref(route.params.id);
const title = ref("");
const body = ref("");
const imageUpload = ref(null);
const imageUrl = ref("");

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageUpload.value = file;
  }
};

const fetchNewsItem = async () => {
  try {
    const newsDoc = doc(db, "berita", newsId.value);
    const newsSnapshot = await getDoc(newsDoc);
    if (newsSnapshot.exists()) {
      const data = newsSnapshot.data();
      title.value = data.title;
      body.value = data.body;
      imageUrl.value = data.imageUrl;
    }
  } catch (error) {
    console.error("Error fetching news item: ", error);
  }
};

const updateNews = async () => {
  try {
    if (imageUpload.value) {
      const imageName = `${imageUpload.value.name + v4()}`;
      const imageRefPath = `images/${imageName}`;
      const image = imageRef(storage, imageRefPath);

      await uploadBytes(image, imageUpload.value);
      console.log("Image Uploaded");

      const downloadURL = await getDownloadURL(image);
      imageUrl.value = downloadURL;
    }

    const newsDoc = doc(db, "berita", newsId.value);
    await updateDoc(newsDoc, {
      title: title.value,
      body: body.value,
      imageUrl: imageUrl.value,
    });
    console.log("News updated");

    // Redirect back to the news detail or feed page
    router.push({ name: "news-detail", params: { id: newsId.value } });
  } catch (error) {
    console.error("Error updating news: ", error);
  }
};

const deleteNews = async () => {
  try {
    const newsDoc = doc(db, "berita", newsId.value);

    // Delete the news item from Firestore
    await deleteDoc(newsDoc);

    // Redirect back to the news feed or any desired page
    router.push({ name: "Feed" });
  } catch (error) {
    console.error("Error deleting news: ", error);
  }
};

onMounted(() => {
  fetchNewsItem();
});
</script>
