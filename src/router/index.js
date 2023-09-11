// vue
import { createRouter, createWebHistory } from "vue-router";

// firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Homepage",
      component: () => import("../views/Homepage.vue"),
    },
    {
      path: "/sejarah",
      name: "Sejarah",
      component: () => import("../views/Sejarah.vue"),
    },
    {
      path: "/visimisi",
      name: "visimisi",
      component: () => import("../views/VisiMisi.vue"),
    },
    {
      path: "/dosen",
      name: "Dosen",
      component: () => import("../views/Dosen.vue"),
    },
    {
      path: "/feed",
      name: "Feed",
      component: () => import("../views/Feed.vue"),
    },
    {
      path: "/beasiswa",
      name: "Beasiswa",
      component: () => import("../views/Beasiswa.vue"),
    },
    {
      path: "/rps",
      name: "Rps",
      component: () => import("../views/Rps.vue"),
    },
    {
      path: "/jadwal",
      name: "Jadwal",
      component: () => import("../views/Jadwal.vue"),
    },
    {
      path: "/matakuliah",
      name: "Matakuliah",
      component: () => import("../views/Matakuliah.vue"),
    },
    {
      path: "/mahasiswa",
      name: "Mahasiswa",
      component: () => import("../views/Mahasiswa.vue"),
    },
    {
      path: "/addnews/:id?", // Make the "id" parameter optional by adding a "?" at the end
      name: "AddNews",
      component: () => import("../views/AddNews.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/editnews/:id",
      name: "EditNews",
      component: () => import("../views/EditNews.vue"),
      meta: {
        requiresAuth: true, // If authentication is required for editing news
      },
    },
    {
      path: "/news/:id",
      name: "news-detail",
      component: () => import("../views/NewsDetail.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/signin",
      name: "SignIn",
      component: () => import("../views/SignIn.vue"),
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You dont have access");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
