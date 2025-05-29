<template>
    <div v-if="isAdmin" class="logout">
        <h2>Вы авторизованы как Администратор</h2>
        <button @click="logout">Выйти</button>
    </div>
    <div v-else class="admin-login">
        <h2>Вход для администратора</h2>
        <form @submit.prevent="handleLogin">
            <div>
                <label for="username">Логин:</label>
                <input v-model="username" id="username" required />
            </div>

            <div>
                <label for="password">Пароль:</label>
                <input v-model="password" id="password" type="password" required />
            </div>

            <button type="submit">Войти</button>

            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
    
</template>

<script>
export default {
  name: 'AdminLogin',
  data() {
    return {
      username: '',
      password: '',
      error: '',
      isAdmin: false
    };
  },
  mounted(){
    this.checkAdmin();
  },
  methods: {
    checkAdmin() {
      this.isAdmin = localStorage.getItem('isAdmin') === 'true';
    },
    handleLogin() {
      const validUsername = 'admin';
      const validPassword = '1234';

      if (this.username === validUsername && this.password === validPassword) {
        localStorage.setItem('isAdmin', 'true');
        this.$router.push('/'); // Перенаправляем на главную
      } else {
        this.error = 'Неверный логин или пароль';
      }
    },
    logout() {
      localStorage.removeItem('isAdmin');
      this.checkAdmin();
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.admin-login {
  max-width: 400px;
  min-width: 200px;
  margin: 80px auto;
  padding: 20px;
  border: 2px solid #2B2D42;
  border-radius: 5px;
}

h2 {
  text-align: center;
}

.admin-login form div {
  margin-bottom: 15px;
}

.admin-login label {
  display: block;
  margin-bottom: 5px;
}

.admin-login input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.admin-login .error {
  color: red;
  margin-top: 10px;
}
.admin-login button{
    background-color: #8D99AE;
    color: #2B2D42;
    padding: 1%;
    border: 1px solid #EDF2F4;
    font-size: 100%;
    cursor: pointer;
    width: 35%;
    margin: 0 auto;
    height: 100%;
}
.logout button{
    background-color: #8D99AE;
    color: #2B2D42;
    padding: 1%;
    border: 1px solid #EDF2F4;
    font-size: 100%;
    cursor: pointer;
    width: 20%;
    margin: auto;
    margin-top: 40px;
    display: flex;
    justify-content: center;
}
.logout{
  max-width: 800px;
  min-width: 300px;
  margin: 80px auto;
  padding: 20px;
  border: 2px solid #2B2D42;
  border-radius: 5px;
    
}
</style>