// 菜单的内容，我们可以从 routes 中通过数据进行过滤来获取，通过 routes 的路由数据和接口获取的 store 中的 permissions 信息，可以过滤出用户拥有权限的路由，以及拥有权限的路由那些事菜单路由。
// 获取到菜单路由后，通过模版的条件循环就可以展示在页面中了。
// 封装过滤路由的方法
export function formatRoutes(routes, permissions) {
  return filterNavRoutes(filterPermissionRoutes(routes, permissions));
}

export function filterPermissionRoutes(routes, permissions) {
  const filterRoutes = [];
  routes.forEach((data) => {
    const route = { ...data };
    const notPermission = !route.meta || !route.meta.permission;
    const hasPermission =
      !notPermission && route.meta.permission.split(',').some((item) => permissions.includes(item));
    const passPermission = notPermission || hasPermission;
    let hasPath = true;
    if (route.children) {
      route.children = filterPermissionRoutes(data.children, permissions);
      if (route.children.length === 0) {
        hasPath = false;
      }
    }
    if (passPermission && hasPath) {
      filterRoutes.push(route);
    }
  });
  return filterRoutes;
}

export function filterNavRoutes(routes) {
  let result = [];
  routes.forEach((data) => {
    if (data.meta && data.meta.nav) {
      let item = {
        name: data.name,
        meta: data.meta
      };
      if (data.children) {
        item.children = filterNavRoutes(data.children);
      }
      result.push(item);
    } else if (data.children) {
      filterNavRoutes(data.children).forEach((item) => {
        result.push(item);
      });
    }
  });
  return result;
}
