import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import { router } from './core/router';
import { store } from './core/store';
import './style.scss';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Antd);

app.mount('#app');
