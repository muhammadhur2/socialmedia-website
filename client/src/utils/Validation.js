export const isValidEmail = (email) => {
    const re = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };
  
  export const isValidPassword = (password) => {

    return password.length >= 6;
  };
  
  export const isValidName = (name) => {
    return name.length >= 2;
  };