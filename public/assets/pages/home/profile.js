$( document ).ready(function() {
    $('#DataTables_Table_0').DataTable().ajax.reload(null, false);
    //DATE TIME FORMAT
  
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

    //Get users list
    $.ajax({
        type: 'GET',
        url: '/getUserList',
        dataType: 'json',
        success: function (data) {
        $("#e_assignedto").select2({
            data: $.map(data, function (obj) {
                return {
                    text: obj.FNAME,
                    level: 1,
                    id: obj.ID,
            }
            })
        })
        }
      });



        $('.datatable-tasks').DataTable({
            dom: '<"rt<"bottom"ipl><"clear">',
            ajax: {
            url: '/getUserTask',
            type: 'POST',
            data: function (data) {
                var userId = {
                'UID':    id
                };
                data.userId = userId;
                return data;
            }
            },
            initComplete: function () {
                $(".datatable-scroll").removeClass('table-responsive').addClass('table-responsive');
            },
            rowCallback: function (row, data) {
                $(row).attr('id', data.TID);
                
            },
            orderable:true,
            pageLength: 10,
            lengthMenu: [10, 50, 100, 150, "All"],
            processing:true,
            serverSide: true, 
            regex: true,
            ordering: [[0,'asc']],
            columns: [
                {   title: "Title",   data: "TITLE"},
                {   title: "Description",   data: "DESCRIPTION"},
                {   title: "Priority",   data: "PRIORITY"},
                {   title: "Status",   data: "STATUS"},
                
                {
                    title: 'Action',
                    className: "text-center",
                    orderable: false,
                        render: function (row, type, val, meta) {
                          
                        return `<div class="list-icons">
                        <a href="#"  class="list-icons-item text-primary-600 edit_Task" onclick="getTask(this)" id="edit_Task" data-toggle="modal" data-target="#editTask" data-backdrop="static" data-keyboard="false">
                        <i class="icon-pencil7"></i></a>
                        <a href="#"  class="list-icons-item text-danger-600" onClick="deleteTask(this)" id="deletetask">
                        <i class="icon-trash"></i></a>
                      </div>`;
                    }
                },
                
                ],
  
        });

        //Update Task Details
        $("#updateTask").on('click', function(e) {
  
            e.preventDefault();
            var taskData = {
              TID :         $("#e_tid").val(),
              TITLE :      $("#e_title").val(),
              DESCRIPTION : $("#e_description").val(),
              PRIORITY :    $("#e_priority option:selected" ).text(),
              ASSIGNEDTO :  $("#e_assignedto option:selected" ).val(),
              STATUS :      $("#e_status option:selected" ).text()
            };
            $(".error").remove();
            if ($.trim(taskData.TITLE).length == 0) {
              $('#e_title').after('<span class="error">Full Name is required</span>'); 
            }else{
                // DO POST
              $.ajax({
                type : 'POST',
                url : '/updateTask',
                data : taskData,
                dataType: 'json',
                success : function(data) {
                  
                    $("#edit_form").trigger("reset");
                    $(".error").remove();
                    $("#editTask").modal("hide");
                    $('#DataTables_Table_0').DataTable().ajax.reload(null, false);
                    bootbox.alert({
                      title: 'Task Update!',
                      message: 'Task has been updated Successfuly.'
                    });
                  
                },
                error : function(e) {
                  alert("Error!", e);
                  console.log("ERROR: ", e);
                }
            });
          }
      
          });    
  
  
});

 //get Task details
 function getTask(e) {
    var row_iid = $(e).closest('tr').attr("id");
    $('#e_status').select2({
      placeholder: "Select"
    });
    
    $('#e_priority').select2({
      placeholder: "Select"
    });
    $.ajax({
        type: 'GET',
        url: '/getTaskDetails?id=' + row_iid,
        contentType: 'application/json',
        success: function (result) {
       
            $("input[name='e_title']").val(result.TITLE);
            $("textarea[name='e_description']").val(result.DESCRIPTION);
            
            $("#e_status").val(result.STATUS);
            $('#e_status').select2().trigger('change');
  
            $('#e_assignedto').val(result.ASSIGNEDTO);
            $('#e_assignedto').select2().trigger('change');
  
            $('#e_priority').val(result.PRIORITY);
            $('#e_priority').select2().trigger('change');
            
            $("input[name='e_tid']").val(row_iid);
        }
    });
  }