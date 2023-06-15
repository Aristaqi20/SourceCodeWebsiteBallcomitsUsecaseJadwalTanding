
$(document).ready(function(){
    

    $("#formJadwal").submit(function(e){
       e.preventDefault();
       postData();
    });
    
    setTimeout(function(){
        getData();
    }, 500);
 });

 function getData(){
     $.ajax({
       data: {},
       url: "http://localhost:8081/ambil-data", 
       type:"get", 
       dataType: "json",
       success: function(result){
          data = result;
          showData();


          //new simpleDatatables.DataTable(datatablesSimple);
       }
    });
 }
 function postData(){
     //alert("ok");
     //return false;
    //var params = {nrp: $("#nrp").val(), nama: $("#nama").val()};
    var params = {crud: $("#crud").val(), id: $("#id").val(), 
       tim_regu: $("#tim_regu").val(), jadwal: $("#jadwal").val(), jam: $("#jam").val(), status: $("#status").val()};
    $.ajax({
       data: params,
       url: "http://localhost:8081/simpan-data", 
       type:"post", 
       dataType: "json",
       success: function(result){
          if(result.status == 1){
             getData();
             reset();
          }
          console.log(result);
       },
       error: function(result){
          console.log(result);
          alert("Error: "+JSON.stringify(result));
       }
    });
 }


 var data = [];
function showData(){
    var items = ""; 
    $.each(data, function(index, array){
     var tim = '';
     if(array.tim_regu == 1)tim = 'F-SCIENTICS VS F-CIVPLAN';
     else if(array.tim_regu == 2)tim = 'F-MARTECH VS F-CREABIZ';
     else if(array.tim_regu == 3)tim = 'F-INDSYS VS F-VOCATIONS';
     else if(array.tim_regu == 4)tim = 'F-ELECTICS VS S-IMT';
       items += '<tr>';
       items += '<td>' + (index+1) +'</td>';
       items += '<td>' + tim +'</td>';
       items += '<td>' + (array.jadwal) +'</td>';
       items += '<td>' + (array.jam) +'</td>';
       items += '<td>' + (array.status == 1 ? "Sudah" : "Belum") +'</td>';
       items += '<td><button class="btn btn-sm btn-primary" onclick="editData('+ index + ')">Edit</button></td>';
       items += '</tr>';
    });

    $("#tabel tbody").html(items);
 }

 function editData(index){
     //alert("Edit: " + index);
     var array = data[index];

     $("#crud").val("edit");
     $("#id").val(array.no);
     $("#tim_regu").val(array.tim_regu);
     $("#jadwal").val(array.jadwal);
     $("#jam").val(array.jam);
     $("#status").val(array.status);
 }

 function reset(){
    $("#crud").val("add");
    $("#id").val("");
    $("#jam").val("");
 }