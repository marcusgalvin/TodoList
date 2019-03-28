var todoList = {
	todos: [],

	// Add a todo object
	addTodo: function(todoText) {
    this.todos.push({
    	todoText: todoText,
    	completed: false
    });
	},

	// Change a todo
	changeTodo: function(position, todoText) {
		this.todos[position].todoText = todoText;
	},

	// Delete a todo
	deleteTodo: function(position) {
		this.todos.splice(position, 1);
	},

	// toggle the completed state as true or false
	toggleCompleted: function(position) {
		var todo = this.todos[position]; 
		todo.completed = !todo.completed;
	},

	// toggle all todos completed status to true or false
	toggleAll: function() {
		var totalTodos = this.todos.length;
		var completedTodos = 0;

		// Get number of completed todos.
		this.todos.forEach(function(todo) {
			if (todo.completed === true) {
				completedTodos++;
			}
		});

		this.todos.forEach(function(todo){
			if (completedTodos === totalTodos) {
				todo.completed = false;
			} else {
				todo.completed = true;
			}
		});
	}
};

// Handle user interaction
var handlers = {
	addTodo: function() {
		var addTodoTextInput = document.getElementById('addTodoTextInput');
		todoList.addTodo(addTodoTextInput.value);
		addTodoTextInput.value = '';
		view.displayTodos();
	},
	changeTodo: function() {
		// Grab inputs from DOM
		var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
		var changeTodoTextInput     = document.getElementById('changeTodoTextInput');

		todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);

		// Reset inputs
		changeTodoPositionInput.value = '';
		changeTodoTextInput.value     = '';

		view.displayTodos();
	},
	deleteTodo: function(position) {
		todoList.deleteTodo(position);
		view.displayTodos();
	},
	toggleCompleted: function() {
		var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
		todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
		toggleCompletedPositionInput = '';
		view.displayTodos();
	},
	toggleAll: function() {
		todoList.toggleAll();
		view.displayTodos();
	}
};

// Handle information displayed to the screen
var view = {
	displayTodos: function() {
		var todosUl = document.getElementById('todosUl');

		// Reset todosUl
		todosUl.innerHTML = '';

		todoList.todos.forEach(function(todo, position){
			var todoLi = document.createElement('li');
			var todoTextWithCompletion = '';

			// Assign todoTextWithCompletion
			if (todo.completed === true) {
				todoTextWithCompletion = `(x) ${todo.todoText}`;
			} else {
				todoTextWithCompletion = `( ) ${todo.todoText}`;
			}

			todoLi.id = position;
			todoLi.textContent = todoTextWithCompletion;
			todoLi.appendChild(this.createDeleteButton());
			todosUl.appendChild(todoLi);
		}, this);
	},
	createDeleteButton: function() {
		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.className = 'deleteButton';
		return deleteButton;
	},
	setUpEventListeners: function() {
		var todosUl = document.getElementById('todosUl');

		todosUl.addEventListener('click', function(event) {
			// Get the element that was clicked on
			var elementClicked = event.target;

			// Check if elementClicked is a delete button
			if (elementClicked.className === 'deleteButton') {
				var todoLiId = parseInt(elementClicked.parentNode.id);

				// Run deleteTodo on the Li that holds the todo
				handlers.deleteTodo(todoLiId);
			}
		});
	}
};

view.setUpEventListeners();
