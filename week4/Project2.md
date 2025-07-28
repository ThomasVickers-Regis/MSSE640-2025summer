# Project 2: Integration Testing with Postman

## MSSE640 - Software Security Engineering
**Week 4 Project: API Integration Testing and Postman Demonstration**

---

## Table of Contents
1. [Introduction](#introduction)
2. [Part 1: Research on APIs and Integration Testing](#part-1-research-on-apis-and-integration-testing)
3. [Part 2: Postman Demo with Triangle Classification API](#part-2-postman-demo-with-triangle-classification-api)
4. [Extra Credit: Curl Commands](#extra-credit-curl-commands)
5. [Conclusion and Recommendations](#conclusion-and-recommendations)
6. [References](#references)

---

## Introduction

This project demonstrates integration testing using Postman to interact with RESTful APIs. Integration testing is crucial for ensuring that different components of a distributed system work together correctly. APIs serve as the integration interfaces that allow different software applications to communicate effectively. This project focuses on understanding HTTP protocols, API functionality, and practical testing using the Triangle Classification API developed for this course.

The project covers fundamental concepts of HTTP communication, explores the role of APIs in modern applications, and provides hands-on experience with API testing tools. Through this exercise, we gain practical experience in testing API endpoints, understanding request/response patterns, and identifying both successful and error scenarios.

---

## Part 1: Research on APIs and Integration Testing

### HTTP Functionality

HTTP (HyperText Transfer Protocol) is the foundation of data communication for the World Wide Web. It's a request-response protocol that enables communication between clients and servers.

**Clients & Servers**: A client (like your web browser or Postman) sends a request for a resource to a server. The server hosts the resource and sends back a response. This client-server architecture is fundamental to web communication.

**Requests & Responses**: An HTTP request asks the server to perform an action (e.g., "give me this webpage" or "create a new record"). The server processes the request and sends back an HTTP response containing the requested resource or an error message.

**Headers vs. Body**:
- **Headers** contain metadata about the request or response, such as content type (`Content-Type: application/json`), authentication tokens, or caching information. They provide context about how to interpret the request/response.
- **Body** contains the actual data being sent. For GET requests, the body is often empty. For POST/PUT requests, the body contains the data you want to create or update on the server.

**Status Codes**: These 3-digit codes in the response indicate the result of the request:
- **2xx (Success)**: 200 OK, 201 Created, 204 No Content
- **3xx (Redirection)**: The resource has moved to a different location
- **4xx (Client Error)**: The client made a mistake - 404 Not Found, 401 Unauthorized, 400 Bad Request
- **5xx (Server Error)**: The server encountered an error - 500 Internal Server Error

**HTTP Verbs**: These define the action to be performed:
- **GET**: Retrieve data from the server
- **POST**: Create new data on the server
- **PUT**: Update existing data completely
- **DELETE**: Remove data from the server

**Stateless Nature**: HTTP is stateless, meaning each request is independent. The server doesn't remember anything about previous requests from the same client. This simplifies server design but requires strategies like cookies or tokens to manage user sessions across multiple requests.

### Role of APIs in Modern Applications

An API (Application Programming Interface) is a set of rules that allows different software applications to communicate with each other. They serve as the "integration interfaces" that enable distributed systems to work together seamlessly.

**Open APIs (Public APIs)** are publicly available for developers to access data or services. They're crucial for innovation because they allow developers to build new applications on top of existing platforms without starting from scratch. This promotes collaboration, reduces development time, and enables the creation of more sophisticated applications.

**Modern Use Example**: A weather app on your phone doesn't have its own weather station. Instead, it uses an Open API from a service like OpenWeatherMap. The app sends a GET request with your location to the API, and the API responds with current weather data, which your app then displays in a user-friendly format.

**Sources**: ProgrammableWeb and RapidAPI are excellent directories for finding Open API examples and documentation.

### Cross-Origin Resource Sharing (CORS)

CORS is a security mechanism that browsers use to control cross-origin requests. By default, a web page at `domain-a.com` is not allowed to make requests to an API at `domain-b.com`. CORS allows a server at `domain-b.com` to tell the browser it's okay to accept requests from `domain-a.com` by using special HTTP headers.

This is crucial for modern web applications that pull resources from multiple sources. Without CORS, web applications would be severely limited in their ability to integrate with external APIs and services.

### 5 Public Open APIs

1. **JSONPlaceholder**: Fake online REST API for testing and prototyping. Perfect for practicing GET, POST, PUT, DELETE operations.
2. **The PokéAPI**: Comprehensive Pokémon data API. It's read-only (GET requests only) and provides extensive data about Pokémon characters.
3. **NASA APIs**: Access to amazing space images, Mars rover photos, and astronomical data. Includes the popular Astronomy Picture of the Day API.
4. **OpenWeatherMap API**: Provides current weather data, forecasts, and historical weather information for any location worldwide.
5. **The Rick and Morty API**: A RESTful and GraphQL API based on the popular TV show, providing character and episode data.

---

## Part 2: Postman Demo with Triangle Classification API

### 1. Create a Collection

**Collection Name**: "Triangle Classification API Tests"

![collection](./assets/SS5%20collection.png)

### 2. Create Environment

**Environment Name**: "Triangle API Environment"

**Variables**:
- `base_url`: `https://msse-640-2025summer.vercel.app`
- `api_endpoint`: `{{base_url}}/api/identify-triangle`

*[Screenshot: Postman environment setup]*

### 3. Test Requests

#### Request 1: GET - Health Check
```
GET {{base_url}}/api/identify-triangle
```

**Expected Response**: 405 Method Not Allowed (since this endpoint only accepts POST)

![GET request response](./assets/ss3%20get%20failed.png)

#### Request 2: POST - Valid Equilateral Triangle
```
POST {{api_endpoint}}
Content-Type: application/json

{
  "sideA": 5,
  "sideB": 5,
  "sideC": 5
}
```

**Expected Response**:
```json
{
  "sideA": 5,
  "sideB": 5,
  "sideC": 5,
  "type": "Equilateral",
  "isValid": true
}
```

![Equilateral triangle POST request](./assets/SS1%20Equalateral.png)

#### Request 3: POST - Valid Isosceles Triangle
```
POST {{api_endpoint}}
Content-Type: application/json

{
  "sideA": 5,
  "sideB": 5,
  "sideC": 3
}
```

**Expected Response**:
```json
{
  "sideA": 5,
  "sideB": 5,
  "sideC": 3,
  "type": "Isosceles",
  "isValid": true
}
```

![Isosceles triangle POST request](./assets/SS2%20Isosceles.png)

#### Request 4: POST - Valid Scalene Triangle
```
POST {{api_endpoint}}
Content-Type: application/json

{
  "sideA": 3,
  "sideB": 4,
  "sideC": 5
}
```

**Expected Response**:
```json
{
  "sideA": 3,
  "sideB": 4,
  "sideC": 5,
  "type": "Scalene",
  "isValid": true
}
```

![Scalene triangle POST request](./assets/ss4%20scalene.png)

#### Request 5: POST - Invalid Triangle (Triangle Inequality Violation)
```
POST {{api_endpoint}}
Content-Type: application/json

{
  "sideA": 1,
  "sideB": 1,
  "sideC": 10
}
```

**Expected Response**:
```json
{
  "sideA": 1,
  "sideB": 1,
  "sideC": 10,
  "type": "",
  "isValid": false,
  "error": "These sides cannot form a valid triangle"
}
```

![Invalid triangle error response](./assets/ss6%20invalid.png)

#### Request 6: POST - Invalid Input (Negative Values)
```
POST {{api_endpoint}}
Content-Type: application/json

{
  "sideA": -1,
  "sideB": 2,
  "sideC": 3
}
```


### Data Persistence Analysis

The Triangle Classification API does not persist data between requests. Each POST request is processed independently, and the API returns the classification result based on the provided input without storing any information. This is typical for stateless APIs that perform calculations or validations without maintaining state.

### Successful Data Examples

1. **Equilateral Triangle**: All sides equal (5, 5, 5) → Returns "Equilateral"
2. **Isosceles Triangle**: Two sides equal (5, 5, 3) → Returns "Isosceles"  
3. **Scalene Triangle**: All sides different (3, 4, 5) → Returns "Scalene"

### Error Response Example

When requesting a triangle that violates the triangle inequality theorem (1, 1, 10), the API returns a clear error message indicating that these sides cannot form a valid triangle, along with an `isValid: false` flag.

---

## Extra Credit: Curl Commands

### Curl Request 1: Valid Equilateral Triangle
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"sideA": 5, "sideB": 5, "sideC": 5}' \
  https://msse-640-2025summer.vercel.app/api/identify-triangle
```

![Curl command 1 output](./assets/ss7%20curl.png)

### Curl Request 2: Invalid Triangle
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"sideA": 1, "sideB": 1, "sideC": 10}' \
  https://msse-640-2025summer.vercel.app/api/identify-triangle
```

### Curl Request 3: Error Response with Headers
```bash
curl -i -X POST \
  -H "Content-Type: application/json" \
  -d '{"sideA": -1, "sideB": 2, "sideC": 3}' \
  https://msse-640-2025summer.vercel.app/api/identify-triangle
```

### Advantages of Curl over Postman

**Curl Advantages**:
- **Lightweight**: No GUI required, minimal resource usage
- **Scriptable**: Easy to include in shell scripts for automated testing
- **Universal**: Available on all platforms (Linux, macOS, Windows with Git Bash)
- **CI/CD Integration**: Perfect for automated testing in deployment pipelines
- **Command Line**: Familiar interface for developers comfortable with terminal

**Postman Advantages**:
- **User-Friendly Interface**: Visual request builder and response viewer
- **Test Organization**: Collections and environments for organizing tests
- **Collaboration**: Team features for sharing API tests
- **Documentation**: Built-in documentation generation
- **Advanced Testing**: Pre-request scripts and test assertions

---

## Conclusion and Recommendations

### What We Learned About Integration Testing and APIs

This project provided valuable insights into integration testing methodologies and API functionality. We learned that:

1. **HTTP Protocol Understanding**: The stateless nature of HTTP and the importance of proper status codes and headers in API communication
2. **API Testing Patterns**: How to systematically test different scenarios including success cases, error conditions, and edge cases
3. **Tool Proficiency**: Practical experience with Postman for API testing and curl for command-line testing
4. **Error Handling**: The importance of proper error responses and status codes in API design
5. **Environment Management**: How to use environment variables to make API testing more efficient and maintainable

### Recommendations for Improving This Assignment

1. **Real-World API Integration**: Consider adding a section where students test against a live, public API to experience real-world API limitations and rate limiting
2. **Automated Testing**: Include a section on writing automated tests using tools like Newman (Postman's CLI tool) or programming languages
3. **API Documentation**: Require students to document their API endpoints using tools like Swagger/OpenAPI
4. **Performance Testing**: Add a component for testing API performance and response times
5. **Security Testing**: Include basic security testing concepts like authentication and authorization testing
6. **Mock API Creation**: Allow students to create their own simple API endpoints to better understand both sides of API communication

---

## References

- [HTTP Protocol Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [Postman Learning Center](https://learning.postman.com/)
- [Curl Documentation](https://curl.se/docs/)
- [Triangle Classification API Documentation](./app/triagle-identification/README.md)
- [REST API Best Practices](https://restfulapi.net/)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---