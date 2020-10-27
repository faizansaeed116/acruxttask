
$( document ).ready(function() {
  $('#search_user').on('click', function () {
        
    $('#DataTables_Table_0').DataTable().ajax.reload(null, false);
    
});
    var table = $('.datatable-generated').DataTable({
      dom: '<"rt<"bottom"ipl><"clear">',
      ajax: {
        url: '/getContactsList',
        type: 'POST',
        data: function (data) {
          var search_val = {
              's_email': $('#s_email').val(),
              's_fname': $('#s_fname').val(), 
              's_lname': $('#s_lname').val(),
              's_city':  $('#s_city').val(), 
          };
          data.search = search_val;
          return data;
        }
      },
      initComplete: function () {
          $(".datatable-scroll").removeClass('table-responsive').addClass('table-responsive');
      },
      rowCallback: function (row, data) {
          $(row).attr('id', data.ID);
      },
      orderable:true,
        pageLength: 10,
        lengthMenu: [10, 50, 100, 150, "All"],
        processing:true,
        serverSide: true, 
        regex: true,
        ordering: [[0,'asc']],
        columns: [
            {   title: "NAME",  
                render: function (row, type, val, meta) {
                  var name ='';
                  name += val.FNAME+" ";
                  if(val.MNAME)
                    name += val.MNAME+" ";
                  if(val.LNAME)
                    name += val.LNAME;
                  return name;
            }
            },
            {   title: "EMAIL",   data: "EMAIL"},
            {   title: "PHONE NO",data: "PHONE"},
            {   title: "ADDRESS", 
                render: function (row, type, val, meta) {
                  var address ='';
                  address += val.ADDRESS +" "+val.CITY;
                  return address;
              }
            },
            {   title: "COMPANY", data: "COMPANY"},
            {
                title: 'Action',
                className: "text-center",
                orderable: false,
                    render: function (row, type, val, meta) {
                      
                    return `<div class="list-icons">
                    <a href="#"  class="list-icons-item text-primary-600 edit_user" onclick="viewProfile(this)">
                    <i class="icon-eye"></i></a>
                    <a href="#"  class="list-icons-item text-primary-600 edit_user" onclick="getUser(this)" id="edit_data" data-toggle="modal" data-target="#editUser" data-backdrop="static" data-keyboard="false">
                    <i class="icon-pencil7"></i></a>
                    <a href="#"  class="list-icons-item text-danger-600" onClick="deleteUser(this)">
                    <i class="icon-trash"></i></a>
                  </div>`;
                }
            },
          ],

      });
       
    
    //Add User
    $("#addUser").on('click', function(e) {
      $('#usergender').select2({
        placeholder: "Select"
      });
      e.preventDefault();
      var userData = {
        firstname :    $("#firstname").val(),
        middlename :   $("#middlename").val(),
        lastname :     $("#lastname").val(),
        useremail :    $("#useremail").val(),
        userphone :    $("#userphone").val(),
        useraddress :  $("#useraddress").val(),
        usercity :     $("#usercity").val(),
        usergender :   $("#usergender option:selected" ).text(),
        usercompany :  $("#usercompany").val(),
        usertitle :    $("#usertitle").val(),
        userrole :     $("#userrole").val(),
        username :     $("#username").val(),
        userpass :     $("#userpass").val(),
        confirm_userpass :     $("#confirm_userpass").val(),
      };
      $(".error").remove();
      if ($.trim(userData.firstname).length == 0) {
        $('#firstname').after('<span class="error">Full Name is required</span>'); 
      }

      if ($.trim(userData.lastname).length == 0) {
        $('#lastname').after('<span class="error">Last Name is required</span>'); }

      if ($.trim(userData.useremail).length == 0) {
        $('#useremail').after('<span class="error">Email is required</span>');
      }

      if ($.trim(userData.userphone).length == 0) {
        $('#userphone').after('<span class="error">Phone Number is required</span>');
      }

      if ($.trim(userData.useraddress).length == 0) {
        $('#useraddress').after('<span class="error">Address is required</span>');
      }
      if ($.trim(userData.username).length == 0) {
        $('#username').after('<span class="error">Username is required</span>');
      }
      if ($.trim(userData.usercompany).length == 0) {
        $('#usercompany').after('<span class="error">Address is required</span>');
      }
      if ($.trim(userData.userpass).length = 0) {
        $('#userpass').after('<span class="error">Password is required</span>');
      }
      if ($.trim(userData.userpass).length <= 7) {
        $('#userpass').after('<span class="error">Password should be atleast 8 character</span>');
      }
      if ($.trim(userData.confirm_userpass).length == 0) {
        $('#confirm_userpass').after('<span class="error">Confirm Password is required</span>');
      }else if ($.trim(userData.confirm_userpass) !== $.trim(userData.userpass)) {
        $('#confirm_userpass').after('<span class="error">Pssword Confirmation is not match with Password input</span>');
      }else{
         // DO POST
        $.ajax({
          type : 'POST',
          url : '/adduser',
          data : userData,
          dataType: 'json',
          success : function(data) {
            if (!data.success) {
              if (data.errors.firstname) {
                $('#firstname').after('<span class="error">'+data.errors.firstname+'</span>');
              }
              if (data.errors.middlename) {
                $('#middlename').after('<span class="error">'+data.errors.middlename+'</span>');
              }
              if (data.errors.lastname) {
                $('#lastname').after('<span class="error">'+data.errors.lastname+'</span>');
              }
              if (data.errors.userphone) {
                $('#userphone').after('<span class="error">'+data.errors.userphone+'</span>');
              }
              if (data.errors.useraddress) {
                $('#useraddress').after('<span class="error">'+data.errors.useraddress+'</span>');
              }
              if (data.errors.useremail) {
                  $('#useremail').after('<span class="error">'+data.errors.useremail+'</span>');
              }
              if (data.errors.username) {
                $('#username').after('<span class="error">'+data.errors.username+'</span>');
            }
              
            }else{
              
              $("#add_form").trigger("reset");
              $(".error").remove();
              $("#addNewUser").modal("hide");
              $('#DataTables_Table_0').DataTable().ajax.reload(null, false);
              bootbox.alert({
                title: 'User Added!',
                message: 'User has been Added Successfuly.'

              });
            }
          },
          error : function(e) {
            alert("Error!", e);
            console.log("ERROR: ", e);
          }
      });
    }

    });


    //Update User Details
   
    $("#updateUser").on('click', function(e) {
    
      e.preventDefault();
      var userData = {
        id :           $("#e_iid").val(),
        firstname :    $("#e_firstname").val(),
        middlename :   $("#e_middlename").val(),
        lastname :     $("#e_lastname").val(),
        useremail :    $("#e_useremail").val(),
        userphone :    $("#e_userphone").val(),
        useraddress :  $("#e_useraddress").val(),
        usercity :     $("#e_usercity").val(),
        usergender :   $("#e_usergender option:selected" ).text(),
        usercompany :  $("#e_usercompany").val(),
        usertitle :    $("#e_usertitle").val(),
        userrole :     $("#e_userrole").val(),
        userpass :     $("#e_userpass").val(),
        confirm_userpass :     $("#e_confirm_userpass").val(),
      };
      $(".error").remove();
      if ($.trim(userData.firstname).length == 0) {
        $('#e_firstname').after('<span class="error">Full Name is required</span>'); 
      }
      if ($.trim(userData.lastname).length == 0) {
        $('#e_lastname').after('<span class="error">Last Name is required</span>'); }

      if ($.trim(userData.useremail).length == 0) {
        $('#e_useremail').after('<span class="error">Email is required</span>');
      }
      if ($.trim(userData.userphone).length == 0) {
        $('#e_userphone').after('<span class="error">Phone Number is required</span>');
      }
      if ($.trim(userData.useraddress).length == 0) {
        $('#e_useraddress').after('<span class="error">Address is required</span>');
      }
      if ($.trim(userData.usercompany).length == 0) {
        $('#e_usercompany').after('<span class="error">Address is required</span>');
      }
      
      if ($.trim(userData.userpass).length > 0) {
        if ($.trim(userData.userpass).length <= 7) {
          $('#e_userpass').after('<span class="error">Password should be atleast 8 character</span>');
        }
        if ($.trim(userData.confirm_userpass).length == 0) {
          $('#e_confirm_userpass').after('<span class="error">Confirm Password is required</span>');
        }else if ($.trim(userData.confirm_userpass) !== $.trim(userData.userpass)) {
          $('#e_confirm_userpass').after('<span class="error">Pssword Confirmation is not match with Password input</span>');
        }else{
          // DO POST
         $.ajax({
           type : 'POST',
           url : '/updateUser',
           data : userData,
           dataType: 'json',
           success : function(data) {
             if (!data.success) {
               if (data.errors.firstname) {
                 $('#e_firstname').after('<span class="error">'+data.errors.firstname+'</span>');
               }
               if (data.errors.middlename) {
                 $('#e_middlename').after('<span class="error">'+data.errors.middlename+'</span>');
               }
               if (data.errors.lastname) {
                 $('#e_lastname').after('<span class="error">'+data.errors.lastname+'</span>');
               }
               if (data.errors.userphone) {
                 $('#e_userphone').after('<span class="error">'+data.errors.userphone+'</span>');
               }
               if (data.errors.useraddress) {
                 $('#e_useraddress').after('<span class="error">'+data.errors.useraddress+'</span>');
               }
               if (data.errors.useremail) {
                 $('#e_useremail').after('<span class="error">'+data.errors.useremail+'</span>');
               }
               
             }else{
               $("#edit_form").trigger("reset");
               $(".error").remove();
               $("#editUser").modal("hide");
               $('#DataTables_Table_0').DataTable().ajax.reload(null, false);
               bootbox.alert({
                 title: 'User Updated!',
                 message: 'User has been updated Successfuly.'
               });
             }
           },
           error : function(e) {
             alert("Error!", e);
             console.log("ERROR: ", e);
           }
       });
     }

      }

    });


} );

