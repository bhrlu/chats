<template>
  <q-page class="page-chat flex column">
    <q-header elevated>
      <q-toolbar class="bg-grey-3 text-black">
        <q-btn round flat icon="keyboard_arrow_left" @click="back" />

        <q-btn round flat>
          <q-avatar>
            <img :src="avatar" />
          </q-avatar>
        </q-btn>

        <span class="q-subtitle-1 q-pl-md">{{ title }}</span>

        <q-space />

        <q-btn round flat icon="search" />
        <q-btn round flat>
          <q-icon name="attachment" class="rotate-135" />
        </q-btn>
        <q-btn round flat icon="more_vert">
          <q-menu auto-close :offset="[110, 0]">
            <q-list style="min-width: 150px">
              <q-item clickable>
                <q-item-section>Contact data</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Block</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Select messages</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Silence</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Clear messages</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Erase messages</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :text="[`${message.text} ${message.desc === '' ? '' : message.desc} ${message.id === '' ? '' : ` and ID in IMDB: ${message.id}`}`]"
        :sent="message.from === 'me' ? true : false"
        :stamp="message.time"
      />
    </div>
    <q-footer>
      <q-toolbar class="bg-grey-3 text-black row">
        <q-form class="full-width" @submit="sendMessage">
          <q-input
            v-model="newMessage"
            rounded
            outlined
            placeholder="Type message"
            dense
            autocomplete="off"
          >
            <template v-slot>
              <q-btn color="grey" round dense flat icon="send" type="submit" />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { api, key } from 'src/boot/axios';
import { defineComponent, } from 'vue';


export default defineComponent({

  data() {
    return {
      newMessage: '',
      messages: [],
      avatar: this.$route.query.image,
      title: this.$route.params.name
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage === '') {
        return
      }
      this.messages.push({
        text: this.newMessage,
        from: 'me',
        desc: '',
        id: '',
        time: 'now',
      })
      this.fetchData(this.newMessage)
      this.newMessage = ''
    },
    fetchData(name) {
      api.get(`${key}/${name}}`)
        .then((post) => {
          this.messages.push({
            text: post.data.results[0].title,
            time: 'now', from: 'other',
            desc: post.data.results[0].description,
            id: post.data.results[0].id
          })
        }).catch(() => {
          this.messages.push({ text: 'Not found', time: 'now', from: 'other', decs: '', id: '' })
        })
    },
    back() {
      this.$router.push('/')
    }
  },

})
</script>

<style lang="scss">
.page-chat {
  background: url("../assets/images/backgroundwatsapp.png");
}
</style>