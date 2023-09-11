<template>
  <section class="mx-auto px-8 overflow-hidden max-w-lg py-4">
    <h1 class="text-center text-4xl font-bold text-amber-500">REGISTER</h1>
    <div class="border-2 border-neutral-800 rounded-lg grid gap-4 my-12 p-6">
      <div>
        <label
          for="email"
          class="text-neutral-500 text-sm font-bold uppercase pb-4"
          >Your Email:</label
        >
        <input
          class="w-full border-4 border-amber-400 rounded-md focus:ring-4 focus:border-amber-400 focus:ring-amber-400 focus:outline-none"
          type="email"
          name="email"
          placeholder="Your Email"
          v-model="email"
        />
      </div>

      <div>
        <label
          for="password"
          class="text-neutral-500 text-sm font-bold uppercase pb-4"
          >Your Password:</label
        >
        <input
          class="w-full border-4 border-amber-400 rounded-md focus:ring-4 focus:border-amber-400 focus:ring-amber-400 focus:outline-none"
          type="password"
          name="password"
          placeholder="Your Password"
          v-model="password"
        />
      </div>

      <button
        class="mt-4 py-2 px-8 bg-amber-500 active:bg-amber-400 rounded-md text-white font-bold"
        @click="regsiter"
      >
        Register
      </button>
    </div>
  </section>
</template>

<script setup>
// Vue
import { ref } from "vue";
import { useRouter } from "vue-router";

// Firebase
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const email = ref("");
const password = ref("");
const router = useRouter();

const regsiter = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully Register");
      router.push("/feed");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>
