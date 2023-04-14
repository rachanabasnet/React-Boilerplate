import { lazy } from 'react';
import * as paths from './paths';

const routes = {
    home: {
        path: paths.Home,
        component: lazy(() => import('../../pages/Home')),
    },

    login: {
        path: paths.Login,
        component: lazy(() => import('../../pages/Login')),
    }
}

export default routes;
