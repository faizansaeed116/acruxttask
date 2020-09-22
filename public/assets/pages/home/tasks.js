$( document ).ready(function() {
    $('#search_user').on('click', function () {
          
      $('#DataTables_Table_0').DataTable().ajax.reload(null, false);
      
  });
      var table = $('.datatable-generated').DataTable({
        dom: '<"rt<"bottom"ipl><"clear">',
        ajax: {
          url: '/getTasksList',
          type: 'POST',
          data: function (data) {
            var search_val = {
                
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
            {   title: "Title",   data: "TITLE"},
            {   title: "Description",   data: "DESCRIPTION"},
            {   title: "Priority",   data: "PRIORITY"},
            {   title: "Status",   data: "STATUS"},
            {   title: "CreatedAt",   data: "CREATEDAT"},
            {   title: "Last Updated",   data: "LASTUPDATED"},
            {   title: "Added By",   data: "ADDEDBY"},
            {   title: "Assigned to",   data: "ASSIGNEDTO"}

            ],
  
        });
         
      
  
  
      
  
  
  } );