var staffList = [];

function createStaff() {
  var staffID = document.querySelector("#tknv").value;
  var staffName = document.querySelector("#name").value;
  var staffEmail = document.querySelector("#email").value;
  var staffPass = document.querySelector("#password").value;
  var staffDay = document.querySelector("#datepicker").value;
  var staffSalary = document.querySelector("#luongCB").value;
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

    var trNV = `
         <tr>
           <td>${obNhanVien.id}</td>
           <td>${obNhanVien.name}</td>
           <td>${obNhanVien.email}</td>
           <td>${obNhanVien.staffDay}</td>
           <td>${obNhanVien.staffLevel}</td>
           <td></td>
           <td></td>

           <td>
             <button class="btn btn-danger"  onclick="delStaff('${obNhanVien.id}')">Del</button>
             <button class="btn btn-primary" data-target="#myModal onclick="editStaff('${obNhanVien.id}')">Update</button>
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

function delStaff(idClick) {
  var indexDel = -1;
  for (var index = staffList.length - 1; index >= 0; index--) {
    if (staffList[index].id == idClick) {
      staffList.splice(index, 1);
    }
  }
  renderStaffList(studentList);
}

function updateStaff() {
  var svUpdate = new Student();
  svUpdate.id = document.querySelector("#txtMaSV").value;
  svUpdate.name = document.querySelector("#txtTenSV").value;
  svUpdate.email = document.querySelector("#txtEmail").value;
  svUpdate.dob = document.querySelector("#txtNgaySinh").value;
  svUpdate.course = document.querySelector("#khSV").value;
  svUpdate.physic = document.querySelector("#txtDiemLy").value;
  svUpdate.chemistry = document.querySelector("#txtDiemHoa").value;
  svUpdate.math = document.querySelector("#txtDiemToan").value;
  console.log(svUpdate);

  let indexEdit = -1;
  for (var index = 0; index < studentList.length; index++) {
    if (studentList[index].id === svUpdate.id) {
      indexEdit = index; //1
      break;
    }
  }
  if (indexEdit !== -1) {
    studentList[indexEdit].name = svUpdate.name;
    studentList[indexEdit].email = svUpdate.email;
    studentList[indexEdit].dob = svUpdate.dob;
    studentList[indexEdit].course = svUpdate.course;
    studentList[indexEdit].physic = svUpdate.physic;
    studentList[indexEdit].chemistry = svUpdate.chemistry;
    studentList[indexEdit].math = svUpdate.math;

    renderStudentList(studentList);
  }
}

function saveLocalStorage(ob, key) {
  // {} , []
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

var searchStudent = function () {
  var tuKhoa = document.querySelector("#txtSearch").value;
  tuKhoa = removeVietnameseTones(tuKhoa);

  var output = [];

  for (var index = 0; index < studentList.length; index++) {
    var tenSinhVien = removeVietnameseTones(studentList[index].name);
    if (tenSinhVien.search(tuKhoa) != -1 || studentList[index].id == tuKhoa) {
      output.push(studentList[index]);
    }
  }

  renderStudentList(output);
};

document.querySelector("#txtSearch").oninput = searchStudent;

document.querySelector("#btnSearch").onclick = searchStudent;

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

function getDataStaffApi() {
  var promise = axios({
    url: "../data/data.json",
    method: "GET",
  });

  promise.then(function (result) {
    console.log("result", result.data);
    renderNhanVien(result.data);
  });

  promise.catch(function (err) {
    console.log(err);
  });
}

window.onload = function () {
  getDataStaffApi();
};

function renderNhanVien(arrNhanVien) {
  var html = "";
  for (var i = 0; i < arrNhanVien.length; i++) {
    var nv = arrNhanVien[i];
    html += `
        <tr>
        <td>${nv.maNhanVien}</td>
        <td>${nv.tenNhanVien}</td>
        <td>${nv.email}</td>
        <td>${nv.ngaylam}</td>
        <td>${nv.chucVu}</td>
        <td></td>
        <td></td>
        <td>
            <button class="btn btn-primary" onclick="chinhsua('${nv.maNhanVien}')">Sửa</button>
            <button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xóa</button>
        </td>
        </tr>
        `;
  }
  document.querySelector("tbody").innerHTML = html;
}

document.querySelector("#btnThemNV").onclick = function () {
  var nhanVien = new NhanVien();
  nhanVien.maNhanVien = document.querySelector("#tknv").value;
  nhanVien.tenNhanVien = document.querySelector("#name").value;
  nhanVien.email = document.querySelector("#email").value;
  nhanVien.password = document.querySelector("#password").value;
  nhanVien.ngaylam = document.querySelector("#datepicker").value;
  nhanVien.luongCoBan = document.querySelector("#luongCB").value;
  nhanVien.chucVu = document.querySelector("#chucvu").value;
  nhanVien.soGioLamTrongThang = document.querySelector("#gioLam").value;
  console.log("nhanVien", nhanVien);

  var promise = axios({
    url: "../data/data.json",
    method: "POST",
  });

  promise.then(function (result) {
    console.log(result.data);
    getDataStaffApi();
  });

  promise.catch(function (error) {
    console.log(error);
  });
};
