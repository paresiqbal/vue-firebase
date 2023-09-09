<template>
  <div class="flex flex-col items-center gap-2 justify-center py-8">
    <h1 class="text-center text-4xl font-bold text-amber-500">Sign In</h1>
    <p>
      <input
        class="ring-1 ring-cyan-500 rounded-sm"
        type="email"
        name="email"
        placeholder="Your Email"
        v-model="email"
      />
    </p>
    <p>
      <input
        class="ring-1 ring-cyan-500 rounded-sm"
        type="password"
        name="password"
        placeholder="Your Password"
        v-model="password"
      />
    </p>
    <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>
    <button
      @click="signIn"
      class="mt-4 py-2 px-8 bg-cyan-500 active:bg-cyan-600 rounded-md text-white font-bold"
    >
      Sign In
    </button>
    <button
      @click="signWithGoogle"
      class="mt-4 py-2 px-2 bg-cyan-500 active:bg-cyan-600 rounded-md text-white font-bold"
    >
      Sign In with Google
    </button>
  </div>
</template>

<script setup>
// Vue
import { ref } from "vue";
import { useRouter } from "vue-router";

// Firebase
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const email = ref("");
const password = ref("");
const router = useRouter();
const errMsg = ref();

const signIn = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully Sign In");
      router.push("/feed");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;

        default:
          errMsg.value = "Email or Password was incorrect";
          break;
      }
    });
};

const signWithGoogle = () => {
  const provider = new GoogleAuthProvider(); // Use 'new' keyword here
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/feed");
    })
    .catch((error) => {
      // handle error
    });
};
</script>
