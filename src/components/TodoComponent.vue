<template>
  <div class="todo-container">
    <div class="card">
      <h1 class="text-center">Todo List</h1>

      <!-- Yeni Todo Ekleme / Düzenleme -->
      <div class="add-todo-wrapper">
        <input v-model="newTodo" class="todo-input" placeholder="Add a new todo">
        <button @click="addOrUpdateTodo" class="btn add">
          <i :class="editingTodo ? 'fas fa-edit' : 'fas fa-plus'"></i>
        </button>
      </div>

      <!-- Todo Listesi -->
      <ul class="todo-list">
        <li v-for="todo in todos" :key="todo.id" class="todo-item">
          <div>
            <input type="checkbox" :checked="todo.completed" @change="toggleCompleted(todo)">
            <span :class="{ 'completed': todo.completed }">{{ todo.title }}</span>
          </div>
          <div>
            <button @click="editTodo(todo)" class="btn edit"><i class="fas fa-edit"></i> Edit</button>
            <button @click="deleteTodo(todo.id)" class="btn delete"><i class="fas fa-trash"></i> Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      newTodo: '',
      editingTodo: null, 
    };
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await fetch('http://localhost:8080/todos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.todos = Object.values(data); 
      } catch (error) {
        console.error("Todos'u getirirken hata:", error);
        alert("Todos'u getirirken bir hata oluştu, lütfen tekrar deneyin.");
      }
    },

    
    async addOrUpdateTodo() {
      try {
        if (this.editingTodo) {
        
          const updatedTodo = {
            id: this.editingTodo,
            title: this.newTodo,
            completed: false,
          };

          const response = await fetch(`http://localhost:8080/todos/${this.editingTodo}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTodo),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const index = this.todos.findIndex(t => t.id === this.editingTodo);
          if (index !== -1) {
            this.todos.splice(index, 1, updatedTodo);
          }

          this.editingTodo = null; 
        } else {
       
          const response = await fetch('http://localhost:8080/todos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: this.newTodo, completed: false }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const newTodo = await response.json();
          this.todos.push(newTodo);
        }

        this.newTodo = '';
        this.fetchTodos(); 
      } catch (error) {
        console.error("Todo eklerken/güncellerken hata:", error);
        alert("Todo eklenirken/güncellenirken bir hata oluştu, lütfen tekrar deneyin.");
      }
    },

    
    async deleteTodo(id) {
      try {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        this.todos = this.todos.filter(todo => todo.id !== id); 
      } catch (error) {
        console.error("Todo silinirken hata:", error);
        alert("Todo silinirken bir hata oluştu, lütfen tekrar deneyin.");
      }
    },

    
    async toggleCompleted(todo) {
      try {
        todo.completed = !todo.completed; 
        await this.updateTodo(todo); 
      } catch (error) {
        console.error("Todo tamamlanma durumu değiştirirken hata:", error);
        alert("Todo güncellenirken bir hata oluştu.");
      }
    },

    async updateTodo(todo) {
      try {
        const response = await fetch(`http://localhost:8080/todos/${todo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedTodo = await response.json();
        const index = this.todos.findIndex(t => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos.splice(index, 1, updatedTodo); 
        }
      } catch (error) {
        console.error("Todo güncelleme başarısız oldu:", error);
        alert("Todo güncellenirken bir hata oluştu, lütfen tekrar deneyin.");
      }
    },

    
    editTodo(todo) {
      this.newTodo = todo.title; 
      this.editingTodo = todo.id; 
    }
  },

  mounted() {
    this.fetchTodos();
  }
};
</script>

<style scoped>
  /* Your existing styles */
</style>


  
  <style scoped>
  .todo-container {
    max-width: 100%;
    padding: 20px;
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
  }
  
  .card {
    background-color: #f9fafb; /* Hafif gri arka plan rengi */
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px; /* Kartı küçültüyoruz */
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .todo-list {
    list-style: none;
    padding: 0;
    margin-bottom: 20px;
  }
  
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #e0f7fa; /* Hafif mavi ton */
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .completed {
    text-decoration: line-through;
    color: #888;
  }
  
  .add-todo-wrapper {
    display: flex;
    align-items: center;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 30px;
    margin-top: 20px;
    overflow: hidden;
  }
  
  .todo-input {
    flex: 1;
    border: none;
    padding: 10px;
    border-radius: 30px 0 0 30px;
    font-size: 16px;
    outline: none;
  }
  
  .btn.add {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 0 30px 30px 0; /* Input ile birleşik oval buton */
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
  }
  
  .btn.add:hover {
    background-color: #218838;
  }
  
  .btn {
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn.edit {
    background-color: #007bff;
    color: white;
  }
  
  .btn.delete {
    background-color: #dc3545;
    color: white;
  }
  
  .btn:hover {
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    .add-todo-wrapper {
      flex-direction: row; /* Buton ve input aynı hizada kalsın */
    }
  
    .todo-input {
      flex: 1;
      border-radius: 30px 0 0 30px;
      font-size: 16px;
      padding: 10px;
    }
  
    .btn.add {
      border-radius: 0 30px 30px 0;
      padding: 10px 20px;
      font-size: 24px;
    }
  
    .todo-item {
      flex-direction: row; /* Büyük ekranlardaki gibi aynı hizada kalsın */
      justify-content: space-between;
    }
  }
  </style>
  