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


    /*
      
        ! get data in text boxes
    
    */
        function collectItemData(){

           const itemId = $("#txtItemId").val();
           const itemDescription =  $("#txtItemDescription").val();
           const itemQuntity = $("#txtItemQuntity").val();
           const itemPrice = $("#txtItemUnitPrice").val();
            
           
           return new ItemDTO(itemId,itemDescription,itemQuntity,itemPrice);;

        }






       /* 
        *  manage Item table 
       */
        function loadItemTable(){
            $('#itemTable').empty();
              for(i of itemDB){
                   // get data from Array and load to the table
                   // ToDo: create a  row and add to the table
                    var row = `<tr><td>${i.id}</td><td>${i.description}</td><td>${i.quentity}</td><td>${i.unitPrice}</td><td><button class="deleteItem">delete</button>  <button class="updateItem">Update</button></td></tr>`;
                    $('#itemTable').append(row);
              }

              deleteItemRow();
              updateItemDataRow();

        }




     /* 
      
       ! delete data in row

     */
      function deleteItemRow(){
              console.log("A")
        $('.deleteItem').on('click',function(){
              console.log("B")
             var selectedRow = $(this).parents('tr');
             var itemId =  $('td:nth-child(1)', selectedRow).text();
            
             // remove row and refresh ItemArray
             selectedRow.fadeOut('slow',function(){
                   var tempItemDB = new Array();
                     
                   for(i in itemDB){
                        if(itemDB[i].id == itemId ){
                            
                               itemDB[i] = "";
                        }else{
                             
                            tempItemDB.push(new ItemDTO(itemDB[i].id,itemDB[i].description,itemDB[i].quentity,itemDB[i].unitPrice))
                        }
                   }
 
                   itemDB = tempItemDB;  

             });
                
        });
        
                              
      }

     


        /* 
        
        ! update data in row

        */
         let updatePressed = false;
         var obj = 0;
         function updateItemDataRow(){
               
              $('.updateItem').on('click',function(){


                      

                      $('#AddItem').attr('id','btnUpdateItemData');
                      $('#btnUpdateItemData').modal('show');
                      $('#LabelItem').text('Update Item');

                       var Row = $(this).parents('tr');
                       var itemId =  $('td:nth-child(1)', Row).text();
                       var description = $('td:nth-child(2)', Row).text();
                       var quntity = $('td:nth-child(3)', Row).text();
                       var price = $('td:nth-child(4)', Row).text();
                       
                       updatePressed = true;

                       $("#txtItemId").val(itemId);
                       $("#txtItemDescription").val(description);
                       $("#txtItemQuntity").val(quntity);
                       $("#txtItemUnitPrice").val(price);
                        
                      

                       $('#btnUpdateItemData').attr('id','AddItem');
 
                 });

                

                 return updatePressed;

         }  



    /* 
      
       ! Save/Update data to the Array and save data to Table

     */
      
       $('#btnSaveItem').on('click',function(){
                
                    console.log('save button pressed')
                   
                       
                //update data
                if(updateItemDataRow()){
                       console.log("yes")
                      
                        //update array

                        for(i in itemDB){
                            console.log($("#txtItemId").val(),"ASD")
                            if(itemDB[i].id ==  $("#txtItemId").val()){

                             
                                     itemDB[i].id = $("#txtItemId").val();
                                     itemDB[i].description = $("#txtItemDescription").val();
                                     itemDB[i].quentity =  $("#txtItemQuntity").val();
                                     itemDB[i].unitPrice =  $("#txtItemUnitPrice").val();
                                     loadItemTable(); 
                                     clearItemtxtBoxes();
                            }
                        }
                          
                       updatePressed = false;
                    


                }else{
                   
                    itemDB.push(collectItemData())
                    loadItemTable();
                    setAllItemForOrder();
                    clearItemtxtBoxes();
                }

                    for(i of itemDB){
                        console.log(i.id )
                    }

       });