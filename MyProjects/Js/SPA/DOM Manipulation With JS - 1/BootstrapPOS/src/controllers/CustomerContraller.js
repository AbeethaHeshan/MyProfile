///^(No)( )?[0-9]+(/| )[A-Z|0-9]?+( )?[a-z|A-Z]*(,)?[a-z|A-Z]*(,)?$/
  // customer regular expressions
     const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
     const cusNameRegEx = /^[A-z ]{5,20}$/;
     const cusAddressRegEx = /^(No)( )?[0-9]{1,4}( )?[A-z]+(,)?[A-z]*/;
     const cusNicRegEx = /^[0-9]{9,12}(v|V)?$/;
     const cusTelRegEx = /^(0)[1-9]{2}(-)?[0-9]{7}$/;
     



     $('#btnSave').prop('disabled',true);


     // customer ID
    $("#txtCustomerId").keyup(function(event){
      var id = $("#txtCustomerId").val();
    
      if(id.length == 0){
        $("#txtCustomerId").css('border-color','#42b5ed');
        $('#btnSave').prop('disabled',true);
      }
      
      else if(cusIDRegEx.test(id)){  
        console.log(cusIDRegEx.test(id))    
        $("#txtCustomerId").css('border-color','green');
        $('#btnSave').prop('disabled', false);
         
        if(event.key == "Enter"){
          console.log(cusIDRegEx);
          $("#txtCustomerName").focus();
          $('#btnSave').prop('disabled',true);
        }
         
      }
      else{
        $("#txtCustomerId").css('border-color','red');
        $('#btnSave').prop('disabled', true);
      }
    });


  


    // Customer NAme
    $("#txtCustomerName").keyup(function(event){
      var name = $("#txtCustomerName").val();
      if(name.length == 0){
        $("#txtCustomerName").css('border-color','#42b5ed');
        $('#btnSave').prop('disabled',true);
      }
      else if(cusNameRegEx.test(name)){      
        $("#txtCustomerName").css('border-color','green');
        $('#btnSave').prop('disabled', false);
        if(event.key == "Enter"){
          $("#txtCustomerAddress").focus();
          $('#btnSave').prop('disabled',true);
        }
      }
      else{
        $("#txtCustomerName").css('border-color','red');
        $('#btnSave').prop('disabled', true);
      }
    });


   


       // customer address 
    $("#txtCustomerAddress").keyup(function(event){
      var address = $("#txtCustomerAddress").val();
      if(address.length == 0){
        $("#txtCustomerAddress").css('border-color','#42b5ed');
        $('#btnSave').prop('disabled',true);
      }
      else if(cusAddressRegEx.test(address)){      
        $("#txtCustomerAddress").css('border-color','green');
        $('#btnSave').prop('disabled',false);
        if(event.key == "Enter"){
          $("#txtCustomerNic").focus();
          $('#btnSave').prop('disabled',true);
        }

      }
      else{
        $("#txtCustomerAddress").css('border-color','red');
        $('#btnSave').prop('disabled',true);
      }
    });


  

          // Customer nic
      $("#txtCustomerNic").keyup(function(event){
        var nic = $("#txtCustomerNic").val();
        if(nic.length == 0){
          $("#txtCustomerNic").css('border-color','#42b5ed');
          $('#btnSave').prop('disabled',true);
        }
        else if(cusNicRegEx.test(nic)){      
          $("#txtCustomerNic").css('border-color','green');
          $('#btnSave').prop('disabled',false);
          if(event.key == "Enter"){
            $("#txtCustomerTel").focus();
            $('#btnSave').prop('disabled',true);
          }


        }
        else{
          $("#txtCustomerNic").css('border-color','red');
          $('#btnSave').prop('disabled',true);
        }
      });


  

        // customer Tel
      $("#txtCustomerTel").keyup(function(event){
        var tel= $("#txtCustomerTel").val();
        if(tel.length == 0){
          $("#txtCustomerTel").css('border-color','#42b5ed');
          $('#btnSave').prop('disabled',true);
        }
        else if(cusTelRegEx.test(tel)){      
          $("#txtCustomerTel").css('border-color','green');
          $('#btnSave').prop('disabled',false);
          if(event.key == "Enter"){
            $("#btnSave").focus();
          }
          
        
        }
        else{
          $("#txtCustomerTel").css('border-color','red');
          $('#btnSave').prop('disabled',true);
        }
      });
          

        
     


        function clearTextBoxes(){
          $('#btnSave').prop('disabled',true);
          $("#txtCustomerId").val('');
          $("#txtCustomerName").val('');
          $("#txtCustomerAddress").val('');
          $("#txtCustomerNic").val('');
          $("#txtCustomerTel").val('')
          $("#txtCustomerId").css('border-color','#42b5ed');
          $("#txtCustomerName").css('border-color','#42b5ed');
          $("#txtCustomerAddress").css('border-color','#42b5ed');
          $("#txtCustomerNic").css('border-color','#42b5ed');
          $("#txtCustomerTel").css('border-color','#42b5ed');
        }



        // add Customer data to array 

        function saveCustomer(){
          const custId = $("#txtCustomerId").val();
          const custName = $("#txtCustomerName").val();
          const custAddress = $("#txtCustomerAddress").val();
          const custNic = $("#txtCustomerNic").val();
          const custTel = $("#txtCustomerTel").val();
          
          
          var customerDTO = new CustomerDTO(custId,custName,custAddress,custNic,custTel);
          customerDB.push(customerDTO);
        }





          /* 
           !   Save customer to the table
        */
        function loadCustomerToTable(){
         
           $("#customerTable").empty();
          for (var i of customerDB) {
            /*create a html row*/
            let row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.address}</td><td>${i.nic}</td><td>${i.tel}</td><td> <button class="delete">delete</button>  <button class="update">Update</button></td></tr>`;
            /*select the table body and append the row */
            $("#customerTable").append(row);
          }
           
           deleteCustomer();

           console.log("A")
           updateCustomer();
           console.log("B")


      
           



        }


      
        
        /* 
           !   delete customer in the table 
        */

        function deleteCustomer(){
           // customer delete event
          $('.delete').on('click', function() {

            var selectedRow = $(this).parents('tr');
            var custId = $('td:nth-child(1)', selectedRow).text();   
            var custName = $('td:nth-child(2)', selectedRow).text();   
            var custAddress = $('td:nth-child(3)', selectedRow).text();  
            var custNic = $('td:nth-child(4)', selectedRow).text(); 
            var custTel = $('td:nth-child(3)', selectedRow).text(); 
            console.log(custId , custName , custAddress , custNic)
            
            selectedRow.fadeOut('slow', function(){
              
               // refresh array
                 var tempCustomerArray = new Array();
                 
                 for (var i in customerDB) {
                   if(customerDB[i].id == custId){
                       customerDB[i] = "";
                       console.log(customerDB[i])
                   }else{

                    tempCustomerArray.push(new CustomerDTO(customerDB[i].id,customerDB[i].name,customerDB[i].address,customerDB[i].nic,customerDB[i].tel));
                     
                   }
                   
                 } 
                 customerDB = tempCustomerArray;

                 for(var i of customerDB){
                      console.log(i.id," id")
                 }

            });
          });
        }






         /* 
           !   update customer in the table 
        */
         var bool = false;
         function updateCustomer(){
         

        // customer delete event
        $('.update').on('click', function() {
          
       
  
                  var selectedRow = $(this).parents('tr');
                  var custId = $('td:nth-child(1)', selectedRow).text();   
                  var custName = $('td:nth-child(2)', selectedRow).text();   
                  var custAddress = $('td:nth-child(3)', selectedRow).text();  
                  var custNic = $('td:nth-child(4)', selectedRow).text(); 
                  var custTel = $('td:nth-child(5)', selectedRow).text(); 
                  console.log(custId , custName , custAddress , custNic , custTel);

                  $('#AddCustomer').modal('show');
                  $('.modal-title').text('Update Customer');
                 
                  $('#btnSave').prop('disabled',false);

                 
                  $("#txtCustomerId").val(custId);
                  $("#txtCustomerName").val(custName);
                  $("#txtCustomerAddress").val(custAddress);
                  $("#txtCustomerNic").val(custNic);
                  $("#txtCustomerTel").val(custTel);

                   
                  bool = true;
                  
            
           });

                
                return bool;
         }
         
          



                  // customer save/update  event
               $("#btnSave").on('click',function(){
              
                      if(updateCustomer() == true){
                       
                      for(var i = 0 ; i < customerDB.length ; i++){
                          
                          if(customerDB[i].id ==  $("#txtCustomerId").val()){
                          
                            customerDB[i].id = $("#txtCustomerId").val();
                            customerDB[i].name = $("#txtCustomerName").val();
                            customerDB[i].address = $("#txtCustomerAddress").val();
                            customerDB[i].nic = $("#txtCustomerNic").val();
                            customerDB[i].tel = $("#txtCustomerTel").val();
                             
                            loadCustomerToTable();
                            clearTextBoxes();
                          
                    
                          }
                       }
                            bool = false;
                           
                   }else{
                       
                        saveCustomer();  
                        loadCustomerToTable();
                        clearTextBoxes();

                   }
                     
                     

               });
                  

              



              


  



