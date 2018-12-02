export default function sideBar (isAdmin) {
  const USER = [
    { title: 'Team', subheader: true },
    { icon: 'apps', title: 'Home', to: '/', hasSubMenu: false },
    { icon: 'group', title: 'Team', to: '/team/', hasSubMenu: false },
    { title: 'Work Logs', subheader: true },
    { icon: 'attach_file', title: 'Logs History', to: '/work-log/', hasSubMenu: false },
    { icon: 'note_add', title: 'Log Work', to: '/log-your-work/', hasSubMenu: false },
    { title: 'Daily Schedule', subheader: true },
    { icon: 'watch', title: 'Daily Schedule Log', to: '/schedule/log/', hasSubMenu: false },
    { icon: 'visibility', title: 'Monitor', to: '/schedule/monitor/', hasSubMenu: false },
    { title: 'Bug Reports', subheader: true },
    {
      icon: 'bug_report',
      title: 'Bug Report',
      hasSubMenu: true,
      subItems: [
        { title: 'Bug Board', to: '/bug-report/projects/' },
        { title: 'Reported By Me', to: '/bug-report/by-me/' }
      ]
    },
    { title: 'Settings', subheader: true },
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
  ]
  const ADMIN = [
    { title: 'Log Reviewer', subheader: true },
    { icon: 'comment', title: 'Logs To Review', to: '/admin/review-logs/', hasSubMenu: false },
    { icon: 'done_all', title: 'Logs Reviewed By You', to: '/admin/reviewed-logs/', hasSubMenu: false }
  ]
  if (isAdmin) {
    return USER.concat(ADMIN)
  }
  return USER
}
