// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [

];

const asideMenuConfig = [
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
