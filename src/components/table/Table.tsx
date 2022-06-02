import React from "react";
import "./table.module.scss";
import { user } from "../../type";
const Table = ({ users }: { users: user[] }) => {
  console.log("render Table");
  return (
    <table id="customers">
      <tbody>
        <tr>
          <th>User</th>
          <th>Id</th>
          <th>Title</th>
        </tr>

        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.userId}</td>
            <td>{user.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const MemorizedTable = React.memo(Table);
