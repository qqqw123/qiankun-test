   export const Microconfig = [
    //name: 微应用的名称,
    //entry: 微应用的入口,
    //container: 微应用的容器节点的选择器或者 Element 实例,
    //activeRule: 激活微应用的规则(可以匹配到微应用的路由),
    //loader: 加载微应用的状态 true | false
    {
      name: "app1",
      entry: "http://localhost:8081",
      container: "#frame",
      activeRule: "/app1",
    },
    {
      name: "app2",
      entry: "http://localhost:8082",
      container: "#frame",
      activeRule: "/app2",
    },
  ];
  