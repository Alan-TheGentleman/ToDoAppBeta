$(function () {



  $('[data-toggle="tooltip"]').tooltip();

  $('#selectAll').click(function(){
    if($(this).prop("checked")){
      $('#tasks input').attr("checked" ,"checked");
      $('$tasks input').addClass('done');
      $('$tasks input span').addClass('ng-binding done');
    }
    else{
      $('#tasks input').removeProp("checked");
      $('$tasks input span').removeClass('done');
    }
  });
  $('#openConfig').click(function(e){
      e.preventDefault();
      $('#configurationPanel').modal();
  })
  $("#filename").change(function(e) {
  var ext = $("input#filename").val().split(".").pop().toLowerCase();

  if($.inArray(ext, ["csv"]) == -1) {
    alert('Upload CSV');
    return false;
  }

  if (e.target.files != undefined) {
    var reader = new FileReader();
    reader.onload = function(e) {
    var csvval=e.target.result.split("\n");
    var csvvalue=csvval[0].split(",");
    var inputrad="";
    for(var i=0;i<csvvalue.length;i++)
    {
    var temp=csvvalue[i];
    var inputrad=inputrad+" "+temp;
    }
    $("#csvimporthint").html(inputrad);
    $("#csvimporthinttitle").show();
    };
    reader.readAsText(e.target.files.item(0));

  }

    return false;

  });

})
