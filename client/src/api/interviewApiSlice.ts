import { InterviewDBFormData } from 'components/Dashboard/InterviewDatabase/InterviewDataForms/EditDataForm';

class InterviewApi {
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
    const response = await fetch('http://localhost:5000/api/interviewData', {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
    this.checkAuth(response);
    return response;
  }

  async create(data: InterviewDBFormData) {
    const response = await fetch('http://localhost:5000/api/interviewData/', {
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
    const response = await fetch(`http://localhost:5000/api/interviewData/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
    this.checkAuth(response);
    return response;
  }
}

export default new InterviewApi();
