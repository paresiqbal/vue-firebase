<template>
  <div class="flex flex-col py-8 justify-center items-center">
    <h1 class="text-4xl text-amber-500 font-bold py-4">
      {{ editing ? "Edit News" : "Add News" }}
    </h1>
    <form
      class="flex flex-col gap-4 p-4 bg-slate-800 rounded-md text-white"
      @submit.prevent="editing ? addNews() : updateNews()"
    >
      <label for="title">Title</label>
      <input
        class="text-sm text-gray-900 outline-none rounded-md py-1 pl-1"
        type="text"
        name="title"
        v-model="title"
        placeholder="Insert your title"
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
        {{ editing ? "Update News" : "Upload News" }}
      </button>
      <button
        class="text-red-500 px-4 py-2 bg-white rounded-md font-bold"
        type="button"
        @click="deleteNews"
        v-if="editing"
      >
        Delete News
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref as imageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../main";
import { v4 } from "uuid";

const router = useRouter();
const newsId = router.currentRoute.value.params.id;
const editing = !!newsId;

const title = ref("");
const body = ref("");
const imageUpload = ref(null);
const imageUrl = ref("");

const fetchNewsForEditing = async () => {
  try {
    const newsDoc = doc(db, "berita", newsId);
    const newsSnapshot = await getDoc(newsDoc);
    if (newsSnapshot.exists()) {
      const newsData = newsSnapshot.data();
      title.value = newsData.title;
      body.value = newsData.body;
      imageUrl.value = newsData.imageUrl;
    }
  } catch (error) {
    console.error("Error fetching news data: ", error);
  }
};

onMounted(() => {
  if (editing) {
    fetchNewsForEditing();
  }
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];

  if (file) {
    imageUpload.value = file;
  }
};

const deleteNews = async () => {
  if (editing) {
    try {
      const newsDoc = doc(db, "berita", newsId);
      await deleteDoc(newsDoc);
      console.log("News deleted");

      // Optionally, you can add a confirmation message here before redirecting
      router.push({ name: "Feed" });
    } catch (error) {
      console.error("Error deleting news: ", error);
    }
  }
};

const addNews = async () => {
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

    if (editing) {
      const newsDoc = doc(db, "berita", newsId);
      await updateDoc(newsDoc, {
        title: title.value,
        body: body.value,
        imageUrl: imageUrl.value,
      });
      console.log("News updated");
    } else {
      await addDoc(collection(db, "berita"), {
        title: title.value,
        body: body.value,
        imageUrl: imageUrl.value,
      });
      console.log("News added");
    }

    title.value = "";
    body.value = "";
    imageUpload.value = null;
    imageUrl.value = "";

    router.push({ name: "Feed" });
  } catch (error) {
    console.error("Error adding/updating news: ", error);
  }
};
</script>
