<template>
  <div class="flex flex-col py-8 justify-center items-center">
    <h1 class="text-4xl text-amber-500 font-bold py-4">Add News</h1>
    <form
      class="flex flex-col gap-4 p-4 bg-slate-800 rounded-md text-white"
      @submit.prevent="addNews"
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
        Upload News
      </button>
    </form>
  </div>
  <img :src="imageUrl" alt="Uploaded Image" v-if="imageUrl" />
</template>

<script setup>
// Vue imports
import { ref } from "vue";

// Firebase imports
import { collection, addDoc } from "firebase/firestore";
import { ref as imageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../main";

// Library
import { v4 } from "uuid";

// Create reactive data properties for the form fields
const title = ref("");
const body = ref("");
const imageUpload = ref(null);
const imageUrl = ref("");

// Method to handle the image upload
const handleImageUpload = (event) => {
  // Access the selected file from the input field
  const file = event.target.files[0];

  if (file) {
    // Store the selected image file in the imageUpload ref
    imageUpload.value = file;
  }
};

// Method to handle the form submission
const addNews = async () => {
  try {
    // Upload the image first if it exists
    if (imageUpload.value) {
      const imageName = `${imageUpload.value.name + v4()}`;
      const imageRefPath = `images/${imageName}`;
      const image = imageRef(storage, imageRefPath);

      // Upload the image
      await uploadBytes(image, imageUpload.value);
      console.log("Image Uploaded");

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(image);

      // Store the image URL in the imageUrl variable
      imageUrl.value = downloadURL;
    }

    // Create a new document in the "berita" collection
    const docRef = await addDoc(collection(db, "berita"), {
      title: title.value,
      body: body.value,
      imageUrl: imageUrl.value, // Add the image URL to the document
    });

    // Clear the form fields after successfully adding the news
    title.value = "";
    body.value = "";
    imageUpload.value = null;

    console.log("News added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding news: ", error);
  }
};
</script>
