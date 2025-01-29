import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignComponent } from './pages/sign/sign.component';
import { LayoutAdminPageComponent } from './admin/pages/layout-admin-page/layout-admin-page.component';
import { ActorListComponent } from './user/components/actor-list/actor-list.component';
import { MovieListComponent } from './user/components/movie-list/movie-list.component';
import { MovieComponent } from './shared/components/movie/movie.component';
import { ActorComponent } from './shared/components/actor/actor.component';
import { ByMovieComponent } from './admin/pages/by-movie/by-movie.component';
import { ByActorComponent } from './admin/pages/by-actor/by-actor.component';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signin',
    component: SignComponent
  },
  {
    path: 'admin',
    component: LayoutAdminPageComponent,
    children: [
      {
        path: 'by-movie',
        component: ByMovieComponent
      },
      {
        path: 'by-actor',
        component: ByActorComponent
      },
      {
        path: 'add-movie',
        component: MovieComponent
      },
      {
        path: 'add-actor',
        component: ActorComponent
      },
      {
        path: 'movie/:id',
        component: MovieComponent
      },
      {
        path: 'actor/:id',
        component: ActorComponent
      },
      {
        path: '**',
        redirectTo: 'by-movie'
      }
    ]
  },
  {
    path: 'user',
    component: LayoutAdminPageComponent,
    children: [
      {
        path: 'actorlist',
        component: ActorListComponent
      },
      {
        path: 'movielist',
        component: MovieListComponent
      },
      {
        path: 'movie/:id',
        component: MovieComponent
      },
      {
        path: 'actor/:id',
        component: ActorComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];
