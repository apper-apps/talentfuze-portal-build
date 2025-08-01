import rolesData from "@/services/mockData/roles.json";

class RoleService {
  constructor() {
    this.roles = [...rolesData];
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.roles]);
      }, 300);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const role = this.roles.find(r => r.Id === id);
        if (role) {
          resolve({ ...role });
        } else {
          reject(new Error("Role not found"));
        }
      }, 200);
    });
  }

  async getActiveRoles() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const activeRoles = this.roles.filter(role => role.isActive);
        resolve([...activeRoles]);
      }, 300);
    });
  }

  async create(roleData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRole = {
          Id: Math.max(...this.roles.map(r => r.Id)) + 1,
          ...roleData,
          isActive: true
        };
        this.roles.push(newRole);
        resolve({ ...newRole });
      }, 400);
    });
  }

  async update(id, roleData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.roles.findIndex(r => r.Id === id);
        if (index !== -1) {
          this.roles[index] = { ...this.roles[index], ...roleData };
          resolve({ ...this.roles[index] });
        } else {
          reject(new Error("Role not found"));
        }
      }, 300);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.roles.findIndex(r => r.Id === id);
        if (index !== -1) {
          const deletedRole = this.roles.splice(index, 1)[0];
          resolve({ ...deletedRole });
        } else {
          reject(new Error("Role not found"));
        }
      }, 300);
    });
  }
}

export const roleService = new RoleService();