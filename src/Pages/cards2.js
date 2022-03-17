import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Modal from "@mui/material/Modal";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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

export default function Cards2() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [APIData, setAPIData] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [show, setShow] = useState(-1);
  const [id1, setId] = useState("");
  const ref = useRef(null);
  
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const iconhandler = (tutid) => {
    setId(tutid);
    setShow(tutid);
  };
  useEffect(() => {
    getData();
  }, []);
  function getData() {
    fetch("http://localhost:3001/users").then((result) => {
      result.json().then((res) => {
        setAPIData(res);
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

  function deleteUser(id) {
    console.log("ddddddddddddddddddddddddd", id);
    fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((response) => {
        getData();
      });
    });
  }

  function updateData(id) {
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
                    // setSearch(e.target.value);
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
          style={{ background: "white", color: "black" }}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="user-box">
              <input type="text" value={title} />
              <label>Title</label>
            </div>
            <div className="user-box">
              <input type="text" value={date} />
              <label>Date</label>
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

        <Box className="box" style={{ border: "1px solid red" }}>
          {APIData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .filter((val) => {
              if (val.name.toLowerCase().includes(search.toLowerCase())) {
                return val;
              }
            })
            .map((item) => {
              const { name, id, image, title, date, info } = item;
              return (
                <Box
                  className="inner-class"
                  style={{ border: "1px solid green" }}
                >
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
                        <IconButton
                          // key={id}
                          aria-label="settings"
                          // onClick={() => setShow(true)}
                          onClick={() => iconhandler(id)}
                          onDoubleClick={() => setShow(false)}
                        >
                          <Menu
                            className="menuClass"
                            open={show === id}
                            anchorEl={ref.current}
                            onClose={() => setShow(-1)}
                            PaperProps={{
                              sx: { width: 80, maxWidth: "100%" },
                            }}
                          >
                            <MenuItem
                              component={RouterLink}
                              onClick={() => setUser(id)}
                              to="#"
                              sx={{ color: "text.secondary" }}
                            >
                              <ListItemText
                                primary="Edit"
                                primaryTypographyProps={{ variant: "body2" }}
                              />
                            </MenuItem>
                            <MenuItem
                              component={RouterLink}
                              onClick={() => deleteUser(id)}
                              to="#"
                              sx={{ color: "text.secondary" }}
                            >
                              <ListItemText
                                primary="delete"
                                primaryTypographyProps={{ variant: "body2" }}
                              />
                            </MenuItem>
                          </Menu>

                          <MoreVertIcon />
                        </IconButton>
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
                      <Typography variant="body2" color="text.secondary">
                        {info}
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
          // count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </footer>
    </div>
  );
}
