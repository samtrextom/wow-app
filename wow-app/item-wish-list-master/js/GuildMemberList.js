Vue.component('GuildMemberList',{
    props:{
        allUsers:{
            type:Array,
            required:true
        }
    },

    methods: {

    },

    template:`
    <v-flex xs12 sm12 md4 lg3>
        <v-card
        class="mx-auto"
        height="100%"
        max-width="400"
    >
        <v-navigation-drawer
        class="blue-grey darken-3 accent-4"
        dark
        permanent
        width="400"
        >
        <v-list>
            <v-list-item>
                <p>Guild Members</p>
            </v-list-item>
            <v-list-item v-for="(item,i) in allUsers" :key="item.name">
                <div :class="item.characterclass">
                    <strong>{{item.name}}</strong>
                </div>
            </v-list-item>
        </v-list>
        </v-navigation-drawer>
    </v-card>
</v-flex>
`,

    
    
})