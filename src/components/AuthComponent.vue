<template>
  <div class="auth">
    <div class="auth__container">

      <div class="auth__title">
        <h3>Авторизация</h3>
      </div>

      <div class="auth__card">

        <label for="username" class="auth__label">Логин или телефон</label>
        <form @submit.prevent="login" class="auth__form">

          <div class="auth__input-username">
            <img src="@/assets/icons/16call.svg" alt="icon">
            <input type="text" v-model="username" class="auth__username"/>
          </div>

          <div class="auth__input-password">
            <img src="@/assets/icons/material-symbols-light_lock.svg" alt="asd">
            <input type="password" v-model="password" placeholder="Пароль" class="auth__password"/>
            <img src="@/assets/icons/mdi_eye-off.svg" alt="asd">
          </div>

          <button type="submit" class="auth__button">Войти</button>

          <p v-if="error" class="error">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  name: 'AuthComponent',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  computed: {
    ...mapState(['error'])
  },
  methods: {
    ...mapActions(['login']),
    async login() {
      await this.$store.dispatch('login',{
        username: this.username,
        password: this.password,
      });
      if (this.$store.getters.isAuthenticated) {
        this.$router.push('/');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.auth {
  margin: 0 auto;
  width: 1280px;
  height: 832px;
  background-image: url("https://s3-alpha-sig.figma.com/img/a7be/90cd/076dc3828d4323a8f6f5d083dfaff115?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NrOMWoqIyCWXNQ8D657ALGp2T8YI4do1maPnbwaOzQ~u3GD9iIRPvtZ6Qb74HcogX7XsZja1BQ3BoIh3S~-QJl4LpjzqKcEyTM1KJWvjL3uSq8noI1L2NQin5HdjoMcp0-zgCxEbTvxYjvkR7s4a3g~cMdgUkT44X8OUah~8d4x~4qhGk6OYa~ykr66HTDRmZ9sG1VAT3BYTOUs0BCRmV8zWjdkyA7HTX39aFXFPFsB8qRShB3MiQXbqBXwjcNPPzl7zLJtB2qEBEfZ5aVEIIHTIQ8lJmWp2PcFKL~n0mGbO8WiTt1FIO6~-1aybSv9ZYla15LNWh7hNq9XpDs96WA__");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    width: 340px;
    height: 290px;
    background-color: #FFFFFF;
  }
  &__title {
    margin: 0 auto;
    border-radius: 3px;
    color: #fff;
    width: 308px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #44A248;
    transform: translateY(-19px);

  }

  &__label {
    align-self: start;
  }

  &__card {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  &__form {

  }

  &__input-username {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__button {
    width: 110px;
    height: 36px;
    border-radius: 4px;
    background-color: #50B053;
    border: none;
    color: #FFFFFF;
    align-self: center;
    padding: 12px 16px;
    box-shadow: 0px 4px 4px 0px rgba(106, 174, 94, 0.25);
  }
  &__button:active {
    background-color: #2c7e34;
  }

}
</style>
