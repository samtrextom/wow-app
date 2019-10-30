
const GuildListItem = Vue.component('GuildListItem',{
    props:{

    },

    methods:{

    },

    template:`
          <v-row>
              <v-card class="mx-auto" width="95%">
                  <v-list class="grey darken-1 white--text">
                    <v-row>
                        <v-col>
                            <v-subheader class="white--text">Equiped Items</v-subheader>
                        </v-col>
                        <v-col>
                            <v-subheader class="white--text">Wanted Items</v-subheader>
                        </v-col>
                    </v-row>
                    
                        <v-list-item-group v-for="(item, i) in item_slots" :key="i">
                        <v-row>
                            <v-col>
                                <ListItem :items="equipList"
                                          :islot="item"></ListItem>
                            </v-col>
                            <v-col>
                                <ListItem :items="wantList"
                                          :islot="item"></ListItem>
                            </v-col>
                        </v-row>
                        </v-list-item-group>
                    
                        <v-list-item-group color="primary">
                              
                        </v-list-item-group>
                  </v-list>
              </v-card>
          </v-row>

`,

    computed:{

    }
})
