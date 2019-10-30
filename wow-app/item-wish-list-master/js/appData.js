const navItems= [
    { title: 'Item List', icon: 'dashboard', link:'/home' },
    { title: 'Guild', icon: 'account_box', link:'/guild' }
  ]

const guildNavItems=[
    { title: 'Dungeons', icon: 'dashboard', link:'/guild/dungeon' },
    { title: 'Raids', icon: 'account_box', link:'/guild/raid' },
    { title: 'Crafting', icon: 'person', link:'/guild/crafting'}
]

const tabData=[
    "Dungeons",
    "Raids",
    "Quest",
    "Crafting"
]

const newHelm={
    itemId:"0",
    itemName:"Helm Of The New User",
    itemQuality:"Common",
    itemClass:"Head",
    itemClassId:"",
    itemSubClass:"Cloth",
    itemSubClassId:"",
    itemInvType:"Head",
    itemMedia:"",
    reqLevel:"1",
    source:"Quest",
    phase:"1",
    equipped:true
}

const item_slots=[
    "head",
    "neck",
    "shoulder",
    "back",
    "chest",
    "wrist",
    "hand",
    "waist",
    "leg",
    "feet",
    "finger",
    "trinket",
    "mhweapon",
    "ohweapon",
    "range"
]


const classes=[
    "Druid",
    "Hunter",
    "Mage",
    "Priest",
    "Warrior",
    "Warlock",
    "Rogue",
    "Paladin",
    "Shaman"
]


//initializing the arrays that will hold all of the items
//from the database
//one for each item inv type
const head_items=[]
const neck_items=[]
const shoulder_items=[]
const back_items=[]
const chest_items=[]
const bracer_items=[]
const hands_items=[]
const waist_items=[]
const leg_items=[]
const feet_items=[]
const ring_items=[]
const trinket_items=[]
const weapon_mh_items=[]
const weapon_oh_items=[]
const weapon_range_items=[]

//initializing the arrays that will hold all of the item names
//one for each item inv type
//these will be used in the search function for autopopulate list
const item_names={ 
    head_names:[],
    neck_names:[],
    shoulder_names:[],
    back_names:[],
    chest_names:[],
    bracer_names:[],
    hands_names:[],
    waist_names:[],
    leg_names:[],
    feet_names:[],
    ring_names:[],
    trinket_names:[],
    weapon_mh_names:[],
    weapon_oh_names:[],
    weapon_range_names:[]
}

const colors = [
    {
        src: 'https://gamespot1.cbsistatic.com/uploads/original/172/1720905/3434211-world-of-warcraft-battle-for-azeroth-review-thumb-nologo.jpg'
    },
    {
        src: 'https://vignette.wikia.nocookie.net/wowwiki/images/e/e2/Ragnaros_the_Firelord.png/revision/latest?cb=20110617044003'
    },
    {
        src: 'https://cdn.discordapp.com/attachments/617920458704158753/624082628768694295/unknown.png'
    },
    {
        src: 'https://cdn.discordapp.com/attachments/617920458704158753/617958579034390542/unknown.png'
    }

]