var database = firebase.database();


$(document).ready(function(){

  $("#map").hide();

  $('.splash').delay('2000').fadeOut('slow');

  $('#initial-login-btn').on('click', loginScreen);
  $('#initial-signup-btn').on('click', signupScreen);
  $('#signup-btn').on('click', signUp);
  $('#login-btn').on('click', login);

  function loginScreen(event) {
    event.preventDefault();
    $(".initial-screen").hide();
    $(".login-area").show();
  }

  function signupScreen(event) {
    event.preventDefault();
    $(".initial-screen").hide();
    $(".signup-area").show();
  }

  function signUp(event) {
    event.preventDefault();
    $(".signup-area").hide();
    $("#map").show();
    $(".weather").show();
    createUser(event);

    console.log("cadastrou")
  }

  function login(event) {
    event.preventDefault();
    $(".login-area").hide();
    $("#map").show();
    $(".weather").show();
    $(".search").show();
    userAuthentication(event);

    console.log("entrou")
  }


  function createUser(event) {
    var email = $('#inputEmail-signup').val();
    var password = $('#inputPassword-signup').val();
    var targetId = event.target.id;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)    
      .then(function(response) {
        var USER_UID = response.user.uid;
        createUserData(USER_UID);
      })
      .catch(function(error) {
        showErrorMessage(error);
      }
    );
  }

  function userAuthentication(event) {
    var targetId = event.target.id;
    var email = $('#inputEmail1').val();
    var password = $('#inputPassword').val();
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(response) {
        var USER_UID = response.user.uid;
        getLocation(USER_UID)
      })
      .catch(function(error) {
        showErrorMessage(error);
      }
    );
  }



  function createUserData(USER_UID) {
    var firstName = $('#name-signup').val();
    var lastName = $('#last-name-signup').val();
    var adress = $("#inputAddress").val();
    database.ref('users/' + USER_UID).push({
      location: adress,
      name: firstName,
      surname: lastName
    });
  }


  function getLocation(USER_UID) {
    database.ref("users/" + USER_UID).once('value')
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log(childData.location)
        return childData.location;
        
      })
    })
  }

  function showErrorMessage(error) {
    console.log("Erro: " + error);
  }

});