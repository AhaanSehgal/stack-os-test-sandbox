import { AppStoreApp } from '@/redux/app-store/types';

export function filter(apps: AppStoreApp[], routerQuery: any) {
  let filteredApps = [...apps];

  if (routerQuery.query) {
    const pattern = new RegExp(routerQuery.query.toLowerCase(), 'g');
    filteredApps = filteredApps.filter((app) => app.title && pattern.test(app.title.toLowerCase()));
  }

  if (routerQuery.category) {
    filteredApps = filteredApps.filter((app) =>
      app.category && typeof routerQuery.category === 'object'
        ? routerQuery.category.includes(app.category)
        : app.category === routerQuery.category
    );
  }

  return filteredApps;
}

export function sort(apps: AppStoreApp[], order: string) {
  const newApps = apps.sort((a, b) => {
    if (a.title && b.title) {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
    }
    return 0;
  });

  if (order === '-name') return newApps;

  return newApps.reverse();
}

export function formatRouterQuery(routerQuery: any) {
  const options: any = [];
  Object.keys(routerQuery).forEach((key) => {
    if (typeof routerQuery[key] === 'object') {
      Object.keys(routerQuery[key]).forEach((childKey) => {
        if (routerQuery[key][childKey]) {
          options.push({
            id: options.length + 1,
            value: key,
            label: routerQuery[key][childKey],
            selected: true,
          });
        }
      });
      return;
    }

    if (routerQuery[key]) {
      options.push({
        id: options.length + 1,
        value: key,
        label: routerQuery[key],
        selected: true,
      });
    }
  });

  return options;
}
