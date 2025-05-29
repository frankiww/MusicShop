<!-- Главная страница -->

<template>
    <div class="records-view">
        <h1>Каталог записей</h1>

        <div class="filters">
            <FilterPanel
                v-model:search="searchQuery"
                v-model:genre="selectedGenre"
                v-model:artist="selectedArtist"
                v-model:medium="selectedMedium"
                :genres="genres"
                :artists="artists"
                :mediums="mediums"
            />
            <button @click="resetFilters">Сбросить</button>
        </div>

        <div v-if="isAdmin" class="admin-actions">
            <button
                v-for="control in getAddControls()"
                :key="control.label"
                :class="control.class"
                @click="control.onClick"
            >
                {{ control.label }}
            </button>
        </div>

        <RecordTable 
            :records="records"
            :isAdmin="isAdmin"
            :getControls="getControlsRow"/>

        <EditRecord 
            v-if="showModal"
            :record="editingRecord"
            :genres="genres"
            :artists="artists"
            :mediums="mediums" 
            :isEdit="isEdit" 
            @save="handleSave"
            @close="handleCancel" 
        />
    </div>
</template>

<script>
    import FilterPanel from '@/components/FilterPanel.vue';
    import RecordTable from '@/components/RecordTable.vue';
    import {getAdminControls} from '@/factories/AdminControlsFactory.js';
    import EditRecord from '@/components/EditRecord.vue';

    export default {
        name: 'RecordsView',
        components: {
            FilterPanel,
            RecordTable,
            EditRecord
        },
        data(){
            return{
                searchQuery: '',
                selectedGenre: '',
                selectedArtist: '',
                selectedMedium: '',
                genres: [],
                artists: [],
                mediums: [],
                records: [],
                isAdmin: false,
                editingRecord: null,
                showModal: false,
                isEdit: false,
            }
        },
        mounted(){
            this.fetchFilterData();
            this.fetchRecords();
            this.checkAdmin();
        },
        watch: {
            searchQuery: 'fetchRecords',
            selectedGenre: 'fetchRecords',
            selectedArtist: 'fetchRecords',
            selectedMedium: 'fetchRecords',
        },
        methods: {
            async fetchFilterData(){
                try{
                    const [genresRes, artistsRes, mediumsRes] = await Promise.all([
                        fetch('/api/genres'),
                        fetch('/api/artists'),
                        fetch('/api/mediums')
                    ])
                    this.genres = await genresRes.json()
                    this.artists = await artistsRes.json()
                    this.mediums = await mediumsRes.json()
                } catch(error){
                    console.error(error)
                }
            },
            async fetchRecords() {
                try {
                    const params = new URLSearchParams();
                    if (this.searchQuery) params.append('title', this.searchQuery);
                    if (this.selectedGenre) params.append('genreId', this.selectedGenre);
                    if (this.selectedArtist) params.append('artistId', this.selectedArtist);
                    if (this.selectedMedium) params.append('mediumId', this.selectedMedium);

                    const response = await fetch(`/api/recordings?${params.toString()}`);
                    this.records = await response.json();
                } catch (error) {
                    console.error('Ошибка при загрузке записей:', error);
                }
            },
            resetFilters() {
                this.searchQuery = '';
                this.selectedGenre = '';
                this.selectedArtist = '';
                this.selectedMedium = '';
            },
            getControlsRow(record) {
                return getAdminControls(this.isAdmin, 'recording', {
                    onEdit: () => this.editRecord(record),
                    onDelete: () => this.deleteRecord(record),
                });
            },
            checkAdmin(){
                this.isAdmin = localStorage.getItem('isAdmin') === 'true';
            },
            getAddControls() {
                return getAdminControls(this.isAdmin, 'recording', {
                    onAdd: () => this.addRecord()
                }) || [];
            },
            async deleteRecord(record) {
                if (!confirm(`Удалить запись "${record.name}"?`)) return;
                try {
                    const res = await fetch(`/api/recordings/${record.id}`, {method: 'DELETE'});
                    if (!res.ok) throw new Error('Ошибка удаления');
                    await this.fetchRecords();
                } catch (error) {
                    console.error(error);
                }
            },
            editRecord(record){
                this.editingRecord = record;
                this.showModal = true;
                this.isEdit = true;
            },
            
            async handleSave(record) {
                try {
                    const method = this.isEdit ? 'PUT' : 'POST';
                    const url = this.isEdit ? `/api/recordings/${record.id}` : `/api/recordings`;

                    const res = await fetch(url, {
                        method,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(record),
                    });
                    if (!res.ok) throw new Error('Ошибка');
                    this.showModal = false;
                    this.editingRecord = null;
                    await this.fetchRecords();
                } catch (error) {
                    console.error(error);
                }
            },
            handleCancel(){
                this.showModal = false;
                this.editingRecord = null;
            },
            addRecord() {
                this.showModal = true;
                this.editingRecord = null;
                this.isEdit = false;
            }

        }
    }
</script>

<style scoped>
    .records-view{
        margin: 20px;
    }
    .filters{
        display: flex;
    }
    button{
        background-color: #8D99AE;
        color: #2B2D42;
        padding: 0.5%;
        border: 1px solid #EDF2F4;
        font-size: 100%;
        cursor: pointer;
        width: 15%;
        margin: 0 20px;
        height: 100%;
    }
</style>
