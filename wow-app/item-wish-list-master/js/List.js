
const List = Vue.component('List',{
    props:{
        items:{
          type: Array,
          required: true
        },
        item_slots:{
            type: Array,
            required: true
        }
    },

    methods:{
        removeIt(item){
            this.$emit('finally-remove-item',item);
        },
        equipIt(item) {
            console.log(item)
            this.$emit('finally-equip-item',item);
        },
        favIt(item){
            this.$emit('finally-fav-item',item);
        },
        addIt(newItem){
            this.$emit('finally-add-item',newItem);
        }
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
                                <ListItem
                                    @remove-item="removeIt" 
                                    @equip-item="equipIt"
                                    @fav-item="favIt"
                                    @add-item="addIt"
                                    :items="equipList"
                                    :islot="item"></ListItem>
                            </v-col>
                            <v-col>
                                <ListItem
                                    @remove-item="removeIt" 
                                    @equip-item="equipIt"
                                    @fav-item="favIt" 
                                    @add-item="addIt"
                                    :items="wantList"
                                    :islot="item"></ListItem>
                            </v-col>
                        </v-row>
                        </v-list-item-group>
                  </v-list>
              </v-card>
          </v-row>

`,

    computed:{

        equipList: function(){
            return this.items.filter(function(item){
                return item.equipped
            })
        },

        wantList: function(){
            return this.items.filter(function(item){
                return !item.equipped
            })
        },
    }
})
