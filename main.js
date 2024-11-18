const getTodos = () => {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [];
};


document.getElementById('form').onsubmit = function() {
  console.log('クリックされました');
};

[...document.getElementsByClassName('delete-btn')]
  .forEach(node => node.addEventListener('click', () => console.log(confirm('このTODOを削除してもよろしいですか？'))));