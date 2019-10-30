Vue.component('ListItem',{
    props:{
        items: {
            type:Array,
            required: true
        },
        islot:{
            type:String,
            required: true
        }
    },

    data: () => ({
        dialog: false,
        itemName:""
      }),

    methods: {
        removeIt(item) {

            this.$emit('remove-item',item);
        },

        equipIt(item){
            this.$emit('equip-item',item);
        },

        favIt(item){

            this.$emit('fav-item',item);
        },

        addItem(itemName){
            this.dialog=false;
            const newItem = {name:itemName, slot:this.islot}
            this.$emit('add-item',newItem)
        }
    },
//<a href="https://www.wowhead.com/item=49286"><div class="tag">
    template:`
            <div>
                <div v-if="itemList.length>0" class="item">
                    <v-list-item :class="item.itemQuality" v-for="(item, i) in itemList" :key="item.itemName" class="list-group-item grey darken-1">  
                        <v-list-item-content >                          
                            <small class="white--text">{{item.itemInvType}}:</small>
                            <v-list-item-title><a :href="'https://www.classic.wowhead.com/item=' + item.itemId">{{item.itemName}}</a></v-list-item-title>
                            <v-list-item-subtitle class="white--text">
                                <span>Source: </span>
                                <small v-if="item.equipped">Equipped</small>
                                <small v-else>{{item.source}}</small>
                                <span class="item-buttons">
                                    <button v-if="!item.favorite" class="btn btn-tiny" @click="favIt(item)"><i class="far fa-heart"></i></button>
                                    <button v-else class="btn btn-tiny" @click="favIt(item)"><i class="fas fa-heart"></i></button>
                                    <button v-if="!item.equipped" class="btn btn-tiny" @click="equipIt(item)"><i class="fas fa-plus-circle"></i></button>
                                    <button class="btn btn-tiny" @click="removeIt(item)"><i class="fas fa-minus-circle"></i></button>
                                </span>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </div>
                <div v-else>
                    <v-list-item>
                        <v-list-item-content>
                            <p style="color:white; text-size=5;">Add a {{islot}} to your list</p>
                            <v-dialog v-model="dialog" persistent max-width="600px" dark>
                                <template v-slot:activator="{ on }">
                                <v-btn color="grey" dark fab v-on="on" icon style="width:30px;">
                                <v-icon>add</v-icon>
                                </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">Add A New Item To Your List</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="6">
                                                    <v-autocomplete
                                                    label="Item Name"
                                                    :items="nameList"
                                                    v-model="itemName"
                                                    required
                                                    ></v-autocomplete>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                        <small>*indicates required field</small>
                                    </v-card-text>
                                    <v-card-actions>
                                        <div class="flex-grow-1"></div>
                                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                        <v-btn color="blue darken-1" text @click="addItem(itemName)">Add</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </div>
`,

    computed:{

        itemList: function(){
            let newList = this.items.filter(item => item.itemInvType.toUpperCase()==this.islot.toUpperCase())

            return newList
        },

        nameList: function(){
            var newNewList=[]

            db.collection(this.islot).get().then(querySnapshot => {
                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)               
                newList.forEach(element=>{newNewList.push(element.itemName)})               
            })

            return newNewList
        }



    }
})