// frontend/src/context/UserContext.js

import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
  user: null,
  setUser: () => {}
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // On first mount, see if the backend session has a user
    fetch("/api/auth/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not authenticated");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
