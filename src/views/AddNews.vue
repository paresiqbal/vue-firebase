<template>
  <div>
    <h1>Create News</h1>
    <form>
      <label for="title" aria-label="title">Title</label>
      <input type="text" name="title" required />
      <label for="body" aria-label="body">Body</label>
      <input type="text" name="body" required />
      <button type="submit">Post news</button>
    </form>

    <form>
      <label for="id">Document id:</label>
      <input type="text" name="id" required />
      <button>Delete news</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>
