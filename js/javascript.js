$(document).ready(function () {
    let id = 0;
    let list = [];
    let isEdit = false;
    let index = -1

    $("#save").click(function () {
        const name = $("#name").val();
        const birthday = $("#birthday").val();
        const phoneNumber = $("#phoneNumber").val();
        const hometown = $("#hometown").val();
        if (name == "" || birthday == "" || phoneNumber == "" || hometown == "") {
            alert("Nhập thiếu hoặc nhập sai! vui lòng kiểm tra lại");
            return 0;
        }
        if(isNaN(phoneNumber)){
            alert("phoneNumber must be a number");
        }
        if (isEdit) {
            doUpdateInfo(name, birthday, phoneNumber, hometown);
            isEdit = false;
            return;
        }
        confirm('confirm your information :\n'+name+"\n"+birthday+"\n"+phoneNumber+"\n"+hometown)

        $("#table-data").append("<tr id='" + id + "'>" +
            "<td><button type='button' class='delete'>Delete</button><button type='button' class='edit'>Edit</button></td>" +
            "<td class='no' style='display: none'>" + id + "</td>" +
            "<td class='name'>" + name + "</td>" +
            "<td class='birthday'>" + birthday + "</td>" +
            "<td class='phoneNumber'>" + phoneNumber + "</td>" +
            "<td class='hometown'>" + hometown + "</td>" +
            "</tr>");
        const ob = { id, name, birthday, phoneNumber, hometown };
        list.push(ob);
        clearForm();
        id++;
    });

    $('table').on('click', '.delete', function () {
        const rowData = $(this).parents('tr');
        index = rowData.children('.no').text();
        rowData.remove();
        list.splice(index, 1);
    });

    $('table').on('click', '.edit', function () {
        const rowData = $(this).parents('tr');
        index = parseInt(rowData.children('.no').text());

        document.getElementById('name').value = rowData.children('.name').text();
        document.getElementById('birthday').value = rowData.children('.birthday').text();
        document.getElementById('phoneNumber').value = rowData.children('.phoneNumber').text();
        document.getElementById('hometown').value = rowData.children('.hometown').text();

        isEdit = true;
    });

    function doUpdateInfo(name, birthday, phoneNumber, hometown) {
        list[index].name = name;
        list[index].birthday = birthday;
        list[index].phoneNumber = phoneNumber;
        list[index].hometown = hometown;

        const rowData = $('table').find('tr#' + index);
        rowData.children('.name').text(name);
        rowData.children('.birthday').text(birthday);
        rowData.children('.phoneNumber').text(phoneNumber);
        rowData.children('.hometown').text(hometown);

        index = -1;
        clearForm();
    }

    function clearForm() {
        document.getElementById("name").value = "";
        document.getElementById("birthday").value = "";
        document.getElementById("phoneNumber").value = "";
        document.getElementById("hometown").value = "";
    }


});