
import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as ABCJS from 'abcjs';

function ActionButton(props) {

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Say Hello
    </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Hello Message"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hello {props.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
      </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


class Notation extends Component {
  constructor(props){
    super(props);
    this.notationRef = React.createRef();

    navigator.requestMIDIAccess().then(
      (access) => {
        console.log("here it is " + JSON.stringify(access));
      }
    );
  }

  shouldComponentUpdate(nextProps, _nextState) {
    return nextProps.score != this.props.score;
  }

  render() {
    return (
      <span style = {{display : 'inline-block'}} ref = {this.notationRef}/>
    );
  }
  componentDidMount() {
    ABCJS.renderAbc(this.notationRef.current, this.props.score, {staffwidth : 10000, paddingright : 0, paddingleft: 0});
  }
  componentDidUpdate() {
    ABCJS.renderAbc(this.notationRef.current, this.props.score, {staffwidth : 10000, paddingright : 0, paddingleft: 0});
  }
}

function App() {
  const [offset, setOffset] = React.useState(0);
  const [score, setScore] = React.useState(':|      A');
  React.useEffect(() => {
    console.log('called2' + offset)

    let timeout = setTimeout(() => {
      setScore((score => {
        return score + 'A';
      }))
      setOffset((offset => {
        return offset - 15;
      }))
    }, 1000)
    return () => {clearTimeout(timeout)}
  });

  return (
    <div>
      <div style = {{position : "relative", whiteSpace: 'nowrap', overflow: 'hidden', marginLeft : offset + "px", transition : 'margin-left 1s linear'}}>
        <Notation score = {score}/>
      </div>
      <div style = {{marginTop : "-120px"}}>
        <span style = {{position : "relative", zIndex : 3}}>
          <Notation score = ":|"/>
        </span>
        <div style = {{position : "relative", width : "153px", height : "120px", marginTop : "-120px", marginLeft : "-100px", backgroundColor : "white", zIndex : 2}}></div>
      </div>
      
      <Grid container spacing={1} direction="column">
        <Grid item xs={4}>
          <TextField id="standard-basic" label="Your Name" onChange={(e) => setName(e.target.value)} />
        </Grid>
        <Grid item xs={4}>
          <ActionButton name={name} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;