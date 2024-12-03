<template>
  <nav class="navbar">
    <ul>
      <li><a href="#list">Invoice List</a></li>
      <li><a href="#create">Create Invoice</a></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #218838;
  padding: 1rem;
  border-radius: 0.5rem;

}

.navbar ul {
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
}

.navbar li {
  margin: 0 1rem;
  font-size: 1.2rem;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  transition: color 0.3s;
}

.navbar a:hover {
  color: #218838;
}
</style>
