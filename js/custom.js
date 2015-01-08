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
  });
  $('#openProyectConfig').click(function(e){
      e.preventDefault();
      $('#proyectPanel').modal();
  });

})
