$(document).ready(function() {
    let table;

    function saveTableDataToLocalStorage() {
        let tableData = table.rows().data().toArray();
        localStorage.setItem('tableData', JSON.stringify(tableData));
    }

    let storedData = localStorage.getItem('tableData');
    if (storedData) {
        table = $('#example').DataTable({
            data: JSON.parse(storedData),
            columnDefs: [
                { type: 'string', targets: 0 }
            ]
        });
    } else {
        table = $('#example').DataTable({
            columnDefs: [
                { type: 'string', targets: 0 }
            ]
        });
    }


    function addDataToTable() {
      let nim = $('#floatingInputNIM').val();
      let nama = $('#floatingInputNama').val();
      let alamat = $('#floatingInputAlamat').val();

      if (!nim || !nama || !alamat) {
        $('#warningNotification').modal('show');
        return;
      }

      if (isNaN(parseInt(nim))) {
        $('#floatingInputNIM').addClass('is-invalid');
        return;
      } else {
        $('#floatingInputNIM').removeClass('is-invalid');
      }


      let existingNIMs = table.column(0).data().toArray();
      if (existingNIMs.includes(nim)) {
        $('#errorNotification').modal('show');
        return;
       }
      
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
      saveTableDataToLocalStorage();
    } 

    //Add data
    $('#addBtn').on('click', addDataToTable);

    //Remove data
    $('#example').on('click', 'button.btn-danger', function(){
        var row = $(this).closest('tr');
        table.row(row).remove().draw();

        $('#removeModal').modal('show');
        saveTableDataToLocalStorage();
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
      $('#EditNotification').modal('show');
      $('#editModal').modal('hide');
      saveTableDataToLocalStorage();
    });
});

let currentUrl = window.location.href;

if (currentUrl.includes("index.html")) {
    document.getElementById("homeLink").classList.add("active");
} else if (currentUrl.includes("content.html")) {
    document.getElementById("contentLink").classList.add("active");
} else if (currentUrl.includes("about.html")) {
    document.getElementById("aboutLink").classList.add("active");
}


