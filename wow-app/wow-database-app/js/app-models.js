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
        source:""
    }
};


// Initialize Firebase
// TODO: Insert firebase config/init here
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
