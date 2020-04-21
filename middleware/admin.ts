import { Middleware } from '@nuxt/types';

const admin: Middleware = ({ $auth, redirect }) => {
  if ($auth.user.role !== 'admin') {
    redirect('/dashboard');
  }
};

export default admin;
