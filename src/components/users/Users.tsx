import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAllUsers } from "../../features/userSlice";

interface DomainType {
  _id: string;
  domain: string;
  type: string;
  assignedDomainAt: Date;
  assignedTo: string;
}

interface AssignModelProp {
  setAssignModel: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDomain: DomainType | null;
}

const Users = ({ setAssignModel, selectedDomain }: AssignModelProp) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      try {
        const resultAction = await dispatch(getAllUsers());
        if (getAllUsers.fulfilled.match(resultAction)) {
          setUsers(resultAction.payload.data);
        } else if (getAllUsers.rejected.match(resultAction)) {
          console.error("Failed to fetch users", resultAction.error.message);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, [dispatch]);

  const handleClose = () => {
    setAssignModel(false); 
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Assign Users to Domain</h2>
          <p className="mb-4">
            Selected Domain: {selectedDomain ? selectedDomain.domain : "None"}
          </p>
          <button
            onClick={handleClose}
            className="bg-red-500 text-white px-4 py-2 rounded mb-4"
          >
            Close Assign Model
          </button>
          <ul>
            {users.map((user) => (
              <li key={user._id}>{user.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Users;
