import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DeleteModal from 'shared/modals/DeleteModal';
import EditModal from 'shared/modals/EditModal';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { usePageContext } from 'contexts/PageContext';
import { FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import sx from "./sx";

export default function MobileUsersTable(_props: any) {
  const [currSort, setCurrSort] = useState('');

  const handleChange = (event: any) => {
    setCurrSort(event.target.value as string);
    sort(event.target.value);
  };
  const { pagination } = usePageContext();
  const { data, sort } = pagination ?? {}

  const isAuthenticated = useIsAuthenticated();
  const users = data !== undefined && data.length > 0 ? data : [];

  return (
    <Stack sx={sx} component={Paper} >
      <Stack className="simple table">
        <Stack direction="row" className="table-header">
          <FormControl fullWidth>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by-select"
              value={currSort}
              label="Sort By"
              onChange={handleChange}
            >
              <MenuItem value="firstname">First Name</MenuItem>
              <MenuItem value="lastname">Last Name</MenuItem>
              <MenuItem value="phoneNumber">Phone Number</MenuItem>
              <MenuItem value="address">Address</MenuItem>
              <MenuItem value="email">Email</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack>
          {users.length > 0
            ? users.map((user: any) => (
              <Box className="user-row" key={user._id}>
                <Stack className="label-container" direction="row"><Box className="label"><Typography component="b">First Name:</Typography></Box> <Box className="user-info-label" flexGrow={1}> {user.firstname}</Box></Stack>
                <Stack className="label-container" direction="row"><Box className="label"><Typography component="b">Last Name:</Typography></Box> <Box className="user-info-label" flexGrow={1}> {user.lastname}</Box></Stack>
                <Stack className="label-container" direction="row"><Box className="label"><Typography component="b">Phone Number:</Typography></Box> <Box className="user-info-label" flexGrow={1}> {user.phoneNumber}</Box></Stack>
                <Stack className="label-container" direction="row"><Box className="label"><Typography component="b">Address:</Typography></Box> <Box className="user-info-label" flexGrow={1}> {user.address}</Box></Stack>
                <Stack className="label-container" direction="row"><Box className="label"><Typography component="b">Email:</Typography></Box> <Box className="user-info-label" flexGrow={1}> {user.email}</Box></Stack>
                {isAuthenticated &&
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Box><EditModal user={user} /></Box>
                    <Box><DeleteModal id={user._id} /></Box>
                  </Stack>
                }
              </Box>))
            : <Stack direction="row"   justifyContent="center"  >
              <Box className="no-user-box">
                No users
              </Box>
            </Stack>
          }
        </Stack>
      </Stack>
    </Stack>
  )
}
