

let btn = document.querySelector('button')

btn.addEventListener('click', function(){
    // selecting user entered value in input box
  let data = document.querySelector('input').value 
//   creating new div element for displaying task
if(data !== ''){
  let new_task = document.createElement('p')

//  appending content inside newly created dom element div
new_task.innerHTML =` <input type="checkbox" name="taskCompleted" style="width:40px;">`+ data + `<button type="button" style="background-color: darkblue; color: white; cursor:pointer;">Edit</button>`  + `<button type="button" style="background-color: darkred; color: white; cursor:pointer;">Delete</button>`;


// styling new appending element in dom  
new_task.style.cssText = "font-weight:bolder;font-size:1.5em;color:black;background-color:whitesmoke;border:2px solid black;width:50%;"
let addTask = document.querySelector('.addTask')
addTask.appendChild(new_task)


// add id to every generated checkbox for task completion
//  task completion - toggled checkbox
let check_btn = new_task.children[0]
check_btn.setAttribute('id','taskDone')

check_btn.addEventListener('click',function(){
  if(check_btn.checked == true){
    let completedTask = new_task.childNodes[2].nodeValue
    console.log(completedTask)
    new_task.textContent = `Task completed`
    new_task.style.cssText = 'background-color:white;color:green;font-weight:bold;font-size:1.2em;width:30%;'
    setTimeout(() => {
      new_task.textContent = null
    },1500);
  }
});  


//  delete  functionality

let delete_btn = new_task.children[2]
// set new attribute class for every delete button 
delete_btn.setAttribute('id','delete')
// deleting task on clicking btn
delete_btn.addEventListener('click', function(){
  let deletingTask = new_task.childNodes[2].nodeValue
  new_task.textContent = `Task deleted`
  new_task.style.cssText = 'background-color:white;color:darkred;font-weight:bold;font-size:1.2em;width:30%;'
    setTimeout(() => {
      new_task.textContent = null
    },1500);
});


//  edit functionality

// set new attribute class for every edit button
let edit_btn = new_task.children[1]
edit_btn.setAttribute('id','edit')
console.log(edit_btn)
// edit task on every edit click button
// edit functionality
edit_btn.addEventListener('click', function() {
  let oldText = new_task.childNodes[2].nodeValue.trim();
  let editedText = prompt("Edit your task:", oldText);
  if (editedText !== null && editedText.trim() !== "") {
      new_task.childNodes[2].nodeValue = editedText;
  }
});
} else {
  alert('Input field cannot be empty');
}
});

  


