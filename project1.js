function setCookie(cname,cvalue)
{
	let myCookie=cname+"="+cvalue;
	let d=new Date();
	d.setMinutes(d.getMinutes()+5);
	document.cookie=myCookie+";expires="+d.toUTCString()+";path=/";
}

function getCookie(cname)
{
	let myCookie=cname+"=";
	let allCookies=decodeURIComponent(document.cookie);
	let cookieArray=allCookies.split(";");
	for(let k=0;k<cookieArray.length;k++)
	{
	  if(cookieArray[k].indexOf(myCookie)!=-1)
	  {
		let cvalue=cookieArray[k].substring(cookieArray[k].indexOf("=")+1);
		if(cvalue==="")
		{
				continue;
		}
		else
		{
			return cvalue;
		}
			
	  }		
	}
	return "";
}

function jsfetch(filterId)
{

  let val = getCookie("username");
  if((val!="")&&(val!=null)){
    document.getElementById("cart").innerHTML= localStorage.getItem("finalHTML");
    alert("cookie")
  }
  fetch("products.json").then((response)=>response.json()).then((myObject)=>{
      for(let k in myObject)
        {
          if(myObject[k].filter_id===filterId)
            {
              let arr =myObject[k].products;
              let productHTML="";
              for(let j in arr)
                {
                  productHTML+=displayProduct(arr[j]);
                }
              
              document.querySelectorAll(".container")[0].innerHTML = productHTML;
             
              }           
            }
        }
)
}

