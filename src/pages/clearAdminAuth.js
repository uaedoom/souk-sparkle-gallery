
// This is a utility file to help with clearing auth state
// You can run this in the browser console if needed

export function clearAdminAuth() {
  localStorage.removeItem('adminLoggedIn');
  localStorage.removeItem('supabase-auth');
  console.log('Admin authentication cleared');
}

// To use this in the browser console:
// 1. Import the function: import { clearAdminAuth } from './clearAdminAuth.js'
// 2. Call the function: clearAdminAuth()
