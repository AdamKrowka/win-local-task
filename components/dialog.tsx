import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";

export interface AlertDialogProps {
  buttonContent: React.ReactNode;
  title: string;
  contentText: string;
  onAccept: () => void;
  acceptText?: string;
  cancelText?: string;
}

export default function AlertDialog({
  buttonContent,
  contentText,
  onAccept,
  title,
  acceptText,
  cancelText,
}: AlertDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    setOpen(false);
    onAccept();
  };

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleClickOpen}
      >
        {buttonContent}
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{cancelText || "Cancel"}</Button>
          <Button onClick={handleAccept} autoFocus>
            {acceptText || "Accept"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
