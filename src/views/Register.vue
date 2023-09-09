<template>
  <div class="flex flex-col items-center gap-2 justify-center">
    <h1 class="text-center">REGISTER</h1>
    <p>
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        v-model="email"
      />
    </p>
    <p>
      <input
        type="password"
        name="password"
        placeholder="Your Password"
        v-model="password"
      />
    </p>
    <button @click="regsiter">Register</button>
  </div>
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
