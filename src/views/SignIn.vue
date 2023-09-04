<template>
  <div class="flex flex-col items-center gap-2 justify-center">
    <h1 class="text-center">SIGN IN</h1>
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
    <p v-if="errMsg">{{ errMsg }}</p>
    <button @click="signIn">Sign In</button>
    <button @click="signWithGoogle">Sign In with Google</button>
  </div>
</template>

<script setup>
// Vue
import { ref } from "vue";
import { useRouter } from "vue-router";

// Firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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

const signWithGoogle = () => {};
</script>
