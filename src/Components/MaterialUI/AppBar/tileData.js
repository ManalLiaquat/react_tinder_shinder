// This file is shared across the demos.

import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/DashboardRounded";
import FaceIcon from "@material-ui/icons/FaceRounded";

import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import MailIcon from "@material-ui/icons/Mail";
import DeleteIcon from "@material-ui/icons/Delete";
import ReportIcon from "@material-ui/icons/Report";

export const mailFolderListItems = (
  <div color="default">
    <Link to="/profile">
      <ListItem button>
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </Link>
    <Link to="/dashboard">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Send mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="All mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Spam" />
    </ListItem>
  </div>
);
