import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import { About, Board } from './index';
//import { Route } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Bit Team 3
      </Link>{' '}
      {new Date().getFullYear()}
      {'. Built with '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'center',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

export default function Main(props) {
  const classes = useStyles();

  function setJoinButton() {
    const checkInfo = props.state.signin;

    if (checkInfo.email === '' && checkInfo.pw === ''){
      return <Button
              variant="outlined"
              size="small"
              onClick={() => {
                props.history.replace('/join');
              }}>
              회원가입
            </Button>
    } else {
      return null;
    }
  }

  function setLoginButton() {
    const checkInfo = props.state.signin;

    if (checkInfo.email === '' && checkInfo.pw === ''){
      return <Button
              variant="outlined"
              size="small"
              onClick={() => {
                props.history.replace('/login');
              }}>
                로그인
              </Button>
    } else {
      return null;
    }
  }

  function setLogoutButton() {
    const checkInfo = props.state.signin;

    if (checkInfo.email !== '' && checkInfo.pw !== ''){
      return <Button
              variant="outlined"
              size="small"
              onClick={() => {
                props.handleLogout();
              }}>
                로그아웃
              </Button>
    } else {
      return null;
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>

          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="left"
            noWrap
            className={classes.toolbarTitle}
          /* onClick={() => { 버튼아니라서 onClick이 안됨
            props.history.replace('/');
          }} */
          >
            Bit Team 3
          </Typography>
          {setLoginButton()}
          {setLogoutButton()}
          &nbsp;
          {setJoinButton()} 
        </Toolbar>
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>

          <Link
            color="inherit"
            noWrap
            variant="body2"
            onClick={() => {
              props.changeAbout();
            }}
            className={classes.toolbarLink}
          >
            About
          </Link>
          <Link
            color="inherit"
            noWrap
            variant="body2"
            onClick={() => {
              props.changeBoard();
            }}

            className={classes.toolbarLink}
          >
            Board
          </Link>
        </Toolbar>

        <main>
          {(props.site === 'about') ? <About /> : <Board list={props.state.arr} />}
        </main>

      </Container>
      {/* Footer */}
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Copyright />
        </Container>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}