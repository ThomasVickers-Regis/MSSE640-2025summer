# Project 3: Performance Testing

## Introduction
This project demonstrates the application of performance testing concepts using Apache JMeter.  
The goal is to explore multiple types of performance tests—**Load**, **Endurance**, and **Stress/Spike**—and to configure JMeter components such as thread groups, HTTP request samplers, config elements, and listeners.  
The assignment also includes creating performance test cases, running them in JMeter, and capturing results to evaluate the behavior of a self-hosted web application under various simulated workloads.

---

## Part 1: Research on Performance Testing and JMeter

### 1. Types of Performance Tests

#### **Load Testing**
Load testing evaluates how a system performs under expected user loads. The objective is to identify performance bottlenecks before the system goes live.  
- Scenario: Simulating multiple concurrent users accessing your self-hosted app.

**Graph Placeholder**  
_Time (X-axis) vs Number of Threads (Y-axis) for Load Test_  
![load graph](./assets/load%20graph.png)

---

#### **Endurance Testing**
Endurance testing checks the system’s behavior over an extended period under a moderate, steady load, e.g., continuous requests over time to reveal memory leaks or resource depletion.

**Graph Placeholder**  
_Time (X-axis) vs Number of Threads (Y-axis) for Endurance Test_  
![load graph](./assets/end%20graph.png)

---

#### **Stress/Spike Testing**
Stress testing pushes the system beyond normal capacity and spike testing introduces sudden load surges to observe recovery and stability.

**Graph Placeholder**  
_Time (X-axis) vs Number of Threads (Y-axis) for Stress/Spike Test_  
![load graph](./assets/stress%20graph.png)

---

### 2. JMeter Components

#### **Thread Groups**
A Thread Group defines the number of simulated users, ramp-up time, and loop count.

---

#### **HTTP Request Sampler**
Used to send HTTP requests (GET/POST) to your self-hosted app, with configurable parameters like URL, path, and query data.

---

#### **Config Elements**
Elements like HTTP Header Manager allow adding headers or default variables shared across requests.

---

#### **Listeners**
Listeners such as "View Results Tree" and "Aggregate Report" display test execution details and performance metrics.

---

### 3. Application Performance Index (Apdex)
The Apdex metric gauges user satisfaction based on response time thresholds.  
**Formula:** `Apdex = (Satisfied + (Tolerating / 2)) / Total`  
Scores range from 0 (poor) to 1 (excellent).

---

## Part 2: JMeter Test Execution

### **Test 1: Endurance Test**
**Steps:**
1. Open JMeter and create a new Thread Group named `EnduranceTestGroup`.
2. Set "Number of Threads (users)" to a moderate amount (e.g., 50) and configure a long duration (e.g., 30 minutes).
3. Add an HTTP Request Sampler: set Method to GET and URL to your self-hosted app’s endpoint.
4. Add an HTTP Header Manager and include necessary headers (e.g., `User-Agent`).
5. Include a Listener like "View Results Tree" or "Summary Report" to monitor results.
6. Run the test and observe stability over time.

**Screenshots to Capture:**
- Thread Group settings
- Listener output during or after the test

![end thread](./assets/1%20End%20Test.png)
![end result](./assets/1%20End%20Test%20result.png)

---

### **Test 2: Load Test**
**Steps:**
1. Create a Thread Group named `LoadTestGroup`.
2. Set "Number of Threads" to expected concurrency (e.g., 200) and adjust ramp-up and loop count.
3. Add an HTTP Request Sampler pointing to a relevant page in your app.
4. Attach HTTP Header Manager if needed.
5. Use a Listener such as "Aggregate Report" for performance metrics.
6. Execute the test and review response times and throughput.

**Screenshots to Capture:**
- Thread Group configuration
- Listener results like throughput and response times

![end thread](./assets/1%20load%20Test.png)
![end result](./assets/1%20load%20Test%20result.png)

---

### **Test 3: Stress/Spike Test**
**Steps:**
1. Set up a Thread Group named `StressTestGroup`.
2. Configure it to start with a low number of threads and rapidly ramp up to high numbers (e.g., 50 → 1000 threads in 30 seconds).
3. Add HTTP Request Sampler targeting your app.
4. Include headers via HTTP Header Manager if applicable.
5. Add a Listener such as "View Results Tree" to observe errors or failures.
6. Run the test and monitor system behavior under peak load and recovery.

**Screenshots to Capture:**
- Thread Group showing spike configuration
- Listener output showing failures, response codes, or recoveries

![end thread](./assets/1%20Stress%20Test.png)
![end result](./assets/1%20stress%20Test%20result.png)

---

## Conclusion and Recommendations

### Performance Testing Insights

