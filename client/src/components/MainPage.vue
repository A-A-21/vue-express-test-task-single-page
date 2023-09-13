<template>
  <div>
    <form @submit.prevent="fetchData">
      <input
        name="number"
        placeholder="number"
        v-model="formData.number"
        v-mask="'##-##-##'"
      />
      <input
        name="email"
        placeholder="email"
        v-model="formData.email"
        type="email"
        required
      />
      <button type="submit">ИСКАТЬ!</button>
    </form>
    <div v-if="fetchStatus === fetchStatuses.pending">
      Идёт поиск подходящих пользователей
    </div>
    <div class="users" v-if="fetchStatus === fetchStatuses.resolved">
      <template v-if="users.length">
        <div class="users__item" v-for="user in users" :key="user.number">
          Email: {{ user.email }} Number: {{ user.number }}
        </div>
      </template>
      <div v-else>Подходящих пользователей на найдено</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const formData = ref({ number: "", email: "" });
const users = ref(null);
const fetchStatus = ref(null);

const fetchStatuses = {
  pending: "pending",
  rejected: "rejected",
  resolved: "resolved",
};
const controller = ref(null);

async function fetchData() {
  try {
    if (fetchStatus.value === fetchStatuses.pending) {
      controller.value.abort();
    }
    controller.value = new AbortController();
    const signal = controller.value.signal;
    fetchStatus.value = fetchStatuses.pending;

    const response = await fetch(
      `http://localhost:3001/api?email=${formData.value.email}&number=${formData.value.number}`,
      { signal }
    );
    users.value = await response.json();

    if (users.value.length) formData.value = { number: "", email: "" };
    fetchStatus.value = fetchStatuses.resolved;
  } catch (e) {
    if (e.name === "AbortError") fetchStatus.value = fetchStatuses.pending;
    else fetchStatus.value = fetchStatuses.rejected;
  }
}
</script>

<style lang="scss" scoped>
.users {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  gap: 20px;

  &__item {
    border: 1px solid black;
    border-radius: 16px;
    width: 200px;
    height: 50px;
    display: flex;
    align-items: center;
  }
}
</style>
