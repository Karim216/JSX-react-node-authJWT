import React, { Fragment, useEffect } from "react";
import { getAllUsers } from "../../../redux/actions/users/actionFetchAllUsers";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
  const { allUsers } = useSelector((state) => state)

  const dispatch = useDispatch()

  console.log(allUsers.data)

  useEffect(() => {

    dispatch(getAllUsers())
    
  }, [])
  
  return (
    <Fragment>
      <div className="container m-auto mt-5 mb-5">Users</div>
    </Fragment>
  );
};

export default Users;