function displayProduct(products_array){
    return `<div class="new" id="${products_array.id}" >
            <img src="${products_array.image_src}">
            <p>${products_array.product_name}</p>
            <div class="box">
                <span>Price:₹${products_array.Price}</span>
                <button class="btn" onclick="addToCart('${products_array.product_name}','${products_array.Price}','${products_array.image_src}','${products_array.product_id}')">Add to cart</button>
            </div>
            </div>`;
}

  
    function addToCart(name,price,img,id)
    {
      let cookieValue=getCookie("username");
	    if(!(cookieValue==="")&&!(cookieValue===null))
	    {
        let productsString=localStorage.getItem("productsArray");
        
        let prodArr=productsString.split(",");
        if(prodArr.indexOf(String(id)) != -1) 
          {
          alert("Product already in cart");
          }
       
        else
        {
          productsString += "," + id;

          let myContainer=document.getElementById("flexContainer");
          
          
          let newDiv=document.createElement("div");
          newDiv.id=id;
          let productNameLabel=document.createElement("label");
          let productLabelText=document.createTextNode("Product Name:");
          productNameLabel.appendChild(productLabelText);
          newDiv.appendChild(productNameLabel);

          let nameSpan=document.createElement("span");
          let nameText=document.createTextNode(name);
          nameSpan.appendChild(nameText);
          nameSpan.style.marginLeft="20px";
          newDiv.appendChild(nameSpan);

          let myBr=document.createElement("br");
          newDiv.appendChild(myBr);

          let quantityLabel=document.createElement("label");
          let quanLabelText=document.createTextNode("Quantity:");
          quantityLabel.appendChild(quanLabelText);
          newDiv.appendChild(quantityLabel);

          localStorage.setItem("productsArray",productsString);

          let currentHTML=newDiv.innerHTML;
          let inputHTML=`<input style="margin-left:10px;text-align:center;border-radius:3px; border:none;background-color:rgb(212, 184, 201)"
           type="number" id="i${id}" value="1" onchange="populateQuantity(${false})">`; // why false
          currentHTML+=inputHTML;
          newDiv.innerHTML=currentHTML; 

          let myBr2=document.createElement("br");
          newDiv.appendChild(myBr2);

          let priceLabel=document.createElement("label");
          let priceText=document.createTextNode("Price:");
          priceLabel.appendChild(priceText);
          newDiv.appendChild(priceLabel);

          let priceSpan=document.createElement("span");
		  let priceSpanText=document.createTextNode(`₹${price}`)
          priceSpan.style.marginLeft="90px";
          priceSpan.appendChild(priceSpanText);
          newDiv.appendChild(priceSpan);
        
          let myHr=document.createElement("hr");
          newDiv.appendChild(myHr);

          let newDivInnerHTML = newDiv.innerHTML;
          let myDelButton=`<button class="badge badge-pill badge-danger" style="padding:10px; margin-left:200px;" onclick="removeItem(${id})">
                              <img src="images/trash3-fill.svg">
                           </button>`;
          newDivInnerHTML+=myDelButton;
          newDiv.innerHTML=newDivInnerHTML;

          let myButtons=document.getElementById("buttons");
          myContainer.insertBefore(newDiv,myButtons);

          let flexOutput=document.getElementById("cart");
          flexOutput.replaceChild(myContainer,document.getElementById("flexContainer"));
          localStorage.setItem("finalHTML",flexOutput.innerHTML);

          populateQuantity();
          
          let newImgArr=localStorage.getItem("imgSrcs").split(",");
          newImgArr.push(img);
          localStorage.setItem("imgSrcs",newImgArr);
          
          let newPriceArr=localStorage.getItem("prices").split(",");
          newPriceArr.push(price);
          localStorage.setItem("prices",newPriceArr);
        }
      }

      else
      {
        let uname=prompt("Introduce Yourself");
	      if(!(uname===null)&&!(uname==="")) 
	      {
	        setCookie("username",uname);

          localStorage.setItem("finalHTML","")

          let productsArray="";

          let cookieValue=getCookie("username");

	        productsArray=id;

          localStorage.setItem("productsArray",productsArray);

          
          returnDiv=`<div id="flexContainer"> 
                      <H2>Welcome,${cookieValue}</H2>
                      <div id="${id}">
                        <label>Product_name:</label>
                        <span style="margin-left:20px;">${name}</span>
                        <br>
                        <label>Quantity:</label>
                        <input style="margin-left:10px;text-align:center;border-radius:3px; border:none;background-color:rgb(212, 184, 201)" 
                        type="number"  id="i${id}" value="1" onchange="populateQuantity()">
                        <br>
                        <label>Price:</label>
                        <span style="margin-left:90px;">₹${price}</span>
                        <br>
                        <hr>
                        <button class="badge badge-pill badge-danger" style="padding:10px;margin-left:200px;" onclick="removeItem(${id})">
                          <img src="images/trash3-fill.svg">
                        </button>
                      </div>
                      <div id="buttons">
                        <button class="btn btn-danger" onclick="clearCart()" style="float:left;margin:7px auto auto 10px;">
                          Clear Cart
                        </button>
                        <button class="btn btn-success" style="float:right;margin:7px 10px auto auto;" onclick="checkOut()" >
                          Check-Out
                        </button>
                      </div>
                    </div>`
                
	        localStorage.setItem("finalHTML",returnDiv);

          let myPriceArray=new Array();
	        myPriceArray.push(price);
          localStorage.setItem("prices",myPriceArray);

	        let myImageSrcs=new Array();
	        myImageSrcs.push(img);
	        localStorage.setItem("imgSrcs",myImageSrcs);

          document.getElementById("cart").innerHTML=returnDiv;

          populateQuantity();
        }
      }
    }

function populateQuantity()
  {
    let prodArray=localStorage.getItem("productsArray").split(","); 
    let len=prodArray.length;
    let qtyArr=new Array();
  
    for(let k=0;k<len;k++)
    {		
		if(document.getElementById(`i${prodArray[k]}`).value!="") 
      {
        qtyArr[k]=document.getElementById(`i${prodArray[k]}`).value;
      }
      else
      {	
        qtyArr[k]=1;
      }	
    }
  
    localStorage.setItem("qty",qtyArr);
  }

