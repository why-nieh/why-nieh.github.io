---
title: Java Thread
date: 2018-09-12
categories: [IT, Java]
tags: [Thread]
description: use java create thread
keywords: Java, Thread
cover: /images/编程.jpeg
---
Thread 
---

## 1. ready

```java
    // 模拟一个比较耗时的操作
    public static void sayHello() {
        String hello = "Hello World\n";
        char[] charArray = hello.toCharArray();
        for (char ch : charArray) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.print(ch);
        }
    }
```


## 2. new

1. 继承 Thread 重写 run 方法 
    ```java
        Thread task = new Thread(){
            @Override
            public void run() {
                sayHello();
            }
        };
    ```
    
1. 实现 Runnable 接口，将实现类对象作为参数传递给 Thread 的构造方法
    ```java
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                sayHello();
            }
        };
        Thread thread = new Thread(runnable);
    ``` 

## 3. run 

1. 运行
    ```java
        public static void main(String[] args) {
            task.run();
            System.out.println("End");
        }
    ```
    
1. 输出
    > Hello World  
    End

1. Thread 的 run
    ```java
        public class Thread implements Runnable {
            private Runnable target;
            
            ...
            
            public Thread(){};
            public Thread(Runnable target){
               ...
               this.target = target;
               ... 
            }
            
            @Override
            public void run(){
                if(target != null){
                    target.run();
                }
            }
        }
    ```

1. run 只是个普通的方法

## 4. start

1. 运行
    ```java
        public static void main(String[] args) throws InterruptedException {
            task.start();
            System.out.println("End");
            task.join();
        }
    ```

1. 输出
    > End  
    Hello World
    
## 5. synchronized

```java
public class SynchronizedTest {

    private static Integer count = 0;

    private void doTask(Runnable task) {
        try {
            List<Thread> taskList = new ArrayList<>();
            for (int i = 0; i < 5; i++) {
                taskList.add(new Thread(task));
            }

            taskList.forEach(Thread::start);

            for (Thread thread : taskList) {
                thread.join();
            }

            System.out.println(count);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    /**
     * count < 5000000
     */
    @Test
    public void test01() {
        doTask(() -> {
            for (int j = 0; j < 1000000; j++) {
                count++;
            }
        });
    }

    /**
     * count < 5000000
     */
    @Test
    public void test02() {
        doTask(() -> {
            for (int j = 0; j < 1000000; j++) {
                synchronized (count) {
                    count++;
                }
            }
        });
    }

    /**
     * count = 5000000
     */
    @Test
    public void test03() {
        Object lock = new Object();
        doTask(() -> {
            for (int i = 0; i < 1000000; i++) {
                synchronized (lock) {
                    count++;
                }
            }
        });
    }


    /**
     * count = 5000000
     */
    @Test
    public void test04() {
        ReentrantLock lock = new ReentrantLock();
        doTask(() -> {
            for (int i = 0; i < 1000000; i++) {
                lock.lock();
                count++;
                lock.unlock();
            }
        });
    }

}

```

## 6. wait and notify

1. code 
    ```java
    public class WaitAndNotify {
        public static void main(String[] args) throws InterruptedException {
        
            Object semaphore = new Object();
            
            Thread thread1 = new Thread(() -> {
                synchronized (semaphore) {
                    System.out.println("thread1 have semaphore");
                    System.out.println("thread1 start wait");
                    try {
                        semaphore.wait();
                        System.out.println("thread1 end wait");
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            });
    
            Thread thread2 = new Thread(()->{
                synchronized (semaphore) {
                    System.out.println("thread2 have semaphore");
                    System.out.println("thread2 start notify");
                    semaphore.notify();
                    System.out.println("thread2 end notify");
                }
            });
    
            thread1.start();
            Thread.sleep(100);
            thread2.start();
            
            thread1.join();
            thread2.join();
        }
    }
    
    ```       
    
1. out
    > thread1 have semaphore  
      thread1 start wait  
      thread2 have semaphore  
      thread2 start notify  
      thread2 end notify  
      thread1 end wait  

## 7. Condition

1. code
    ```java
    public class ConditionTest {
        public static void main(String[] args) throws InterruptedException {
            ReentrantLock lock = new ReentrantLock();
            Condition condition = lock.newCondition();
            Thread thread1 = new Thread(() -> {
                lock.lock();
                System.out.println("thread1 have semaphore");
                System.out.println("thread1 start wait");
                try {
                    condition.await();
                    System.out.println("thread1 end wait");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                lock.unlock();
            });
    
            Thread thread2 = new Thread(() -> {
                lock.lock();
                System.out.println("thread2 have semaphore");
                System.out.println("thread2 start notify");
                condition.signal();
                System.out.println("thread2 end notify");
                lock.unlock();
            });
    
            thread1.start();
            Thread.sleep(100);
            thread2.start();
            thread1.join();
            thread2.join();
        }
    }
    ```
1. out
    > thread1 have semaphore  
      thread1 start wait  
      thread2 have semaphore  
      thread2 start notify  
      thread2 end notify  
      thread1 end wait  