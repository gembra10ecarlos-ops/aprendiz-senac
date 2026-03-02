
type UserData = {
  username: string;
  password?: string;
  score: number;
};

const USERS_KEY = 'quiz_users';

export const storageService = {
  getUsers: (): UserData[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUser: (user: UserData) => {
    const users = storageService.getUsers();
    const existingIndex = users.findIndex(u => u.username === user.username);
    
    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...user };
    } else {
      users.push(user);
    }
    
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  login: (username: string, password?: string): UserData | null => {
    const users = storageService.getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    return user || null;
  },

  register: (username: string, password?: string): UserData | null => {
    const users = storageService.getUsers();
    if (users.find(u => u.username === username)) {
      return null;
    }
    const newUser = { username, password, score: 0 };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return newUser;
  },

  updateScore: (username: string, score: number) => {
    const users = storageService.getUsers();
    const user = users.find(u => u.username === username);
    if (user && score > user.score) {
      user.score = score;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  },

  getRanking: (): UserData[] => {
    const users = storageService.getUsers();
    return users
      .map(({ username, score }) => ({ username, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  },

  deleteAccount: (username: string) => {
    const users = storageService.getUsers();
    const filtered = users.filter(u => u.username !== username);
    localStorage.setItem(USERS_KEY, JSON.stringify(filtered));
  }
};
