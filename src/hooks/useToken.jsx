import { current } from "daisyui/src/colors";
import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const email = user?.user?.email;
    const currentUser = { email: email };
    if (email) {
      fetch(`https://thawing-garden-32074.herokuapp.com/user/${email}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(currentUser),
      })
        .then((res) => res.json())
        .then((data) => {
          setToken(data.token);
          localStorage.setItem("accessToken", data.token);
        });
    }
  }, [user]);

  return [token];
};

export default useToken;
