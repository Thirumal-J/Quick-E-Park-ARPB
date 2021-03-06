import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  // ExitToAppIcon as ExitToAppIcon
} from 'react-feather';
import NavItem from './NavItem';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon  from '@material-ui/icons/ExitToApp';
import EuroSharpIcon from '@material-ui/icons/EuroSharp';
import ScannerIcon from '@material-ui/icons/Scanner';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import LocalParkingOutlinedIcon from '@material-ui/icons/LocalParkingOutlined';

let localData= {};
const getLocalData = (localDataKey) => {
  if (localStorage.getItem(localDataKey) != null){
    return JSON.parse(localStorage.getItem(localDataKey));
  }
};
const setLocalData = (localDataKey,localDataValue) => {
    localStorage.setItem(localDataKey, JSON.stringify(localDataValue));
    localData = JSON.parse(localStorage.getItem(localDataKey));
};

const user = {
  icon: AccountCircleRoundedIcon,
  // jobTitle: 'Senior Developer',
  name: '',
  empId:''
};

const items = [
  {
    href: '/app/internal/home',
    icon: HomeIcon,
    title: 'Home'
  },
  {
    href: '/app/internal/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/internal/scan&check',
    icon: ScannerIcon,
    title: 'Scan and Check'
  },
  {
    href: '/app/internal/upload&check',
    icon: CloudUploadIcon,
    title: 'Upload and Check'
  },
  {
    href: '/app/internal/fines',
    icon: EuroSharpIcon,
    title: 'Fines'
  },
  {
    href: '/app/internal/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: '/app/internal/',
    icon: ExitToAppIcon,
    title: 'Logout'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  localData = getLocalData("loginData");
  user.name = localData.firstName;
  // user.name = "Rahane";
  // user.empId = localData.empId;
  user.empId = 123456;
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.icon}
          to="/app/internal/account"
        />
        <Typography
          className={classes.name}
          color="primary"
          variant="h2"
        >
          {user.name}
        </Typography>
        <Typography
          color="primary"
          variant="body2"
        >
          Checker ID {user.empId}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      <Box
        p={2}
        m={2}
        bgcolor="background.dark"
      >
        {/* <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          Need more?
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          Upgrade to PRO version and access 20 more screens
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          <Button
            color="primary"
            component="a"
            href="https://react-material-kit.devias.io"
            variant="contained"
          >
            See PRO version
          </Button>
        </Box> */}
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
