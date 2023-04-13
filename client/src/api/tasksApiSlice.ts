import { TasksFormData } from 'components/Dashboard/TasksList/TasksList';

class TasksApi {
  checkAuth(response: Response) {
    if (response.status === 403) {
      localStorage.removeItem('token');
      window.location.replace('/login');
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  async getAll() {
    const response = await fetch('http://localhost:5000/api/tasks', {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
    this.checkAuth(response);
    return response;
  }

  async create(data: TasksFormData) {
    const response = await fetch('http://localhost:5000/api/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(data),
    });
    this.checkAuth(response);
    return response;
  }

  async delete(id: string) {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
    this.checkAuth(response);
    return response;
  }
}

export default new TasksApi();