function removeItem(product_id)
{
	let productsString=localStorage.getItem("productsArray");
  let qty=localStorage.getItem("qty").split(",");

	let productsArray=productsString.split(",");

	let imgSrcArr=localStorage.getItem("imgSrcs").split(",");
	let priceArr=localStorage.getItem("prices").split(",");

	let removePosition=productsArray.indexOf(`${product_id}`); 
	productsArray.splice(removePosition,1);
	qty.splice(removePosition,1);
	imgSrcArr.splice(removePosition,1);
	priceArr.splice(removePosition,1);

	localStorage.setItem("productsArray",productsArray);
	localStorage.setItem("qty",qty);
	localStorage.setItem("imgSrcs",imgSrcArr);
	localStorage.setItem("prices",priceArr);

	if(productsArray.length===0) 
	{
		d=new Date(); 
		d.setMonth(d.getMonth()-1);
		document.cookie="username=;expires="+d.toUTCString()+";path=/";

		localStorage.setItem("productsArray","");
		document.getElementById("cart").innerHTML="";
		localStorage.setItem("finalHTML","");
		localStorage.setItem("qty","");
		localStorage.setItem("imgSrcs","");
		localStorage.setItem("prices","");
	}
	else
	{
		let finalOutput=document.getElementById("cart");
		let container=document.getElementById("flexContainer");
		
		let child=document.getElementById(`${product_id}`);
		container.removeChild(child);
		finalOutput.replaceChild(container,document.getElementById("flexContainer"));
		
		let finalHTML=finalOutput.innerHTML;
	  document.getElementById("cart").innerHTML=finalHTML;
		localStorage.setItem("finalHTML",finalHTML);
		
		let qtyArray=localStorage.getItem("qty").split(",");
		let prodArray=localStorage.getItem("productsArray").split(",");
			
		for(let i=0;i<prodArray.length;i++)
		{
		document.getElementById(`i${prodArray[i]}`).value=qtyArray[i]	
		}  
	}
}

function clearCart()
  {
    d=new Date();
    d.setMonth(d.getMonth()-1);
    document.cookie="username=;expires="+d.toUTCString()+";path=/";
    localStorage.setItem("productsArray","");
    document.getElementById("cart").innerHTML="";
    localStorage.setItem("finalHTML","");
    localStorage.setItem("qty","");
    localStorage.setItem("prices","");
    localStorage.setItem("imgSrcs","");
  }

  function checkOut()
	{
		let myImageArr=localStorage.getItem("imgSrcs").split(",");
		let qtyArr=localStorage.getItem("qty").split(",");
		let priceArr=localStorage.getItem("prices").split(",");
		
		let myTable=`<table style="width:90%">
                  <tr>
                    <th class="table-product-heading text-center">Product</th>
                    <th class="table-items-heading text-center">Quantity</th>
                    <th class="table-items-heading text-center">Price</th>
                    <th class="table-total-heading text-center">Total</th>
                  </tr>`;
		let grandTotal=0;
		
		for(let i=0; i<myImageArr.length; i++)
		{
      		let amount=Number(qtyArr[i])*Number(priceArr[i]);
      		grandTotal+=amount;
      		myTable+=`<tr>
                  		<td class="table-product-content">
                    <img src="${myImageArr[i]}" style="width:100px;height:100px;object-fit:cover;border:1px solid white;">
                  </td>
                  <td class="table-product-items">
                    ${qtyArr[i]}
                  </td>
                  <td class="table-product-items">
                    ₹${priceArr[i]}
                  </td>
                  <td class="table-product-total">
                    ₹${amount}
                  </td>
                </tr>`;	
        }
		
      myTable+=`<tr>
                  <td colspan="3" style="text-align:center;">
                    <b>Grand Total</b>
                  </td>
                  <td class="table-total-heading">
                   <b> ₹${grandTotal}</b>
                  </td>
                </tr>
              </table>`;
		let billDiv=`<div id="billTable">
                  <h2 style="color:rgb(91, 21, 60)">Your Final Bill</h2>
                  ${myTable}
                
                  <button id="backToCart" class="btn btn-danger" onclick="goBack()" style="float:left;margin:7px auto auto 34px;">
                    Back
                  </button>
                  <button class="btn btn-success" id="pay" onclick="proceedPayment(${grandTotal})" style="float:right;margin:7px 34px auto auto;">
                    Proceed To Pay
                  </button>
                </div>
		            <div id="bankInfo"></div>`;
		document.getElementById("finalBill").style.display="block";
		document.getElementById("finalBill").innerHTML=billDiv;
	}
	
function goBack()
	{
		document.getElementById("finalBill").innerHTML="";
		document.getElementById("finalBill").style.display="none";
	}

