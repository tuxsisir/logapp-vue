export default function SideBar () {
  return {
    USER: [
      { icon: 'apps', title: 'Home', to: '/', hasSubMenu: false },
      { icon: 'group', title: 'Team', to: '/team/', hasSubMenu: false },
      { icon: 'attach_file', title: 'Work Logs', to: '/work-log/', hasSubMenu: false },
      { icon: 'note_add', title: 'Log Work', to: '/log-your-work/', hasSubMenu: false },
      { icon: 'account_box', title: 'My Profile', to: '/profile/', hasSubMenu: false },
      {
        icon: 'settings',
        title: 'Settings',
        hasSubMenu: true,
        subItems: [
          { icon: 'attachment', title: 'Work Log', to: '/settings/worklog/' },
          { icon: 'vpn_key', title: 'Change Password', to: '/settings/change-password/' },
          { icon: 'stars', title: 'Score', to: '/settings/score/' }
        ]
      },
      {
        icon: 'info',
        title: 'About',
        hasSubMenu: true,
        subItems: [
          { icon: 'code', title: 'Change Log', to: '/about/change-log/' },
          { icon: 'info', title: 'About core.aayulogic', to: '/about/aayulogic/' }
        ]
      }
    ],
    ADMIN: [
      { icon: 'apps', title: 'Admin View A', to: '/admin/admin-page/', hasSubMenu: false },
      { icon: 'apps', title: 'Admin View B', to: '/admin/admin-page/', hasSubMenu: false },
      { icon: 'apps', title: 'Admin View C', to: '/admin/admin-page/', hasSubMenu: false },
      { icon: 'apps', title: 'Admin View D', to: '/admin/admin-page/', hasSubMenu: false }
    ]
  }
}
