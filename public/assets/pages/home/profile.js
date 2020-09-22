$( document ).ready(function() {
    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
    var id = getUrlVars()["id"];



    //get user details
    var fullname = "";
    $.ajax({
        type: 'GET',
        url: '/viewProfile?id='+id,
        contentType: 'application/json',
        success: function (result) {
            fullname = result.FNAME +" "+ result.LNAME;
            $("#c_fullname").text(fullname);
            $("#c_title").text(result.TITLE);
            $("#c_fname").text(result.FNAME);
            $("#c_lname").text(result.LNAME);
            $("#c_email").text(result.EMAIL);
            $("#c_phone").text(result.PHONE);
            $("#c_company").text(result.COMPANY);
           
        }
    });
  
  
});