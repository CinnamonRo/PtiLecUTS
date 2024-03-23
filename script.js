$(document).ready(function() {
    let table = $('#example').DataTable({
        columnDefs: [
          { type: 'string', targets: 0 } 
        ]
      });

    function addDataToTable() {
      let nim = $('#floatingInputNIM').val();
      let nama = $('#floatingInputNama').val();
      let alamat = $('#floatingInputAlamat').val();
      let buttonsColumn = $('<div>')
            .append($('<button >', {
                text: 'Edit', 
                class: 'btn btn-success me-2', 
                'data-nim': nim,
                'data-nama': nama,
                'data-alamat': alamat
            }))

            .append($('<button>', {
                text: 'Remove', 
                class: 'btn btn-danger', 
                'data-nim': nim,
            }));

    table.row.add([nim, nama, alamat, buttonsColumn.html()]).draw();
      $('#floatingInputNIM').val('');
      $('#floatingInputNama').val('');
      $('#floatingInputAlamat').val('');
          
      $('#addModal').modal('show');
    } 

    //Add data
    $('#addBtn').on('click', addDataToTable);

    //Remove data
    $('#example').on('click', 'button.btn-danger', function(){
        var row = $(this).closest('tr');
        table.row(row).remove().draw();
    });

    //Edit data
    $('#example').on('click', 'button.btn-success', function(){
      let row = $(this).closest('tr');
      let data = table.row(row).data();
      let rowIndex = table.row(row).index();
      let currentData = {
        nim: data[0],
        nama: data[1],
        alamat: data[2],
        buttons: data[3]
    };
  
      $('#editInputNIM').val(data[0]);
      $('#editInputNama').val(data[1]);
      $('#editInputAlamat').val(data[2]);
      $('#editModal').modal('show');
  
      $('#saveChangesBtn').data('rowIndex', rowIndex);
      $('#saveChangesBtn').data('currentData', currentData);
    });

    $('#saveChangesBtn').on('click', function(){
      let rowIndex = $(this).data('rowIndex');
      let currentData = $(this).data('currentData');

      let updatedNim = $('#editInputNIM').val();
      let updatedNama = $('#editInputNama').val();
      let updatedAlamat = $('#editInputAlamat').val();

      table.row(rowIndex).data([updatedNim, updatedNama, updatedAlamat, currentData.buttons]).draw();
       $('#editModal').modal('hide');
    });
});
  


