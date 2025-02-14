import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAllUsers } from "../../features/userSlice";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import UserRequest from "../userRequest/UserRequest";
import Stats from "../stats/Stats";

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [actionRequest, setActionRequest] = useState("")
  const [actionRequestModel, setActionRequestModel] = useState(false)
  const [userId, setUserId] = useState("")
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event: any) => {
    setFilter(event.target.value);
  };

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users.filter((user) => {
    return (
      user?.email?.toLowerCase().includes(search?.toLowerCase()) &&
      (filter ? user.role === filter : true)
    );
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {loading ? (
        <div className="flex justify-center">
                 <CircularProgress />
               </div>
      ) : (
        <div>
          <Stats/>
          <h2 className="text-3xl font-bold text-center mb-6">Users</h2>
          <div className="mb-6 flex flex-wrap gap-2 justify-between items-center">
            <TextField
              label="Search by Email"
              variant="outlined"
              onChange={handleSearchChange}
              value={search}
              className="max-w-lg"
            />
            <FormControl variant="outlined" className="max-w-xs ml-4 w-44">
              <InputLabel>Filter by Role</InputLabel>
              <Select
                value={filter}
                onChange={handleFilterChange}
                label="Filter by Role"
              >
                <MenuItem value="">All Roles</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </div>
          
          <TableContainer component={Paper} className="shadow-lg rounded-lg">
            <Table sx={{ minWidth: 650 }} aria-label="users table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Account Type</TableCell>
                  <TableCell>Account Id</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow hover key={user._id} className="hover:bg-gray-100">
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.accountType}</TableCell>
                      <TableCell>{user.accountId}</TableCell>
                      
                      <TableCell>
                        {user.allRequestsForAd.length > 0 ? (
                          user.allRequestsForAd.map((request: any, index: number) => (
                            <div key={index} className="p-1">
                              <Button
                                variant="contained"
                                color={request.approved? "success" : "error"}
                                className="m-1"
                              >
                                {request.approved? "Approved" : "Not Approved"}
                              </Button>
                            </div>
                          ))
                        ) : (
                          <p>No requests</p>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.allRequestsForAd.length > 0 ? (
                          user.allRequestsForAd.map((request: any, index: number) => (
                            <div className="p-1" key={index}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  setActionRequest(request);
                                  setActionRequestModel(true);
                                  setUserId(user._id);
                                }}
                                className="m-1"
                              >
                                View
                              </Button>
                            </div>
                          ))
                        ) : (
                          "No requests"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="mt-4"
          />
        </div>
      )}
        {actionRequestModel && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <UserRequest userId={userId} actionRequest={actionRequest} setActionRequestModel={setActionRequestModel} />
        </div>
      )}
    </div>
  );
};

export default Users;
