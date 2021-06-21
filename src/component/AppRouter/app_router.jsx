//! отключено
import {Route, Switch, Redirect} from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../AppRouter/routes';
import { useContext } from 'react';
import { Context } from '../..';
import {useAuthState} from 'react-firebase-hooks/auth';

const AppRouter = () => {
   const {auth} = useContext(Context);
   const [user] = useAuthState(auth);

   return user ?
      <Switch> {/* групирует маршруты(роуты) и если не один из роутов не выполнился, будет выполняться последний роут в этом свиче */}
         { privateRoutes.map(({path, Component}, index) => <Route path={path} key={index} component={Component} exact={true}/>) } {/* exact для того что б компонент отрисовывался в точности по этому пути */}
         <Redirect to={"/main"}/> последний роут, если кто-то попытаеться перейти по не существующему маршруту, его автоматически перебросит на чат
      </Switch>
      :
      <Switch>
         { publicRoutes.map(({path, Component}, index) => <Route path={path} key={index} component={Component} exact={true}/>) }
         <Redirect to={"/login"}/>
      </Switch>
}

export default AppRouter;