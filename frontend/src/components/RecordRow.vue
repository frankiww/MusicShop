<template>
  <tr>
    <td>{{ record.name }}</td>
    <td>{{ record.year }}</td>
    <td>{{ record.Medium?.name }}</td>
    <td>
    <ul>
        <li v-for="artist in record.Artists" :key="artist.id">
        {{ artist.name }}
        </li>
    </ul>
    </td>
    <td>
    <ul>
        <li v-for="genre in record.Genres" :key="genre.id">
        {{ genre.name }}
        </li>
    </ul>
    </td>
    <td>{{ record.wholesale_price }}</td>
  </tr>
</template>

<script>
export default {
  name: 'RecordRow',
  props: {
    record: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
td {
  padding: 8px;
  border: 1px solid #2B2D42;
  cursor: pointer;
}
ul {
  list-style-type: none;
}
</style>
