<template>
  <!-- Wadah utama Ionic. Halaman yang dipilih router tampil di dalamnya. -->
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
// Ambil komponen wadah aplikasi dan tempat menampilkan halaman.
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
