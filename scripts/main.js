'use strict'

function Test(){
  this.checkSetup();

  this.signOutButton = document.getElementById('sign-out');
  this.signInButton = document.getElementById('sign-in');
  this.sendRequestButton = document.getElementById('send-request');

  this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));
  this.sendRequestButton.addEventListener('click', this.sendRequest.bind(this));

  this.initFirebase();
}

Test.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  // this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

Test.prototype.signIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};

Test.prototype.sendRequest = function(idToken){

  // this.auth().currentUser.getToken(/* forceRefresh */ true).then(function(idToken) {
  // console.log("Token 2: "+idToken);

  var body = {
    "process": {
      "name":"test3",
      "description":"",
      "version":2.0,
      "stages":[
        {
          "name":"primera fase",
          "description":"",
          "predecessor":"",
          "activities":[
            {  
              "name_id" : "primera etapa",
              "description":""  
            },
            {
              "name_id" : "",
              "description":""
            }
          ]
        }   
      ]  
    },
    "idToken": idToken, //user.getIdToken().ya,
    "projects":
    [
      {
        "processVersion":1.0,
        "name":"test1 project",
        "description":"",
        "startdate":"",
        "enddate":"",
        "stages":[
          {
            "name":"primera fase",
            "weight":"",
            "activities":[
              {
                "name_id":"",
                "assigments": ["ddd@ddd.com", "jjj@ddd.com"]
              },
              {
                "name_id":"",
                "assigments": ["ddd@ddd.com", "jjj@ddd.com"]
              }
            ]
          }
        ]
      }
    ]
  };

  var settings = {
    // crossDomain: true,
    url: "https://us-central1-theplanid-895f3.cloudfunctions.net/importTemplate",
    dataType : "json",
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "authorization" : idToken
      // "postman-token": "d22c7471-c805-13ba-74c1-69f6ad66242b"
    }
    // beforeSend: function(xhr) { xhr.setRequestHeader('authorization', Idtoken); }
  };

  // settings.contenType = 'application/json';
  settings.data = JSON.stringify(body);

  
  console.log("IMPRIMIR");
  console.log(settings);

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
};

Test.prototype.signOut = function() {
  // Sign out of Firebase.
  this.auth.signOut();
};

Test.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!
    // Get profile pic and user's name from the Firebase user object.
    // var profilePicUrl = user.photoURL;
    // var userName = user.displayName;

    // // Set the user's profile pic and name.
    // this.userPic.style.backgroundImage = 'url(' + (profilePicUrl || '/images/profile_placeholder.png') + ')';
    // this.userName.textContent = userName;

    // Show user's profile and sign-out button.
    // this.userName.removeAttribute('hidden');
    // this.userPic.removeAttribute('hidden');
    this.signOutButton.removeAttribute('hidden');
    this.sendRequestButton.removeAttribute('hidden');

    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');

    // this.sendRequest(user.getToken());

    user.getIdToken().then(function(idToken) {
      //console.log("Token: \n"+idToken)

      var body = {
        "process": {
          "name":"test3",
          "description":"",
          "version":2.0,
          "stages":[
            {
              "name":"primera fase",
              "description":"",
              "predecessor":"",
              "activities":[
                {  
                  "name_id" : "primera etapa",
                  "description":""  
                },
                {
                  "name_id" : "",
                  "description":""
                }
              ]
            }   
          ]  
        },
        "idToken": idToken, //user.getIdToken().ya,
        "projects":
        [
          {
            "processVersion":1.0,
            "name":"test1 project",
            "description":"",
            "startdate":"",
            "enddate":"",
            "stages":[
              {
                "name":"primera fase",
                "weight":"",
                "activities":[
                  {
                    "name_id":"",
                    "assigments": ["ddd@ddd.com", "jjj@ddd.com"]
                  },
                  {
                    "name_id":"",
                    "assigments": ["ddd@ddd.com", "jjj@ddd.com"]
                  }
                ]
              }
            ]
          }
        ]
      };
    
      var settings = {
        // crossDomain: true,
        url: "https://us-central1-theplanid-895f3.cloudfunctions.net/importTemplate",
        dataType : "json",
        method: "POST",
        headers: {
          "content-type": "application/json",
          "cache-control": "no-cache",
          "authorization" : idToken
          // "postman-token": "d22c7471-c805-13ba-74c1-69f6ad66242b"
        }
        // beforeSend: function(xhr) { xhr.setRequestHeader('authorization', Idtoken); }
      };
    
      // settings.contenType = 'application/json';
      settings.data = JSON.stringify(body);
    
      
      console.log("IMPRIMIR");
      console.log(settings);
    
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    }).catch(function(error) {
      //console.log("Token no obtenido");
    });
    

    // We load currently existing chant messages.
    // this.loadMessages();

    // We save the Firebase Messaging Device token and enable notifications.
    // this.saveMessagingDeviceToken();
  } else { // User is signed out!
    // // Hide user's profile and sign-out button.
    // this.userName.setAttribute('hidden', 'true');
    // this.userPic.setAttribute('hidden', 'true');
    this.signOutButton.setAttribute('hidden', 'true');
    this.sendRequestButton.setAttribute('hidden', 'true');

    // Show sign-in button.
    this.signInButton.removeAttribute('hidden');
  }
};

// Checks that the Firebase SDK has been correctly setup and configured.
Test.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  }
};

window.onload = function() {
  window.test = new Test();
};