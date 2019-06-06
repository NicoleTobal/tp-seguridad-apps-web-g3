$('.recuperar_btn').on('click', function(){
  var email = $('.input_mail').val();
  $.ajax({
    type: "POST",
    url: "/api/recuperar-password",
    contentType: "application/json",
    data: JSON.stringify({email: email}),
    success: function() {
      alert("Email enviado!");
    },
    error: function() {
      alert("El email no pertenece a un usuario.");
    }
  });
})
