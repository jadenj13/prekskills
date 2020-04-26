const plugin = ({ $axios, isClient }) => {
  if (isClient) {
    const token = localStorage.getItem('token');

    if (token) {
      $axios.setToken(token, 'Bearer');
    }
  }
};

export default plugin;
