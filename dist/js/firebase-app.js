$(document).ready(function(){

  $('.splash').delay('2000').fadeOut('slow');

  $('#signup-btn').on('click', signUp);
  $('#login-btn').on('click', login);


  function signUp(event) {
    event.preventDefault();
    console.log("cadastrou")
  }

  function login(event) {
    event.preventDefault();
    console.log("entrou")
  }

});