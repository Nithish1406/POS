//show the content--------------------------------------------------------------------------------------------
var salesReport;
var html = "";
function showData() {
    document.getElementById("custom").style.display = "none";
    if (localStorage.getItem('salesReport') == null) {
        salesReport = [];
    }
    else {
        salesReport = JSON.parse(localStorage.getItem('salesReport'));
    }
    salesReport.forEach((element, index) => {
        document.querySelector('#tbShow  tbody').innerHTML += `<tr><td>${index + 1}</td><td>${salesReport[index].Item}</td><td>${salesReport[index].Qunatity}</td><td>${'$'+salesReport[index].TotalPrice}</td></tr>`;
    })

    //sorting operations---------------------------------------------------------------------
    document.getElementById('rt').addEventListener('change', function () {
    
    //empty value sorting------------------------------------------------------------------
        if (document.getElementById('rt').value == "") {
            document.getElementById("custom").style.display = "none";
            document.querySelector('#tbShow  tbody').innerHTML = html;
            salesReport.forEach((element, index) => {
                html += `<tr><td>${index + 1}</td><td>${salesReport[index].Item}</td><td>${salesReport[index].Qunatity}</td><td>${'$'+salesReport[index].TotalPrice}</td></tr>`;
            })
            document.querySelector('#tbShow  tbody').innerHTML = html;
        }

        //Today sorting-------------------------------------------------------------------------------------------------
        else if (document.getElementById('rt').value == "Today") {
            document.querySelector('#tbShow  tbody').innerHTML = html;
          
            var count = 0;
            document.getElementById("custom").style.display = "none";
            var date = new Date();
            var pdate = date.getDate();
            var pmonth = date.getMonth();
            var pyear = date.getFullYear();
            var today = (pyear.toString() + pmonth.toString() + pdate.toString());
            salesReport.forEach((element, index) => {
                let date1 = new Date(salesReport[index].bdate)
                let pdate1 = date1.getDate();
                let pmonth1 = date1.getMonth();
                let pyear1 = date1.getFullYear();
                let today1 = (pyear1.toString() + pmonth1.toString() + pdate1.toString());
                if (today == today1) {
                    document.querySelector('#tbShow  tbody').innerHTML += `<tr><td>${index + 1}</td><td>${salesReport[index].Item}</td><td>${salesReport[index].Qunatity}</td><td>${'$'+salesReport[index].TotalPrice}</td></tr>`;
                    count++;
                }
            })
            if (count == 0) {
                document.querySelector('#tbShow  tbody').innerHTML += `<tr><td colspan='4' align='center' class='text-danger'>No record is available</td></tr>`;
            }
        }
        //Yesterday sorting-------------------------------------------------------------------------------------------------
        else if (document.getElementById('rt').value == "Yesterday") {
            document.getElementById("custom").style.display = "none";
            document.querySelector('#tbShow  tbody').innerHTML = html;
          
            var count = 0;
            var date = new Date();
            var pdate = date.getDate() - 1;
            var pmonth = date.getMonth();
            var pyear = date.getFullYear();
            var today = (pyear.toString() + pmonth.toString() + pdate.toString());
            salesReport.forEach((element, index) => {
                let date1 = new Date(salesReport[index].bdate)
                let pdate1 = date1.getDate();
                let pmonth1 = date1.getMonth();
                let pyear1 = date1.getFullYear();
                let today1 = (pyear1.toString() + pmonth1.toString() + pdate1.toString());
                if (today == today1) {
                    document.querySelector('#tbShow  tbody').innerHTML += `<tr><td>${index + 1}</td><td>${salesReport[index].Item}</td><td>${salesReport[index].Qunatity}</td><td>${'$'+salesReport[index].TotalPrice}</td></tr>`;
                    count++;
                }
            })
            if (count == 0) {
                document.querySelector('#tbShow  tbody').innerHTML += `<tr><td colspan='4' align='center' class='text-danger'>No record is available</td></tr>`;
            }
        }

        //This week sorting-------------------------------------------------------------------------------------------------
        else if (document.getElementById('rt').value == "This Week") {
            document.querySelector('#tbShow  tbody').innerHTML = html;
            document.getElementById("custom").style.display = "none";
            var count = 0;
            currentDate = new Date();
            startDate = new Date(currentDate.getFullYear(), 0, 1);
            var days = Math.floor((currentDate - startDate) /
                (24 * 60 * 60 * 1000));
            var weekNumber = Math.ceil(days / 7);
            salesReport.forEach((element, index) => {
                currentDate1 = new Date(salesReport[index].bdate);
                startDate1 = new Date(currentDate1.getFullYear(), 0, 1);
                var days1 = Math.floor((currentDate1 - startDate1) /
                    (24 * 60 * 60 * 1000));
                var weekNumber1 = Math.ceil(days1 / 7);
                if (weekNumber == weekNumber1) {
                    document.querySelector('#tbShow  tbody').innerHTML += `<tr><td>${index + 1}</td><td>${salesReport[index].Item}</td><td>${salesReport[index].Qunatity}</td><td>${'$'+salesReport[index].TotalPrice}</td></tr>`;
                    count++;
                }
            })
            if (count == 0) {
                document.querySelector('#tbShow  tbody').innerHTML += `<tr><td colspan='4' align='center' class='text-danger'>No record is available</td></tr>`;
            }
        }

         //Last week sorting-------------------------------------------------------------------------------------------------
        else if (document.getElementById('rt').value == "Last Week") {
            document.querySelector('#tbShow  tbody').innerHTML = html;
            document.getElementById("custom").style.display = "none";
            var count = 0;
            currentDate = new Date();
            startDate = new Date(currentDate.getFullYear(), 0, 1);
            var days = Math.floor((currentDate - startDate) /
                (24 * 60 * 60 * 1000));
            var weekNumber = Math.ceil(days / 7) - 1;
            salesReport.forEach((element, index) => {
                currentDate1 = new Date(salesReport[index].bdate);
                startDate1 = new Date(currentDate1.getFullYear(), 0, 1);
                var days1 = Math.floor((currentDate1 - startDate1) /
                    (24 * 60 * 60 * 1000));
                var weekNumber1 = Math.ceil(days1 / 7);
                if (weekNumber == weekNumber1) {
                    document.querySelector('#tbShow  tbody').innerHTML += `<tr><td>${index + 1}</td><td>${salesReport[index].Item}</td><td>${salesReport[index].Qunatity}</td><td>${'$'+salesReport[index].TotalPrice}</td></tr>`;
                    count++;
                }
            })
            if (count == 0) {
                document.querySelector('#tbShow  tbody').innerHTML += `<tr><td colspan='4' align='center' class='text-danger'>No record is available</td></tr>`;
            }
        }
         //This month sorting-------------------------------------------------------------------------------------------------
        else if (document.getElementById('rt').value == "This Month") {
            document.querySelector('#tbShow  tbody').innerHTML = html;
            document.getElementById("custom").style.display = "none";
            var count = 0;
            var date = new Date();
            var pmonth = date.getMonth();
            var pyear = date.getFullYear();
            var today = (pyear.toString() + pmonth.toString());
            salesReport.forEach((element, index) => {
                let date1 = new Date(salesReport[index].bdate)
                let pmonth1 = date1.getMonth();
                let pyear1 = date1.getFullYear();
                let today1 = (pyear1.toString() + pmonth1.toString());
                if (today == today1) {
                    document.querySelector('#tbShow  tbody').innerHTML += `<tr><td>${index + 1}</td><td>${salesReport[index].Item}</td><td>${salesReport[index].Qunatity}</td><td>${'$'+salesReport[index].TotalPrice}</td></tr>`;
                    count++;
                }
            })
            if (count == 0) {
                document.querySelector('#tbShow  tbody').innerHTML += `<tr><td colspan='4' align='center' class='text-danger'>No record is available</td></tr>`;
            }
        }
        //Last month sorting-------------------------------------------------------------------------------------------------
        else if (document.getElementById('rt').value == "Last Month") {
            document.querySelector('#tbShow  tbody').innerHTML = html;
            document.getElementById("custom").style.display = "none";
            var count = 0;
            var date = new Date();
            var pmonth = date.getMonth() - 1;
            var pyear = date.getFullYear();
            var today = (pyear.toString() + pmonth.toString());
            salesReport.forEach((element, index) => {
                let date1 = new Date(salesReport[index].bdate)
                let pmonth1 = date1.getMonth();
                let pyear1 = date1.getFullYear();
                let today1 = (pyear1.toString() + pmonth1.toString());
                if (today == today1) {
                    document.querySelector('#tbShow  tbody').innerHTML += `<tr><td>${index + 1}</td><td>${salesReport[index].Item}</td><td>${salesReport[index].Qunatity}</td><td>${'$'+salesReport[index].TotalPrice}</td></tr>`;
                    count++;
                }
            })
            if (count == 0) {
                document.querySelector('#tbShow  tbody').innerHTML += `<tr><td colspan='4' align='center' class='text-danger'>No record is available</td></tr>`;
            }
        }
        //custom sorting------------------------------------------------------------------------------------------------------------------------------------
        else if (document.getElementById('rt').value == "Custom") {
            var count = 0;
            var date0 = document.getElementById('start').value;
            var date1 = document.getElementById('end').value;
            document.querySelector('#tbShow  tbody').innerHTML = html;
            document.getElementById("custom").style.display = "inline";
            document.getElementById('start').addEventListener('change',function()
            {
                document.querySelector('#tbShow  tbody').innerHTML = html;
                date0 = document.getElementById('start').value;
              
                salesReport.forEach((element, index) => {
                    var saledate = salesReport[index].bdate;
                    if (saledate >= date0 && saledate <= date1) {
                        document.querySelector('#tbShow  tbody').innerHTML += `<tr><td>${index + 1}</td><td>${salesReport[index].Item}</td><td>${salesReport[index].Qunatity}</td><td>${'$'+salesReport[index].TotalPrice}</td></tr>`;
                        count++;
                    }
                })
                if (count == 0) {
                    document.querySelector('#tbShow  tbody').innerHTML += `<tr><td colspan='4' align='center' class='text-danger'>No record is available</td></tr>`;                    
                }
            })
            document.getElementById('end').addEventListener('change',function()
            {
                document.querySelector('#tbShow  tbody').innerHTML = html;
                date1 = document.getElementById('end').value;
                salesReport.forEach((element, index) => {
                    var saledate = salesReport[index].bdate;
                    if (saledate >= date0 && saledate <= date1) {
                        document.querySelector('#tbShow  tbody').innerHTML += `<tr><td>${index + 1}</td><td>${salesReport[index].Item}</td><td>${salesReport[index].Qunatity}</td><td>${'$'+salesReport[index].TotalPrice}</td></tr>`;
                        count++;
                    }
                })
                if (count == 0) {
                    document.querySelector('#tbShow  tbody').innerHTML += `<tr><td colspan='4' align='center' class='text-danger'>No record is available</td></tr>`;                    
                }
            })
            document.querySelector('#tbShow  tbody').innerHTML = html;
                salesReport.forEach((element, index) => {
                    var saledate = salesReport[index].bdate;
                    if (saledate >= date0 && saledate <= date1) {
                        document.querySelector('#tbShow  tbody').innerHTML += `<tr><td>${index + 1}</td><td>${salesReport[index].Item}</td><td>${salesReport[index].Qunatity}</td><td>${'$'+salesReport[index].TotalPrice}</td></tr>`;
                        count++;
                    }
                })
                if (count == 0) {
                    document.querySelector('#tbShow  tbody').innerHTML += `<tr><td colspan='4' align='center' class='text-danger'>No record is available</td></tr>`;                    
                }
                

        }
    })
}

//calling onload function------------------------------------------------------------------------------------------------------
document.onload = showData();