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
          <button type="submit">{{ isEdit ? 'Сохранить' : 'Добавить' }}</button>
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
    isEdit: Boolean,
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
        } else {
          this.form = {
            name: '',
            year: '',
            mediumId: null,
            wholesale_price: '',
            genreIds: [],
            artistIds: [],
          };
        }
      },
    },
  },
  methods: {
    submitForm() {
      const payload = {...this.form};
      if(this.isEdit) {
        payload.id = this.record.id
      }
      this.$emit('save',payload);
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
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-attachment: fixed;  
}

.modal-content {
  background: #EDF2F4;
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
  background-color: #EDF2F4;
  border: 1px solid #8D99AE;
  border-radius: 4px;
  padding: 5px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.checkbox-scroll {
  border: 1px solid #8D99AE;
  border-radius: 4px;
  max-height: 130px; /* фиксированная высота */
  overflow-y: auto;
  padding: 0 10px;
  background-color: #EDF2F4;
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
button{
    background-color: #8D99AE;
    color: #2B2D42;
    padding: 1% 5%;
    border: 1px solid #EDF2F4;
    font-size: 100%;
    cursor: pointer;
    margin: 0 3px;
}
button:hover{
    background-color: #2B2D42;
    color: #EDF2F4;
    border: 1px solid #2B2D42;
}
</style>
