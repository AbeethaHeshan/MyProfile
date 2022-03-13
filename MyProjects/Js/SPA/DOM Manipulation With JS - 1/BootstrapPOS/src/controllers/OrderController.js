


// reg x
const qtyRegx = /^[0-9]+$/;
const cash = /^[0-9]+$/;
const discount = /^[0-9]*$/;
const balance = /^[0-9]+$/;

  $('#btnAdd').prop('disabled',true);
  $('#btnPurchase').prop('disabled',true);

   
  $('#txtItemIDForOrder').prop('disabled',true);
  $('#txtItemNameForOrder').prop('disabled',true);
  $('#txtItemPriceForOrder').prop('disabled',true);
  $('#txtItemQtyOnHandForOrder').prop('disabled',true);

$("#txtItemQtyForOrder").keyup(function(event){
        if(qtyRegx.test($("#txtItemQtyForOrder").val())){
      
          if( parseInt($("#txtItemQtyForOrder").val()) > parseInt($("#txtItemQtyOnHandForOrder").val())){
            $("#txtItemQtyForOrder").css('border-color','red');
            $('#btnAdd').prop('disabled',true);  
            $('#btnPurchase').prop('disabled',true);
          }else if(parseInt($("#txtItemQtyForOrder").val()) <= parseInt($("#txtItemQtyOnHandForOrder").val()) ){
            $("#txtItemQtyForOrder").css('border-color','green');
            $('#btnAdd').prop('disabled',false);  
            $('#btnPurchase').prop('disabled',false);
          }
        }else{
          $("#txtItemQtyForOrder").css('border-color','red');
          $('#btnAdd').prop('disabled',true); 
          $('#btnPurchase').prop('disabled',true);
        }
});


$('#txtCash').keyup(function(){
      console.log(parseInt( $('#txtCash').val()) >= parseInt($('#subTotal').text()))
    if(parseInt( $('#txtCash').val()) >= parseInt($('#subTotal').val())){
      if(cash.test($('#txtCash').val())){
        $('#txtCash').css('border-color','green');
        $('#btnPurchase').prop('disabled',false);
       }
       else{
        $('#txtCash').css('border-color','red');
        $('#btnPurchase').prop('disabled',true);
       }
    }
    
})








//   -------------
if(idArr.length == 0){
     $('#orderID').val("O00-1");
  

  idArr.push("O00-1");
}
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


   
  function order(){
    // add order to orderDB
    var order = new OrderDTO($('#orderID').val(),$('#orderDate').val(),$('#txtCustomerIDForOrder').val());
    orderDB.push(order);
  }


   function addToArrayDB(itemTotal,qtyOnHand){

         

         //  add orderDetail To orderDetailDB
         
          var orderDetail = new OrderDetailsDTO($('#txtItemIDForOrder').val(), $('#txtItemNameForOrder').val(), $('#txtItemPriceForOrder').val(),$('#txtItemQtyOnHandForOrder').val(),$('#txtItemQtyForOrder').val(),itemTotal,$('#orderID').val())
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




  //  purchaceOrde
      $('#btnPurchase').on('click',function(){
          
           order();
           var arrFor = new Array();
           console.log("Press purchace",$('#txtCash').val(), $('#subTotal').text())
            if( $('#subTotal').text() < $('#txtCash').val()){
              console.log(" sub not  same")
              var bal = ($('#txtCash').val()  -   $('#subTotal').text()) - $('#txtDiscount').val();
                
              $('#total').text($('#subTotal').text() - $('#txtDiscount').val());
              $('#txtBalance').val(bal);
              $('#OrderTable').empty();
              orderDetailsDB.length = 0;
              subTotal = 0;
              generateNewOrderID();

            }else if( $('#subTotal').text() ==  $('#txtCash').val()){
               var balance = $('#txtCash').val() -  $('#txtDiscount').val();
               console.log(" sub same")
               $('#total').text(balance);
               $('#txtBalance').val(balance);
               $('#OrderTable').empty();
                 orderDetailsDB.length = 0;
                 subTotal = 0;
                 generateNewOrderID();
            }             
          });
   
 
          function generateNewOrderID(){
               //O00-1
                
                console.log(orderDB[orderDB.length-1].orderID , " oID ")
                console.log(idArr[idArr.length], " o I D  ")


                 if(idArr.length != 0){
                 
                   var str =  idArr[idArr.length-1];
                   var id = 1 + parseInt((str.substr(4)));
                   var orderId = 'O00-' + id;
                   $('#orderID').val(orderId);
                   idArr.push(orderId);
                   
                   
                }
                  
              
          }




    










   






   
   



  

