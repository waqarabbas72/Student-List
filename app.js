class Student {
  constructor(sName, fName, sClass) {
    this.sName = sName;
    this.fName = fName;
    this.sClass = sClass;
  }
}

class UI {
  addStudentToList(std) {
    const list = document.getElementById("stdList");
    //Create tr Element
    const row = document.createElement("tr");
    //Insert Cols
    row.innerHTML = `
        <th scope="row">1</th>
        <td>${std.sName}</td>
        <td>${std.fName}</td>
        <td>${std.sClass}</td>
        <td><a href="#"  class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Edit</a></td>
        <td><a href="#" class="remove">Remove</a></td>
        `;
    list.appendChild(row);
  }

  // Delete STudent 
  deleteStd(target) {
  if(target.className === 'remove'){
    target.parentElement.parentElement.remove()
  }
  }

  clearFields() {
    document.getElementById("studentName").value = "";
    document.getElementById("fatherName").value = "";
    document.getElementById("class").value = "";
  }
}

// Event Listener For add Student
document.getElementById("std-form").addEventListener("submit", (e) => {
  // Get Form Values
  const stdName = document.getElementById("studentName").value,
    fatherName = document.getElementById("fatherName").value,
    stdClass = document.getElementById("class").value;

  // Instantiate Student
  const student = new Student(stdName, fatherName, stdClass);
  console.log(student);

  const ui = new UI();

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
class Store{
    static getStudents(){
        let students;
        if(localStorage.getItem('students') === null){
            students = []
        }else{
            students = JSON.parse(localStorage.getItem('students'))
        }

        return students;
    }

    static dispalyStudents(){
        const students = Store.getStudents();

        students.forEach(function(student){
            const ui = new UI;
            // Add Book to list
            ui.addStudentToList(student);
        });
    }

    static addStudent(student){
        const students = Store.getStudents();

        students.push(student)

        localStorage.setItem('students', JSON.stringify(students));
    }

    static removeStudent(){
        const students = Store.getStudents();

        students.forEach(function (index){
            
                students.splice(index,1)
            
        });

        localStorage.setItem('students', JSON.stringify(students));
    }
}

// DOM Load Event 
document.addEventListener('DOMContentLoaded',Store.dispalyStudents)


//Event Listener For Delete Book
document.getElementById("stdList").addEventListener("click", function (e) {
    // Instantiate UI
    const ui = new UI();
 
    // Delete Book
    ui.deleteStd(e.target);
  
    // Remove From LS
    Store.removeStudent(e.target.parentElement.previousElementSibling.textContent)
  });
  