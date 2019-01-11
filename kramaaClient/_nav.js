export default {
  items: [
    {
      name: 'Kramaa',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Home',
      url: '/theme/typography',
      icon: 'icon-pencil',
    },
    {
      name: 'Projects',
      url: '/theme/colors',
      icon: 'icon-drop',
      children: [
        {
          name: 'Create Project',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'View Project',
          url: '/base/cards',
          icon: 'icon-puzzle',
        }
      ]
    },
    {
      name: 'Devices',
      url: '/theme/typography',
      icon: 'icon-pencil',
    },
    {
      name: 'Things',
      url: '/theme/typography',
      icon: 'icon-pencil',
    },
    {
      name: 'Analytics',
      url: '/theme/typography',
      icon: 'icon-pencil',
    },
    {
      name: 'Settings',
      url: '/theme/typography',
      icon: 'icon-pencil',
    }
  ]
};
