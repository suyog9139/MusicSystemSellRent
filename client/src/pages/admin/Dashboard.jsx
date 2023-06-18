import * as React from 'react';
import {Routes,Route,useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Home from '@mui/icons-material/Home';
import Person3Icon from '@mui/icons-material/Person3';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddProduct from './AddProduct';
import DeleteProduct from './DeleteProduct';
import UpdateProduct from './UpdateProduct';
import Orders from './Orders';
import Users from './Users';
import Dashboard from './Home';

const drawerWidth = 240;
function Navigation() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <List>
        <ListItem disablePadding onClick={() => handleNavigation('/')}>
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => handleNavigation('/AddProduct')}>
          <ListItemButton>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText>Add Product</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => handleNavigation('/UpdateProduct')}>
          <ListItemButton>
            <ListItemIcon>
              <UpgradeIcon />
            </ListItemIcon>
            <ListItemText>Update Product</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => handleNavigation('/DeleteProduct')}>
          <ListItemButton>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>Delete Product</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => handleNavigation('/Orders')}>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText>Orders</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => handleNavigation('/Customers')}>
          <ListItemButton>
            <ListItemIcon>
              <Person3Icon />
            </ListItemIcon>
            <ListItemText>Customers</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}

Navigation.propTypes = {
  navigate: PropTypes.func,
};

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Navigation />
    </div>
  );

  const container = window !== undefined ? () => window().document.body :undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            VM Music
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
            <Route exact path='/' element={<Home/>}></Route>
            <Route  path='/AddProduct' element={<AddProduct/>}></Route>
            <Route  path='/DeleteProduct' element={<DeleteProduct/>}></Route>
            <Route  path='/UpdateProduct' element={<UpdateProduct/>}></Route>
            <Route  path='/Orders' element={<Orders/>}></Route>
            <Route  path='/Users' element={<Users/>}></Route>
        </Routes>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;