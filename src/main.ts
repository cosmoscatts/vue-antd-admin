import { createApp } from 'vue';
import App from './App.vue';
import { setupModules } from './hooks/app';

setupModules(createApp(App));
