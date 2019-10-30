Vue.use(Vuefire);

//App used specifically for database writing from the Blizzard API

//documentation for the API can be found here
//https://develop.battle.net/documentation/api-reference/world-of-warcraft-classic-game-data-api

//specifically using the 'item' GET in order to get the items to our database in order to add additional attributes
//including SOURCE----so we can filter items on members lists to locations on where to find the items
//this will allow us to create an application that a group of WoW players can find the right activities for members to do
//also including PHASE--- this is so that later in the app dev cycle we can add a function to filter items by which content phase
//they will be realsed in


// Initialize App
var app = new Vue({
    // el: the DOM element to be replaced with a Vue instance
    el: '#app',

    // data: all the data for the app
    data: {
        //intialling the data that we will be using in the app
        //item is an instance of the model that we created in app-model.js
        // added, failed and dne(did not exist) are variables used to keep track of items being added to the database
        newItem:new Item(),
        items:[],
        head_items:[],
        added: 0,
        failed: 0,
        dne: 0
    },

    firestore: {
        // bind as an array by default
        //items: db.collection('items')
    },

    // methods: usually "events" triggered by v-on:
    methods: {

        //method to add the item tot he database
        addItem(){

            //creating a new object of the item
            let theItem = this.newItem;
            //calling the collection in the datbase'items' which we are putting the items into
            //this adds the items to the collection as documents and the we log the results to the console for trouble shooting
            db.collection('items')
                .add(theItem)
                .then((docRef)=>{
                    console.log('Document Added:',docRef);
                })
                .catch((error)=>{
                    console.log('Failed:',error);
                })
        },

        

    searchItems(){
        //for loop to loop through all the items in the classic wow database.
        //the API can search for items based on the item ID
        //this loop will loop through all the items and filter the Weapons and Armor that we want for the app
        //because the API can only request items based on item ID we wanted to add the items to our own database so we can apply a "Source" attribute and a "Phase" attribute
        //having the items in our own databaes allows the users to search for the items with the item name and this allows for the user to not have to look up item ids or enter items
        //that dont exist

        for(var id = 19019; id < 19020; id++)
        {
            var unique = true;
            console.log(this.items)
            //looping through all the items in the database and checking if the item aleady exists
            // documents.forEach(element => {
            //     console.log(element.itemId)
            //     if(id===element.itemId)
            //     {
                    
            //         //if the item already exists in the database we arent added a new one
            //         console.log(id+" already exists")
            //         unique = false;
            //     }
            // });

            //going thru with the API if the item does not already exist in the database
            if(unique){
           //the blizzard API requires an access token so we made a variable that will hold the most recent access token and appened it to the url string
           //we all have the item id as a variable in the url string in order to search a different item each time through the loop
            let accessToken = 'US13cSI5P1QeNGk39cYUJ5RL4YoD3FnbPM';
            let url = 'https://us.api.blizzard.com/data/wow/item/'+id+'?namespace=static-classic-us&locale=en_US&access_token='+accessToken;

            //checking to see what the url is everytime thorugh the loop
            console.log(url);

            //making the api call with ajax
            $.get(url)
                .then(response => {

                    //logging the response of the call which can be found at https://develop.battle.net/documentation
                    console.log(response);

                    //setting the object newItem to all the data that we want from the response
                    this.newItem.itemId = response.id;
                    this.newItem.itemName = response.name;
                    this.newItem.itemClass = response.item_class.name;
                    this.newItem.itemClassId = response.item_class.id;
                    this.newItem.itemSubClass = response.item_subclass.name;
                    this.newItem.itemSubClassId = response.item_subclass.id;
                    this.newItem.itemInvType = response.inventory_type.name;
                    this.newItem.reqLevel = response.required_level;
                    this.newItem.itemQuality = response.quality.name;
                    this.newItem.itemMedia = response.media.key.href;
                    this.newItem.source = "";
                    this.newItem.phase="";
                    

                    //logging some information to see which item was called
                    console.log("Item Id: "+this.newItem.itemId);
                    console.log("Item Name: "+this.newItem.itemName);
                    console.log("Required Level: "+this.newItem.reqLevel);
                    console.log("Item Quality: "+this.newItem.itemQuality);
                    console.log("Item Class Id: "+this.newItem.itemClassId);

                    //checking to see if the item is a weapon (itemClass==2) or a peice of armor (itemClass==4)
                    //checking to see if the item has a required item level of 49
                    ///////////this is because we deemed this the level in the game where itemization starts to become important to your characters development
                    //lastly checking to see if the item quality is at least "Rare" this allows for us to filter out the lesser quality items that people wont be looking to obtain

                    if(
                        (this.newItem.itemClassId==4||this.newItem.itemClassId==2)
                        &&
                        response.level>=54
                        &&
                        (this.newItem.itemQuality=="Legendary"||this.newItem.itemQuality=="Epic"||this.newItem.itemQuality=="Rare")
                        )
                    {
                        //if the items pass this chek than we print that the item was added on the screen and log the remaining attributes just to trouble shoot
                        $('#app').append('<div>'+this.newItem.itemName+' Was Added!</div>')
                        console.log("PASSED!!!!!!!!!")
                        console.log("Item Class: "+this.newItem.itemClass);
                        console.log("Item Sub Class: "+this.newItem.itemSubClass);
                        console.log("Item Sub Class Id: "+this.newItem.itemSubClassId);
                        console.log("Item InvType: "+this.newItem.itemInvType);
                        
                        //logging the item
                        //incrementing the added total so we can push that to the page and see the amount of items that were added
                        //calling the addItem method to add the newItem to the database
                        console.log(this.newItem)
                        this.added++;
                        this.addItem()
                    }
                    else{
                        //if the item didnt pass the checks that we set then we increment the failed total
                        this.failed++;
                    }
                    // after the check we clear the newItem and the added and failed divs so we can push the new information from the failed/added totals to the site
                    this.newItem = new Item();
                    $('#added').empty();
                    $('#failed').empty();
                    $('#added').append('<div>'+this.added+' Items Were Added</div>');
                    $('#failed').append('<div>'+this.failed+' Failed!</div>');
                })
                .catch((error)=>{
                    //the catch statement returns a count for items that did not exist and also pushes the total to the site and logs the error
                    this.dne++;
                    $('#dne').empty();
                    $('#dne').append('<div>'+this.dne+' Does Not Exsist!</div>')
                    console.log(error,"Item was not found")
                });
            }
        }
        //returns the total of items in the DB
        console.log(this.items.length)
    

    var nameList={
        headNames:"",
        backNames:"",
        shoulderNames:"",
        backNames:"",
        chestNames:"",
        wristNames:"",
        handNames:"",
        waistNames:"",
        legNames:"",
        feetNames:"",
        fingerNames:"",
        trinketNames:"",
        mainhandNames:"",
        offhandNames:"",
        rangeNames:""
    }
    
    var head_items=[]
    var neck_items=[]
    var shoulder_items=[]
    var back_items=[]
    var chest_items=[]
    var bracer_items=[]
    var hands_items=[]
    var waist_items=[]
    var leg_items=[]
    var feet_items=[]
    var ring_items=[]
    var trinket_items=[]
    var weapon_mh_items=[]
    var weapon_oh_items=[]
    var weapon_range_items=[]

    var items=[]




        db.collection('items').get().then(querySnapshot => {
            items = querySnapshot.docs.map(doc => doc.data())

            //after we have the array of the documents in the collection of 'items'
            //we can then go through the entire list and add them to the appropriate array of items
            //based on the itemInvType attribute
            //this will allow us to later search and use item data based on the itemInvType later
            items.forEach(element => {
                var itemCase = element.itemInvType

                //switching through the array
                switch(itemCase){
                    case "Head":{
                        head_items.push(element)
                        break
                    }
                    case "Neck":{
                        neck_items.push(element)
                        break
                    }
                    case "Shoulder":{
                        shoulder_items.push(element)
                        break
                    }
                    case "Back":{
                        back_items.push(element)
                        break
                    }
                    case "Chest":{
                        chest_items.push(element)
                        break
                    }
                    case "Wrist":{
                        bracer_items.push(element)
                        break
                    }
                    case "Hands":{
                        hands_items.push(element)
                        break
                    }
                    case "Waist":{
                        waist_items.push(element)
                        break
                    }
                    case "Legs":{
                        leg_items.push(element)
                        break
                    }
                    case "Feet":{
                        feet_items.push(element)
                        break
                    }
                    case "Finger":{
                        ring_items.push(element)
                        break
                    }
                    case "Trinket":{
                        trinket_items.push(element)
                        break
                    }

                    //weapons/items that can be used in the off hand include "Held In Off-hand","Off Hand" and "One-Hand" InvType
                    case "Held In Off-hand":{
                        weapon_oh_items.push(element)
                        break
                    }
                    case "Off Hand":{
                        weapon_oh_items.push(element)
                        break
                    }

                    //weapons that can be used in the main hand include "Main Hand", "One-Hand" and "Two-Hand" InvType
                    case "Main Hand":{
                        weapon_mh_items.push(element)
                        break
                    }
                    case "One-Hand":{
                        weapon_mh_items.push(element)
                        weapon_oh_items.push(element)
                        break
                    }
                    case "Two-Hand":{
                        weapon_mh_items.push(element)
                        break
                    }

                    //weapons that can be used in the ranged slot include "Ranged" and "Relic" InvType
                    case "Ranged":{
                        weapon_range_items.push(element)
                        break
                    }
                    case "Relic":{
                        weapon_range_items.push(element)
                        break
                    }
                    default:{
                        //displays any itemInvType that we may have missed
                        console.log("Missing: "+itemCase)
                    }     
                }
                
            })
            console.log(head_items)

            var head = JSON.stringify(head_items)
            var neck = JSON.stringify(neck_items)
            var shoulder = JSON.stringify(shoulder_items)
            var back = JSON.stringify(back_items)
            var chest = JSON.stringify(chest_items)
            var wrist = JSON.stringify(bracer_items)
            var hand = JSON.stringify(hands_items)
            var waist = JSON.stringify(waist_items)
            var leg = JSON.stringify(leg_items)
            var feet = JSON.stringify(feet_items)
            var finger = JSON.stringify(ring_items)
            var trinket = JSON.stringify(trinket_items)
            var weaponMH = JSON.stringify(weapon_mh_items)
            var weaponOH = JSON.stringify(weapon_oh_items)
            var weaponRange = JSON.stringify(weapon_range_items)

            db.collection('head').add({list:head}).then((docRef)=>{
                console.log('Document Added:',docRef);
            })
            .catch((error)=>{
                console.log('Failed:',error);
            })

            db.collection('neck').add({list:neck}).then((docRef)=>{
                console.log('Document Added:',docRef);
            })
            .catch((error)=>{
                console.log('Failed:',error);
            })

            db.collection('shoulder').add({list:shoulder}).then((docRef)=>{
                console.log('Document Added:',docRef);
            })
            .catch((error)=>{
                console.log('Failed:',error);
            })

            db.collection('back').add({list:back}).then((docRef)=>{
                console.log('Document Added:',docRef);
            })
            .catch((error)=>{
                console.log('Failed:',error);
            })

            db.collection('chest').add({list:chest}).then((docRef)=>{
                console.log('Document Added:',docRef);
            })
            .catch((error)=>{
                console.log('Failed:',error);
            })

            db.collection('wrist').add({list:wrist}).then((docRef)=>{
                console.log('Document Added:',docRef);
            })
            .catch((error)=>{
                console.log('Failed:',error);
            })

            db.collection('hand').add({list:hand}).then((docRef)=>{
                console.log('Document Added:',docRef);
            })
            .catch((error)=>{
                console.log('Failed:',error);
            })

            db.collection('waist').add({list:waist}).then((docRef)=>{
                console.log('Document Added:',docRef);
            })
            .catch((error)=>{
                console.log('Failed:',error);
            })

            db.collection('leg').add({list:leg}).then((docRef)=>{
                console.log('Document Added:',docRef);
            })
            .catch((error)=>{
                console.log('Failed:',error);
            })

            db.collection('feet').add({list:feet}).then((docRef)=>{
                console.log('Document Added:',docRef);
            })
            .catch((error)=>{
                console.log('Failed:',error);
            })
            db.collection('finger').add({list:finger}).then((docRef)=>{
                console.log('Document Added:',docRef);
            })
            .catch((error)=>{
                console.log('Failed:',error);
            })
            db.collection('trinket').add({list:trinket}).then((docRef)=>{
                console.log('Document Added:',docRef);
            })
            .catch((error)=>{
                console.log('Failed:',error);
            })
            db.collection('mhweapon').add({list:weaponMH}).then((docRef)=>{
                console.log('Document Added:',docRef);
            })
            .catch((error)=>{
                console.log('Failed:',error);
            })
            db.collection('ohweapon').add({list:weaponOH}).then((docRef)=>{
                console.log('Document Added:',docRef);
            })
            .catch((error)=>{
                console.log('Failed:',error);
            })
            db.collection('range').add({list:weaponRange}).then((docRef)=>{
                console.log('Document Added:',docRef);
            })
            .catch((error)=>{
                console.log('Failed:',error);
            })

        console.log(head)
        })
            
            db.collection(this.item_slots[0]).get().then(querySnapshot => {
                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)
                var newNewList=[]
                newList.forEach(element=>{newNewList.push(element.itemName)})
                var list = JSON.stringify(newNewList)
                nameList.headNames=list
            })
            db.collection(this.item_slots[1]).get().then(querySnapshot => {
                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)
                var newNewList=[]
                newList.forEach(element=>{newNewList.push(element.itemName)})
                var list = JSON.stringify(newNewList)
                nameList.neckNames=list
            })
            db.collection(this.item_slots[2]).get().then(querySnapshot => {
                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)
                var newNewList=[]
                newList.forEach(element=>{newNewList.push(element.itemName)})
                var list = JSON.stringify(newNewList)
                nameList.shoulderNames=list
            })
            db.collection(this.item_slots[3]).get().then(querySnapshot => {
                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)
                var newNewList=[]
                newList.forEach(element=>{newNewList.push(element.itemName)})
                var list = JSON.stringify(newNewList)
                nameList.backNames=list
            })
            db.collection(this.item_slots[4]).get().then(querySnapshot => {
                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)
                var newNewList=[]
                newList.forEach(element=>{newNewList.push(element.itemName)})
                var list = JSON.stringify(newNewList)
                nameList.chestNames=list
            })
            db.collection(this.item_slots[5]).get().then(querySnapshot => {
                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)
                var newNewList=[]
                newList.forEach(element=>{newNewList.push(element.itemName)})
                var list = JSON.stringify(newNewList)
                nameList.wristNames=list
            })
            db.collection(this.item_slots[6]).get().then(querySnapshot => {
                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)
                var newNewList=[]
                newList.forEach(element=>{newNewList.push(element.itemName)})
                var list = JSON.stringify(newNewList)
                nameList.handNames=list
            })
            db.collection(this.item_slots[7]).get().then(querySnapshot => {
                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)
                var newNewList=[]
                newList.forEach(element=>{newNewList.push(element.itemName)})
                var list = JSON.stringify(newNewList)
                nameList.waistNames=list
            })
            db.collection(this.item_slots[8]).get().then(querySnapshot => {
                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)
                var newNewList=[]
                newList.forEach(element=>{newNewList.push(element.itemName)})
                var list = JSON.stringify(newNewList)
                nameList.legNames=list
            })
            db.collection(this.item_slots[9]).get().then(querySnapshot => {
                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)
                var newNewList=[]
                newList.forEach(element=>{newNewList.push(element.itemName)})
                var list = JSON.stringify(newNewList)
                nameList.feetNames=list
            })
            db.collection(this.item_slots[10]).get().then(querySnapshot => {
                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)
                var newNewList=[]
                newList.forEach(element=>{newNewList.push(element.itemName)})
                var list = JSON.stringify(newNewList)
                nameList.fingerNames=list
            })
            db.collection(this.item_slots[11]).get().then(querySnapshot => {
                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)
                var newNewList=[]
                newList.forEach(element=>{newNewList.push(element.itemName)})
                var list = JSON.stringify(newNewList)
                nameList.trinketNames=list
            })
            db.collection(this.item_slots[12]).get().then(querySnapshot => {
                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)
                var newNewList=[]
                newList.forEach(element=>{newNewList.push(element.itemName)})
                var list = JSON.stringify(newNewList)
                nameList.mainhandNames=list
            })
            db.collection(this.item_slots[13]).get().then(querySnapshot => {
                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)
                var newNewList=[]
                newList.forEach(element=>{newNewList.push(element.itemName)})
                var list = JSON.stringify(newNewList)
                nameList.offhandNames = list
            })
            db.collection(this.item_slots[14]).get().then(querySnapshot => {
                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)
                var newNewList=[]
                newList.forEach(element=>{newNewList.push(element.itemName)})
                var list = JSON.stringify(newNewList)
                nameList.rangeNames=list
            })
    }
},

    // computed: values that are updated and cached if dependencies change
    computed: {

    },

    //mounted:  called after the instance has been mounted,
    mounted: function() {

    },

    // watch: calls the function if the value changes

    watch: {

    }
});

