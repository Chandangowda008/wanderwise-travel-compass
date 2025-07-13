// Google Authentication Service
export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  type: 'user' | 'agency';
}

class GoogleAuthService {
  private clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your actual Google Client ID
  private scope = 'openid email profile';

  async initializeGoogleAuth(): Promise<void> {
    // Load Google API
    await this.loadGoogleAPI();
  }

  private loadGoogleAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        window.gapi.load('auth2', () => {
          window.gapi.auth2.init({
            client_id: this.clientId,
            scope: this.scope,
          }).then(() => {
            resolve();
          }).catch(reject);
        });
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async signInWithGoogle(userType: 'user' | 'agency'): Promise<GoogleUser> {
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      const profile = googleUser.getBasicProfile();
      const idToken = googleUser.getAuthResponse().id_token;

      // In a real app, you would send this token to your backend for verification
      const user: GoogleUser = {
        id: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
        picture: profile.getImageUrl(),
        type: userType,
      };

      // Store user data in localStorage (in a real app, use secure session management)
      localStorage.setItem('wanderwise_user', JSON.stringify(user));
      localStorage.setItem('wanderwise_auth_token', idToken);

      return user;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw new Error('Google sign-in failed');
    }
  }

  async signOut(): Promise<void> {
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      await auth2.signOut();
      localStorage.removeItem('wanderwise_user');
      localStorage.removeItem('wanderwise_auth_token');
    } catch (error) {
      console.error('Google sign-out error:', error);
    }
  }

  getCurrentUser(): GoogleUser | null {
    const userData = localStorage.getItem('wanderwise_user');
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}

// Declare global types for Google API
declare global {
  interface Window {
    gapi: any;
  }
}

export const googleAuthService = new GoogleAuthService(); 