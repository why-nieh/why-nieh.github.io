---
title: Java Web Service
date: 2018-09-02
categories: [IT, Java]
tags: [WebService]
description: Java WebService
keywords: java, WebService
cover: /images/cover/编程.jpeg
---

## 一、使用 JDK 自带方法
1. 创建服务提供类
    ```java
    // 服务提供类

    @WebService
    public class HelloService {
        public String sayHello(String name, Integer age){
            return "Name: " + name + "; Age: " + age + ". ";
        }
    }
    ```
1. 发布 Web Service
    ```java
    // 发布服务
    public static void main(String[] args) {
        Endpoint.publish("http://localhost:8888/hello", new HelloService());
    }
    ```
1. 使用 `wsimport` 命令获取 web service 的代码
    1. 执行
        > wsimport -s . -p n.ice.ws http://localhost:8888/hello?wsdl
    1. 生成的目录结构
       ```
       n
       └── ice
           └── ws
               ├── HelloWS.class
               ├── HelloWS.java
               ├── HelloWSService.class
               ├── HelloWSService.java
               ├── ObjectFactory.class
               ├── ObjectFactory.java
               ├── package-info.class
               ├── package-info.java
               ├── SayHello.class
               ├── SayHello.java
               ├── SayHelloResponse.class
               └── SayHelloResponse.java
       ```
    1. 删除无用的.class文件
    1. 注：
        + wsimport.exe 位于 JAVA_HOME\bin 目录下
        + -d<目录>  - 将生成.class文件，默认参数
        + -s<目录>  - 将生成.java文件
        + -p<生成的新包名> -将生成的类，放于指定的包下
    
    
1. 调用服务
    ```java
        public static void main(String[] args) {
            HelloWS helloWS = new HelloWSService().getHelloWSPort();
            String hello = helloWS.sayHello("NIce", 22);
            System.out.println(hello);
        }   
    ```
--- 


## 二、 使用 cxf
### 1、服务端
1. maven 依赖
    ```xml
    <dependencies>
       <dependency>
           <groupId>org.apache.cxf</groupId>
           <artifactId>cxf-rt-frontend-jaxws</artifactId>
           <version>3.2.6</version>
       </dependency>
       <dependency>
           <groupId>org.apache.cxf</groupId>
           <artifactId>cxf-rt-transports-http</artifactId>
           <version>3.2.6</version>
       </dependency>
       <dependency>
           <groupId>org.springframework</groupId>
           <artifactId>spring-web</artifactId>
           <version>4.3.18.RELEASE</version>
       </dependency>
    </dependencies>
    ```
1. 服务接口
    ```java
    package n.ice.ws;
    
    import javax.jws.WebService;
    
    @WebService
    public interface IHelloService {
        String sayHello(String name, Integer age);
    }
    ```
1. 接口实现类
    ```java
    package n.ice.ws;
    
    import javax.jws.WebService;
    
    @WebService
    public class HelloWS implements IHelloService{
    
        @Override
        public String sayHello(String name, Integer age) {
            return "Name: " + name + "; Age: " + age + ". ";
        }
    }
   ```
1. spring 配置文件 application.xml
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xmlns:jaxws="http://cxf.apache.org/jaxws"
           xsi:schemaLocation="
               http://www.springframework.org/schema/beans 
               http://www.springframework.org/schema/beans/spring-beans.xsd 
               http://cxf.apache.org/jaxws 
               http://cxf.apache.org/schemas/jaxws.xsd">
    
        <bean class="n.ice.ws.HelloWS"
              id="helloWS"/>
    
        <jaxws:server id="helloService" 
           serviceClass="n.ice.ws.IHelloService" 
           ddress="/hello">
            <jaxws:serviceBean>
                <ref bean="helloWS" />
            </jaxws:serviceBean>
        </jaxws:server>
    
    </beans>
    ```
1. web.xml 配置
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <web-app xmlns="http://java.sun.com/xml/ns/javaee"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="
               http://java.sun.com/xml/ns/javaee 
               http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd "
             version="2.5">
        <listener>
            <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
        </listener>
        <context-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:application.xml</param-value>
        </context-param>
        <servlet>
            <servlet-name>cxfServlet</servlet-name>
            <servlet-class>org.apache.cxf.transport.servlet.CXFServlet</servlet-class>
        </servlet>
        <servlet-mapping>
            <servlet-name>cxfServlet</servlet-name>
            <url-pattern>/ws/*</url-pattern>
        </servlet-mapping>
    </web-app>
    ```
1. 启动 web 项目
    + web context : ‘/’ 
    + port: 8080
    + wsdl: `http://localhost:8080/ws/hello`
    

### 2、客户端
1. maven 依赖
    ```xml
    <dependencies>
       <dependency>
           <groupId>org.apache.cxf</groupId>
           <artifactId>cxf-rt-frontend-jaxws</artifactId>
           <version>3.2.6</version>
       </dependency>
       <dependency>
           <groupId>org.apache.cxf</groupId>
           <artifactId>cxf-rt-transports-http</artifactId>
           <version>3.2.6</version>
       </dependency>
       <dependency>
           <groupId>org.springframework</groupId>
           <artifactId>spring-web</artifactId>
           <version>4.3.18.RELEASE</version>
       </dependency>
       <dependency>
           <groupId>org.springframework</groupId>
           <artifactId>spring-test</artifactId>
           <version>4.3.18.RELEASE</version>
           <scope>test</scope>
       </dependency>
       <dependency>
           <groupId>junit</groupId>
           <artifactId>junit</artifactId>
           <version>4.12</version>
           <scope>test</scope>
       </dependency>
    </dependencies>
    ```
1. 导入 `n.ice.ws.IHelloService` 接口类
1. spring配置文件 application.xml
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xmlns:jaxws="http://cxf.apache.org/jaxws"
           xsi:schemaLocation="
               http://www.springframework.org/schema/beans 
               http://www.springframework.org/schema/beans/spring-beans.xsd 
               http://cxf.apache.org/jaxws 
               http://cxf.apache.org/schemas/jaxws.xsd">
    
        <jaxws:client id="helloService"
                      serviceClass="n.ice.ws.IHelloService"
                      address="http://localhost:8080/ws/hello"/>
    
    </beans>
    ```
1. 测试类
    ```java
    package n.ice.ws;
    
    import org.junit.Test;
    import org.junit.runner.RunWith;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.test.context.ContextConfiguration;
    import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
    
    @ContextConfiguration("classpath:application.xml")
    @RunWith(SpringJUnit4ClassRunner.class)
    public class IHelloServiceTest {
        @Autowired
        private IHelloService helloService;
    
        @Test
        public void test(){
            String hello = helloService.sayHello("NIce", 22);
            System.out.println(hello);
        }
    }
    ```

1. 注
    > * 当使用cxf和wsimport命令并改变package时，保留service的注解。