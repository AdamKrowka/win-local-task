import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAddPostMutation } from "@/api/endpoints";

interface NewPostProps {
  userId: number;
}

export default function NewPost({ userId }: NewPostProps) {
  // TODO: ADD formik, validation;
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");

  const [addPost] = useAddPostMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setText("");
  };

  const onSubmit = () => {
    addPost({
      body: text,
      title,
      userId,
    });
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleClickOpen} color="inherit">
        Add Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              marginBottom: "2rem",
            }}
          />
          <TextField
            multiline
            fullWidth
            label="Text"
            rows={2}
            maxRows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Add New</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
