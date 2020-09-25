$( document ).ready(function() {
  //DATE TIME FORMAT
  function FormatDate(DATE, CURR_FORMAT = "YYYY-MM-DDTHH:mm:ss.sssZ") {
    if (DATE == "" || DATE == null || DATE == undefined) {
        return "";
    } else {
        let date = moment(DATE, CURR_FORMAT).format("DD-MM-YYYY");
        return date;
    }
  }

  //SELECT2 INIT
  $('#s_status').select2({
    placeholder: "Select"
  });
  $('#s_priority').select2({
    placeholder: "Select"
  });
    $('#search_Task').on('click', function () {
          
      $('#DataTables_Table_0').DataTable().ajax.reload(null, false);
      
  });
      var table = $('.datatable-generated').DataTable({
        dom: '<"rt<"bottom"ipl><"clear">',
        ajax: {
          url: '/getTasksList',
          type: 'POST',
          data: function (data) {
            var search_val = {
              'TITLE':    $('#s_title').val(),
              'PRIORITY': $("#s_priority option:selected" ).val(),
              'STATUS' :  $("#s_status option:selected" ).val()

            };
            data.search = search_val;
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
              title: "CreatedAt",   
              render: function (row, type, val, meta) {
                var CreatedAt ='';
                CreatedAt += FormatDate(val.CREATEDAT);
                return CreatedAt;
              }
            },
            {   title: "Last Updated",   
                render: function (row, type, val, meta) {
                  var LastUpdated ='';
                  LastUpdated += FormatDate(val.LASTUPDATED);
                  return LastUpdated;
                }
            },
            {   title: "Added By",   data: "ADDEDBY"},
            {   title: "Assigned to",   data: "ASSIGNEDTO"},
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
         

//assigned user select
      $.ajax({
        type: 'GET',
        url: '/getUserList',
        dataType: 'json',
        success: function (data) {
        $("#assignedto").select2({
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
      
      //Add New Task
      $("#createTask").on('click', function(e) {
        e.preventDefault();
        $('#status').select2({
          placeholder: "Select"
        });
        $('#priority').select2({
          placeholder: "Select"
        });
        var taskData = {
          title :        $("#title").val(),
          requirement :  $("#description").val(),
          assignedto :   $("#assignedto option:selected" ).val(),
          priority :     $("#priority option:selected" ).text(),
          status :       $("#status option:selected" ).text()
        };
        console.log(taskData.assignedto);
        $(".error").remove();
        if ($.trim(taskData.title).length == 0) {
          $('#title').after('<span class="error">Task Title is required</span>'); 
        
        }else{
           // DO POST
          $.ajax({
            type : 'POST',
            url : '/addTask',
            data : taskData,
            dataType: 'json',
            success : function(data) {
              if (!data.success) {
                // if (data.errors.title) {
                //   $('#title').after('<span class="error">'+data.errors.title+'</span>');
                // }
              }else{
                
                $("#add_form").trigger("reset");
                $(".error").remove();
                $("#addNewTask").modal("hide");
                $('#DataTables_Table_0').DataTable().ajax.reload(null, false);
                bootbox.alert({
                  title: 'Task Added!',
                  message: 'Task has been Added Successfuly.'
  
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
  
  
  } );

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

//delete Task
function deleteTask(e) {
  var row_id = $(e).closest('tr').attr("id");

  bootbox.confirm({
    title: 'Confirm dialog',
    message: 'Are you sure you want to delete the Task',
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

            var taskData = {
                tid: row_id
            };

            $.ajax({
                type: 'POST',
                url: 'deleteTask',
                data: taskData,
                dataType: 'json',
                encode: true
            }).done(function (res) {
                if (res.status == 1) {
                    $('.datatable-generated').DataTable().ajax.reload(null, false);
                    bootbox.alert({
                        title: 'Deleted',
                        message: 'Task Deleted Successfully'
                    });
                } else {
                    bootbox.alert({
                        title: 'Error',
                        message: 'Unable To Delete Task'
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

});