const admin = ({ $auth, redirect }) => {
  if ($auth.user.role !== 'admin') {
    redirect('/dashboard');
  }
};

export default admin;
