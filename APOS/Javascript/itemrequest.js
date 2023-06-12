let show=[];
//To add the data into array and validate the form
var i=0;
function validData()
{
  var count=0;
  var iname=document.getElementsByClassName('itname');
  for(j=0;j<iname.length;j++)
  {
    if(iname[j].value=="")
    {
      count++;
    }
  }
  if(count==0)
  {
    addData();
    return true;
  }
  else 
  {
    alert("Please Provide item details!");
    return false;
  }
}

function addData()
{
  let iname=document.getElementById('iname').value;
  let qnt=document.getElementById('qt').value;
  let edate=document.getElementById('edate').value;
  show.push({
    "ItemName":iname,
    "Quantity":qnt,
    "edate":edate
  })
    document.querySelector(" #show tbody").innerHTML+=`<tr><td>${i+1}</td><td>${show[i].ItemName}</td><td>${show[i].Quantity}</td><td>${show[i].edate}</td></tr>`;
    i++;
    var itemRequest;
//To store the datas into localstorage---------------------------------------------------------------------------------
  document.getElementById('submit').addEventListener('click',function()
  {
    for(i=0;i<show.length;i++)
    {
        if(localStorage.getItem('ItemRequest')===null)
        {
            itemRequest=[];
        }
        else
        {
            itemRequest=JSON.parse(localStorage.getItem('ItemRequest'));
        }   
        itemRequest.push({
            "ItemName":show[i].ItemName,
            "Quantity":show[i].Quantity,
            "edate":show[i].edate
        })
        localStorage.setItem('ItemRequest',JSON.stringify(itemRequest));
        document.querySelector(" #show tbody").innerHTML=" ";
    }
    alert("Submitted Successfully!!");
//remove items from localstorage-------------------------------------------------------------------------------------------
    document.getElementById('reset').addEventListener('click',function()
  {
    localStorage.removeItem("ItemRequest");
  })
  })
}
