import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
// vuex about global music player
import store from './store';
import GlobalMusicPlayer from './components/GlobalMusicPlayer.vue';
// iconfont.css
import '@/assets/iconfont/iconfont.css'
// loading pattern
import loading from './directies/loading';

const app = createApp(App);

app.use(router); 
app.use(store);
app.component('GlobalMusicPlayer', GlobalMusicPlayer);
app.directive('loading',loading);

app.mount('#app'); 
