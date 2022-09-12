
class Assignment {
    constructor(taskName, dueDate) {
        this.taskName = taskName;
        this.dueDate = dueDate;
    }
}

let assignmentForm = document.getElementById('assignmentForm');

let storedValue = localStorage.getItem('assignments');

let assignments;
if(storedValue !== null) {
    assignments = JSON.parse(storedValue);
} else {
    assignments = [];
}

assignmentForm.addEventListener('submit', event => {
    event.preventDefault();

    let name = document.getElementById('taskName').value;
    let date = document.getElementById('dueDate').value;
    let assignment = new Assignment(name, date);

    let i = 0;
    while(i < assignments.length && assignments[i].dueDate < assignment.dueDate) {
        i++;
    }
    assignments.splice(i, 0, assignment);
    localStorage.setItem('assignments', JSON.stringify(assignments));
    updateCurrentAssignment();
    
});

function updateCurrentAssignment() {
    let taskContainer = document.getElementById('taskContainer');
    let noAssignment = document.getElementById('noAssignment');
    let currentAssignment = document.getElementById('currentAssignment');
    let currentDueDate = document.getElementById('currentDueDate');
    if(assignments.length > 0) {
        if(taskContainer.classList.contains('hidden')) {
            taskContainer.classList.remove('hidden');
            noAssignment.classList.add('hidden');
        }
        currentAssignment.innerHTML = assignments[0].taskName;
        currentDueDate.innerHTML = "Due: " + assignments[0].dueDate;

        let count = -1;

        console.log(assignments);
        assignments.forEach(val => {
            if(val.dueDate == assignments[0].dueDate) {
                count++;
            }
        });

        document.getElementById('assignmentDueCount').innerHTML = "Other assignments due same day: " + count;
    } else {
        currentAssignment.innerHTML = '';
        currentDueDate.innerHTML = '';
        
        if(noAssignment.classList.contains('hidden')) {
            noAssignment.classList.remove('hidden');
            taskContainer.classList.add('hidden');
        }
    }
}

function finishAssignment() {
    if(assignments.length == 0) {
        return;
    }

    assignments.shift();
    localStorage.setItem('assignments', JSON.stringify(assignments));
    updateCurrentAssignment();
}

updateCurrentAssignment();