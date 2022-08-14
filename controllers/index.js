/** Xử lý chức năng giao diện */

var staffList = [];

function createStaff() {
  // 1. lấy thông tin từ input
  var staffID = document.querySelector("#tknv").value;
  var staffName = document.querySelector("#name").value;
  var staffEmail = document.querySelector("#email").value;
  var staffPass = document.querySelector("#password").value;
  var staffDay = document.querySelector("#datepicker").value;
  var staffSalary = +document.querySelector("#luongCB").value;
  var staffLevel = document.querySelector("#chucvu").value;
  var staffWorkTime = document.querySelector("#gioLam").value;

  // 2. tạo đối tượng nhan vien

  var staff = new NhanVien(
    staffID,
    staffName,
    staffEmail,
    staffPass,
    staffDay,
    staffSalary,
    staffLevel,
    staffWorkTime
  );

  console.log(staff);

  ///* ------------------------- Kiểm tra dữ liệu đầu vào ----------------------------------
  /*
     Kiểm tra rỗng
   */

  var valid = true;
  //.trim(): Loại bỏ khoảng trắng đầu và cuối của chuỗi Ví dụ:     => ''
  if (staff.id.trim() === "") {
    document.querySelector("#tbTKNV").innerHTML =
      "Mã nhân viên không được bỏ trống";
    valid = false;
  }
  if (staff.name.trim() === "") {
    document.querySelector("#tbTen").innerHTML =
      "Tên nhân viên không được bỏ trống";
    valid = false;
  }

  if (!valid) {
    return;
  }

  // 3. push đối tượng nhân viên vào danh sách
  staffList.push(staff);
  //Gọi hàm tạo table sau khi thêm 1 nhân viên mới vào
  // console.table(studentList);
  renderStaffList(staffList);

  //gọi hàm lưu vào localstorage sau khi thêm sinh viên
  saveLocalStorage(staffList, "arrNV");
}

function renderStaffList(arrNV) {
  var output = "";
  for (var index = 0; index < arrNV.length; index++) {
    var obNhanVien = arrNV[index];
    obNhanVien.calcTotalGalary = function () {
      var totalGalayry = 0;
      if (this.level === "Sếp") {
        return (totalGalayry = this.salary * 3);
      }
      if (this.level === "Trưởng phòng") {
        return (totalGalayry = this.salary * 2);
      }
      if (this.level === "Nhân viên") {
        return (totalGalayry = this.salary * 1);
      }
    };
    this.calcLevel = function () {
      if (this.level === "Nhân viên" && this.workTime >= 192) {
        return "Nhân viên xuất sắc";
      }
      if (this.level === "Nhân viên" && this.workTime >= 176) {
        return "Nhân viên giỏi";
      }
      if (this.level === "Nhân viên" && this.workTime >= 160) {
        return "Nhân viên khá";
      }
      if (this.level === "Nhân viên" && this.workTime < 160) {
        return "Nhân viên trung bình";
      }
    };
    var trNV = `
         <tr>
           <td>${obNhanVien.id}</td>
           <td>${obNhanVien.name}</td>
           <td>${obNhanVien.email}</td>
           <td>${obNhanVien.day}</td>
           <td>${obNhanVien.level}</td>
           <td>${obNhanVien.calcTotalGalary()}</td>
           <td>${obNhanVien.calcLevel()}</td>
           <td></td>

           <td>
             <button class="btn btn-danger"  onclick="deleteStaff('${
               obNhanVien.id
             }')">Xóa</button>
             <button class="btn btn-primary" data-toggle="modal"
             data-target="#myModal" onclick="editStaff('${
               obNhanVien.id
             }')">Sửa</button>
           </td>
         </tr>
       `;

    output += trNV;
  }
  document.querySelector("tbody").innerHTML = output;
  return output;
}

function editStaff(idClick) {
  var nvEdit = null;
  for (var index = 0; index < staffList.length; index++) {
    if (staffList[index].id == idClick) {
      //Tại vị trí này tìm thấy idClick = id object trong mảng
      nvEdit = staffList[index];
      break;
    }
  }
  if (nvEdit !== null) {
    //Đưa dữ liệu lên các control input
    document.querySelector("#tknv").value = nvEdit.id;
    document.querySelector("#name").value = nvEdit.name;
    document.querySelector("#email").value = nvEdit.email;
    document.querySelector("#password").value = nvEdit.pass;
    document.querySelector("#datepicker").value = nvEdit.day;
    document.querySelector("#luongCB").value = nvEdit.salary;
    document.querySelector("#chucvu").value = nvEdit.level;
    document.querySelector("#gioLam").value = nvEdit.workTime;
  }
}

function deleteStaff(idClick) {
  var indexDel = -1;
  for (var index = 0; index < staffList.length; index++) {
    // mỗi lần duyệt lấy ra 1 phần tử mảng so với input người dùng click
    if (staffList[index].id === idClick) {
      indexDel = index;
      break; // thoát ra khỏi vòng lặp
    }
  }
  if (indexDel !== -1) {
    //tìm thấy
    staffList.splice(indexDel, 1);
    renderStaffList(staffList);
    saveLocalStorage(staffList, "arrNV");
  }
}

