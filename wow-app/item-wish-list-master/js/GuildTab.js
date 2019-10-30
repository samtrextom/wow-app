const GuildTab = Vue.component('GuildTab',{
    props:{

          navItems: {
              type: Array,
              required: true
          },
          tabData:{
              type:Array,
              required:true
          }
    },

    methods: {
        logOut(){   
            this.$emit('definately-log-out');
        }

    },

    data: () => ({
        allUsers:[{name:"Guild Members",characterclass:""}],
        masterList:[],
        dungeonList:[{name:"User",source:"Source",itemName:"Item"}],
        raidList:[{name:"User",source:"Source",itemName:"Item"}],
        questList:[],
        craftingList:[]
      }),

    template:`
            <div class="home">
                <v-parallax
                dark
                src="https://art.ngfiles.com/images/364000/364221_tomedwards_wow-guild-website-banner.jpg?f1435330828"
                height="600"
                >
                    <v-row align="center" justify="center">
                        <v-col class="text-center" cols="12">
                            <h1 class="display-1 font-weight-thin mb-4">Wow Best in Slot Picker</h1>
                            <h4 class="subheading">Build your item list today!</h4>
                        </v-col>
                    </v-row>
                </v-parallax>
                
                <v-content class="grey darken-3" fluid grid-list-md text-xs-center >
                        
                    <v-layout justify-center>
                        
                            <v-container grid-list-lg fluid align-center style="width: 90%">
                                
                                <v-layout class="list" >
                                <GuildMemberList  :allUsers="allUsers"></GuildMemberList>
                                <v-row>
                                    <v-card class="mx-auto mt-2" width="95%"  style="background-color:grey;">
                                        <v-tabs
                                        dark
                                        background-color="dark-grey"
                                        show-arrows
                                        
                                        >
                                            <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
                                            <v-tab>Dungeons</v-tab>
                                            <v-tab>Raids</v-tab>
                                            <v-tab>Quests</v-tab>
                                            <v-tab>Crafting</v-tab>
                                            <v-tab-item >
                                            <div>
                                                <v-list dark color="#4a494a">
                                                    <v-list-item v-for="(item, i) in dungeonList" :key="item.itemName">
                                                        <Strong><span :class="item.characterclass">{{item.name}}</span> -> <a :href="'https://www.wowhead.com/item=' + item.itemId" data-wowhead="item={{item.itemId}}">{{item.itemName}}</a> from {{item.source}}</Strong>
                                                    </v-list-item>
                                                </v-list>
                                            </div>     
                                            </v-tab-item>
                                            <v-tab-item>
                                                <div>
                                                    <v-list dark>
                                                        <v-list-item v-for="(item, i) in raidList" :key="item.itemName">
                                                            <Strong>{{item.name}} -> {{item.itemName}} from {{item.source}}</Strong>
                                                        </v-list-item>
                                                    </v-list>
                                                </div>   
                                            </v-tab-item>
                                            <v-tab-item>
                                                <div>
                                                <v-list dark>
                                                    <v-list-item>
                                                    Coming Soon
                                                    </v-list-item>
                                                </v-list>
                                                </div> 
                                            </v-tab-item>
                                            <v-tab-item>
                                                <div>
                                                <v-list dark>
                                                    <v-list-item>
                                                    Coming Soon
                                                    </v-list-item>
                                                </v-list>
                                                </div>  
                                            </v-tab-item>
                                        </v-tabs>
                                    </v-card>
                                </v-row>
                                
                                <Nav @log-out="logOut" :navItems="navItems"></Nav>
                                </v-layout>
                            </v-container>
                        </v-flex>
                    </v-layout>
                </v-content>
            </div>
`,

mounted:function(){

    var userList=[]
    var masterItemList=[]
    var tempRaidList=[]
    var tempDungeonList=[]

    db.collection('users').get().then(querySnapshot => {
        var newVar = querySnapshot.docs.map(doc => doc.data()) 

        newVar.forEach(element=>{
            element.userItems.forEach(item=>{
                console.log(item)
                if((item.source=="Molten Core"||item.source=="Blackwing Liar"||item.source=="Zul'Gurub"||item.source=="Lord Kazzak")&&!item.equipped){
                    var ref="https://www.wowhead.com/item="+item.itemId
                    tempRaidList.push({ref: ref,itemId:item.itemId, characterclass:element.characterclass, name:element.name, source:item.source, itemName:item.itemName})
                }
                else if(!item.equipped&&(item.source=="Blackrock Depths"||item.source=="Dire Maul North"||item.source=="Dire Maul East"||item.source=="Dire Maul West"
                        ||item.source=="Living Stratholme"||item.source=="Lower Blackrock Spire"||item.source=="Upper Blackrock Spire"||
                        item.source=="Scholomance"||item.source=="Sunken Temple"||item.source=="Undead Stratholme")){
                            var ref="https://www.wowhead.com/item="+item.itemId
                            console.log(ref)
                            tempDungeonList.push({ref: ref, itemId:item.itemId, characterclass:element.characterclass, name:element.name, source:item.source, itemName:item.itemName})
                        }
            })
            userList.push({name:element.name, characterclass:element.characterclass})
        })
    })
    console.log(tempRaidList)
    console.log(userList)

    this.dungeonList = tempDungeonList
    this.raidList = tempRaidList
    this.allUsers=userList
}
})