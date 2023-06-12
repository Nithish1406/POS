
//inventory form button change----------------------------------------------------------------------------------------------
document.getElementById('add').addEventListener('click', function () {
    document.getElementById('edit').style.display = "none";
    document.getElementById('submit').style.display = "block";
})

//filter custom options---------------------------------------------------------------------------------------------------

//validation in form------------------------------------------------------------------------------------------------------
function validateData() {
    let form = document.getElementById('inventory');
    let len = form.querySelectorAll(".info").length;
    let info = form.querySelectorAll(".info");
    let error = document.getElementsByTagName('small');
    let count = 0;
    for (i = 0; i < len; i++) {
        if (info[i].type == "radio") {
            var getSelectedValue = document.querySelector('input[name="items"]:checked');
            if (getSelectedValue == null) {
                error[i].innerHTML = `${info[i].name} is required`;
                count++;
            }
            else {
                error[i].innerHTML = ` `;
            }
        }
        else {
            if (info[i].value == "") {
                error[i].innerHTML = `${info[i].name} is required`;
                count++;
            }
            else {
                error[i].innerHTML = ` `;
            }
        }
    }
    if (count == 0) {
        return true;
    }
    else {
        return false;
    }
}


//To add the form datas--------------------------------------------------------------------------------------------------
function addData() {
    if (validateData() === true) {
        let itemNo = document.getElementById('ino').value;
        let itemName = document.getElementById('iname').value;
        let itemPrice = document.getElementById('iprice').value;
        let itemPurchase = document.getElementById('ipurchase').value;
        let itemCategory = document.querySelector("[name='items']:checked").value;
        let itemPdate = document.getElementById('ipdate').value;

        console.log(itemPdate);
        let sold = 0;
        let itemImage = "";
        if (localStorage.getItem("inventory") == null) {
            inventory = [];
        }
        else {
            inventory = JSON.parse(localStorage.getItem('inventory'));
        }
        if (document.querySelector("[name='items']:checked").value == "Drinks") {
            const reader = new FileReader();
            reader.addEventListener('load', function () {

                inventory.push({
                    "ItemNo": itemNo,
                    "ItemName": itemName,
                    "ItemPrice": itemPrice,
                    "ItemPurchase": itemPurchase,
                    "ItemSold": sold,
                    "ItemStock": itemPurchase,
                    "ItemCategory": itemCategory,
                    "ItemPdate": itemPdate,
                    "ItemImages": reader.result
                })
                localStorage.setItem('inventory', JSON.stringify(inventory));
                window.location.href = "inventory.html";
            })
            reader.readAsDataURL(document.getElementById('iimage').files[0]);
        }
        else {
            inventory.push({
                "ItemNo": itemNo,
                "ItemName": itemName,
                "ItemPrice": itemPrice,
                "ItemPurchase": itemPurchase,
                "ItemSold": sold,
                "ItemStock": itemPurchase,
                "ItemCategory": itemCategory,
                "ItemPdate": itemPdate,
                "ItemImages": itemImage
            })
            localStorage.setItem('inventory', JSON.stringify(inventory));
            window.location.href = "inventory.html";
        }
    }

}



