<template>
  <div class="mx-6 md:mx-20 py-10">
    <h1 class="text-5xl font-bold text-amber-500 underline text-center pb-8">
      Dosen
    </h1>
    <div
      class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        v-for="(dosen, index) in 10"
        :key="index"
        class="card w-60 bg-base-100 shadow-xl mx-auto"
      >
        <figure>
          <img
            src="../assets/dosen/person.jpg"
            alt="Shoes"
            class="rounded-xl"
          />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">Dosen</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis,
            molestiae?
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
