
    //show the inventory content into image container and scroll bar container
// var ht=document.getElementById('bill');
// if(ht.clientHeight>400)
// {
//     ht.style.overflowY="scroll";
// }
var inventory;
if (localStorage.getItem("inventory") == null) {
    inventory = [];
}
else {
    inventory = JSON.parse(localStorage.getItem('inventory'));
}

for (i = 0; i < inventory.length; i++) {
    if (inventory[i].ItemCategory == "Drinks") {
        document.getElementById('images').innerHTML += `<div class="d-flex p-2" >
            <img src="${inventory[i].ItemImages}" height="105" width="162" onclick="showBill(${Number.parseInt(inventory[i].ItemNo)},${1})">
         </div>`;
    }
    else
    {
        document.getElementById('container').innerHTML+=`<div class="gridscroll  text-center bg-primary mt-1" onclick="showBill(${Number.parseInt(inventory[i].ItemNo)},${1})">
        ${inventory[i].ItemName}
    </div>`;
    }
}
//scrolling process--------------------------------------------------------------------------------------------------------------------------------
$("document").ready(function () {
    var ht=50;
// next-------------------------------------------------------------------------------------------------------------------
    $('#next').click(function()
    {
        $('#container').animate(
            {
                scrollTop: "+="+ ht
            },500);
    })
// previous------------------------------------------------------------------------------------------------------------------
     $('#previous').click(function()
     {
         $('#container').animate(
             {
                 scrollTop: "-="+ht
             },500);
     })
});
//check Quantity
function checkQuantity(iname,qt)
{
    var temp=false;
    for(check=0;check<inventory.length;check++)
    {
        if(inventory[check].ItemName==iname && Number.parseInt(qt)<=Number.parseInt(inventory[check].ItemStock))
        {
            temp=true;
        }
    }
    if(temp)
    {
        return true;
    }
    else 
    {
        return false;
    }
}


//show item data in table format--------------------------------------------------------------------------------------------
function showBill(ino,quantity)
{   
    var checkIn=false;
    let inventory = JSON.parse(localStorage.getItem('inventory'));
    var bdate=new Date().toJSON().slice(0,10);       
    for(index=0;index<inventory.length;index++)
    {
        if(ino==inventory[index].ItemNo)
        {
            var itemName=itemName=inventory[index].ItemName;
            var itemPrice=inventory[index].ItemPrice;
        }
    }

      var billInfo;

    if(localStorage.getItem('billInfo')==null)
    {
        billInfo=[];
    }
    else
    {
        billInfo=JSON.parse(localStorage.getItem('billInfo'));
    }
//array 0
    if(billInfo.length==0)
    {
    if(checkQuantity(itemName,quantity))
    {
        var totalPrice=(Number.parseInt(quantity)*Number.parseInt(itemPrice));
        billInfo.push({
        "Item":itemName,
        "Qunatity":quantity,
        "UnitPrice":itemPrice,
        "TotalPrice":totalPrice,
        "bdate":bdate
    });
    checkIn=true;
    }
    localStorage.setItem('billInfo',JSON.stringify(billInfo));
    showData();
    }
//array !=0
    else
    {
        var bool=false;
          for(i=0;i<billInfo.length;i++)
          {
            if(billInfo[i].Item==itemName)
            {
                var quantityloop=Number.parseInt(billInfo[i].Qunatity);
                quantityloop+=Number.parseInt(quantity);
                if(checkQuantity(itemName,quantityloop))
                {
                    billInfo[i].TotalPrice=(quantityloop*itemPrice);
                    billInfo[i].Qunatity=quantityloop;
                    checkIn=true;
                }
                bool=true;
            }
          } 
//true existing item quantity increased and Totalprice also changed
          if(bool)
          {
            localStorage.setItem('billInfo',JSON.stringify(billInfo));
            showData();
          }
//false e
          else
          {
            if(checkQuantity(itemName,quantity))
            {
            var totalPrice=(Number.parseInt(quantity)*Number.parseInt(itemPrice));
            billInfo.push({
                "Item":itemName,
                "Qunatity":quantity,
                "UnitPrice":itemPrice,
                "TotalPrice":totalPrice,
                "bdate":bdate
            });
            checkIn=true;
            }
            localStorage.setItem('billInfo',JSON.stringify(billInfo)); 
            showData();
          }
    }
    if(!checkIn)
    {
        alert("Stock is not available");
    }
}

