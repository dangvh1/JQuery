$(document).ready(function () {
    let id = 0;
    let list = [];
    let isEdit = false;
    let index = -1
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    var re = /^[a-zA-Z\w\W !@#\$%\^\&*\)\(+=._-]{1,50}$/g;

    $("#save").click(function () {
        const name = $("#name").val();
        const birthday = $("#birthday").val();
        const phoneNumber = $("#phoneNumber").val();
        const hometown = $("#hometown").val();
        if (name == "" || birthday == "" || phoneNumber == "" || hometown == "") {
            alert("Nhập thiếu hoặc nhập sai! vui lòng kiểm tra lại");
            return 0;
        }
        if (name !== '') {
            if (re.test(name) == false) {
                alert("Tên không hợp lệ, Nhập lại")
                return 0;
            } else {
                alert("tên hợp lệ")
            }
        }
        if (phoneNumber !== '') {
            if (vnf_regex.test(phoneNumber) == false) {
                alert("số điện thoại không đúng định dạng, Nhập lại");
                return 0;
            } else {
                alert("số điện thoại hợp lệ");
            }
        }
        if (isEdit) {
            doUpdateInfo(name, birthday, phoneNumber, hometown);
            isEdit = false;
            return;
        }

        $("#table-data").append("<tr id='" + id + "'>" +
            "<td><button type='button' class='edit'>Edit</button></td>" +
            "<td><input type=\"checkbox\" style=\"margin-left: 30%;\" value ='" + id + "'></td>"+
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

    window.addEventListener('load', function () {
        const fetchJson = async () => {
            try {
                const data = await fetch("data.json");
                const response = await data.json();
                console.log(response);
                response.student.map((i) => {
                    list.push(i);
                    $("#table-data").append("<tr id='" + i.id + "'>" +
                        "<td><button type='button' class='edit'>Edit</button></td>" +
                        "<td><input type=\"checkbox\" style=\"margin-left: 30%;\" value ='" + i.id + "'></td>"+
                        "<td class='no' style='display: none'>" + i.id + "</td>" +
                        "<td class='name'>" + i.name + "</td>" +
                        "<td class='birthday'>" + i.birthday + "</td>" +
                        "<td class='phoneNumber'>" + i.phone + "</td>" +
                        "<td class='hometown'>" + i.hometown + "</td>" +
                        "</tr>");
                        id++;
                })
            } catch (error) {
                console.error(error);
            }
        }; fetchJson();
    }, false);

    $("#delete").click (function () {
        var firm = confirm("Bạn có chắc chắn muốn xóa");
        if(firm = 1){
            for (const checkbox of document.querySelectorAll('input[type="checkbox"]')) {
                if (checkbox.checked === true) {
                    let check = checkbox.value;
                    let rowData = $('#table').find('tr#' + check);
                    rowData.remove();
                    list.splice(check, 1);
                }
            }
        }
    })

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
