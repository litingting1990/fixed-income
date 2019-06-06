// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import React from 'react';
import { getRouterData } from './utils/utils';
import { asideMenuConfig } from './menuConfig';

const Record = React.lazy(() => import('./pages/riskManagement/SalesRepository/components/Record'));


const AntiMoney = React.lazy(() => import('./pages/riskManagement/AntiMoney'));
const CreditRisk = React.lazy(() => import('./pages/riskManagement/CreditRisk'));
const Relevance = React.lazy(() => import('./pages/riskManagement/Relevance'));
const SalesRepository = React.lazy(() => import('./pages/riskManagement/SalesRepository'));

const UserLogin = React.lazy(() => import('./pages/UserLogin'));
const UserRegister = React.lazy(() => import('./pages/UserRegister'));

const Empty = React.lazy(() => import('./pages/Exception/Empty'));
const Forbidden = React.lazy(() => import('./pages/Exception/Forbidden'));
const NotFound = React.lazy(() => import('./pages/Exception/NotFound'));
const ServerError = React.lazy(() => import('./pages/Exception/ServerError'));

const routerConfig = [


  {
    path: '/exception/500',
    component: ServerError
  },
  {
    path: '/exception/403',
    component: Forbidden
  },
  {
    path: '/exception/204',
    component: Empty
  },
  {
    path: '/exception/404',
    component: NotFound
  },

  {
    path: '/user/register',
    component: UserRegister
  },
  {
    path: '/user/login',
    component: UserLogin
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
  },
  {
    path: '/riskManagement/salesRepository-record',
    component: Record
  }
];

const routerData = getRouterData(routerConfig, asideMenuConfig);

export { routerData };
