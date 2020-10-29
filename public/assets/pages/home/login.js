$( document ).ready(function() {
    $("#loginBtn").on("click", function(event){
        event.preventDefault();
        var userData = {
            username :   $("#username").val(),
            password :   $("#password").val()
            
          };
        $.ajax({
            url: '/loginDetails',
            type: 'POST',
            data: userData,
            dataType: 'json',
            success: function(){
               window.location.href = '/';                
            },
            error:  function(err){
                console.log(err);
                
                
            },
        })
    })
})
