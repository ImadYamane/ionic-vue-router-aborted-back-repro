<script setup>
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import { ref } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

const router = useRouter()
const sent = ref(false)

// "Unsaved changes" guard. A real app would ask with a dialog; here it always says "stay"
// until the form is sent, which is enough to abort the back navigation.
onBeforeRouteLeave(() => {
  if (sent.value) return true
  document.getElementById('guard-log').textContent = 'Guard said: stay on the form'
  return false
})

async function send() {
  sent.value = true
  await router.replace('/done')
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start"><IonBackButton id="back" default-href="/home" /></IonButtons>
        <IonTitle>Form</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <h1 id="form-heading">Form page</h1>
      <p id="guard-log"></p>
      <IonButton id="send" @click="send">Send (router.replace('/done'))</IonButton>
    </IonContent>
  </IonPage>
</template>