function proceedPayment(total)
{
  let cardDiv=`<img src="images/visa.png">
               <img src="images/mastercard.png">
               <img src="images/amazon-pay.png">
               <img src="images/paypal.png" style= width:50px; height:90px;>`;
  cardDiv+=`<H4 style="margin:10px auto auto auto">
              Amount Payable:₹${total}
            </H4>`;
  cardDiv+=`<div style="width:600px;">
              <div id="cardDetail">
                <label>Card Number:</label>
                <input type="text" style="width:50px;text-align:center;" maxlength="4">-
                <input type="text" style="width:50px;text-align:center;" maxlength="4">-
                <input type="text" style="width:50px;text-align:center;" maxlength="4">-
                <input type="text" style="width:50px;text-align:center;" maxlength="4">
              </div>`;
  cardDiv+=   `<div style="margin:10px 10px auto auto;float:right;">
                CVV/CVV2:
                <input type="password" style="appearance:none;padding-left:15px;width:70px;background-image:url('images/lock.png');background-size:15px auto;background-position:1px 5px;background-repeat:no-repeat;text-indent:5px;" maxlength="3">
              </div>
            </div>`;
  cardDiv+=`<div style="margin:10px 440px auto auto;clear:left;">
            <label>Valid thru:</label>
            <input type="text" style="width:40px;text-align:center;margin-top:10px;" maxlength="2">&nbsp; /
            <input type="text" style="width:40px;text-align:center;margin-top:10px;" maxlength="2">
            </div>
            <hr style="margin:0px;padding:0px;">`;
  cardDiv+=`<button class="btn btn-success" onclick="paymentSuccessfull()" style="float:right;margin-right:15px;">
              Confirm payment
            </button>`;
  document.getElementById("bankInfo").innerHTML=cardDiv;
  
  $("#bankInfo").slideDown(3000);
}

function paymentSuccessfull()
{
  alert("Thank you for shopping with us. Your order will be delivered shortly");
  clearCart();
  document.getElementById("finalBill").innerHTML="";
  document.getElementById("finalBill").style.display="none";
  backToHome();
}



function backToHome(){
    document.getElementById("back").innerHTML=`<div class="carous">
        <div id="demo" class="carousel slide" data-ride="carousel">

            <!-- Indicators -->
          <ul class="carousel-indicators">
            <li data-target="#demo" data-slide-to="0" class="active"></li>
            <li data-target="#demo" data-slide-to="1"></li>
            <li data-target="#demo" data-slide-to="2"></li>
            <li data-target="#demo" data-slide-to="4"></li>
            <li data-target="#demo" data-slide-to="5"></li>
          </ul>
            <!-- The slideshow -->
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="images/home1.jpg" alt="Home Decor">
                <img src="images/home2.jpeg" alt="Home Decor">
                <img src="images/home5.jpeg" alt="Home Decor">
                <img src="images/home6.jpg" alt="Home Decor">
              </div>
              <div class="carousel-item">
                <img src="images/women9.jpg" alt="Women's store">
                <img src="images/women7.jpeg" alt="Women's store">
                <img src="images/women5.jpeg" alt="Women's store">
                <img src="images/women8.jpeg" alt="Women's store">
              </div>
              <div class="carousel-item">
                <img src="images/men1.jpeg" alt="Men's store">
                <img src="images/men2.jpeg" alt="Men's store">
                <img src="images/men5.jpg" alt="Men's store">
                <img src="images/men4.jpeg" alt="Men's store">
              </div>
              <div class="carousel-item">
                <img src="images/food14.jpg" alt="Food">
                <img src="images/food12.jpg" alt="Food">
                <img src="images/food13.jpg" alt="Food">
                <img src="images/food11.jpg" alt="Food">
              </div>
              <div class="carousel-item">
                <img src="images/gadget3.jpg" alt="Gadget">
                <img src="images/gadget2.jpg" alt="Gadget">
                <img src="images/gadget4.jpg" alt="Gadget">
                <img src="images/gadget5.jpg" alt="Gadget">
              </div>
            </div>
            <!-- Left and right controls -->
            <a class="carousel-control-prev" href="#demo" data-slide="prev">
              <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#demo" data-slide="next">
              <span class="carousel-control-next-icon"></span>
            </a>
        </div>
        </div>`
}