//get user details
function getUser(e) {
  var row_iid = $(e).closest('tr').attr("id");
  $('#e_usergender').select2({
    placeholder: "select"
  });
  $.ajax({
      type: 'GET',
      url: '/get_user_details?id=' + row_iid,
      cache: false,
      contentType: 'application/json',
      success: function (result) {
     
          $("input[name='e_firstname']").val(result.FNAME);
          $("input[name='e_middlename']").val(result.MNAME);
          $("input[name='e_lastname']").val(result.LNAME);
          $("input[name='e_useremail']").val(result.EMAIL);
          $("input[name='e_userphone']").val(result.PHONE);
          $('#e_usergender').val(result.GENDER);
          $('#e_usergender').select2().trigger('change');
          $("input[name='e_useraddress']").val(result.ADDRESS);
          $("input[name='e_usercity']").val(result.CITY);
          $("input[name='e_usercompany']").val(result.COMPANY);
          $("input[name='e_usertitle']").val(result.TITLE);
          $("input[name='e_userrole']").val(result.ROLE);
          $("input[name='e_username']").val(result.USERNAME);
          
          $("input[name='e_iid']").val(row_iid);
      }
  });
}

//get user details
function viewProfile(e) {
  var row_iid = $(e).closest('tr').attr("id");
  
  window.location.href = "/profile?id="+row_iid;
}

