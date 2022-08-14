/** Đối tượng nhân viên */

function NhanVien(id, name, email, pass, day, salary, level, workTime) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.pass = pass;
  this.day = day;
  this.salary = salary;
  this.level = level;
  this.workTime = workTime;
  this.calcTotalGalary = function () {
    // return this.salary * 3;
    var totalGalayry = 0;
    if (this.level === "Sếp") {
      return totalGalayry = this.salary * 3;
    }
    if (this.level === "Trưởng Phòng") {
      return totalGalayry = this.salary * 2;
    }
    if (this.level === "Nhân Viên") {
      return totalGalayry = this.salary * 1;
    }
  };
  this.calcLevel = function(){
    if(this.level === "Nhân viên" && this.workTime >= 192){
        return 'Nhân viên xuất sắc';
    }
    if(this.level === "Nhân viên" && this.workTime >= 176){
        return 'Nhân viên giỏi';
    }
    if(this.level === "Nhân viên" && this.workTime >= 160){
        return 'Nhân viên khá';
    }
    if(this.level === "Nhân viên" && this.workTime < 160){
        return 'Nhân viên trung bình';
    }

  }
}

