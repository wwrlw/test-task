<template>
  <div class="request-list">
    <h1>Список заявок</h1>

    <input v-model="search" placeholder="Поиск по заявкам" @input="filterRequests">

    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Создана</th>
        <th>Адрес</th>
        <th>Заявитель</th>
        <th>Описание</th>
        <th>Срок</th>
        <th>Статус</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="request in requests.results" :key="request.id">
        <td @click="openRequestModal(request)">{{ request.number }}</td>
        <td>{{ formatDate(request.created_at) }}</td>
        <td >{{request.apartment?.label ? request.premise?.full_address + ' ' + request.apartment?.label : '' }}</td>
        <td>{{ request.applicant.first_name + ' ' + request.applicant.last_name }}</td>
        <td>{{ request.description }}</td>
        <td>{{ formatDate(request.due_date) }}</td>
        <td>{{ request.status.name }}</td>
      </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="changePage(page - 1)" :disabled="page === 1">Назад</button>
      <span>Страница {{ page }}</span>
      <button @click="changePage(page + 1)" :disabled="!hasMore">Вперед</button>
    </div>



    <modal-component v-if="selectedRequest" @close="closeRequestModal">
      <template v-slot:title>Заявка #{{ selectedRequest.number }}</template>
      <template v-slot:content>
        <p><strong>Дата создания:</strong> {{ formatDate(selectedRequest.created_at) }}</p>
        <p>Дом: {{ selectedRequest.premise?.full_address }}</p>
        <p>Квартира: {{selectedRequest.apartment?.label}}.</p>
        <p><strong>Заявитель:</strong> {{ selectedRequest.applicant.first_name }}</p>
        <p><strong>Описание:</strong></p>
        <textarea v-model="selectedRequest.description"></textarea>
<!--        <button @click.prevent="updateRequest(selectedRequest)">Сохранить</button>-->
<!--        <button type="button" @click="closeRequestModal">Отменить</button>-->
      </template>
    </modal-component>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ModalComponent from '@/components/ModalComponent.vue';

export default {
  components: {
    ModalComponent,
  },
  data() {
    return {
      selectedRequest: null,
      search: '',
      selectedPremise: '',
      page: 1,
      pageSize: 10,
      hasMore: true,
    };
  },
  computed: {
    ...mapGetters(['requests']),
  },
  methods: {
    ...mapActions(['FetchData']),
    filterRequests() {
      this.page = 1;
      this.FetchData({
        search: this.search,
        premise_id: this.selectedPremise,
        page: this.page,
        page_size: this.pageSize
      }).then(() => {
        this.hasMore = this.requests.length === this.pageSize;
      });
    },
    changePage(newPage) {
      if(newPage < 1) return;
      this.page = newPage;
      this.FetchData({
        search: this.search,
        premise_id: this.selectedPremise,
        page: this.page,
        page_size: this.pageSize
      })
    },

    openRequestModal(request) {
      this.selectedRequest = {...request};
    },
    closeRequestModal() {
      this.selectedRequest = null;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    }
  },
  created() {
    this.FetchData().then(() => {
      console.log(this.requests);
    });
  }
};
</script>

<style scoped lang="scss">
.request-list {
  padding: 20px;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 10px;
      border: 1px solid #ccc;
      text-align: left;
    }

    th {
      background-color: #f5f5f5;
    }

    tr:hover {
      background-color: #f0f0f0;
      cursor: pointer;
    }
  }
}
</style>
