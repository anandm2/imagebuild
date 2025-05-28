
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const signUp = async () => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Error signing up:', error);
    } else {
      setUser(user);
    }
  };

  const signIn = async () => {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      console.error('Error signing in:', error);
    } else {
      setUser(user);
    }
  };

  return (
    <div>
      <h1>Auth</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Sign In</button>
      {user && <p>Welcome, {user.email}</p>}
    </div>
  );
}