//Khi người dùng thay đổi sau đó bấm nút update
function updateStaff() {
  var nvUpdate = new NhanVien();
  nvUpdate.id = document.querySelector("#tknv").value;
  nvUpdate.name = document.querySelector("#name").value;
  nvUpdate.email = document.querySelector("#email").value;
  nvUpdate.pass = document.querySelector("#password").value;
  nvUpdate.day = document.querySelector("#datepicker").value;
  nvUpdate.salary = document.querySelector("#luongCB").value;
  nvUpdate.level = document.querySelector("#chucvu").value;
  nvUpdate.workTime = document.querySelector("#gioLam").value;
  console.log(nvUpdate);

  let indexEdit = -1;
  for (var index = 0; index < staffList.length; index++) {
    if (staffList[index].id === nvUpdate.id) {
      indexEdit = index; //1
      break;
    }
  }
  if (indexEdit !== -1) {
    staffList[indexEdit].name = nvUpdate.name;
    staffList[indexEdit].email = nvUpdate.email;
    staffList[indexEdit].day = nvUpdate.day;
    staffList[indexEdit].level = nvUpdate.level;
    staffList[indexEdit].workTime = nvUpdate.workTime;
    //Gọi hàm rendertable truyền cho hàm mảng mới
    renderStaffList(staffList);


  }
}

function saveLocalStorage(ob, key) {
  // {} , []
  var str = JSON.stringify(ob);
  localStorage.setItem(key, str);
}

function getLocalStorage(key) {
  //Lấy dữ liệu từ localstorage ra (dữ liệu lấy là string)
  if (localStorage.getItem(key)) {
    var str = localStorage.getItem(key);
    //Parse dữ liệu về lại object
    var ob = JSON.parse(str);
    return ob;
  }
  return undefined;
}

//đợi html js load xong thì sẽ động thực thi
window.onload = function () {
  studentList = getLocalStorage("arrNV");
  console.log("staffList", staffList);
  if (staffList === undefined) {
    staffList = [];
  }
  renderStaffList(staffList);
};

var searchStaff = function () {
  var tuKhoa = document.querySelector("#searchName").value; //a
  tuKhoa = removeVietnameseTones(tuKhoa);
  var output = [];
  for (var index = 0; index < staffList.length; index++) {
    var xepLoai = removeVietnameseTones(staffList[index].calcLevel());
    if (xepLoai.search(tuKhoa) != -1 || staffList[index].id == tuKhoa) {
      output.push(staffList[index]);
    }
  }
  //Dùng output render ra table
  renderStaffList(output);
};
//Dom đến txtSearch cài đặt sự kiện oninput cho nó
document.querySelector("#searchName").oninput = searchStaff;
//Tìm kiếm
document.querySelector("#btnTimNV").onclick = searchStaff;

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}

// // Get data

// function getDataStaffApi() {
//   var promise = axios({
//     url: "../data/data.json",
//     method: "GET",
//   });

//   //thanh cong
//   promise.then(function (result) {
//     console.log("result", result.data);
//     renderNhanVien(result.data);
//   });

//   //that bai
//   promise.catch(function (err) {
//     console.log(err);
//   });
// }

// window.onload = function () {
//   //goi api
//   getDataStaffApi();
// };

// function renderNhanVien(arrNhanVien) {
//   var html = "";
//   for (var i = 0; i < arrNhanVien.length; i++) {
//     var nv = arrNhanVien[i];
//     html += `
//         <tr>
//         <td>${nv.maNhanVien}</td>
//         <td>${nv.tenNhanVien}</td>
//         <td>${nv.email}</td>
//         <td>${nv.ngaylam}</td>
//         <td>${nv.chucVu}</td>
//         <td></td>
//         <td></td>
//         <td>
//             <button class="btn btn-primary" onclick="chinhsua('${nv.maNhanVien}')">Sửa</button>
//             <button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xóa</button>
//         </td>
//         </tr>
//         `;
//   }
//   document.querySelector('tbody').innerHTML = html;
// }

// /** POST: thêm dữ liệu */
// document.querySelector('#btnThemNV').onclick = function(){
//     // laasy thoong tin tu nguoi dung
//     var nhanVien = new NhanVien();
//     nhanVien.maNhanVien = document.querySelector('#tknv').value;
//     nhanVien.tenNhanVien = document.querySelector('#name').value;
//     nhanVien.email = document.querySelector('#email').value;
//     nhanVien.password = document.querySelector('#password').value;
//     nhanVien.ngaylam = document.querySelector('#datepicker').value;
//     nhanVien.luongCoBan = document.querySelector('#luongCB').value;
//     nhanVien.chucVu = document.querySelector('#chucvu').value;
//     nhanVien.soGioLamTrongThang = document.querySelector('#gioLam').value;
//     console.log('nhanVien',nhanVien);

//     var promise = axios({
//         url:'../data/data.json',
//         method:'POST',
//         // data:nhanVien
//     })

//     promise.then(function(result){
//         console.log(result.data);
//         getDataStaffApi();
//     })

//     promise.catch(function(error){
//         console.log(error);
//     })
// }
