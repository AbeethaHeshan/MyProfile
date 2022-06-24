const itemRegxId = /^(I00-)[0-9]{1,3}$/;
const itemRegxDes = /^[A-z]{2,}( )?[0-9A-z]*( )?[0-9A-z]{1,}$/;
const itemRegxQty = /^[0-9]*$/;
const itemRegxUnitPrice = /^[0-9]*(.)?[0-9]+$/;




  // Item ID
  $("#txtItemId").keyup(function(event){
    var id = $("#txtItemId").val();
  
    if(id.length == 0){
      $("#txtItemId").css('border-color','#42b5ed');
      $('#btnSaveItem').prop('disabled',true);
    }
    
    else if(itemRegxId.test(id)){  
     
      $("#txtItemId").css('border-color','green');
      $('#btnSaveItem').prop('disabled', false);
       
      if(event.key == "Enter"){
       
        $("#txtItemDescription").focus();
        $('#btnSaveItem').prop('disabled',true);
      }
       
    }
    else{
      $("#txtItemId").css('border-color','red');
      $('#btnSaveItem').prop('disabled', true);
    }
  });





  //Item Description
  $("#txtItemDescription").keyup(function(event){
    var description = $("#txtItemDescription").val();
    if(description.length == 0){
      $("#txtItemDescription").css('border-color','#42b5ed');
      $('#btnSaveItem').prop('disabled',true);
    }
    else if(itemRegxDes.test(description)){      
      $("#txtItemDescription").css('border-color','green');
      $('#btnSaveItem').prop('disabled', false);
      if(event.key == "Enter"){
        $("#txtItemQuntity").focus();
        $('#btnSaveItem').prop('disabled',true);
      }
    }
    else{
      $("#txtItemDescription").css('border-color','red');
      $('#btnSaveItem').prop('disabled', true);
    }
  });


 


     // Item Quntity 
  $("#txtItemQuntity").keyup(function(event){
    var quentity = $("#txtItemQuntity").val();
    if(quentity.length == 0){
      $("#txtItemQuntity").css('border-color','#42b5ed');
      $('#btnSaveItem').prop('disabled',true);
    }
    else if(itemRegxQty.test(quentity)){      
      $("#txtItemQuntity").css('border-color','green');
      $('#btnSaveItem').prop('disabled',false);
      if(event.key == "Enter"){
        $("#txtItemUnitPrice").focus();
        $('#btnSaveItem').prop('disabled',true);
      }

    }
    else{
      $("#txtItemQuntity").css('border-color','red');
      $('#btnSaveItem').prop('disabled',true);
    }
  });




        //  Item unit price
    $("#txtItemUnitPrice").keyup(function(event){
      var unitPrice = $("#txtItemUnitPrice").val();
      if(unitPrice.length == 0){
        $("#txtItemUnitPrice").css('border-color','#42b5ed');
        $('#btnSaveItem').prop('disabled',true);
      }
      else if(itemRegxUnitPrice.test(unitPrice)){      
        $("#txtItemUnitPrice").css('border-color','green');
        $('#btnSaveItem').prop('disabled',false);
        if(event.key == "Enter"){
          $("#btnSaveItem").focus();
          $('#btnSaveItem').prop('disabled',false);
        }


      }
      else{
        $("#txtItemUnitPrice").css('border-color','red');
        $('#btnSaveItem').prop('disabled',true);
      }
    });



    //                                           end regx 

   

            //get items



              loadAllItems();
              function loadAllItems(){
                  $('#itemTable').empty();
                  console.log("Started")
                  $.ajax({
                      url:"http://localhost:8080/",
                      method: "GET",
                      success:function (resp) {
                          console.log(resp);
                          for (const i of resp.data) {
                              loadToTableItem(i.id,i.description,i.qty,i.unitPrice)
                          }
                      },
                      error:function (ob,state){
                          console.log(ob,state)
                      }

                  })
                }


         function  loadToTableItem(id,description,qty,unitPrice){
             $('#itemTable').empty();
             // get data from Array and load to the table
             // ToDo: create a  row and add to the table
             var row = `<tr><td>${id}</td><td>${description}</td><td>${qty}</td><td>${unitPrice}</td><td><button class="deleteItem">delete</button>  <button class="updateItem">Update</button></td></tr>`;
             $('#itemTable').append(row);
         }



          // save item
            $('#btnSaveItem').on('click',function(){

              var dataObj = {
              
                  id: $("#txtItemId").val(),
                  description: $("#txtItemDescription").val(),
                  qty: $("#txtItemQuntity").val(),
                  unitPrice: $("#txtItemUnitPrice").val()

  
               }   

                $.ajax({
                    url:"",
                    method:"",
                    dataType:JSON.stringify(dataObj),
                    success:function (msg){
                           loadAllItems();
                    }
                });

            });





           // update Item
           $('.updateItem').on('click',function(){
                      
            var dataObj = {
              
                  id: $("#txtItemId").val(),
                  description: $("#txtItemDescription").val(),
                  qty: $("#txtItemQuntity").val(),
                  unitPrice: $("#txtItemUnitPrice").val()
 
            } 
                 
                 



                    $.ajax({
                      url:"",
                      method:"",
                      dataType:JSON.stringify(dataObj),
                      success:function (msg){
                          loadAllItems();
                      }

                    });
          });
           







           // delete Item
          
           $('.deleteItem').on('click',function(){
              var id = $("#txtItemId").val();
              var selectedRow = $(this).parents('tr');
              var itemId =  $('td:nth-child(1)', selectedRow).text();
              
                // remove row and refresh ItemArray
                selectedRow.fadeOut('slow',function(){
                       $.ajax({
                           url:"",
                           method:"DELETE",
                           data:"",
                           success:function (msg){
                               loadAllItems();
                           }
                       });
                });
              
          });


    /*
     ! clear text boxes
      */
    function clearItemtxtBoxes(){

        $("#txtItemId").val('');
        $("#txtItemDescription").val('');
        $("#txtItemQuntity").val('');
        $("#txtItemUnitPrice").val('');
        $('#btnSaveItem').prop('disabled',true);

    }


  