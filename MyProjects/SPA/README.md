<h1  align="center" >  Java Script Assignments  </h1>

### Assignment 1


* Direct Link -> [DOM Manipulation With JS-1](https://abeethaheshan.github.io/MyProfile/MyProjects/SPA/DOM%20Manipulation%20With%20JS%20-%201/BootstrapPOS/src/)     
* Document ->  [DOM Manipulation With JS-1](https://github.com/AbeethaHeshan/MyProfile/tree/master/*MyProjects/SPA/DOM%20Manipulation%20With%20JS%20-%201)

```javaScript
                      // navigation
   document.getElementById("order").addEventListener("click",function(){
      document.getElementsByClassName("Home")[0].innerHTML = document.getElementsByClassName("orders")[0].innerHTML;
      }); 

   document.getElementById("item").addEventListener("click",function(){
      document.getElementsByClassName("Home")[0].innerHTML = document.getElementsByClassName("items")[0].innerHTML;
   });


    document.getElementById("customer").addEventListener("click",function(){
      document.getElementsByClassName("Home")[0].innerHTML = document.getElementsByClassName("customers")[0].innerHTML;
    });

```