//delete User
function deleteUser(e) {
  var row_id = $(e).closest('tr').attr("id");

  bootbox.confirm({
    title: 'Confirm dialog',
    message: 'Are you sure you want to delete the contact',
    buttons: {
        confirm: {
            label: 'Yes',
            className: 'btn-danger'
        },
        cancel: {
            label: 'Cancel',
            className: 'btn-link'
        }
    },
    callback: function (result) {

        if (result == true) {
           // showLoading("body");

            var user_data = {
                id: row_id
            };

            $.ajax({
                type: 'POST',
                url: 'deleteUser',
                data: user_data,
                dataType: 'json',
                encode: true
            }).done(function (res) {
                if (res.status == 1) {
                    $('.datatable-generated').DataTable().ajax.reload(null, false);
                    bootbox.alert({
                        title: 'Deleted',
                        message: 'User Deleted Successfully'
                    });
                } else {
                    bootbox.alert({
                        title: 'Error',
                        message: 'Unable To Delete User'
                    });
                }
            });
        } 
    }
});
}

//Close Form Button
$("#closeForm").on('click', function(e) {
  $("#add_form").trigger("reset");
  $(".error").remove();

});

$("#closeEditForm").on('click', function(e) {
  $(".error").remove();
  $("#edit_form").trigger("reset");
});