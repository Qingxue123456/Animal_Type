import { createRouter, createWebHistory } from 'vue-router'; // Import functions and objects of the Vue Router
import FirstModule from '@/components/FirstModule.vue';
import NewGame from '@/components/NewGame.vue';
import GameIntr from '@/components/GameIntr.vue';
import PlayGame from '@/components/PlayGame.vue';
import TypingArea from '@/components/TypingArea.vue';
import NotFind from '@/components/NotFind.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/first-module'
    },
    {
      path: '/first-module',
      name: 'FirstModule',
      component: FirstModule
    },
    {
      path: '/new-game',
      name: 'NewGame',
      component: NewGame
    },
    {
      path: '/game-intro',
      name: 'GameIntroduction',
      component: GameIntr
    },
    {
      path: '/play-game',
      name: 'PlayGame',
      component: PlayGame
    },
    {
      path: '/typing-area',
      name: TypingArea,
      component: TypingArea
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFind',
      component: NotFind
    }
  ]
});

export default router; 
