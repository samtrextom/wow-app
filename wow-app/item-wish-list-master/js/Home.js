const Home = Vue.component('Home',{
    props:{
        user:{required: true},
        item_slots:{type: Array, required: true},
        navItems: {type: Array, required: true}
    },

    data: () => ({
        savealert: false
      }),

    methods: {
        removeIt(item){
            this.$emit('definately-remove-item',item);
        },
        equipIt(item) {
            this.$emit('definately-equip-item',item);
        },
        favIt(item){
            this.$emit('definately-fav-item',item);
        },
        addIt(newItem){
            this.$emit('definately-add-item',newItem);
        },
        logOut(){   
            this.$emit('definately-log-out');
        },
        saveIt(){
            this.savealert=true
            this.$emit('save-it');
        }

    },

    template:`
            <div class="home">
                <v-parallax
                dark
                src="https://art.ngfiles.com/images/364000/364221_tomedwards_wow-guild-website-banner.jpg?f1435330828"
                height="600"
                >
                    <v-row align="center" justify="center">
                        <v-col class="text-center" cols="12">
                            <h1 class="display-1 font-weight-thin mb-4">Welcome {{user.name}}</h1>
                            <h1 class="display-1 font-weight-thin mb-4">Wow Best in Slot Picker</h1>
                            <h4 class="subheading">Build your item list today!</h4>
                        </v-col>
                    </v-row>
                </v-parallax>
                
                <v-content class="grey darken-3" fluid grid-list-md text-xs-center >
                <v-alert 
                    fixed
                    top
                    v-model="savealert"
                    dismissible
                    close-text="Close Alert"
                    type="success">Saved!</v-alert>                
                    <v-layout justify-center>                        
                            <v-container grid-list-lg fluid align-center style="width: 90%">                                
                                <v-layout class="list" >
                                

                                    <List 
                                        @finally-remove-item="removeIt"
                                        @finally-equip-item="equipIt"
                                        @finally-fav-item="favIt"
                                        @finally-add-item="addIt"
                                        :items="items"
                                        :item_slots="item_slots">
                                    </List>

                                    <Nav
                                    @log-out="logOut"
                                    :navItems="navItems"
                                    ></Nav>
                                </v-layout>
                            </v-container>
                        </v-flex>
                    </v-layout>
                </v-content>
                <v-btn color="grey" dark fab fixed bottom right  @click="saveIt">
                    <v-icon>save</v-icon>
                </v-btn>
                
            </div>
`,
computed:{
    items: function(){
        return this.user.userItems
    },
}
})
