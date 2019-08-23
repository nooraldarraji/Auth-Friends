import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const url = "http://localhost:5000/api/friends";

    if (token) {
      axios
        .get(url, {
          headers: {
            Authorization: `${token}`
          }
        })
        .then(res => {
          setMsg(res.data[6].name);
          console.log(msg);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <div>Profile Page</div>
      <br />
      <div>{msg}</div>
    </>
  );
}

export default Profile;
