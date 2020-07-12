<template>
  <v-container fluid class="pa-0" fill-height>
    <Board
      :lists="lists"
      @listAdded="addList"
      @cardAdded="addCard"
      @addCheckItem="addCheckItem"
    />>
  </v-container>
</template>

<script>
import Board from '../../../../components/kanban/Board'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Board,
  },

  data: () => ({
    lists: [],
  }),
  computed: {
    ...mapGetters('activities', ['activities']),

    /* listActivities() {
      const act = []
      var activity
      for (activity in this.activities) {
        let act2 = {
          id: activity.id,
          name: activity.nombre,
          order: 1,
          labels: [
            { name: '', color: 'green' },
            { name: 'documentation', color: 'cyan', checkItems: [] },
          ],
        }
        act.push(act2)
      }
      console.log(act)
      console.log(this.activities)
      let act3 = [
        {
          id: 1,
          name: 'Backlog',
          order: 1,
          cards: act,
        },
        { id: 2, name: 'To Do', order: 2, cards: [] },
        { id: 3, name: 'Doing', order: 3, cards: [] },
        { id: 4, name: 'Done', order: 4, cards: [] },
      ]
      return act3
    },*/
  },
  created() {
    console.log(this.$route.query.categoria)
    this.fetchActivities({
      id: this.$route.params.id_process,
    })

    //this.fetchProcesses(this.$route.params.id_project)
  },
  methods: {
    ...mapActions('activities', ['fetchActivities']),
    complete(index) {
      this.list[index] = !this.list[index]
    },
    hello(value) {
      alert(value)
    },
    addList(name) {
      this.lists.push({
        id: this.lists.length + 1,
        name,
        cards: this.activities,
        order: this.lists.length + 1,
      })
    },

    addCard(card) {
      const list = this.lists.find((i) => card.list.id === i.id)
      if (!list) return

      list.cards.push({
        id: list.cards.length + 1,
        name: card.name,
        order: list.cards.length + 1,
        checkItems: [],
      })
    },

    addCheckItem(item) {
      const list = this.lists.find((i) => item.card.list.id === i.id)
      if (!list) return
      const card = list.cards.find((c) => c.id === item.card.id)
      if (!card) return
      card.checkItems.push(item.item)
    },
  },
  async mounted() {
    const act = []
    const act_doing = []
    const act_done = []
    //let activity
    let activity = this.activities
    for (let i = 0; i < activity.length; i++) {
      console.log('aqui viene el activity')
      console.log(activity)
      // activity[i].id
      let act2 = await {
        //  id: '1',
        //name: 'test',
        id: activity[i].id,
        name: activity[i].nombre,
        order: 1,
        labels: [
          { name: '', color: 'green' },
          { name: 'documentation', color: 'cyan', checkItems: [] },
        ],
      }
      if (activity[i].estado === '1') {
        act.push(act2)
      } else if (activity[i].estado === '2') {
        act_doing.push(act2)
      } else {
        act_done.push(act2)
      }
    }

    /*for (activity in this.activities) {
      console.log('aqui viene el activity')
      console.log(activity)
      let act2 = await {
        id: activity.id,
        name: activity.nombre,
        order: 1,
        labels: [
          { name: '', color: 'green' },
          { name: 'documentation', color: 'cyan', checkItems: [] },
        ],
      }
      act.push(act2)
    }*/
    console.log(act)
    //console.log(this.activities)
    let act3 = [
      { id: 1, name: 'Por hacer', order: 1, cards: act },
      { id: 2, name: 'Haciendo', order: 2, cards: act_doing },
      { id: 3, name: 'Hecho', order: 3, cards: act_done },
    ]
    //console.log(act3)
    this.lists = act3
    //console.log(this.lists)
  },
}
</script>
