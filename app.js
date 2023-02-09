class Student {
  constructor(sName, fName, sClass, id) {
    this.sName = sName;
    this.fName = fName;
    this.sClass = sClass;
    this.id = id;
  }
}

class UI {
  addStudentToList(std) {
    const list = document.getElementById("stdList");
    //Create tr Element
    const row = document.createElement("tr");
    //Insert Cols
    row.innerHTML = `
        <th>${gen.next().value}</th>
        <td>${std.sName}</td>
        <td>${std.fName}</td>
        <td>${std.sClass}</td>
        <td><a href="#"  class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Edit</a></td>
        <td><a href="#" class="delete" data-student-id="${std.id}">Remove</a></td>
        `;
    list.appendChild(row);
  }

  // Delete STudent
  deleteStd(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
      // Remove From LS
      Store.removeStudent(target.attributes["data-student-id"].value);
    }
  }

  clearFields() {
      document.getElementById("studentName").value = "";
      document.getElementById("fatherName").value = "";
      document.getElementById("class").value = "";
  }
  
}

// Generator For student ID
function* createIds(){
  let index = 1;
  while(true){
    yield index++;
  }
}
const gen = createIds();

// Instantiate UI In GLobal Scope
const ui = new UI();

// Event Listener For add Student
document.getElementById("std-form").addEventListener("submit", (e) => {
  // Get Form Values
  const stdName = document.getElementById("studentName").value,
        fatherName = document.getElementById("fatherName").value,
        stdClass = document.getElementById("class").value;
        stdID = new Date().getTime();

  // Instantiate Student
  const student = new Student(stdName, fatherName, stdClass, stdID);
  console.log(student);

  //Validate
  if (stdName === "" || fatherName === "" || stdClass === "") {
    //Error Alert
    alert("PLease fill in all fields");
  } else {
    // Add Student to list
    ui.addStudentToList(student);
    ui.clearFields();
    // Store in LS
    Store.addStudent(student);
  }
  
  e.preventDefault();
});

// Local Storage Class
class Store {
  // GetStudents data
  static getStudents() {
    let students;
    if (localStorage.getItem("students") === null) {
      students = [];
    } else {
      students = JSON.parse(localStorage.getItem("students"));
    }

    return students;
  }

  //Add Students Data
  static addStudent(student) {
    const students = Store.getStudents();
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
  }

  //Display Students Data
  static dispalyStudents() {
    const students = Store.getStudents();

    students.forEach(function (student) {
      // Add Book to list
      ui.addStudentToList(student);
    });
  }

  // Remove Students Data
  static removeStudent(id) {
    const students = Store.getStudents();
    const index = students.findIndex((s) => s.id == id);
          students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));
  }
}


// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.dispalyStudents);

//Event Listener For Delete Student
document.getElementById("stdList").addEventListener("click", function (e) {
  // Delete Student
  ui.deleteStd(e.target);
});
