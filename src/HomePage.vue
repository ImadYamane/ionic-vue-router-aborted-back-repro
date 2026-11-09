<script setup>
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar><IonTitle>Home</IonTitle></IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <h1 id="home-heading">Home page</h1>
      <IonButton id="open-form" router-link="/form">Open form</IonButton>
    </IonContent>
  </IonPage>
</template>
