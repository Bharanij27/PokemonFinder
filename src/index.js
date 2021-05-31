import './components/header';
import './components/topPokemon';
import './components/not-found';
import './components/pokemon-info';
import './components/pokemon-card'
import './components/search'
import { Router } from '@vaadin/router';

const outlet = document.querySelector('outlet');
const router = new Router(outlet);

router.setRoutes([
  {path: '/', component: 'top-pokemon'},
  {path: '/pokemon/:name', component: 'pokemon-info'},
  {path: '/search', component: 'search-pokemon'},
  {path: '(.*)', component: 'not-found'}
]);