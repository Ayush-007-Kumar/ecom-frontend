import { Avatar, Backdrop, Button, CircularProgress, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { IoExitOutline } from 'react-icons/io5';
import BackDrop from "./BackDrop";
import { logOutUser } from "../Store/Action";

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    console.log(window.innerWidth);
    // console.log("Before handleClick", anchorEl)
    setAnchorEl(event.currentTarget);
    // console.log("After handleClick", anchorEl)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = () => {
    dispatch(logOutUser(navigate));
  }

  return (
    <div className="relative z-30">
      <div
        className="sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        onClick={handleClick}
      >
        <Avatar alt="Menu" src="" />
      </div>
      <Menu
        sx={{ width: "400px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: { width: 160 },
        }}
      >
        <Link to="/profile">
          <MenuItem className="flex gap-2" onClick={handleClose}>
            <BiUser className="text-xl" />
            <span className='font-bold text-[16px] mt-1'>
                {user?.username}
            </span>
          </MenuItem>
        </Link>

        <Link to="/profile/orders">
            <MenuItem className="flex gap-2" 
                onClick={handleClose}>
                    <FaShoppingCart className='text-xl'/>
                    <span className='font-semibold'>
                        Order
                    </span>
            </MenuItem>
          </Link>

          <MenuItem className="flex gap-2" 
                onClick={logOutHandler}>
                    <div className='font-semibold w-full flex gap-2 items-center bg-[linear-gradient(45deg,_#78078a,_#f2522e)] px-4 py-1 text-white rounded-sm'>
                    <IoExitOutline className='text-xl'/>
                    <span className='font-bold text-[16px] mt-1'>
                        LogOut
                    </span>
                    </div>
            </MenuItem>
      </Menu>
      {/* {open && <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: 1300, position: "fixed", 
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh", })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>} */}
    </div>
  );
}

export default UserMenu;
