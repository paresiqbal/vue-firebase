<template>
  <section
    class="mx-auto px-8 overflow-hidden max-w-lg py-4"
    aria-labelledby="signin"
  >
    <h1 class="text-center text-4xl font-bold text-amber-500">Sign In</h1>
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
          placeholder="Email"
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
          placeholder="Password"
          v-model="password"
        />
      </div>
      <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>
      <div class="flex flex-col">
        <button
          @click="signIn"
          class="mt-4 py-2 px-8 bg-amber-500 active:bg-amber-400 rounded-md text-white font-bold"
        >
          Sign In
        </button>
        <button
          @click="signWithGoogle"
          class="mt-4 py-2 px-2 rounded-md text-slate-900 border-2 border-slate-900 font-bold flex justify-center items-center gap-2 active:bg-slate-100"
        >
          <img src="../assets/google.png" alt="google" class="w-6" />
          Sign In with Google
        </button>
      </div>
    </div>
  </section>
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
