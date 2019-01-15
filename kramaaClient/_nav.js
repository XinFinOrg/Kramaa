export default {
  items: [
    {
      name: 'Home',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Projects',
      icon: 'icon-drop',
      children: [
        {
          name: 'Create Project',
          url: '/dashboard',
          icon: 'icon-puzzle',
        },
        {
          name: 'View Projects',
          url: '/projects',
          icon: 'icon-puzzle',
        }
      ]
    },
    {
      name: 'Devices',
      url: '/profile',
      icon: 'icon-pencil',
    },
    {
      name: 'Things',
      url: '/invitation',
      icon: 'icon-pencil',
    },
    {
      name: 'Analytics',
      url: '/theme/typography',
      icon: 'icon-pencil',
    },
    {
      name: 'Explorer',
      url: '/theme/typography',
      icon: 'icon-pencil',
    },
    {
      name: 'Store',
      url: '/theme/typography',
      icon: 'icon-pencil',
    },
    {
      name: 'APIs',
      url: '/theme/typography',
      icon: 'icon-pencil',
    },
    {
      name: 'Settings',
      url: '/theme/typography',
      icon: 'icon-pencil',
    },
    {
      name: 'Plans',
      url: '/theme/typography',
      icon: 'icon-pencil',
    },
    {
      name: 'Support',
      url: '/theme/typography',
      icon: 'icon-pencil',
    }
  ]
};
