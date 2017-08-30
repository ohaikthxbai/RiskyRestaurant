(function () {
  // body...

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBl9z6xEeC_Vigj7etZu7QlAbxsqhpZKDA",
    authDomain: "risky-rest.firebaseapp.com",
    databaseURL: "https://risky-rest.firebaseio.com",
    projectId: "risky-rest",
    storageBucket: "risky-rest.appspot.com",
    messagingSenderId: "681701686830"
  }; 
  firebase.initializeApp(config);


// get elements
const txtEmail = document.getElementById('txtEmail');

const txtPassword = document.getElementById('txtPassword');

const btnLogin = document.getElementById('btnLogin');

const btnSignUp = document.getElementById('btnSignUp');

const btnLogout = document.getElementById('btnLogout');

btnLogin.addEventListener('click' , e => {

const email = txtEmail.value;

const pass = txtPassword.value;

const auth = firebase.auth();


const promise = auth.signInWithEmailAndPassword(email, pass);


promise.catch(e => console.log(e.message));



});

btnSignUp.addEventListener('click', e =>{


const email = txtEmail.value;

const pass = txtPassword.value;

const auth = firebase.auth();


const promise = auth.createUserWithEmailAndPassword(email, pass);


promise.catch(e => console.log(e.message));


});

btnLogout.addEventListener('click' , e=> {

firebase.auth().signOut();



});


firebase.auth().onAuthStateChanged(firebaseUser => {

if (firebaseUser){
console.log(firebaseUser);

if(firebaseUser) {
  //  window.location = 'dashboard.html'; //After successful login, user will be redirected to home.html
  }

btnLogout.classList.remove('hide');

}else{

console.log('not logged in');

btnLogout.classList.add('hide');

}

});



// var auth = firebase.auth();
// var emailAddress = user;

// auth.sendPasswordResetEmail(emailAddress).then(function() {
//   // Email sent.
// }).catch(function(error) {
//   // An error happened.
// });


}());