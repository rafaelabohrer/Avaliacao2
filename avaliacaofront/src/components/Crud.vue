<template>
  <v-container>
      <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
          :items-length="totalItems" :loading="loading" :search="search" item-value="description"
          @update:options="loadItems">
          <!-- search field in v-slot -->
          <template v-slot:top>
              <v-toolbar flat>
                  <v-toolbar-title>
                      Cadastro de Tarefas
                  </v-toolbar-title>
                  <v-toolbar-items>
                      <v-btn @click="addItem">Adicionar Tarefa</v-btn>
                  </v-toolbar-items>
              </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
              <v-btn icon="mdi-pencil" @click="editItem(item)" class="mr-2" />
              <v-btn icon="mdi-delete" @click="remove(item.id)" />
          </template>
      </v-data-table-server>
  </v-container>

  <v-dialog v-model="dialog" max-width="600">
      <v-card>
          <v-card-title>Cadastro de Tarefa</v-card-title>
          <v-card-text>
              <!-- Campo de Prioridade (Texto) -->
              <v-text-field
                  label="Prioridade"
                  v-model="task.prioridade"
                  required
                  placeholder="Digite a prioridade da tarefa"
              ></v-text-field>

              <!-- Campo de Descrição -->
              <v-text-field
                  label="Descrição"
                  v-model="task.tarefa"
                  required
                  placeholder="Digite a descrição da tarefa"
              ></v-text-field>
          </v-card-text>
          <v-card-actions>
              <v-btn color="error" @click="dialog = false">Cancelar</v-btn>
              <v-spacer />
              <v-btn color="primary" @click="save">Salvar</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const task = ref({});
const itemsPerPage = ref(10);  // Este campo será desnecessário sem a paginação
const dialog = ref(false);
const headers = ref([
  { title: 'Prioridade', key: 'prioridade' },
  { title: 'Descrição', key: 'tarefa' },
  { title: 'Ações', key: 'action' }
]);
const serverItems = ref([]); // Lista de tarefas
const totalItems = ref(0);    // Total de itens (se necessário para mostrar)
const loading = ref(false);   // Flag para mostrar carregamento
const search = ref('');       // Para filtrar os dados

// Função para carregar todas as tarefas
const loadItems = async () => {
  console.log(`to agui`)
  loading.value = true;
  
  const url = 'http://localhost:5000/tarefas'; // Rota sem paginação
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Falha ao carregar tarefas');
    }
    const result = await response.json();
    console.log(result);
    serverItems.value = result;  // Preenche as tarefas
    totalItems.value = result.length;  // Atualiza total (não necessário sem paginação)
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
  } finally {
    loading.value = false;
  }
}

// Função de remoção de tarefa
const remove = async (id) => {
  console.log(id)
  await fetch('http://localhost:5000/tarefa/' + id, {
      method: 'DELETE'
  });
  loadItems();  // Recarregar a lista de tarefas
}

// Função para salvar (adicionar ou editar) tarefa
const save = () => { 
  const body = JSON.stringify(task.value);
  console.log(body)
  const url = task.value.id
  ? `http://localhost:5000/tarefa/${task.value.id}` // Para PUT
  : 'http://localhost:5000/tarefas';               // Para POST
  fetch(url,
      {
          method: task.value.id ? 'PUT' : 'POST',
          headers: {
              'Content-Type': 'application/json',
      },
          body
      }
  ).then(
      () => {
          task.value = {};
          dialog.value = false;
          loadItems();  // Recarregar após salvar
      }
  ).catch(
      error => {
          console.log(error);
      }
  );
}

// Função para editar tarefa
const editItem = (item) => {
  task.value = { ...item };
  dialog.value = true;
}

// Função para adicionar nova tarefa
const addItem = () => {
  task.value = {};
  dialog.value = true;
}

// Carregar todas as tarefas ao montar o componente
loadItems();
</script>
