<template>
  <div class="auth">
    <div class="auth-container">
      <h1>Авторизация</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Логин или телефон</label>
          <input type="text" v-model="username" />
        </div>
        <div>
          <label for="password">Пароль</label>
          <input type="password" v-model="password" />
        </div>
        <button type="submit">Войти</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
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
    this.$router.push('/')
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

  &__card {
    width: 340px;
    height: 290px;
    background-color: #fff;
  }

  &__title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 308px;
    height: 56px;
    transform: translateY(-19px);
    background-color: #44A248;
    border-radius: 5px;
  }

  h3 {
    color: #FFF;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
  }

  .auth__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  &__forms {
    width: 300px;
    height: 150px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__phone,
  &__password {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--Background-color-light, #CCC);
    padding-bottom: 8px;
    gap: 8px;
  }

  &__input {
    border: none;
    outline: none;
    flex-grow: 1;
    padding: 8px 0;
    font-size: 14px;
  }

  &__eye {
    cursor: pointer;
  }

  input::placeholder {
    color: #999;
  }

  input[type="tel"]:focus,
  input[type="password"]:focus {
    border-bottom-color: #44A248;
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
    background-color: #2c7e34; // цвет при клике
  }

}
</style>
