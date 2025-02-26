import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { DetailasComponent } from './pages/detailas/detailas.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { homeLoggedGuard } from './core/guards/home-logged/home-logged.guard';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: '', component: AuthLayoutComponent ,
    children: [
      { 
        path: 'login', 
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        title: 'Login',
        canActivate: [homeLoggedGuard],  // Only allow if not logged in
      },
      { 
        path: 'register', 
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
        title: 'Register',
        canActivate: [homeLoggedGuard],  // Only allow if not logged in
      },
      { 
        path: 'forget-password', 
        loadComponent: () => import('./pages/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
        title: 'forget-password',
        canActivate: [homeLoggedGuard],  // Only allow if not logged in
      },
    ]
  },

  { path: '', component: BlankLayoutComponent, children: [
    { 
      path: 'home', 
      loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
      title: 'Home',
    },
    { 
      path: 'cart', 
      loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
      title: 'Cart',
      canActivate: [authGuard],  // Require login for cart
    },
    { 
      path: 'products', 
      loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
      title: 'Products',
      canActivate: [authGuard],  // Require login for products
    },
    { 
      path: 'categories', 
      loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent),
      title: 'categories',
      canActivate: [authGuard],  // Require login for products
    },
    { 
      path: 'brands', 
      loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent),
      title: 'brands',
      canActivate: [authGuard],  // Require login for products
    },
    {
    path: 'checkout/:id', 
    loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
    title: 'checkout',
    canActivate: [authGuard]  // Require login for products
    
  
  },
    {
    path: 'allorders', 
    loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent),
    title: 'allorders',
    canActivate: [authGuard],  // Require login for products
    },
    {
      path: 'wishlist', 
      loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent),
      title: 'wishlist',
      canActivate: [authGuard],  // Require login for products
      },
    { 
      path: 'detailas/:id', 
      loadComponent: () => import('./pages/detailas/detailas.component').then(m => m.DetailasComponent),
      title: 'detailas',
      canActivate: [authGuard]  // Require login for products
    },
    { 
      path: '**', 
      loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent),
      title: '404 Not Found'
    }
  ]}
];
