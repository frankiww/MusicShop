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
    <td v-if="showPrice">{{ record.Catalogs[0].retail_price }}</td>
    <td v-if="showPrice">{{ record.Catalogs[0].stock }}</td>
    <td v-if="isAdmin">
      <button
        v-for="control in getControls(record)"
        :key="control.label"
        :class="control.class"
        @click.stop="control.onClick"
      >
        {{ control.label }}
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'RecordRow',
  props: {
    record: {
      type: Object,
      required: true
    },
    showPrice: {
      type: Boolean
    },
    isAdmin: Boolean,
    getControls: Function
  }
};
</script>

<style scoped>
td {
  padding: 8px;
  border: 1px solid #2B2D42;
  cursor: pointer;
}
tr:hover{
  background-color: #8D99AE;
}
ul {
  list-style-type: none;
}
button{
    background-color: #8D99AE;
    color: #2B2D42;
    padding: 0.5%;
    border: 1px solid #EDF2F4;
    font-size: 100%;
    cursor: pointer;
    margin: 0 5px;
}
button:hover{
    background-color: #2B2D42;
    color: #EDF2F4;
    border: 1px solid #2B2D42;
}
</style>
