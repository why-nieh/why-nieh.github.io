---
title: Docker Run MySQL
date: 2018-10-05
categories: [IT, Linux]
tags: [MySQL, Docker]
description: Use MySQL in Docker
keywords: Docker, MySQL
---

# Use MySQL in Docker

## 1. Pull MySQL 5.7

```bash
    docker pull mysql:5.7
```

## 2. Mkdir 

```bash
    mkdir -p /docker/mysql/5.7/config/ /docker/mysql/5.7/data
```

## 3. Create MySQL Config File

```
    vim /docker/mysql/5.7/config/my.cnf
```

```
    [mysql]
    default-character-set=utf8 
    [mysqld]
    port = 3306 
    datadir=/mysql/data/
    max_connections=20
    character-set-server=utf8
    default-storage-engine=INNODB
```

## 4. Run MySQL 5.7
```bash
    docker run -d -p 3306:3306 --name mysql-5.7 -v /docker/mysql/5.7/config/my.cnf:/etc/my.cnf -v /docker/mysql/5.7/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=oracle  mysql:5.7
```

## 5. Connection 
```bash
    docker exec -it mysql-5.7 bash
    mysql -u root -p 
```

## 6. Disable SELinux

1. 查看SELinux状态

    ```sh
        getenfore
    ```
    ```bash
        sestatus -v
    ```

1. 临时关闭

    ```sh
        setenfore 0
    ```
1. 永久关闭
    
    ```sh
        vi /etc/selinux/config
    ```
    将 SELINUX=enforcing 改为 SELINUX=disabled 
