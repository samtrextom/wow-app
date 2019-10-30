// Item Model
var Item = function(){
    return {
        itemId:"",
        itemName:"",
        itemQuality:"",
        itemClass:"",
        itemClassId:"",
        itemSubClass:"",
        itemSubClassId:"",
        itemInvType:"",
        itemMedia:"",
        reqLevel:"",
        source:"",
        phase:"",
        equipped:""
    }
};

var User = function(firebaseUser){
    let user = {
        name: '',
        email: '',
        characterclass: '',
        uid: '',
        userItems:[],
    }

    if(firebaseUser){
        user.name = firebaseUser.name ? firebaseUser.name : '';
        user.email = firebaseUser.email ? firebaseUser.email : '';
        user.characterclass = firebaseUser.characterclass ? firebaseUser.characterclass : '';
        user.uid = firebaseUser.uid ? firebaseUser.uid : '';
        user.userItems = firebaseUser.userItems ? firebaseUser.userItems : '';
    }

    return user;
}


// Initialize Firebase
// TODO: Insert firebase config/init here
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBKdyYt9vsJKwSwFLZkadd3Eo77dxQAe58",
    authDomain: "wow-item-database.firebaseapp.com",
    databaseURL: "https://wow-item-database.firebaseio.com",
    projectId: "wow-item-database",
    storageBucket: "wow-item-database.appspot.com",
    messagingSenderId: "509245571819",
    appId: "1:509245571819:web:de4f388cb27ce9fa1534ae"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
