import applicationsData from "@/services/mockData/applications.json";

class ApplicationService {
  constructor() {
    this.applications = [...applicationsData];
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.applications]);
      }, 300);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const application = this.applications.find(a => a.Id === id);
        if (application) {
          resolve({ ...application });
        } else {
          reject(new Error("Application not found"));
        }
      }, 200);
    });
  }

  async getByRoleId(roleId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const roleApplications = this.applications.filter(a => a.roleId === roleId);
        resolve([...roleApplications]);
      }, 300);
    });
  }

  async create(applicationData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newApplication = {
          Id: Math.max(...this.applications.map(a => a.Id)) + 1,
          ...applicationData,
          createdAt: new Date().toISOString()
        };
        this.applications.push(newApplication);
        resolve({ ...newApplication });
      }, 500);
    });
  }

  async update(id, applicationData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.applications.findIndex(a => a.Id === id);
        if (index !== -1) {
          this.applications[index] = { ...this.applications[index], ...applicationData };
          resolve({ ...this.applications[index] });
        } else {
          reject(new Error("Application not found"));
        }
      }, 300);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.applications.findIndex(a => a.Id === id);
        if (index !== -1) {
          const deletedApplication = this.applications.splice(index, 1)[0];
          resolve({ ...deletedApplication });
        } else {
          reject(new Error("Application not found"));
        }
      }, 300);
    });
  }

  async updateStatus(id, status) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.applications.findIndex(a => a.Id === id);
        if (index !== -1) {
          this.applications[index].status = status;
          resolve({ ...this.applications[index] });
        } else {
          reject(new Error("Application not found"));
        }
      }, 200);
    });
  }
}

export const applicationService = new ApplicationService();