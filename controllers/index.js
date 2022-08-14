
var staffList = [];
function createStaff() {
  var staffID = document.querySelector("#tknv").value;
  var staffName = document.querySelector("#name").value;
  var staffEmail = document.querySelector("#email").value;
  var staffPass = document.querySelector("#password").value;
  var staffDay = document.querySelector("#datepicker").value;
  var staffSalary = +document.querySelector("#luongCB").value;
  var staffLevel = document.querySelector("#chucvu").value;
  var staffWorkTime = document.querySelector("#gioLam").value;


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

 

  var valid = true;
  
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
  
  staffList.push(staff);
  
  renderStaffList(staffList);

  
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
      
      nvEdit = staffList[index];
      break;
    }
  }
  if (nvEdit !== null) {
    
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
    
    if (staffList[index].id === idClick) {
      indexDel = index;
      break; 
    }
  }
  if (indexDel !== -1) {
    
    staffList.splice(indexDel, 1);
    renderStaffList(staffList);
    saveLocalStorage(staffList, "arrNV");
  }
}


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
    
    renderStaffList(staffList);


  }
}

function saveLocalStorage(ob, key) {
 
  var str = JSON.stringify(ob);
  localStorage.setItem(key, str);
}

function getLocalStorage(key) {
  
  if (localStorage.getItem(key)) {
    var str = localStorage.getItem(key);
    
    var ob = JSON.parse(str);
    return ob;
  }
  return undefined;
}


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
  
  renderStaffList(output);
};

document.querySelector("#searchName").oninput = searchStaff;

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
  
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); 
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); 
  
  str = str.replace(/ + /g, " ");
  str = str.trim();
  
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}

