import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch("https://thawing-garden-32074.herokuapp.com/users", {
      method: "GET",
      headers: {
        authentication: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [count]);
  const makeAdmin = (email) => {
    fetch(`https://thawing-garden-32074.herokuapp.com/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authentication: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.modifiedCount && setCount(count + 1);
        data.modifiedCount && toast.success("Made admin successfully");
        if (data.message) {
          toast.error(data.message);
        }
      });
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Name</th>
            <th>Make Admin</th>
            <th>Remove User</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user._id}>
              <th>{index + 1}</th>
              <td>{user.email}</td>
              <td>
                {user.role !== "admin" && (
                  <button
                    className="btn btn-xs"
                    onClick={() => makeAdmin(user.email)}
                  >
                    Make Admin
                  </button>
                )}
              </td>
              <td>
                <button className="btn btn-xs ml-2">Remove User</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