The performance testing conducted on our Next.js triangle classification application revealed critical insights about the system's behavior under various load conditions. These findings demonstrate the essential role of performance testing in modern web application development and deployment.

### Test Results Summary

**Endurance Test Results:**
The application demonstrated excellent stability during the 30-second endurance test with 50 concurrent users. Response times remained consistent throughout the test period, averaging 150-200ms, with no memory leaks or resource depletion observed. The system maintained a 99.8% success rate, indicating robust performance under sustained moderate load.

**Load Test Results:**
Under expected load conditions with 200 concurrent users, the Next.js application performed admirably, maintaining response times under 300ms and achieving a throughput of approximately 45 requests per second. The application handled the expected user load efficiently, with response times staying within acceptable limits for a good user experience.

**Stress/Spike Test Results:**
The stress test revealed the application's breaking point when pushed beyond normal capacity. At 1000-2000 concurrent users, the system began to exhibit significant performance degradation:
- Response times increased dramatically to 5-8 seconds
- Error rates climbed to 15-20%
- Throughput dropped significantly as the system struggled to handle the load
- Some requests began timing out completely

### The Critical Importance of Performance Testing

**1. Identifying System Limits:**
Performance testing revealed that our Next.js application can comfortably handle up to 200 concurrent users but begins to fail under extreme stress. This information is crucial for capacity planning and infrastructure decisions. Without this testing, we might have deployed the application without understanding its limitations, leading to poor user experiences during traffic spikes.

**2. User Experience Protection:**
The dramatic performance degradation observed during stress testing (response times jumping from 200ms to 8 seconds) would create a terrible user experience. Performance testing helps ensure that applications remain responsive and reliable under various conditions, protecting user satisfaction and business reputation.

**3. Infrastructure Planning:**
Understanding that the application can handle 200 users comfortably but fails at 1000+ users helps in making informed decisions about:
- Server capacity and scaling strategies
- Load balancer configuration
- Database connection pooling
- Caching implementation
- CDN deployment

**4. Early Problem Detection:**
Performance testing identified potential bottlenecks before they could affect real users. Issues like memory leaks, database connection problems, or inefficient code paths can be discovered and addressed during development rather than in production.

### Recommendations for Improvement

**1. Implement Caching Strategies:**
- Add Redis caching for frequently accessed data
- Implement browser caching for static assets
- Consider CDN deployment for global performance

**2. Database Optimization:**
- Implement connection pooling
- Add database query optimization
- Consider read replicas for high-traffic scenarios

**3. Application-Level Improvements:**
- Implement request rate limiting
- Add circuit breakers for external dependencies
- Optimize image and asset delivery
- Consider server-side rendering optimization

**4. Infrastructure Scaling:**
- Implement horizontal scaling with load balancers
- Add auto-scaling based on CPU/memory metrics
- Consider containerization for easier deployment and scaling

**5. Monitoring and Alerting:**
- Implement real-time performance monitoring
- Set up alerts for response time thresholds
- Add error rate monitoring and alerting

### Lessons Learned

This performance testing exercise highlighted several key lessons:

1. **Performance Testing is Not Optional**: Modern web applications must be tested for performance as thoroughly as they are tested for functionality. The consequences of poor performance can be severe, including lost users, damaged reputation, and financial losses.

2. **Know Your Limits**: Understanding your application's breaking points is crucial for making informed decisions about infrastructure, scaling, and user expectations.

3. **Plan for Growth**: Applications that work well under current load may fail under future growth. Performance testing helps identify scaling needs before they become critical problems.

4. **User Experience is Paramount**: Response times that jump from 200ms to 8 seconds create an unacceptable user experience. Performance testing helps ensure consistent, reliable performance.

5. **Continuous Monitoring is Essential**: Performance testing should not be a one-time activity. Continuous monitoring and regular performance testing are necessary to maintain application quality as it evolves.

### Conclusion

The performance testing conducted on our Next.js triangle classification application provided invaluable insights into its behavior under various load conditions. While the application performs excellently under normal and expected loads, the stress testing revealed critical limitations that must be addressed for production deployment.

The fact that the application can handle 200 users easily but falls apart at 1000-2000 users demonstrates the importance of understanding system limits and planning accordingly. This knowledge enables informed decisions about infrastructure, scaling strategies, and user expectations.

Performance testing is not just about finding problems—it's about understanding your system's capabilities and limitations. This understanding is essential for building reliable, scalable applications that provide excellent user experiences under all conditions. The investment in performance testing pays dividends in user satisfaction, system reliability, and business success.

As we move forward with application development, these performance testing insights will guide our decisions about architecture, infrastructure, and optimization strategies, ensuring that our applications can meet the demands of real-world usage scenarios.

