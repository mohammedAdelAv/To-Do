let toggleBtn = document.getElementById('toggle');

let btn2 = document.querySelector('.addTaskB');
let input1 = document.querySelector('#Create');
let ul = document.querySelector('.tasks');

let btn3 = document.querySelector('.clearCompleted');
let btn4 = document.querySelector('.itemsClear span');
let links = document.querySelectorAll('.list a');


let tasks = [];

// Dark Mode Fun
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("darkMode");
});


// Update Items Num Fun
function updateItems () {

    let total = ul.querySelectorAll("li:not(.checked)").length;
    btn4.textContent = `${total} items left`;

}


// Add Task Fun
function addTodo () {

    let newTask = input1.value.trim();
    let flag = false;

    if (newTask === "") {
        alert("Please write a task first !");
        return;
    }

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i] === newTask) {
            flag = true;
            break;
        }

    }

    if (flag) {

        alert("this task already exists !");

    } else {

        tasks.push(newTask);
        let li = document.createElement("li");

        let img = document.createElement("img");
        img.src = "images/icon-cross.svg";
        img.alt = "delete"
        img.classList.add("delete-icon");

        let btn = document.createElement("button");
        btn.classList.add("check");

        li.textContent = newTask;
        li.appendChild(btn)
        li.appendChild(img);
        ul.appendChild(li);
        updateItems();

        // Checked Fun
        btn.addEventListener("click", function () {

            li.classList.toggle("checked");
            //ونحط علية التغيرات check علشان نستهدف الزر بتاع ال
            btn.classList.toggle("checked");
            updateItems();

        });

        // Remove Li Fun
        img.addEventListener("click", function () {

            ul.removeChild(li);
            updateItems();

        });

    }
    // علشان الكتابه مرا اخري input مسح ال 
    input1.value = "";

}


// task لاضافه ال input عند الضغط علي الزر بجانب ال 
btn2.addEventListener("click", addTodo);


// task لاضافه ال entre عند الضغط علي 
input1.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        addTodo();
    }

});


// clear completed المكتمله عند الضغط علي task لمسح ال
btn3.addEventListener("click", () => {

    let clearCompleted = ul.querySelectorAll("li.checked");

    clearCompleted.forEach(task => {
        ul.removeChild(task);
    });

});


// all, active, completed علي filter لتشغيل و عمل 
links.forEach(link => {

    link.addEventListener("click", () => {

        let filter = link.textContent.toLowerCase();
        let allTAsks = ul.querySelectorAll("li");

        allTAsks.forEach(task => {

            if( (filter === "active" && task.classList.contains("checked")) ||
             (filter === "completed" && !task.classList.contains("checked")) ) 
            {
                task.style.display = "none";
            } else {
                task.style.display = "";
            }

        });

    });

});