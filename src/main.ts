import '@/style/style.scss';
import './assets/tailwind.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';

createApp(App).use(store).use(router).mount('#app');
