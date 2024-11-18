// const getTodos = () => {
//   const storedTodos = localStorage.getItem('todos');
//   return storedTodos ? JSON.parse(storedTodos) : [];
// };

// [...document.getElementsByClassName('delete-btn')]
//   .forEach(node => node.addEventListener('click', () => console.log(confirm('このTODOを削除してもよろしいですか？'))));
// UUIDを生成する関数
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// localStorageからTODOリストを取得する関数
const getTodos = () => {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [];
};

// localStorageにTODOリストを保存する関数
const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// TODOアイテムをHTMLに追加する関数
const renderTodos = () => {
  const uncompletedTodoList = document.getElementById('uncompleted-todo-list');
  const completedTodoList = document.getElementById('completed-todo-list');
  
  // 現在のTODOリストを取得
  const todos = getTodos();
  
  // 未完了のTODOを描画
  uncompletedTodoList.innerHTML = '';
  completedTodoList.innerHTML = '';
  
  todos.forEach(todo => {
    const todoCard = document.createElement('div');
    todoCard.classList.add('todo-card');
    todoCard.dataset.id = todo.id;
    
    // チェックボックス
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodoCompletion(todo.id));
    
    // TODOテキスト
    const todoText = document.createElement('span');
    todoText.classList.add('todo-text');
    todoText.contentEditable = true;
    todoText.textContent = todo.text;
    todoText.addEventListener('blur', () => updateTodoText(todo.id, todoText.textContent));
    
    // 削除ボタン
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '削除';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    todoCard.appendChild(checkbox);
    todoCard.appendChild(todoText);
    todoCard.appendChild(deleteBtn);

    // 完了していないTODOは未完了リストに、完了済みTODOは完了済みリストに追加
    if (todo.completed) {
      completedTodoList.appendChild(todoCard);
    } else {
      uncompletedTodoList.appendChild(todoCard);
    }
  });
};

// TODOを追加する関数
const addTodo = (text) => {
  const todos = getTodos();
  const newTodo = {
    id: generateUUID(),
    text,
    completed: false
  };
  todos.push(newTodo);
  saveTodos(todos);
  renderTodos();
};

// TODOの完了状態を変更する関数
const toggleTodoCompletion = (id) => {
  const todos = getTodos();
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos(todos);
    renderTodos();
  }
};

// TODOのテキストを更新する関数
const updateTodoText = (id, newText) => {
  const todos = getTodos();
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.text = newText;
    saveTodos(todos);
  }
};

// TODOを削除する関数
const deleteTodo = (id) => {
  if (confirm('このTODOを削除してもよろしいですか？')) {
    const todos = getTodos();
    const updatedTodos = todos.filter(t => t.id !== id);
    saveTodos(updatedTodos);
    renderTodos();
  }
};

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  // TODOフォームの処理
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');

  todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
      addTodo(text);
      todoInput.value = ''; // 入力欄をクリア
    }
  });

  // ページ読み込み時にTODOリストを表示
  renderTodos();
});