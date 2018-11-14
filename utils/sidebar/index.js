export default function SideBar () {
  return {
    USER: [
      { icon: 'apps', title: 'Home', to: '/', hasSubMenu: false },
      { icon: 'group', title: 'Team', to: '/team/', hasSubMenu: false },
      { icon: 'attach_file', title: 'Work Logs', to: '/work-log/', hasSubMenu: false },
      { icon: 'note_add', title: 'Log Work', to: '/log-your-work/', hasSubMenu: false },
      { icon: 'account_box', title: 'My Profile', to: '/profile/', hasSubMenu: false },
      // { icon: 'watch', title: 'Daily Schedule Log', to: '/schedule/', hasSubMenu: false },
      {
        icon: 'bug_report',
        title: 'Bug Report',
        hasSubMenu: true,
        subItems: [
          { title: 'Bug Board', to: '/bug-report/projects/' },
          { title: 'Reported By Me', to: '/bug-report/by-me/' }
          // { title: 'My Involvement', to: '/bug-report/my-involvement/' }
        ]
      },
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
      { icon: 'apps', title: 'Overview', to: '/admin/overview/', hasSubMenu: false },
      { icon: 'comment', title: 'Logs To Review', to: '/admin/review-logs/', hasSubMenu: false },
      { icon: 'done_all', title: 'Logs Reviewed By You', to: '/admin/reviewed-logs/', hasSubMenu: false },
      { icon: 'stars', title: 'Distribute Score', to: '/admin/distribute-score/', hasSubMenu: false }
    ]
  }
}
