<template>
  <div class="request-list">
    <h1>Список заявок</h1>

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
        <td>{{ request.number }}</td>
        <td>{{ request.created_at }}</td>
        <td>{{ request.premise?.full_address || 'Нет адреса' }} {{ request.apartment?.label || 'Нет квартиры' }}</td>
        <td><pre>{{ request.applicant.first_name }}</pre></td>
        <td>{{ request.description }}</td>
        <td>{{ request.due_date }}</td>
        <td><pre>{{ request.status.name }}</pre></td>
      </tr>
      </tbody>
    </table>


    <appeal-modal v-if="selectedRequest" :request="selectedRequest" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppealModal from '@/components/ModalComponent.vue';

export default {
  components: {
    AppealModal
  },
  data() {
    return {
      selectedRequest: null,  // Для хранения выбранной заявки
    };
  },
  computed: {
    ...mapGetters(['requests']),
  },
  methods: {
    ...mapActions(['FetchData']),

  },
  created() {
    this.FetchData().then(() => {
      console.log(this.requests); // Проверьте, что данные действительно загружены
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

    th, td {
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

  p {
    color: #888;
    font-size: 16px;
  }
}
</style>
