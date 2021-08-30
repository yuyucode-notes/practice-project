# Nest 

```
│─┌├┬┼└┴┘│─┌├┬

服务层

├── config                                                    配置
├── prisma                                                    数据层
├── dist                                                      运行生成目录
├── src                                                       入口目录
    ├──  app.controller.ts                                    控制器
    ├──  app.module.ts                                        模块
    ├──  app.service.ts                                       提供者
    ├──  http-exception.filter.ts                             异常过滤器
    ├──  logger.middleware.ts                                 日志中间件
    ├──  validate.pipe.ts                                     验证管道
    ├──  auth.guard.ts                                        授权守卫
    ├──  roles.decorator.ts                                   角色守卫反射器
    ├──  roles.guard.ts                                       角色守卫
    ├──  logging.interceptor.ts                               拦截器
    ├──  main.ts                                              入口文件
    ├──  parse-int.pipe.ts                                    转换管道（在验证管道之前转换）
├── test                                                      测试目录
```
