export const getToken = (args: { name: string }): string | null => {
    try {
      return JSON.parse(localStorage.getItem(args.name) as string);
    } catch(err) {
      return null;
    }
  };
  
  export const setToken = (args: { name: string, value: any }): void => {
    localStorage.setItem(args.name, args.value);
  };
  
  export const removeToken = (args: { name: string }): void => {
    localStorage.removeItem(args.name);
  };