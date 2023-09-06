<template>
  <div class="flex flex-col py-8 justify-center items-center">
    <h1 class="text-4xl text-amber-500 font-bold py-4">Add News</h1>
    <form class="flex flex-col gap-4 p-4 bg-slate-800 rounded-md text-white">
      <label for="title">Title</label>
      <input
        class="text-sm text-gray-900 outline-none rounded-md py-1 pl-1"
        type="text"
        name="title"
        placeholder="Insert your title"
      />
      <label for="body">Body</label>
      <textarea
        class="text-sm text-gray-900 outline-none rounded-md py-1 pl-1"
        name="body"
        id="title"
        cols="30"
        rows="10"
      ></textarea>
      <button
        @click="handleSubmit"
        class="text-gray-900 px-4 py-2 bg-white rounded-md font-bold"
      >
        Upload News
      </button>
    </form>
  </div>
</template>

<script></script>

<style lang="scss" scoped></style>
