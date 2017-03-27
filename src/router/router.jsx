//noinspection JSUnresolvedVariable
import { Router, Route, hashHistory, Redirect } from 'react-router';

//引入组件
import Homepage from '../components/Homepage/homepage.jsx';
import Recommond from '../components/Recommond/recommond.jsx';
import Service from '../components/Service/service.jsx';
import Beauty from '../components/Service/beauty.jsx';
import Treatment from '../components/Service/treatment.jsx';
import Care from '../components/Service/care.jsx';
import MyInfo from '../components/MyInfo/myInfo.jsx';

//路由分配
const RouterConfig = (
    <Router history={ hashHistory }>
        <Redirect from="/" to="/recommond" />
        <Route path="/" component={ Homepage }>
            <Route path="/recommond" component={ Recommond }/>
            <Route path="/service" component={ Service } />
            <Route path="/service_beauty" component={Beauty} />
            <Route path="/service_treatment" component={Treatment} />
            <Route path="/service_care" component={Care} />
            <Route path="/my_info" component={ MyInfo }/>
        </Route>
    </Router>
);

export default RouterConfig;
