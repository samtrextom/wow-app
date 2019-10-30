
//importing Vuefire which will allow us to easily access the firebase
//documentation:
//https://vuefire.vuejs.org/vuexfire/
Vue.use(Vuefire);

//importing Vuetify which will allow us to syle our page better
//documentation:
//https://vuetifyjs.com/en/getting-started/quick-start
Vue.use(Vuetify);

//creating the router for the website
//this will create the path and the props for all of our page components
//documentation:
//https://router.vuejs.org/
const router = new VueRouter({
    
      ////////////////////////////////////////////////////////////////////////////////////
     ///////////////////ROUTES///////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    //routes is an array of route objects that holds the data for the individual routes
    routes: [
        //this path is our default path that will land you on the login screen if you are not signed in
        {   //URL path
            path: '/',
            //component that will load 
            component: Login,
            //props that will be passed into the component
            props: {
                colors: colors,
                model: 0,
                showArrows: false,
                hideDelimiters: true,
                cycle: true,
                classes: classes,
                signInUser:{},
                newUser: new User
                } 
            },

        //another path to our login screen
        { name: 'Login', path: '/login', component: Login, props: {
            colors: colors,
            model: 0,
            showArrows: false,
            hideDelimiters: true,
            cycle: true,
            classes: classes,
            signInUser:{},
            newUser: new User
        } },

        //path to our "home" page which will require being logged in
        { name: 'Home', path: '/home', component: Home, props:{   
            item_slots: item_slots, 
            navItems: navItems
        } },

        //path to the guild page that will have info of all the users
        {name:"Guild", path: '/guild', component: GuildTab, props:{
            navItems: navItems,
            tabData: tabData
        }},
    ]

});

  //////////////////////////////////////////////////////////////////////////////////
 /////////////////////////////THE APP//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

//creating a new Vue App that will act as our main state component
//and will handle most of the logic
var app = new Vue({
    el: '#app',
    router: router,
    vuetify: new Vuetify({
        theme: {
            themes: {
                dark: {
                    primary: '#263238',
                    secondary: '#616161'
                }
            }
        }
    }),

      //////////////////////////////////////////////////////////////////////////////
     ///////////////////////////DATA///////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    //this is where we have all of the data for the application
    data: {
        //current user
        currentUser: new User,

        allItems:[]
    },

      //////////////////////////////////////////////////////////////////////////
     /////////////////////FUNCTIONS////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    //These will control most of the logic for the App
    methods: {

        //
        addItem(newItem){
            console.log(newItem)
            db.collection(newItem.slot).get().then(querySnapshot => {
                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)
                newList.forEach(element=>{
                    if(element.itemName == newItem.name)
                    {
                        element.itemInvType=newItem.slot
                        element.equipped=false
                        element.favorite=false
                        console.log(element)
                        this.currentUser.userItems.push(element)
                        console.log(this.currentUser.userItems)
                    }
                })
            })
        },

        addUserCollection(newUser){
            
            newUser.userItems.push(newHelm)
            console.log(newUser)
            db.collection('users').add(newUser).then((docRef)=>{
                    console.log('Document Added:',docRef);
                })
                .catch((error)=>{
                    console.log('Failed:',error);
                })
        },

        signIn(signInUser){firebase.auth().signInWithEmailAndPassword(signInUser.email, signInUser.password)
            .then((userData) => {

                console.log(userData)
                db.collection("users").where("uid", "==", userData.user.uid)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        console.log(doc)
                        // doc.data() is never undefined for query doc snapshots
                        app.currentUser = new User(doc.data())
                        app.currentUser.docId = doc.id
                        console.log(app.currentUser)
                        console.log("Is signed in")
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });

                this.$router.push('/home');
            })
            .catch((error) => { this.errorMessage = error.message });
        },

        logOut(){firebase.auth().signOut().then(() => {
            app.currentUser= new User
            this.$router.replace('/')})},

        //
        addUser(newUser){
            firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((userData)=>{
                newUser.uid = userData.user.uid
                this.addUserCollection(newUser)
                this.signIn(newUser)
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("Fail?")
                console.log(errorCode+": "+errorMessage)
            });
        
        },

        saveIt(){
            console.log(app.currentUser.uid)
            db.collection('users')
                .doc(app.currentUser.docId)
                .update({ userItems: app.currentUser.userItems })
                .then(() => {
                console.log('user updated!')
                })
        },

        //
        removeIt(item) {
            app.currentUser.userItems.splice(app.currentUser.userItems.indexOf(item),1)
        },

        //
        equipIt(item){

            console.log(item)
            console.log(app.currentUser.userItems)

            let item1 = app.currentUser.userItems.filter(function(i){
                return i.equipped&&(i.itemInvType==item.itemInvType)
                })

            if(app.currentUser.userItems[app.currentUser.userItems.indexOf(item1[0])])
            {
                if(item1 && !app.currentUser.userItems[app.currentUser.userItems.indexOf(item1[0])].favorite)
                {
                    app.currentUser.userItems.splice(app.currentUser.userItems.indexOf(item1[0]),1)
                }
            }
            app.currentUser.userItems[app.currentUser.userItems.indexOf(item)].equipped = true;
        },

        //
        favIt(item){

            app.currentUser.userItems[app.currentUser.userItems.indexOf(item)].favorite = !app.currentUser.userItems[app.currentUser.userItems.indexOf(item)].favorite;
        },

    },

    mounted: function(){
        /*for(var i =0; i<item_slots.length;i++ ){

            db.collection(item_slots[i]).get().then(querySnapshot => {

                var newVar = querySnapshot.docs.map(doc => doc.data())
                var newList = JSON.parse(newVar[0].list)
                var newNewList=[]

                newList.forEach(element=>{newNewList.push(element.itemName)})
                      
               }
        )}*/
    },
            


    //abby decied to make the nav bar fixed 10.28.2019

    watch: {

    }
    

});
