import api from "./api";

// Initialize Google SDK
const initializeGoogleSDK = () => {
  return new Promise((resolve) => {
    if (window.google) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    document.head.appendChild(script);
  });
};

// Initialize Microsoft SDK
const initializeMicrosoftSDK = () => {
  return new Promise((resolve) => {
    if (window.msal) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://alcdn.msauth.net/browser/2.30.0/js/msal-browser.min.js";
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    document.head.appendChild(script);
  });
};

export const authService = {
  login: async (email, password) => {
    const response = await api.post(
      "/auth/login",
      { email, password },
    );
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post(
      "/auth/register",
      userData,
    );
    return response.data;
  },

  googleLogin: async () => {
    try {
      await initializeGoogleSDK();

      return new Promise((resolve, reject) => {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: (response) => {
            if (response.credential) {
              resolve(response.credential);
            } else {
              reject(new Error("No credential received from Google"));
            }
          },
        });

        // Trigger the One Tap UI
        window.google.accounts.id.prompt(
          (notification) => {
            if (notification.isNotDisplayed()) {
              // One Tap UI is not displayed, use redirect flow as fallback
              window.google.accounts.id.renderButton(
                document.createElement("div"),
                {
                  type: "standard",
                  size: "large",
                  click_listener: () => {
                    // The button click will trigger the callback above
                  },
                },
              );
            }
          },
        );
      });
    } catch (error) {
      console.error("Failed to initialize Google login:", error);
      throw error;
    }
  },

  googleLoginWithToken: async (idToken) => {
    try {
      const response = await api.post(
        "/Auth/social-login",
        {
          provider: "Google",
          idToken: idToken,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  },

  microsoftLogin: async () => {
    try {
      await initializeMicrosoftSDK();

      const msalConfig = {
        auth: {
          clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID,
          authority: `https://login.microsoftonline.com/${import.meta.env.VITE_MICROSOFT_TENANT_ID}`,
          redirectUri: window.location.origin,
        },
      };

      const msalInstance = new window.msal.PublicClientApplication(msalConfig);
      await msalInstance.initialize();

      const loginRequest = {
        scopes: ["openid", "profile", "email"],
      };

      const response = await msalInstance.loginPopup(loginRequest);

      if (response.idToken) {
        return {
          idToken: response.idToken,
          account: response.account,
        };
      }
    } catch (error) {
      console.error("Failed to initialize Microsoft login:", error);
      throw error;
    }
  },

  microsoftLoginWithToken: async (idToken) => {
    try {
      const response = await api.post(
        "/Auth/social-login",
        {
          provider: "Microsoft",
          idToken: idToken,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Microsoft login error:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
