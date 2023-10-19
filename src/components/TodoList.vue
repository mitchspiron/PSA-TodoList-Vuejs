<template>
  <div
    class="col-6 mb-1 container d-flex align-items-center justify-content-center align-middle card shadow-lg border-0"
    style="background: rgb(68, 44, 116)"
  >
    <h1 class="text-light">
      <vue-writer
        :array="['Todo List App']"
        :eraseSpeed="50"
        :typeSpeed="100"
      />
    </h1>
    <a href="#" data-bs-toggle="modal" data-bs-target="#addTaskModal"
      ><h1><i class="bi bi-plus-circle" style="color: #6064dc"></i></h1
    ></a>
  </div>
  <div
    class="col-6 container d-flex align-items-start card shadow-lg border-0"
    style="background: rgb(68, 44, 116)"
  >
    <p class="text-light my-auto">
      Incomplete Tasks: {{ incompleteTaskCount }}
    </p>
  </div>
  <div
    class="mt-1 col-6 card container d-flex align-items-center justify-content-center align-middle shadow-lg border-0"
  >
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Completed</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="tasks.length == 0" class="text-center">
          <td colspan="12">
            <i class="bi bi-exclamation-triangle me-2 text-danger"></i>There's
            no task to do!
          </td>
        </tr>
        <tr v-for="(task, index) in tasks" :key="task.id">
          <th>{{ index + 1 }}</th>
          <td class="text-muted">{{ task.title }}</td>
          <td>
            <span
              v-if="task.completed == true"
              class="badge rounded-pill bg-success"
              >completed</span
            >
            <span v-else class="badge rounded-pill bg-danger"
              >not completed</span
            >
          </td>
          <td>
            <div class="d-flex justify-content-center gap-4">
              <a
                data-bs-toggle="modal"
                data-bs-target="#showTaskModal"
                @click="showTask(task.id, task.title, task.content)"
                type="submit"
                ><i class="bi bi-eye"></i
              ></a>
              <a
                data-bs-toggle="modal"
                data-bs-target="#editTaskModal"
                @click="showTask(task.id, task.title, task.content)"
                type="submit"
                ><i class="bi bi-pencil-square" style="color: #442c74"></i
              ></a>
              <div class="form-check form-switch d-flex justify-content-center">
                <input
                  v-if="task.completed == false"
                  class="form-check-input"
                  type="checkbox"
                  :checked="task.completed"
                  @change="toggleTaskStatus(task)"
                />
                <input
                  v-else
                  class="form-check-input"
                  type="checkbox"
                  disabled
                  :checked="task.completed"
                  @change="toggleTaskStatus(task)"
                />
              </div>
              <a @click="removeTask(task.id)" type="submit">
                <i class="bi bi-trash text-danger"></i>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Add Task Modal -->
  <div
    class="modal fade"
    id="addTaskModal"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-labelledby="addTaskModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addTaskModalLabel">ADD NEW TASK</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Example: Task 1"
              id="TitleInput"
              v-model="newTask.title"
            />
            <label for="TitleInput">Task title</label>
          </div>
          <div class="form-floating">
            <textarea
              class="form-control"
              placeholder="Leave a comment here"
              id="ContentInput"
              v-model="newTask.content"
              rows="6"
              style="height: 100%"
            ></textarea>
            <label for="ContentInput">Task content</label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            ref="CloseAddTaskModal"
          >
            Close
          </button>
          <button @click="addTask()" type="button" class="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Show Task Modal -->
  <div
    class="modal fade"
    id="showTaskModal"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-labelledby="showTaskModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="showTaskModalLabel">SHOW TASK</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-floating mb-3 card shadow-lg border-0">
            <input
              type="text"
              class="form-control"
              placeholder="Example: Task 1"
              id="TitleInput"
              v-model="formUpdateTask.title"
              readonly
            />
            <label for="TitleInput">Task title</label>
          </div>
          <div class="form-floating card shadow-lg border-0">
            <textarea
              class="form-control"
              placeholder="Leave a comment here"
              id="ContentInput"
              v-model="formUpdateTask.content"
              rows="6"
              style="height: 100%"
              readonly
            ></textarea>
            <label for="ContentInput">Task content</label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            ref="CloseShowTaskModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Task Modal -->
  <div
    class="modal fade"
    id="editTaskModal"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-labelledby="editTaskModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editTaskModalLabel">EDIT TASK</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Example: Task 1"
              id="TitleInput"
              v-model="formUpdateTask.title"
            />
            <label for="TitleInput">Task title</label>
          </div>
          <div class="form-floating">
            <textarea
              class="form-control"
              placeholder="Leave a comment here"
              id="ContentInput"
              v-model="formUpdateTask.content"
              rows="6"
              style="height: 100%"
            ></textarea>
            <label for="ContentInput">Task content</label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            ref="CloseEditTaskModal"
          >
            Close
          </button>
          <button @click="editTask()" type="button" class="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";

export default {
  name: "TodoList",
  data() {
    return {
      newTask: {
        title: "",
        content: "",
      },
      formUpdateTask: { idSelectUpdate: 0, title: "", content: "" },
      tasks: [
        {
          id: 1,
          title: "Task 1",
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          completed: true,
        },
        {
          id: 2,
          title: "Task 2",
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          completed: false,
        },
        {
          id: 3,
          title: "Task 3",
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          completed: false,
        },
      ],
    };
  },
  computed: {
    incompleteTaskCount() {
      return this.tasks.filter((task) => !task.completed).length;
    },
  },
  methods: {
    addTask() {
      const toast = useToast();
      this.tasks.push({
        id: this.tasks.length + 1,
        title: this.newTask.title,
        content: this.newTask.content,
        completed: false,
      });
      toast.success("New Task added!", { position: "bottom-right" });
      this.newTask = {};
      this.$refs.CloseAddTaskModal.click();
    },
    showTask(index, title, content) {
      this.formUpdateTask = {
        idSelectUpdate: index,
        title,
        content,
      };
    },
    editTask() {
      const toast = useToast();
      const taskToEdit = this.tasks.find(
        (task) => task.id === this.formUpdateTask.idSelectUpdate
      );

      if (taskToEdit) {
        taskToEdit.title = this.formUpdateTask.title;
        taskToEdit.content = this.formUpdateTask.content;
      }

      toast.info("Task edited!", { position: "bottom-right" });
      this.$refs.CloseEditTaskModal.click();
    },
    toggleTaskStatus(task) {
      const toast = useToast();
      task.completed = !task.completed;
      toast.success("Task completed!", { position: "bottom-right" });
    },
    removeTask(index) {
      const toast = useToast();
      this.tasks = this.tasks.filter((task) => task.id !== index);
      toast.warning("Task removed!", { position: "bottom-right" });
    },
  },
};
</script>

<style scoped></style>
