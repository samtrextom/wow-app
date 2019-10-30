Vue.component('GuildTabNav',{
    props:{
        navItems: {
            type: Array,
            required: true
        }
    },

    methods: {
        logOut(){   
            
            this.$emit('log-out');
        }
    },

    template:`
    <v-flex xs12 sm12 md4 lg3>
        <v-card
        class="mx-auto"
        height="400"
        max-width="400"
    >
        <v-navigation-drawer
        class="blue-grey darken-3 accent-4"
        dark
        permanent
        width="400"
        >
        <v-list>
            <v-list-item
            v-for="item in navItems":key="item.title">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <router-link :to=item.link>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </router-link>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        
        <template v-slot:append>
            <div class="pa-2">
            <v-btn block @click="logOut">Logout</v-btn>
            </div>
        </template>
        </v-navigation-drawer>
    </v-card>
</v-flex>
`,

    mounted:function(){
        
        }
    
})