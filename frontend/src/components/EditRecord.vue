<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Редактировать запись</h2>
      <form @submit.prevent="submitForm">
        <label>
          Название:
          <input v-model="form.name" type="text" required />
        </label>

        <label>
          Год:
          <input v-model="form.year" type="number" min="1900" max="2100" required />
        </label>

        <label>
          Носитель:
            <select v-model="form.mediumId">
                <option v-for="medium in mediums" :key="medium.id" :value="medium.id">
                {{ medium.name }}
                </option>
            </select>
        </label>

        <label>
          Исполнители:
          <div class="checkbox-scroll">
            <div v-for="artist in artists" :key="artist.id" class="checkbox-item">
              <label class="check">
                <input type="checkbox" :value="artist.id" v-model="form.artistIds" />
                {{ artist.name }}
              </label>
            </div>
          </div>
        </label>

        <label>
          Жанры:
          <div class="checkbox-scroll">
            <div v-for="genre in genres" :key="genre.id" class="checkbox-item">
              <label class="check">
                <input type="checkbox" :value="genre.id" v-model="form.genreIds" />
                {{ genre.name }}
              </label>
            </div>
          </div>
        </label>

        <label>
          Оптовая цена:
          <input v-model.number="form.wholesale_price" type="number" step="0.01" required />
        </label>



        <div class="modal-actions">
          <button type="submit">Сохранить</button>
          <button type="button" @click="$emit('close')">Отмена</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditRecord',
  props: {
    visible: Boolean,
    record: Object,
    genres: Array,
    artists: Array,
    mediums: Array,
  },
  data() {
    return {
      form: {
        name: '',
        year: '',
        mediumId: null,
        wholesale_price: '',
        retail_price: '',
        genreIds: [],
        artistIds: [],
      },
    };
  },
  watch: {
    record: {
      immediate: true,
      handler(newRecord) {
        if (newRecord) {
          this.form = {
            name: newRecord.name || '',
            year: newRecord.year || '',
            mediumId: newRecord.Medium?.id || null,
            wholesale_price: newRecord.wholesale_price || '',
            genreIds: newRecord.Genres?.map(g => g.id) || [],
            artistIds: newRecord.Artists?.map(a => a.id) || [],
          };
        }
      },
    },
  },
  methods: {
    submitForm() {
      this.$emit('save', { ...this.form, id: this.record.id });
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 500px;
  max-width: 100%;
}

label {
  display: block;
  margin-bottom: 1rem;
}

input,
select {
  width: 100%;
  margin-top: 10px;
  height: 30px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.checkbox-scroll {
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 130px; /* фиксированная высота */
  overflow-y: auto;
  padding: 0 10px;
  background-color: #fff;
}

input[type="checkbox"]{
  width: 20px;
  margin-top: 5px;
  height: 100%;
}
.check{
  display: block;
  margin-bottom: 3%;

}
</style>
