// const container = document.querySelector(".container");
const todoForm = document.querySelector(".card-form");
const allInput = document.querySelector("#inputTodo");
// const addTodobutton = document.querySelector("#addTodoButton");
const todoLists = document.querySelector(".lists");
const messageElement = document.querySelector(".message")




// showMessage
const showMessage = (text, status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(() => {
        messageElement.textContent = "";
        messageElement.classList.remove(`bg-${status}`);
    }, 10000)
}




//create todo
const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("list-style")
    todoElement.innerHTML = `
    <span> ${todoValue} </span>
    <span> <button class="btn" id="deleteButton">
     <i class="fa fa-trash"> </i> </button> </span>
  `;
    
    todoLists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click", deleteTodo)

}

//deleteTodo

const deleteTodo = (event) => {
    // console.log("delet todo");
    const selectrdTodo = event.target.parentElement.parentElement.parentElement;
    // console.log(selectrdTodo);
    todoLists.removeChild(selectrdTodo);
    showMessage("todo is deleted", "danger");


    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selectrdTodo.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));

};





//add todo

const addTodo = (event) => {
    event.preventDefault();
    const todoValue = allInput.value;
    console.log(allInput.value);
    
    
    //uniqu id
    const todoId = Date.now().toString();
    // console.log(todoId);


    createTodo(todoId, todoValue)
    showMessage("Todo is Added", "success")

    //add local stor

    const todos = localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
    todos.push({todoId, todoValue});
    localStorage.setItem("mytodos", JSON.stringify(todos));
    
    allInput.value = "";
    
};



//get todos FromLocalStorage

const getTodosFromLocalStorage = () => {
    return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
}



// loadTodos
const loadTodos = () => {
  const todos = getTodosFromLocalStorage();
  todos.map((todo) => createTodo(todo));
};

    


//adding listeners
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);