// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import AntiMoney from './pages/riskManagement/AntiMoney';
import CreditRisk from './pages/riskManagement/CreditRisk';
import Relevance from './pages/riskManagement/Relevance';
import SalesRepository from './pages/riskManagement/SalesRepository';


const routerConfig = [
  {
    path: '/user/login',
    component: UserLogin
  },
  {
    path: '/user/register',
    component: UserRegister
  },
  {
    path: '/riskManagement/antiMoney',
    component: AntiMoney
  },
  {
    path: '/riskManagement/creditRisk',
    component: CreditRisk
  },
  {
    path: '/riskManagement/relevance',
    component: Relevance
  },
  {
    path: '/riskManagement/salesRepository',
    component: SalesRepository
  }
];

export default routerConfig;
