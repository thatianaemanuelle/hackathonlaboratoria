var database = firebase.database();


$(document).ready(function(){

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

    console.log("entrou")
  }


  function createUser(event) {
    var email = $('#inputEmail-signup').val();
    var password = $('#inputPassword-signup').val();
    var firstName = $('#name-signup').val();
    var lastName = $('#last-name-signup').val();
    var targetId = event.target.id;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)    
      .then(function(response) {
        var USER_UID = response.user.uid;
        createUserData(USER_UID, firstName, lastName, email);
        window.location = 'main.html?id=' + response.user.uid;
      })
      .catch(function(error) {
        showErrorMessage(error, targetId);
      }
    );
  }






});