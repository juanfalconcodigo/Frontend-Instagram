import { Home } from '../pages/Home';
import User from '../pages/User'
import { Error404 } from '../pages/Error404'
import LayoutBasic from '../layouts/LayoutBasic';

const routes = [{
        path: '/',
        component: Home,
        exact: true,
        layout: LayoutBasic
    },
    {
        path: '/:username',
        component: User,
        exact: true,
        layout: LayoutBasic
    },
    {
        component: Error404,
        layout: LayoutBasic
    }
]

export default routes;