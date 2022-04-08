import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Modal from "@mui/material/Modal";
import { positions } from "@mui/system";
import { styled } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Icon,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { Nav, Navbar, Container, NavLink } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import img1 from "../Images/logo.png";
import "../assets/css/style.css";
const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style1 = {
  position: "absolute",
  width: 400,
  bgcolor: "white",
  color: "black",
  border: "3px solid black",
  p: 2,
  px: 4,
  pb: 3,
};

const style2 = {
  position: "absolute",
  width: 100,
  bgcolor: "white",
  color: "black",
  border: "3px solid black",
  p: 2,
  px: 4,
  pb: 3,
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  color: "black",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "rgb(255, 255, 255)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  opacity: 1,
};

const columns = [
  { id: "name" },
  { id: "title" },
  {
    id: "info",
  },
  {
    id: "image",
  },
  {
    id: "date",
  },
  {
    id: "id",
  },
];

export default function Cards3() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [APIData, setAPIData] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [id, setId] = useState("");
  const [status, setStatus] = React.useState(true);
  const[hide,setHide]=useState(true)
  const ref = useRef(null);
  const open3 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const iconhandler = (tutid) => {
    setId(tutid);
    setShow(tutid);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getData();
  }, []);
  function getData() {
    fetch("http://localhost:3001/users").then((result) => {
      result.json().then((response) => {
        setData(response);
      });
    });
  }
  const navigate = useNavigate();

  function redirectHandler(title, date, name, info, image) {
    navigate("/viewCard", { state: { title, date, name, info, image } });
  }

  function setUser(id) {
    let item = data[id - 1];
    setTitle(item.title);
    setDate(item.date);
    setName(item.name);
    setInfo(item.info);
    setOpen(true);
  }

  function updateData() {
    let item = { name, title, info, date };

    fetch(`http://localhost:3001/users/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((response) => {
        getData();
      });
    });
    setOpen(false);
  }

  function deleteUser(id) {
    fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((response) => {
        getData();
        handleClose();
      });
    });
  }

  return (
    <div className="main">
      <header>
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light navbar fixed-top navbar-light bg-light"
          id="nav1"
        >
          <div class="container-fluid">
            <div>
              <img src={img1}></img>
            </div>
            <div>
              <form class="form-inline">
                <input
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  placeholder="Search card"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button
                  class="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
            <div
              class="collapse navbar-collapse"
              id="navbarNavAltMarkup"
              style={{ flexGrow: "0" }}
            >
              <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
                <a class="nav-link" href="#">
                  Blog
                </a>
                <a class="nav-link" href="#">
                  Product
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="banner"></div>
      <div class="container">
        <br></br>
        <h1> Cards</h1>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="user-box">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Title</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <label>Date</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Name</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              />
              <label>Info</label>
            </div>
            <div className="dialog-btn">
              <Button variant="contained" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={updateData}>
                Update
              </Button>
            </div>
          </Box>
        </Modal>

        <Box className="box">
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .filter((val) => {
              if (val.name.toLowerCase().includes(search.toLowerCase())) {
                return val;
              }
            })
            .map((item) => {
              const { name, id, image, title, date, info } = item;
              return (
                <Box className="inner-class" key={id}>
                  <Card
                    className="card"
                    key={id}
                    sx={{ maxWidth: 345, padding: 1 }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          K
                        </Avatar>
                      }
                      action={
                        <div className="icn-btn">
                          <IconButton
                            aria-label="settings"
                            onClick={() => iconhandler(id)}
                            // onDoubleClick={() => setShow(false)}
                            onClick={() => setStatus(!status)}
                          >
                            {status ? (
                              <div className="pop-up">
                                <button
                                  onClick={() => setUser(id)}
                                  type="button"
                                  class="btn btn-light"
                                >
                                  <AiFillEdit className="iconStyle" />
                                  Edit
                                </button>
                                <button
                                  onClick={handleOpen1}
                                  type="button"
                                  class="btn btn-light"
                                >
                                  <AiTwotoneDelete className="iconStyle1"/>
                                  Delete
                                </button>
                              </div>
                            ) : null}
                            {/* <div className="menuOne">
                              <Menu
                                open={show}
                                anchorEl={ref.current}
                                onClose={() => setShow(false)}
                              >
                                <MenuItem onClick={() => setUser(id)}>
                                  <ListItemText primary="Edit" />
                                </MenuItem>
                                <MenuItem onClick={handleOpen1}>
                                  <ListItemText primary="delete" />
                                </MenuItem>
                              </Menu>
                            </div> */}
                            <MoreVertIcon />
                          </IconButton>
                          <StyledModal
                            aria-labelledby="unstyled-modal-title"
                            aria-describedby="unstyled-modal-description"
                            open={open1}
                            onClose={handleClose1}
                            BackdropComponent={Backdrop}
                          >
                            <Box sx={style1}>
                              <p id="unstyled-modal-description">
                                <h6>DELETE CARD</h6>
                                are You sure to delete this card
                              </p>
                              <br></br>

                              <div className="dialog-btn">
                                <Button
                                  variant="contained"
                                  onClick={handleClose}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="contained"
                                  onClick={() => deleteUser(item.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </Box>
                          </StyledModal>
                        </div>
                      }
                      title={name}
                      subheader={date}
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image={image}
                      alt={title}
                      onClick={() => redirectHandler(title, date, name, info)}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="info"
                      >
                        <p className="text">
                          industry. Lorem Ipsum has been the industry's standard
                          dummy text ever since the 1500s, when an unknown <span onClick={() => setHide(!hide)}>...</span>
                          {hide ? ( <span className="more-text">
                          printer took a galley of type and scrambled it to make
                          a type specimen book. It has survived not only five
                          centuries, but also the</span>):null
                              }
                        </p>
                      </Typography>
                    </CardContent>
                  </Card>
                  <br></br>
                </Box>
              );
            })}
        </Box>
      </div>
      <footer className="page-footer">
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </footer>
    </div>
  );
}
