// Muat pembuat aplikasi Vue, plugin Ionic, komponen utama, dan router.
import { createApp } from 'vue';
import { IonicVue } from '@ionic/vue';
import App from './App.vue';
import router from './router';

// CSS bawaan Ionic mengatur tampilan dasar. variables.css berisi tema proyek.
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import './theme/variables.css';

// Aktifkan komponen Ionic dan router dari proyek sumber.
const app = createApp(App).use(IonicVue).use(router);
// Tampilkan aplikasi pada elemen HTML dengan id app setelah router siap.
router.isReady().then(() => app.mount('#app'));
