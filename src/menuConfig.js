// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: 'feedback',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message'
  },
  {
    name: 'help',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu'
  }
];

const asideMenuConfig = [

  {
    name: 'exception',
    path: '/exception',
    icon: 'gaojingxinxi',
    children: [
      {
        name: '204',
        path: '/exception/204'
      },
      {
        name: '403',
        path: '/exception/403'
      },
      {
        name: '404',
        path: '/exception/404'
      },
      {
        name: '500',
        path: '/exception/500'
      }
    ]
  },
  {
    name: '风险控制',
    path: '/riskManagement',
    icon: 'shezhi',
    children: [
      { name: '销售对手库管理', path: '/riskManagement/salesRepository' },
      { name: '信用风险管理', path: '/riskManagement/creditRisk' },
      { name: '反洗钱管理', path: '/riskManagement/antiMoney' },
      { name: '关联机构名单', path: '/riskManagement/relevance' }
    ]
  }
];

export { headerMenuConfig, asideMenuConfig };
