---
layout: post
title: MyBatis Generator
categories: [IT, Java]
description: Use MyBatis Generator
keywords: Java, MyBatis
tags: [Java, MyBatis]
---

## MyBatis Generator Config

mybatis-generator.xml  
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    
    <classPathEntry location="./mysql-connector-java-5.1.47.jar" />
    
    <context id="mysql" targetRuntime="MyBatis3">
        <plugin type="org.mybatis.generator.plugins.SerializablePlugin"/>

        <commentGenerator>
            <property name="suppressDate" value="true"/>
            <property name="suppressAllComments" value="true" />
        </commentGenerator>

        <jdbcConnection driverClass="com.mysql.jdbc.Driver"
                        connectionURL="jdbc:mysql:///test?useSSL=false"
                        userId="root" password="1234">
        </jdbcConnection>

        <javaTypeResolver>
            <property name="forceBigDecimals" value="true"/>
        </javaTypeResolver>

        <javaModelGenerator targetPackage="nieh.model" targetProject="./src/main/java">
            <property name="enableSubPackages" value="false"/>
            <property name="trimStrings" value="true"/>
        </javaModelGenerator>

        <sqlMapGenerator targetPackage="sql-mappers" targetProject="./src/main/resources">
            <property name="enableSubPackages" value="false"/>
        </sqlMapGenerator>

        <javaClientGenerator type="XMLMAPPER" targetPackage="nieh.dao" targetProject="./src/main/java">
            <property name="enableSubPackages" value="false"/>
        </javaClientGenerator>

        <table schema="test" tableName="t_user" domainObjectName="User"
               enableCountByExample="false" enableDeleteByExample="false"
               enableSelectByExample="false" enableUpdateByExample="false">
            <!--<property name="useActualColumnNames" value="true"/>-->
            <!--<generatedKey column="id" sqlStatement="mysql" identity="true"/>-->
            <!--<columnOverride column="DATE_FIELD" property="startDate" />-->
            <!--<ignoreColumn column="FRED" />-->
            <!--<columnOverride column="LONG_VARCHAR_FIELD" jdbcType="VARCHAR" />-->
        </table>
    </context>
</generatorConfiguration>
```

## MyBatis Generator

```bash
java -jar mybatis-generator-core-1.3.7.jar -configfile mybatis-generator.xml -overwrite
```
## MyBatis Generator Maven Plugin

```xml
<plugin>
    <groupId>org.mybatis.generator</groupId>
    <artifactId>mybatis-generator-maven-plugin</artifactId>
    <version>1.3.7</version>
    <configuration>
        <configurationFile>src/main/resources/mybatis-generator.xml</configurationFile>
    </configuration>
    <dependencies>
        <dependency>
            <groupId>org.mybatis.generator</groupId>
            <artifactId>mybatis-generator-core</artifactId>
            <version>1.3.7</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
        </dependency>
    </dependencies>
</plugin>
```

```bash
mvn mybatis-generator:generate
```