//show bill information------------------------------------------------------------------------------------------------------
function showData()
{
    var pay=0.0;
    var billInfo;
    html="";
    if(localStorage.getItem('billInfo')!=null)
    {
        billInfo=JSON.parse(localStorage.getItem('billInfo'));
        for(i=0;i<billInfo.length;i++)
        {
            pay+=billInfo[i].TotalPrice;
            html+=`<tr><td>${billInfo[i].Item}</td><td>${billInfo[i].Qunatity}</td><td>${'$'+billInfo[i].UnitPrice}</td><td>${'$'+billInfo[i].TotalPrice}</td></tr>`;
        }        
        document.querySelector('#tbShow tbody').innerHTML=html;
        document.querySelector('#pay').innerHTML=pay;
    }
//bill Calculation-------------------------------------------------------------------------------------------------------------
    var gst=(pay*7)/100;
    var tender=0.0;
    var change=0.0;
    document.getElementById('Bill').addEventListener('click',function(){
      $("#bill").hide();
      $("#preview").fadeIn(2000);
        document.querySelector('#amount').innerHTML=pay;
        document.querySelector('#gst').innerHTML=gst;
        document.querySelector('#pay1').innerHTML=pay+gst;
       
    })
    document.getElementById('ten').addEventListener('click',function()
    {
        tender+=10;
        change=(Number.parseFloat(tender)-Number.parseFloat(pay+gst));
        document.querySelector('#tender').innerHTML=tender;
        document.querySelector('#change').innerHTML=change.toFixed(2);
        document.querySelector('#change1').innerHTML=change.toFixed(2);
    })
    document.getElementById('two').addEventListener('click',function()
    {
        tender+=2;
        change=(Number.parseFloat(tender)-Number.parseFloat(pay+gst));
        document.querySelector('#tender').innerHTML=tender;
        document.querySelector('#change').innerHTML=change.toFixed(2);
        document.querySelector('#change1').innerHTML=change.toFixed(2);
    })
    document.getElementById('five').addEventListener('click',function()
    {
        tender+=5;
        change=(Number.parseFloat(tender)-Number.parseFloat(pay+gst));
        document.querySelector('#tender').innerHTML=tender;
        document.querySelector('#change').innerHTML=change.toFixed(2);//Math.abs(change.toFixed(2))
        document.querySelector('#change1').innerHTML=change.toFixed(2);
    }) 
    document.getElementById('fifty').addEventListener('click',function()
    {
        tender+=50;
        change=(Number.parseFloat(tender)-Number.parseFloat(pay+gst));
        document.querySelector('#tender').innerHTML=tender;
        document.querySelector('#change').innerHTML=change.toFixed(2);
        document.querySelector('#change1').innerHTML=change.toFixed(2);
    })
    
}

//New Bill
document.getElementById('newBill').addEventListener('click',function()
{
    localStorage.removeItem('billInfo');
    window.location.href='';
    //   $("#preview").hide();
  //   $("#bill").fadeIn(3000);   
}
)


//cancel lat added item---------------------------------------------------------------------
document.getElementById('cancelItem').addEventListener('click',function(){
  
    if(localStorage.getItem('billInfo')==null)
    {
        billInfo=[];
    }
    else
    {
        billInfo=JSON.parse(localStorage.getItem('billInfo'));
    }
    billInfo.pop();
    localStorage.setItem('billInfo',JSON.stringify(billInfo)); 
    showData();
 })

//Terminate the transaction-----------------------------------------------------------------------------------------------
document.getElementById('terminate').addEventListener('click',function()
{
  $("#preview").hide();
  $("#bill").fadeIn(3000);   
      //   document.querySelector('#bill').style.display='block';
})


//Button processing-------------------------------------------------------------------------------------------------------------------

var ids;
function calNumber(num)
{
    document.getElementById(`${ids}`).value+=num;
}
document.getElementById('ac').addEventListener('click',function()
{   
    document.getElementById(`${ids}`).value=" ";
})
function Cal(answer)
{
    ids=answer;
}

//Clear------------------------------------------------------------------------------------------------------------------
document.getElementById('clear').addEventListener('click',function()
{

    var all=document.querySelectorAll('.form-control').length;
    var clear=document.querySelectorAll('.form-control');
    for(i=0;i<all;i++)
    {
        clear[i].value="";
    }
})
//Delete All Transaction------------------------------------------------------------------------------------------------------
document.getElementById('delete').addEventListener('click',function()
{
  if(localStorage.getItem('salesReport')==null)
  {
      alert("All transaction already deleted successfully!");
  }
  else 
  {
      localStorage.removeItem('salesReport');
      alert("Deleted Successfully");
  }
})

document.getElementById('add').addEventListener('click',function()
{
if(document.getElementById('Ino').value!='' && document.getElementById('qt').value!='')
{
    var ino=document.getElementById('Ino').value;
    var qt=document.getElementById('qt').value;
    showBill(ino,qt);
}  
})

//print---------------------------------------------------------------------------------------------------------------------
document.getElementById('print').addEventListener('click',function()
{
    if (localStorage.getItem("inventory") == null) {
        inventory = [];
    }
    else {
        inventory = JSON.parse(localStorage.getItem('inventory'));
    }
    var billInfo;
    if(localStorage.getItem('billInfo')==null)
    {
        billInfo=[];
    }
    else
    {
        billInfo=JSON.parse(localStorage.getItem('billInfo'));
    }

    for(k=0;k<inventory.length;k++)
    {
        for(l=0;l<billInfo.length;l++)
        {
            if(inventory[k].ItemName==billInfo[l].Item)
            {
                inventory[k].ItemSold=Number.parseInt(inventory[k].ItemSold)+Number.parseInt(billInfo[l].Qunatity);
                inventory[k].ItemStock=Number.parseInt(inventory[k].ItemPurchase)-Number.parseInt(inventory[k].ItemSold);
            }
        }
    }
    localStorage.setItem('inventory',JSON.stringify(inventory));
//-------------------------------------------------------------------------------------------------------
    var salesReport;
    if(localStorage.getItem('salesReport')==null)
    {
        salesReport=[];
    }
    else
    {
        salesReport=JSON.parse(localStorage.getItem('salesReport'));

    }

    for(i=0;i<billInfo.length;i++)
    {
        salesReport.push(
            billInfo[i]
        )
    }
    localStorage.removeItem('billInfo');
    localStorage.setItem('salesReport',JSON.stringify(salesReport));
    // window.open('','',"width=500,height=100");
    // var page=document.getElementById('preview').innerHTML;
    // document.write(`<html><body><h1 align='center'>Invoice Details</h1><div style='margin-left:auto; margin-right:auto; width:50%; height:500px;'>${page}</div></body></html>`);
    // window.print();
    document.getElementById('stop').style.display='none';
    document.getElementById('stop1').style.display='none';
    window.print();
    window.location.href="Billing.html";
})
document.onload=showData();



