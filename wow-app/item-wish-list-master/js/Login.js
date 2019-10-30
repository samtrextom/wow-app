const Login = Vue.component('Login',{

props: {
    colors:{type: Array},
    showArrows:{},
    hideDelimiters:{},
    cycle:{},
    classes: {},
    newUser:{
        required:true
    },
    classes:{
        type:Array,
        required:true
    },
    signInUser:{
        required:true
    }
},

data: () => ({
    dialog: false,
    alertsuccess: false
  }),

methods: {
    addUser(){ 
        this.dialog=false;
        this.$emit('add-user',this.newUser);
    },
    signIn(){
        alertsuccess=true
        this.$emit('sign-in', this.signInUser);
    }
},

template: `
            <v-app id="inspire">
                <v-content>
                <v-container
                    fluid
                    fill-height
                    id="login"
                >
                <v-layout align-center justify-center >
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12" height="350px" flat
                    color="#60676e"
                    dark>
                    <v-toolbar color="#60676e" dark flat >
                        <v-toolbar-title>Login</v-toolbar-title>
                        <v-spacer></v-spacer>
                            
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                            <v-text-field
                                label="Email"
                                name="email"
                                v-model="signInUser.email"
                                prepend-icon="person"
                                type="email"
                            ></v-text-field>

                            <v-text-field
                                id="password"
                                label="Password"
                                v-model="signInUser.password"
                                name="password"
                                prepend-icon="lock"
                                type="password"
                            ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-row justify="center">
                            <v-dialog v-model="dialog" max-width="800px" dark>
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" v-on="on">Register</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Tells Us About Yourself</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="newUser.name" label="User Name" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="newUser.email" label="Email" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="newUser.password" label="Password" ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-select
                                            :items="classes"
                                            label="Select Your Class"
                                            v-model="newUser.characterclass"
                                            required
                                        ></v-select>
                                    </v-col>
                                </v-card-text>
                                <v-card-actions>
                                    <div class="flex-grow-1"></div>
                                    <v-btn color="red" @click="dialog=false" >Close</v-btn>
                                    <v-btn color="blue darken-1" @click="addUser">Register</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                            </v-row>
                            <v-btn color="primary" @click="signIn">Login</v-btn>
                        </v-card-actions>
                        </v-card>
                        </v-flex>
                        <v-flex xs12 sm8 md4>

                        <v-carousel
                        height="100%"
                        :show-arrows="showArrows"
                        :hide-delimiters="hideDelimiters"
                        :cycle="cycle"
                        >
                        <v-carousel-item
                        v-for="(img, i) in colors"
                        :key="i"
                        :src="img.src"
                        id="carousel-item"
                        style="height:350px;width:auto;">
                        <v-sheet
                        v-for="(img ,i) in loginImages"
                            :key="i"
                            :src="img.src"
                            reverse-transition="fade-transition"
                            transition="fade-transition"
                            min-height="350px"
                            tile
                            
                        >
                            <v-row
                            class="fill-height"
                            align="center"
                            justify="center"
                            >
                            <div class="display-3">Slide {{ i + 1 }}</div>
                            </v-row>
                        </v-sheet>
                        </v-carousel-item>
                        </v-carousel>
                        </v-flex>
                    </v-layout>
                </v-container>
                </v-content>
                <v-alert 
                v-model="alertsuccess"
                dismissible
                close-text="Close Alert"
                type="success">
                    Logged In!
                </v-alert>
            </v-app>
            </div>
            `,
    computed:{
         
    }
})