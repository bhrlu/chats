<template>
  <div class="WAL position-relative bg-grey-4" :style="style">
    <q-layout view="lHh Lpr lFf" container>
      <q-drawer v-model="leftDrawerOpen" show-if-above bordered :breakpoint="690">
        <q-toolbar class="bg-grey-3">
          <q-avatar class="cursor-pointer">
            <q-icon size="md" name="whatsapp" color="green" />
          </q-avatar>

          <q-space />

          <q-btn round flat icon="message" />
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 8]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>New group</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Archived</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Favorites</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>

        <q-toolbar class="bg-grey-2">
          <q-input
            rounded
            outlined
            dense
            class="WAL__field full-width"
            bg-color="white"
            v-model="search"
            placeholder="Search or start a new conversation"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>

        <q-scroll-area style="height: calc(100% - 100px)">
          <q-list>
            <q-item
              v-for="(conversation, index) in conversations"
              :key="conversation.id"
              class="text-dark"
              clickable
              v-ripple
              @click="setCurrentConversation(index, conversation.person, conversation.avatar)"
            >
              <q-item-section avatar>
                <q-avatar>
                  <img :src="conversation.avatar" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">{{ conversation.person }}</q-item-label>
                <q-item-label class="conversation__summary" caption>
                  <q-icon color="green" name="done_all" v-if="conversation.sent" />
                  {{ conversation.caption }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label caption>{{ conversation.time }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container class="bg-grey-2">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, computed, onBeforeUpdate, onMounted } from 'vue'
import tehran from '../assets/images/tehran.jpg'
import london from '../assets/images/london.jpg'
import mashhad from '../assets/images/mashhad.jpg'
import newYork from '../assets/images/newYork.jpg'
import { useRouter } from 'vue-router'
const conversations = [
  {
    id: 1,
    person: 'Tehran',
    avatar: tehran,
    caption: 'I\'m working on Quasar!',
    time: '15:00',
    sent: true,
    seen: true
  },
  {
    id: 2,
    person: 'New York',
    avatar: newYork,
    caption: 'I\'m working on Quasar!',
    time: '16:00',
    sent: true,
    seen: false
  },
  {
    id: 3,
    person: 'Mashhad',
    avatar: mashhad,
    caption: 'I\'m working on Quasar!',
    time: '18:00',
    sent: true,
    seen: true
  },
  {
    id: 4,
    person: 'London',
    avatar: london,
    caption: 'I\'m working on Quasar!',
    time: '17:00',
    sent: true,
    seen: false
  }
]
export default {
  name: 'WhatsappLayout',
  setup() {
    const $q = useQuasar()
    const leftDrawerOpen = ref(true)
    const search = ref('')
    const message = ref('')
    const currentConversationIndex = ref(0)
    const router = useRouter()
    const currentConversation = computed(() => {
      return conversations[currentConversationIndex.value]
    })
    const style = computed(() => ({
      height: $q.screen.height + 'px'
    }))
    onMounted(() => {
      if (router.currentRoute.value.fullPath !== '/') {
        leftDrawerOpen.value = false
      } else {
        leftDrawerOpen.value = true
      }
    })
    onBeforeUpdate(() => {
      if (router.currentRoute.value.fullPath === '/') {
        leftDrawerOpen.value = true
      } else {
        leftDrawerOpen.value = false
      }
    })
    function setCurrentConversation(index, name, image) {
      currentConversationIndex.value = index
      router.push({ path: '/chat/' + name, query: { image: image } })
      leftDrawerOpen.value = true
    }
    return {
      leftDrawerOpen,
      search,
      message,
      currentConversationIndex,
      conversations,
      currentConversation,
      setCurrentConversation,
      style,
    }
  }
}
</script>

<style lang="sass">

</style>