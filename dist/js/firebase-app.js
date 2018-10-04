$(document).ready(function(){

  $('.splash').delay('2000').fadeOut('slow');

  $('#initial-login-btn').on('click', loginScreen);
  $('#signup-btn').on('click', signUp);
  $('#login-btn').on('click', login);

  function loginScreen(event) {
    event.preventDefault();
    $(".initial-screen").hide();
    $(".login-area").show();
  }

  function signUp(event) {
    event.preventDefault();
    console.log("cadastrou")
  }

  function login(event) {
    event.preventDefault();
    console.log("entrou")
  }

});