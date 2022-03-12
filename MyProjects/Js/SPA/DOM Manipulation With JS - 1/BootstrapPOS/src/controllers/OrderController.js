


// reg x



//   -------------


//desavle buttons
//$('#btnAdd').attr('disabled',true);


// Select Dropdown and Fill the data
   //customerIDForOrder
   // this function call in CustomerContraller
   function setAllCustomersForOrder(){
          $('#customerIDForOrder').empty();
          $('#customerIDForOrder').append(`<option selected> ---select---</option>`);
          for(i of customerDB){
              // console.log(i.id , "ID");
           
            var set  = `<option value=${i.id}>${i.id}</option>`;
            $('#customerIDForOrder').append(set);
          }                
            

         
                         
   }



   //itemIDForOrder
   // this function call in ItemContraller
   function setAllItemForOrder(){
        $('#itemIDForOrder').empty();
        $('#itemIDForOrder').append(`<option selected> ---select---</option>`);
        for(i of itemDB){

            var set  = `<option value=${i.id}>${i.id}</option>`;
            $('#itemIDForOrder').append(set);
        }                
      
             
    }



   //set Customer Data To Text Boxes

    $('#customerIDForOrder').click(function(){
        
           for(i of customerDB){
                 if(i.id == $(this).val()){

                   $('#txtCustomerIDForOrder').val(i.id);
                   $('#txtCustomerNameForOrder').val(i.name);
                   $('#txtAddressForOrder').val(i.address);
                 }else if($(this).val() == '---select---'){
                    clearOrderCustomerTextBoxes();
                }
           }

   })


   //set Customer Data To Text Boxes

   $('#itemIDForOrder').click(function(){
        
    for(i of itemDB){
          if(i.id == $(this).val()){
            $('#txtItemIDForOrder').val(i.id);
            $('#txtItemNameForOrder').val(i.description);
            $('#txtItemPriceForOrder').val(i.unitPrice);
            $('#txtItemQtyOnHandForOrder').val(i.quentity);
          }else if($(this).val() == '---select---'){
                  clearOrderItemTextBoxes();
          }
    }

   });

  // clear text boxes 
    function clearOrderCustomerTextBoxes(){
    
        $('#txtCustomerIDForOrder').val('');
        $('#txtCustomerNameForOrder').val('');
        $('#txtAddressForOrder').val('');
       // $('#btnAdd').attr('disabled',true);
    }

    function clearOrderItemTextBoxes(){

        $('#txtItemIDForOrder').val('');
        $('#txtItemNameForOrder').val('');
        $('#txtItemPriceForOrder').val('');
        $('#txtItemQtyOnHandForOrder').val('');
        $('#txtItemQtyForOrder').val('');
      //  $('#btnAdd').attr('disabled',true);
    }

     

   //Add Order

   //Add item
   let subTotal = 0;

   $('#btnAdd').on('click',function(){

        const price = $('#txtItemPriceForOrder').val();
        let qtyOnHand = $('#txtItemQtyOnHandForOrder').val();
        const qty =  $('#txtItemQtyForOrder').val();
        
        subTotal += (price * qty);
        qtyOnHand -= qty;
         
        $('#subTotal').text(subTotal);
        
        var itemTotal = price * qty ;

        
         addToArrayDB(itemTotal,qtyOnHand);

         addToTable();
   });


   
  


   function addToArrayDB(itemTotal,qtyOnHand){

         // add order to orderDB
          var order = new OrderDTO($('#OrderId').val(),$('#OrderDate').val(),$('#txtCustomerIDForOrder').val());
          orderDB.push(order);

         //  add orderDetail To orderDetailDB
         
          var orderDetail = new OrderDetailsDTO($('#txtItemIDForOrder').val(), $('#txtItemNameForOrder').val(), $('#txtItemPriceForOrder').val(),$('#txtItemQtyOnHandForOrder').val(),$('#txtItemQtyForOrder').val(),itemTotal)
          orderDetailsDB.push(orderDetail);

         // update current Qunitiy on hand
           for(i in itemDB){
                if(itemDB[i].id == $('#txtItemIDForOrder').val()){
                      itemDB[i].quentity = qtyOnHand; 
                }
           }

          //refresh load item drop downlist  
          setAllItemForOrder()

          
          //clear all text boxes
          clearOrderItemTextBoxes();
   }

   function addToTable(){
           
    $('#OrderTable').empty();
    for(i of orderDetailsDB){

        
         // get data from Array and load to the table
         // ToDo: create a  row and add to the table
          var row = `<tr><td>${i.itemCode}</td><td>${i.itemName}</td><td>${i.itemPrice}</td><td>${i.qty}</td><td>${i.total}</td></tr>`;
          $('#OrderTable').append(row);

    }

   }




    










   






   
   



  