//To show the table contents---------------------------------------------------------------------------------------------
function showData() {
    var inventory;
    html = "";
    if (localStorage.getItem("inventory") != null) {
        inventory = JSON.parse(localStorage.getItem('inventory'));
//empty value sorting------------------------------------------------------------------------------------------------
    if (document.getElementById('rt').value == "") {

        for (i = 0; i < inventory.length; i++) {
            if (inventory[i].ItemStock == 0) {
                html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-danger' style='font-weight:bolder;'>Unavailable</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
    onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
        aria-hidden="true"></i></button><button class='btn btn-danger'
    style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
        aria-hidden="true"></i></button></td></tr>`;
            }
            else {
                html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-success' style='font-weight:bolder;'>Available</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
        onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
            aria-hidden="true"></i></button><button class='btn btn-danger'
        style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
            aria-hidden="true"></i></button></td></tr>` ;
            }
        }
        document.querySelector("#show tbody").innerHTML = html;
    }

//Today sorting--------------------------------------------------------------------------------------------------
    else if (document.getElementById('rt').value == "Today") {
        var count = 0;
        var date = new Date();
        var pdate = date.getDate();
        var pmonth = date.getMonth();
        var pyear = date.getFullYear();
        var today = (pyear.toString() + pmonth.toString() + pdate.toString());
        for (i = 0; i < inventory.length; i++) {
            let date1 = new Date(inventory[i].ItemPdate)
            let pdate1 = date1.getDate();
            let pmonth1 = date1.getMonth();
            let pyear1 = date1.getFullYear();
            let today1 = (pyear1.toString() + pmonth1.toString() + pdate1.toString());
            if (today == today1) {
                if (inventory[i].ItemStock == 0) {
                    html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-danger' style='font-weight:bolder;'>Unavailable</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
        onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
            aria-hidden="true"></i></button><button class='btn btn-danger'
        style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
            aria-hidden="true"></i></button></td></tr>`;
                }
                else {
                    html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-success' style='font-weight:bolder;'>Available</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
            onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
                aria-hidden="true"></i></button><button class='btn btn-danger'
            style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
                aria-hidden="true"></i></button></td></tr>` ;
                }
                count++;
            }
        }
        if (count == 0) {
            html += `<tr><td colspan='9' align='center' class='text-danger'>No record is available</td></tr>`;
        }
        document.querySelector("#show tbody").innerHTML = html;

    }

//yesterday sorting----------------------------------------------------------------------------------------------------

    else if (document.getElementById('rt').value == "Yesterday") {
        var count = 0;
        var date = new Date();
        var pdate = date.getDate() - 1;
        var pmonth = date.getMonth();
        var pyear = date.getFullYear();
        var today = (pyear.toString() + pmonth.toString() + pdate.toString());
        for (i = 0; i < inventory.length; i++) {
            let date1 = new Date(inventory[i].ItemPdate)
            let pdate1 = date1.getDate();
            let pmonth1 = date1.getMonth();
            let pyear1 = date1.getFullYear();
            let today1 = (pyear1.toString() + pmonth1.toString() + pdate1.toString());
            if (today == today1) {
                if (inventory[i].ItemStock == 0) {
                    html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-danger' style='font-weight:bolder;'>Unavailable</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
        onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
            aria-hidden="true"></i></button><button class='btn btn-danger'
        style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
            aria-hidden="true"></i></button></td></tr>`;
                }
                else {
                    html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-success' style='font-weight:bolder;'>Available</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
            onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
                aria-hidden="true"></i></button><button class='btn btn-danger'
            style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
                aria-hidden="true"></i></button></td></tr>` ;
                }
                count++;
            }
        }
        if (count == 0) {
            html += `<tr><td colspan='9' align='center' class='text-danger'>No record is available</td></tr>`;
        }
        document.querySelector("#show tbody").innerHTML = html;
    }


//This week sorting-------------------------------------------------------------------------------------------------------

    else if (document.getElementById('rt').value == "This Week") {
        var count = 0;
        currentDate = new Date();
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        var days = Math.floor((currentDate - startDate) /
            (24 * 60 * 60 * 1000));
        var weekNumber = Math.ceil(days / 7);
        for (i = 0; i < inventory.length; i++) {
            currentDate1 = new Date(inventory[i].ItemPdate);
            startDate1 = new Date(currentDate1.getFullYear(), 0, 1);
            var days1 = Math.floor((currentDate1 - startDate1) /
                (24 * 60 * 60 * 1000));
            var weekNumber1 = Math.ceil(days1 / 7);
            if (weekNumber == weekNumber1){
                if (inventory[i].ItemStock == 0) {
                    html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-danger' style='font-weight:bolder;'>Unavailable</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
        onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
            aria-hidden="true"></i></button><button class='btn btn-danger'
        style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
            aria-hidden="true"></i></button></td></tr>`;
                }
                else {
                    html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-success' style='font-weight:bolder;'>Available</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
            onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
                aria-hidden="true"></i></button><button class='btn btn-danger'
            style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
                aria-hidden="true"></i></button></td></tr>` ;
                }
                count++;
            }
        }
        if (count == 0) {
            html += `<tr><td colspan='9' align='center' class='text-danger'>No record is available</td></tr>`;
        }
        document.querySelector("#show tbody").innerHTML = html;

    }

//Last Week sorting--------------------------------------------------------------------------------------------------------

    else if (document.getElementById('rt').value == "Last Week") {
        var count = 0;
        
        currentDate = new Date();
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        var days = Math.floor((currentDate - startDate) /
            (24 * 60 * 60 * 1000));
        var weekNumber = Math.ceil(days / 7)-1;
        for (i = 0; i < inventory.length; i++) {
            
            currentDate1 = new Date(inventory[i].ItemPdate);
            startDate1 = new Date(currentDate1.getFullYear(), 0, 1);
            var days1 = Math.floor((currentDate1 - startDate1) /
                (24 * 60 * 60 * 1000));
            var weekNumber1 = Math.ceil(days1 / 7);
            if (weekNumber == weekNumber1){
                if (inventory[i].ItemStock == 0) {
                    html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-danger' style='font-weight:bolder;'>Unavailable</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
        onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
            aria-hidden="true"></i></button><button class='btn btn-danger'
        style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
            aria-hidden="true"></i></button></td></tr>`;
                }
                else {
                    html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-success' style='font-weight:bolder;'>Available</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
            onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
                aria-hidden="true"></i></button><button class='btn btn-danger'
            style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
                aria-hidden="true"></i></button></td></tr>` ;
                }
                count++;
            }
        }
        if (count == 0) {
            html += `<tr><td colspan='9' align='center' class='text-danger'>No record is available</td></tr>`;
        }
        document.querySelector("#show tbody").innerHTML = html;

    }

//This Month sorting--------------------------------------------------------------------------------------------------

    else if (document.getElementById('rt').value == "This Month") {
        var count = 0;
        var date = new Date();
        var pmonth = date.getMonth();
        var pyear = date.getFullYear();
        var today = (pyear.toString() + pmonth.toString());
        for (i = 0; i < inventory.length; i++) {
            let date1 = new Date(inventory[i].ItemPdate)
            let pmonth1 = date1.getMonth();
            let pyear1 = date1.getFullYear();
            let today1 = (pyear1.toString() + pmonth1.toString());
            if (today == today1) {
                if (inventory[i].ItemStock == 0) {
                    html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-danger' style='font-weight:bolder;'>Unavailable</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
        onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
            aria-hidden="true"></i></button><button class='btn btn-danger'
        style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
            aria-hidden="true"></i></button></td></tr>`;
                }
                else {
                    html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-success' style='font-weight:bolder;'>Available</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
            onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
                aria-hidden="true"></i></button><button class='btn btn-danger'
            style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
                aria-hidden="true"></i></button></td></tr>` ;
                }
                count++;
            }
        }
        if (count == 0) {
            html += `<tr><td colspan='9' align='center' class='text-danger'>No record is available</td></tr>`;
        }
        document.querySelector("#show tbody").innerHTML = html;

    }

//Last Month--------------------------------------------------------------------------------------------------------------
    else if (document.getElementById('rt').value == "Last Month") {
        var count = 0;
        var date = new Date();
        var pmonth = date.getMonth() - 1;
        var pyear = date.getFullYear();
        var today = (pyear.toString() + pmonth.toString());
        for (i = 0; i < inventory.length; i++) {
            let date1 = new Date(inventory[i].ItemPdate)
            let pmonth1 = date1.getMonth();
            let pyear1 = date1.getFullYear();
            let today1 = (pyear1.toString() + pmonth1.toString());
            if (today == today1) {
                if (inventory[i].ItemStock == 0) {
                    html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-danger' style='font-weight:bolder;'>Unavailable</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
        onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
            aria-hidden="true"></i></button><button class='btn btn-danger'
        style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
            aria-hidden="true"></i></button></td></tr>`;
                }
                else {
                    html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-success' style='font-weight:bolder;'>Available</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
            onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
                aria-hidden="true"></i></button><button class='btn btn-danger'
            style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
                aria-hidden="true"></i></button></td></tr>` ;
                }
                count++;
            }
        }
       
        document.querySelector("#show tbody").innerHTML = html;

    }

//Custom-----------------------------------------------------------------------------------------------------------------
    else if (document.getElementById('rt').value == "Custom") 
    {
        var count = 0;
        document.getElementById("custom").style.display = "inline";
            var date0 = document.getElementById('start').value;
            var date1 = document.getElementById('end').value;
            for (i = 0; i < inventory.length; i++) {
                var inventdate=inventory[i].ItemPdate;
                if (inventdate >= date0 && inventdate <= date1) {
                    
                    if (inventory[i].ItemStock == 0) {
                        html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-danger' style='font-weight:bolder;'>Unavailable</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
            onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
                aria-hidden="true"></i></button><button class='btn btn-danger'
            style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
                aria-hidden="true"></i></button></td></tr>`;
                    }
                    else {
                        html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-success' style='font-weight:bolder;'>Available</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
                onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
                    aria-hidden="true"></i></button><button class='btn btn-danger'
                style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
                    aria-hidden="true"></i></button></td></tr>` ;   
                }   
                count++;     
                }
                  
            }
            if (count == 0) {
                for (i = 0; i < inventory.length; i++) {
                        
                        if (inventory[i].ItemStock == 0) {
                            html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-danger' style='font-weight:bolder;'>Unavailable</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
                onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
                    aria-hidden="true"></i></button><button class='btn btn-danger'
                style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
                    aria-hidden="true"></i></button></td></tr>`;
                        }
                        else {
                            html += `<tr><td>${inventory[i].ItemNo}</td><td>${inventory[i].ItemName}</td><td>${'$' + inventory[i].ItemPrice}</td><td>${inventory[i].ItemPurchase}</td><td>${inventory[i].ItemSold}</td><td>${inventory[i].ItemStock}</td><td>${inventory[i].ItemCategory}</td><td><p class='text-success' style='font-weight:bolder;'>Available</p></td><td><button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myModal"
                    onclick='updateData(${i})' id="update"><i class="fa fa-pencil"
                        aria-hidden="true"></i></button><button class='btn btn-danger'
                    style='margin-left:10px;' onclick='deleteData(${i})'><i class="fa fa-trash-o"
                        aria-hidden="true"></i></button></td></tr>` ;   
                    }  
                }      
            }
            document.querySelector("#show tbody").innerHTML = html;
    }
}
}

document.onload = showData();

//To delete localstorage values------------------------------------------------------------------------------------------------

function deleteData(index) {
    var inventory;
    if (localStorage.getItem("inventory") == null) {
        inventory = [];
    }
    else {
        inventory = JSON.parse(localStorage.getItem('inventory'));
    }
    inventory.splice(index, 1);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    window.location.href = "inventory.html";
}
//To update localstorage values------------------------------------------------------------------------------------------------

function updateData(index) {
    document.getElementById('submit').style.display = "none";
    document.getElementById('edit').style.display = "block";
    var inventory;
    if (localStorage.getItem("inventory") == null) {
        inventory = [];
    }
    else {
        inventory = JSON.parse(localStorage.getItem('inventory'));
    }

    document.getElementById('ino').value = inventory[index].ItemNo;
    document.getElementById('iname').value = inventory[index].ItemName;
    document.getElementById('iprice').value = inventory[index].ItemPrice;
    document.getElementById('ipurchase').value = inventory[index].ItemPurchase;
    document.getElementById('ipdate').value = inventory[index].ItemPdate;
    var image = inventory[index].ItemImage;
    var sold = inventory[index].ItemSold;
    var stock = inventory[index].ItemStock;
    console.log(inventory[index].ItemCategory);
    if (inventory[index].ItemCategory == 'Snacks') {
        document.inventory.items[0].checked = true;
    }
    else {
        document.inventory.items[1].checked = true;
    }
    document.getElementById('edit').addEventListener('click', function () {
        if (validateData() == true) {
            inventory[index].ItemNo = document.getElementById('ino').value;
            inventory[index].ItemName = document.getElementById('iname').value;
            inventory[index].ItemPrice = document.getElementById('iprice').value;
            inventory[index].ItemPurchase = document.getElementById('ipurchase').value;
            inventory[index].ItemImage = image;
            inventory[index].ItemSold = sold;
            inventory[index].ItemPdate = document.getElementById('ipdate').value;
            inventory[index].ItemStock = document.getElementById('ipurchase').value;
            localStorage.setItem('inventory', JSON.stringify(inventory));
            window.location.href = "inventory.html";
        }
    })
}