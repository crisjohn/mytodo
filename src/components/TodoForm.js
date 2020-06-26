import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import propTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { AppContext } from "../App";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Form(props) {
  const classes = useStyles();

  const [category, setCategory] = React.useState("");
  const title = React.useRef("");
  const description = React.useRef("");

  const appContext = React.useContext(AppContext);
  const { state } = appContext.category;

  React.useEffect(() => {
    if (props.todo) {
      title.current = props.todo.title;
      description.current = props.todo.description;
      setCategory(props.todo.category);
    }
  }, [props.todo]);

  const handleChange = ({ target }) => {
    if (target.name === "category") {
      setCategory(target.value);
    } else if (target.name === "title") {
      title.current = target.value;
    } else if (target.name === "description") {
      description.current = target.value;
    }
  };

  const renderCategories = () => {
    return state.categories.map((i, idx) => (
      <MenuItem key={idx} value={i._id}>
        {i.name}
      </MenuItem>
    ));
  };

  const renderSelect = (
    <FormControl className={classes.formControl} fullWidth>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={category}
        name="category"
        defaultValue={category}
        onChange={handleChange}
      >
        {renderCategories()}
      </Select>
    </FormControl>
  );

  const renderTextField = (id) => {
    return (
      <TextField
        autoFocus
        margin="dense"
        id={id}
        label={id}
        type="text"
        fullWidth
        name={id.toLowerCase()}
        onChange={handleChange}
        defaultValue={props.todo ? props.todo[id.toLowerCase()] : ""}
      />
    );
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Details</DialogTitle>
        <DialogContent>
          {renderSelect}
          {renderTextField("Title")}
          {renderTextField("Description")}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.onSubmit({
                _id: props.todo ? props.todo._id : Math.random(),
                date: new Date(),
                category: category,
                title: title.current,
                description: description.current,
                user: props.todo ? props.todo.user : "user_id",
              });
              props.onClose();
            }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Form.prototype = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
};

export default Form;
