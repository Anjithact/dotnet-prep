window.INTERVIEW_LESSONS = window.INTERVIEW_LESSONS || {};

window.INTERVIEW_LESSONS["mvc-01"] = `# ASP.NET MVC & Core Lesson 1: Architecture, Routing, Data Passing & Model Binding

---

## Q1: What is the MVC Pattern and how does a Request flow in ASP.NET Core MVC?

\`\`\`diagram
                     ASP.NET CORE MVC REQUEST LIFECYCLE FLOW
                     
  [ Browser / Client ]
           │ HTTP Request (e.g., GET /Orders/Details/105)
           ▼
  ┌─────────────────────────────────────────────────────────────────┐
  │                   ASP.NET Core Middleware Pipeline              │
  │  [ExceptionHandler] ──► [StaticFiles] ──► [Routing] ──► [Auth]  │
  └────────────────────────────────┬────────────────────────────────┘
                                   │ Routes to matched Controller
                                   ▼
  ┌─────────────────────────────────────────────────────────────────┐
  │                          CONTROLLER                             │
  │                    OrderController.Details(105)                 │
  │  1. Model Binding (maps '105' from route to int id parameter)   │
  │  2. Calls Service / Repository for data                         │
  └──────────────────┬───────────────────────────▲──────────────────┘
                     │ (Fetch Data)              │ (Returns DTO/Model)
                     ▼                           │
  ┌─────────────────────────────────────┐        │
  │       BUSINESS SERVICE / MODEL      │────────┘
  │       IOrderService / Oracle DB     │
  └──────────────────┬──────────────────┘
                     │ Returns populated ViewModel
                     ▼
  ┌─────────────────────────────────────────────────────────────────┐
  │                             VIEW                                │
  │                      Details.cshtml (Razor)                     │
  │  Combines HTML template + Model data ──► Produces HTML output   │
  └────────────────────────────────┬────────────────────────────────┘
                                   │ HTTP Response (HTML)
                                   ▼
  [ Browser / Client ] ◄── Renders Web Page on User Screen!
\`\`\`

* **Simple Meaning:** MVC separates an application into 3 parts so UI, data, and control logic are not mixed together:
  * **M (Model):** Business data and database entities (\`Employee\`, \`OrderViewModel\`).
  * **V (View):** The UI screen (\`.cshtml\` Razor HTML pages).
  * **C (Controller):** The traffic police that receives user requests, calls the Service/Database, and returns a View or JSON.
* **Interview Answer (What to Speak):**
  > "MVC stands for **Model-View-Controller**. When a user sends a request from the browser:
  > 1. First, the request enters the **ASP.NET Core Middleware Pipeline** (Authentication, Routing).
  > 2. **Routing** matches the URL to the right **Controller and Action method**.
  > 3. **Model Binding** converts query strings/form data into C# parameters.
  > 4. The **Controller** calls the Business Service / Oracle Repository, gets the **Model** data, and passes it to the **Razor View (\`.cshtml\`)** to render HTML back to the browser."

---

## Q2: What is the difference between Conventional Routing and Attribute Routing?
* **Conventional Routing:** Defined globally in \`Program.cs\` (\`pattern: "{controller=Home}/{action=Index}/{id?}"\`). Commonly used for standard MVC Views.
* **Attribute Routing:** Defined directly above the Controller or Action using attributes like \`[Route("orders/{id:int}")]\` or \`[HttpGet("details/{id}")]\`. Preferred for **Web APIs** and custom URLs.

\`\`\`csharp
// 1. Conventional Routing in Program.cs:
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// 2. Attribute Routing on Controller:
[Route("customer-orders")]
public class OrderController : Controller
{
    [HttpGet("details/{id:int}")] // Matches: /customer-orders/details/105
    public IActionResult Details(int id) => View();
}
\`\`\`

---

## Q3: What is the difference between \`ViewData\`, \`ViewBag\`, and \`TempData\`? (100% Guaranteed Question!)

| Feature | \`ViewData\` | \`ViewBag\` | \`TempData\` |
| :--- | :--- | :--- | :--- |
| **Direction** | Controller $\\rightarrow$ View (Current request only) | Controller $\\rightarrow$ View (Current request only) | Controller $\\rightarrow$ Controller (Survives a **Redirect**!) |
| **Syntax** | Dictionary: \`ViewData["Title"] = "Home";\` | Dynamic property: \`ViewBag.Title = "Home";\` | Dictionary: \`TempData["SuccessMsg"] = "Saved!";\` |
| **Type Casting** | **Requires type casting** for complex objects | **No casting needed** (\`dynamic\` wrapper over \`ViewData\`) | Requires type casting |
| **Lifespan** | Dies after current HTTP request | Dies after current HTTP request | Survives across \`RedirectToAction()\` until read once! |

* **Follow-Up Trap: "How do you keep \`TempData\` alive after reading it once?"**
  * **Answer:** Call **\`TempData.Keep()\`** (keeps it for the next request after reading) or read it using **\`TempData.Peek("key")\`** (reads the value without marking it for deletion)!

---

## Q4: What is the difference between \`IActionResult\` and \`ActionResult<T>\`?
* **\`IActionResult\`:** Used when an action can return multiple different result types (\`View()\`, \`RedirectToAction()\`, \`NotFound()\`, \`Json()\`).
* **\`ActionResult<T>\`:** Used in Web APIs (\`ActionResult<EmployeeDto>\`). Gives strong compile-time type checking AND automatic Swagger documentation while still allowing \`return NotFound();\` or \`return Ok(dto);\`.

---

## Q5: What is the difference between a **Partial View** and a **View Component** in ASP.NET Core?
* **Partial View (\`_EmployeeCard.cshtml\`):** Only reuses HTML markup using data already passed from the parent View. Has **NO C# business logic class** of its own.
* **View Component (\`CartSummaryViewComponent.cs\`):** Has **its own C# class with Dependency Injection** (\`InvokeAsync()\`) AND its own Razor view! Used for dynamic widgets like a Shopping Cart counter, Notification bell, or Dynamic Sidebar menu that need to query the database independently.

---

## Q6: What is Model Binding and what are \`[FromBody]\`, \`[FromQuery]\`, \`[FromRoute]\`, \`[FromForm]\`?
* **Simple Meaning:** Model Binding automatically maps incoming HTTP request data (URL, query string, form fields, JSON body) into your C# Action method parameters.
  * **\`[FromRoute]\`:** Reads from URL path (\`/api/orders/101\`).
  * **\`[FromQuery]\`:** Reads from URL query string (\`/api/orders?page=1&status=paid\`).
  * **\`[FromBody]\`:** Reads JSON payload from request body.
  * **\`[FromForm]\`:** Reads HTML form fields and uploaded files (\`IFormFile\`).

---

## Q7: How does Model Validation work in ASP.NET Core MVC (\`ModelState.IsValid\`)?
\`\`\`csharp
public class CreateEmployeeViewModel
{
    [Required(ErrorMessage = "Employee Name is mandatory")]
    [StringLength(50)]
    public string FullName { get; set; }

    [Range(10000, 500000)]
    public decimal Salary { get; set; }
}

[HttpPost]
public IActionResult Create(CreateEmployeeViewModel model)
{
    if (!ModelState.IsValid)
    {
        return View(model); // Returns validation errors back to Razor View
    }
    _service.Save(model);
    TempData["Message"] = "Employee created successfully!";
    return RedirectToAction("Index");
}
\`\`\`

---

## Q8: Why should we use a **ViewModel / DTO** instead of binding directly to our Database Entity class?
* **Answer:** To prevent **Over-Posting (Mass Assignment) Attacks**! If our database \`User\` entity has \`IsAdmin\` or \`Salary\` properties and we bind the HTML form directly to \`User\`, a hacker can inject \`IsAdmin=true\` in the form POST request. Using a \`RegisterViewModel\` exposes only safe fields (\`Email\`, \`Password\`).
`;

window.INTERVIEW_LESSONS["mvc-02"] = `# ASP.NET MVC & Core Lesson 2: Program.cs, Middleware Pipeline, Filters & Configuration

---

## Q1: What are the main differences between Classic ASP.NET MVC (.NET Framework) and ASP.NET Core?

| Feature | Classic ASP.NET MVC (.NET 4.x) | ASP.NET Core (.NET 6/7/8) |
| :--- | :--- | :--- |
| **Platform** | Windows + IIS only (\`System.Web.dll\`) | **Cross-platform** (Windows, Linux, Docker, Kestrel, IIS) |
| **Dependency Injection** | Not built-in (needed Unity/Ninject/Autofac) | **Built-in DI Container** out of the box |
| **Configuration** | XML \`web.config\` | JSON \`appsettings.json\` + Environment Variables |
| **MVC + Web API** | Two separate base \`Controller\` vs \`ApiController\` | **Unified** (\`Controller\` and \`ControllerBase\`) |
| **Request Pipeline** | Heavy \`HttpModules\` and \`HttpHandlers\` | Lightweight, fast **Middleware Pipeline** |

---

## Q2: What is Middleware in ASP.NET Core and how does the Request Pipeline work?

\`\`\`diagram
                 ASP.NET CORE MIDDLEWARE PIPELINE EXECUTION
                 
       Incoming HTTP Request                     Outgoing HTTP Response
               │                                           ▲
               ▼                                           │
  ┌─────────────────────────┐                 ┌─────────────────────────┐
  │  ExceptionHandler (In)  │                 │ ExceptionHandler (Out)  │ ◄── Catches unhandled errors!
  └────────────┬────────────┘                 └────────────▲────────────┘
               │ await next()                              │
               ▼                                           │
  ┌─────────────────────────┐                 ┌─────────────────────────┐
  │  HttpsRedirection (In)  │                 │ HttpsRedirection (Out)  │
  └────────────┬────────────┘                 └────────────▲────────────┘
               │ await next()                              │
               ▼                                           │
  ┌─────────────────────────┐                 ┌─────────────────────────┐
  │    StaticFiles (In)     │                 │    StaticFiles (Out)    │ (Short-circuits if file found)
  └────────────┬────────────┘                 └────────────▲────────────┘
               │ await next()                              │
               ▼                                           │
  ┌─────────────────────────┐                 ┌─────────────────────────┐
  │      Routing (In)       │                 │      Routing (Out)      │ (Selects Endpoint / Action)
  └────────────┬────────────┘                 └────────────▲────────────┘
               │ await next()                              │
               ▼                                           │
  ┌─────────────────────────┐                 ┌─────────────────────────┐
  │  Authentication (In)    │                 │  Authentication (Out)   │ (Who are you? Populates User)
  └────────────┬────────────┘                 └────────────▲────────────┘
               │ await next()                              │
               ▼                                           │
  ┌─────────────────────────┐                 ┌─────────────────────────┐
  │   Authorization (In)    │                 │   Authorization (Out)   │ (Are you allowed? Checks Roles)
  └────────────┬────────────┘                 └────────────▲────────────┘
               │ await next()                              │
               ▼                                           │
  ┌────────────────────────────────────────────────────────┴────────────┐
  │                  ENDPOINT / CONTROLLER ACTION                       │
  │             Executes Business Logic & Prepares Result               │
  └─────────────────────────────────────────────────────────────────────┘
\`\`\`

* **Simple Meaning:** Middleware is a chain of software components assembled in \`Program.cs\` that every HTTP request passes through on the way **in** to the Controller, and every HTTP response passes through in reverse order on the way **out**!
* **Correct Order of Middleware in \`Program.cs\` (Interviewers ALWAYS ask this order!):**
  1. \`app.UseExceptionHandler()\` (Global error handler first so it catches everything below!)
  2. \`app.UseHttpsRedirection()\`
  3. \`app.UseStaticFiles()\` (CSS, JS, images)
  4. \`app.UseRouting()\`
  5. \`app.UseCors()\`
  6. \`app.UseAuthentication()\` (**Who are you?** — Must come BEFORE Authorization!)
  7. \`app.UseAuthorization()\` (**Are you allowed?**)
  8. \`app.MapControllers()\` / \`app.MapControllerRoute()\`

---

## Q3: What is the difference between \`app.Use()\`, \`app.Run()\`, and \`app.Map()\`?
* **\`app.Use()\`:** Processes the request and calls \`await next()\` to pass the request to the **next middleware** in the pipeline.
* **\`app.Run()\`:** A **Terminal Middleware**—it never calls \`next()\`; it short-circuits and ends the pipeline immediately!
* **\`app.Map()\`:** Branches the pipeline based on the URL path (e.g., \`app.Map("/health", ...)\`).

\`\`\`csharp
// 1. app.Use() -> Calls next()
app.Use(async (context, next) =>
{
    Console.WriteLine("Before Next Middleware");
    await next(); // Passes control to next middleware
    Console.WriteLine("After Next Middleware");
});

// 2. app.Run() -> Terminal (Ends pipeline, no next parameter!)
app.Run(async context =>
{
    await context.Response.WriteAsync("Pipeline ended here.");
});
\`\`\`

---

## Q4: How do you write a Custom Middleware in ASP.NET Core? (e.g., Request Logging or Global Exception Handling)
\`\`\`csharp
public class RequestTimingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestTimingMiddleware> _logger;

    public RequestTimingMiddleware(RequestDelegate next, ILogger<RequestTimingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var watch = System.Diagnostics.Stopwatch.StartNew();
        await _next(context); // Call next middleware
        watch.Stop();

        _logger.LogInformation("Request {Path} took {Ms} ms",
            context.Request.Path, watch.ElapsedMilliseconds);
    }
}

// Register in Program.cs:
// app.UseMiddleware<RequestTimingMiddleware>();
\`\`\`

---

## Q5: What is the difference between **Middleware** and **Action Filters**?
* **Middleware:** Runs for **EVERY HTTP request** (even static files/images), has access only to \`HttpContext\`, and has **no idea** which Controller, Action, or \`ModelState\` is being called.
* **Filters (MVC/Web API):** Run **inside the MVC pipeline** only after Routing selects a Controller Action! Filters have full access to \`ActionExecutingContext\`, Action parameters, \`ModelState\`, and Action results.
* **5 Types of Filters (in execution order):**
  1. **Authorization Filters** (\`[Authorize]\` — runs first!)
  2. **Resource Filters**
  3. **Action Filters** (\`OnActionExecuting\` / \`OnActionExecuted\`)
  4. **Exception Filters** (\`OnException\`)
  5. **Result Filters** (\`OnResultExecuting\` / \`OnResultExecuted\`)

---

## Q6: What is the difference between \`IOptions<T>\`, \`IOptionsSnapshot<T>\`, and \`IOptionsMonitor<T>\`?
Used to read strongly-typed settings from \`appsettings.json\`:

| Interface | Lifetime | Reloads When \`appsettings.json\` Changes Without Restart? | Can Inject into Singleton? |
| :--- | :--- | :--- | :--- |
| **\`IOptions<T>\`** | **Singleton** | **NO** (Reads once at app startup) | **Yes** |
| **\`IOptionsSnapshot<T>\`** | **Scoped** | **YES** (Reloads per HTTP request) | **No** (Scoped!) |
| **\`IOptionsMonitor<T>\`** | **Singleton** | **YES** (Reloads live via \`.CurrentValue\`) | **Yes** |
`;

window.INTERVIEW_LESSONS["mvc-03"] = `# ASP.NET MVC & Core Lesson 3: State Management, Authentication, Security & Caching

---

## Q1: What are the different State Management techniques in ASP.NET Core MVC?
Since HTTP is **stateless** (every request forgets the previous request), we manage state using:
1. **Client-Side (Stored in Browser):** Cookies, Query Strings, Hidden Fields, \`localStorage\` / \`sessionStorage\`.
2. **Server-Side (Stored on Server / Redis):** \`Session\` (\`HttpContext.Session.SetString("CartId", "101")\`), \`TempData\`, \`IMemoryCache\`, \`IDistributedCache\`.

---

## Q2: How do you access \`HttpContext\` inside a Service or Repository class outside a Controller?
* **Answer:** Register \`builder.Services.AddHttpContextAccessor();\` in \`Program.cs\` and inject **\`IHttpContextAccessor\`** into your Service constructor (`_httpContextAccessor.HttpContext.User`).

---

## Q3: What is the difference between Authentication and Authorization? How is Role vs Policy Authorization implemented?
* **Authentication (\`401 Unauthorized\`):** Verifying **WHO the user is** (checking username/password or Cookie/JWT token).
* **Authorization (\`403 Forbidden\`):** Verifying **WHAT the logged-in user is allowed to do** (checking Roles or Claims/Policies).
\`\`\`csharp
// 1. Role-based Authorization:
[Authorize(Roles = "Admin,FinanceManager")]
public IActionResult ApprovePayroll() => View();

// 2. Policy-based Authorization (Registered in Program.cs):
// builder.Services.AddAuthorization(o => o.AddPolicy("MinExperience5Years", p => p.RequireClaim("ExpYears", "5")));
[Authorize(Policy = "MinExperience5Years")]
public IActionResult SeniorDashboard() => View();
\`\`\`

---

## Q4: What is CSRF (Cross-Site Request Forgery) and XSS (Cross-Site Scripting), and how do you prevent them in MVC?
* **CSRF:** A malicious site tricks a logged-in user's browser into submitting an unauthorized POST request.
  * **Fix:** Use **\`[ValidateAntiForgeryToken]\`** on POST actions and \`@Html.AntiForgeryToken()\` (automatic in ASP.NET Core Form Tag Helpers `<form asp-action="...">`).
* **XSS:** A hacker injects malicious \`<script>\` tags into a text box (like a comment field) that runs in other users' browsers.
  * **Fix:** Razor (\`@model.Comment\`) **automatically HTML-encodes** output by default! Avoid \`@Html.Raw()\` on untrusted user input, and use \`HttpOnly\` cookies so JavaScript \`document.cookie\` cannot steal tokens.

---

## Q5: What is the difference between In-Memory Caching (\`IMemoryCache\`) and Distributed Caching (\`IDistributedCache\`)?
* **\`IMemoryCache\`:** Stores cached data in the **RAM of a single web server**. Very fast, but if you have 3 servers behind a Load Balancer, each server has different cache data, and restarting IIS wipes the cache.
* **\`IDistributedCache\` (Redis / SQL Server):** Stores cached data in an **external shared server (like Redis)** so all web servers share the exact same cache and it survives app restarts!

\`\`\`csharp
public async Task<List<CountryDto>> GetCountriesAsync()
{
    return await _memoryCache.GetOrCreateAsync("AllCountries_Key", async entry =>
    {
        entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(6);
        return await _oracleRepo.FetchCountriesFromDbAsync();
    });
}
\`\`\`

---

## Q6: 5-Year Scenario Question — "How did you improve the performance of your ASP.NET Core MVC application?"
Speak these **5 practical points** in the interview:
1. **Asynchronous I/O (\`async\`/\`await\`):** Converted synchronous DB calls to \`async/await\` so threads are not blocked under heavy user load.
2. **Caching Master Data (\`IMemoryCache\`):** Cached dropdowns, roles, and configuration tables that rarely change so we don't query Oracle on every page load.
3. **Database & EF Core Tuning:** Used \`.AsNoTracking()\` for read-only queries, fixed N+1 queries, added proper Oracle B-Tree indexes, and used Pagination instead of loading 50,000 rows into a grid.
4. **Response Compression & Bundling:** Enabled Gzip/Brotli compression and minified JS/CSS static files.
5. **Background Processing (\`BackgroundService\`):** Moved slow tasks (sending emails and generating heavy Excel reports) out of the Controller into background jobs.
`;

window.INTERVIEW_LESSONS["api-01"] = `# Web API Lesson 1: REST Architecture, HTTP Verbs, Idempotency & Status Codes

---

## Q1: What is REST and how is a Web API Controller different from an MVC Controller?
* **Simple Meaning:**
  * An **MVC Controller** inherits from \`Controller\` and returns **HTML Views (\`.cshtml\`)** for browsers.
  * A **Web API Controller** inherits from \`ControllerBase\`, uses the \`[ApiController]\` attribute, and returns **raw data (JSON/XML)** to any client (Angular, React, Mobile App, Windows App, or another server).
* **What does the \`[ApiController]\` attribute do automatically? (Top Interview Question!)**
  1. **Automatic HTTP 400 Validation:** Automatically checks \`ModelState.IsValid\` and returns \`400 Bad Request\` with error details without writing \`if (!ModelState.IsValid)\` in every action!
  2. **Automatic Binding Source Inference:** Automatically knows complex DTOs come from \`[FromBody]\` and simple route parameters come from \`[FromRoute]\`/\`[FromQuery]\`.
  3. **Requires Attribute Routing** and returns standard \`ProblemDetails\` error responses.

---

## Q2: Explain the 5 Main HTTP Verbs (\`GET\`, \`POST\`, \`PUT\`, \`PATCH\`, \`DELETE\`).
* **\`GET\`:** Reads/fetches data only (no side effects).
* **\`POST\`:** Creates a **brand-new resource** (e.g., \`POST /api/orders\`).
* **\`PUT\`:** **Replaces an entire existing resource** (updates all fields of an order).
* **\`PATCH\`:** **Partially updates** only 1 or 2 specific fields (e.g., updating only \`OrderStatus\` without sending the whole order object).
* **\`DELETE\`:** Deletes a resource (\`DELETE /api/orders/105\`).

---

## Q3: What is **Idempotency** in HTTP Methods? Why is \`PUT\` Idempotent while \`POST\` is NOT?
* **Simple Meaning:** An operation is **Idempotent** if calling the exact same request **1 time or 10 times** produces the **exact same state on the server** without creating duplicate records!

| HTTP Method | Is It Idempotent? | Why? |
| :--- | :---: | :--- |
| **\`GET\`** | **YES** | Reading an order 10 times never changes database data. |
| **\`PUT\`** | **YES** | Setting \`UpdateSalary(empId: 101, salary: 60000)\` 10 times leaves the salary as \`60000\`. |
| **\`DELETE\`** | **YES** | Deleting \`empId: 101\` 10 times leaves \`empId: 101\` deleted (first call returns \`200/204\`, next calls return \`404\`, DB state is identical). |
| **\`POST\`** | **NO!** | Calling \`POST /api/orders\` 5 times creates **5 duplicate orders** and charges the customer 5 times! |

---

## Q4: Must-Know HTTP Status Codes Asked in Every Web API Interview

| Status Code | Meaning | When You Return It in Web API |
| :--- | :--- | :--- |
| **\`200 OK\`** | Success | Standard \`GET\` or \`PUT\` success (\`return Ok(data);\`) |
| **\`201 Created\`** | Resource Created | After \`POST\` creates a new record (\`return CreatedAtAction(...);\`) |
| **\`204 No Content\`** | Success (Empty Body) | After \`DELETE\` or \`PUT\` when no data needs to be returned (\`return NoContent();\`) |
| **\`400 Bad Request\`** | Validation / Client Error | Invalid input DTO or missing required fields (\`return BadRequest();\`) |
| **\`401 Unauthorized\`** | **Not Logged In** | Missing, invalid, or expired JWT token (Authentication failed!) |
| **\`403 Forbidden\`** | **Logged In, No Permission** | Valid JWT token, but user is \`Role=Clerk\` trying to access \`Role=Admin\` endpoint! |
| **\`404 Not Found\`** | Resource Missing | Employee ID \`999\` does not exist in Oracle DB (\`return NotFound();\`) |
| **\`409 Conflict\`** | Duplicate / Concurrency Conflict | Trying to register an email/EmployeeCode that already exists |
| **\`429 Too Many Requests\`** | Rate Limit Exceeded | Client called the API too many times per minute |
| **\`500 Internal Server Error\`** | Unhandled Server Crash | NullReferenceException or Oracle DB connection failure |

---

## Q5: What is Content Negotiation in Web API?
* **Simple Meaning:** The client tells the Web API what format it wants using the **\`Accept\`** HTTP header (e.g., \`Accept: application/json\` or \`Accept: application/xml\`), and the Web API formats the response object accordingly!
`;

window.INTERVIEW_LESSONS["api-02"] = `# Web API Lesson 2: JWT Authentication, Refresh Tokens, CORS & Best Practices

---

## Q1: How does JWT (JSON Web Token) Authentication work step-by-step?
* **Simple Meaning:** JWT is a digitally signed token string that allows **stateless authentication** without storing sessions on the server.
* **Step-by-Step Flow to Speak in Interviews:**
  1. User sends username & password to \`POST /api/auth/login\`.
  2. Server verifies credentials against the Oracle DB and generates a **JWT Token** signed with a secret key.
  3. A JWT has **3 parts separated by dots (\`Header.Payload.Signature\`)**:
     * **Header:** Algorithm (\`HS256\`) & token type.
     * **Payload (Claims):** User ID, Username, Roles (\`Admin\`), and Expiry time (\`exp\`).
     * **Signature:** Cryptographic hash ensuring nobody tampered with the payload!
  4. Client sends this token in every API call header: \`Authorization: Bearer <token>\`.
  5. ASP.NET Core \`UseAuthentication()\` middleware validates the signature and expiry automatically!

---

## Q2: What is a Refresh Token and why do we need it alongside a JWT Access Token?

\`\`\`diagram
              JWT ACCESS TOKEN + REFRESH TOKEN ROTATION FLOW
              
  [ Frontend Client ]                                       [ Auth Server / API ]
          │                                                           │
          │ 1. POST /api/auth/login { username, password }            │
          ├──────────────────────────────────────────────────────────►│ (Validates credentials)
          │                                                           │ Generates:
          │                                                           │ • Access Token (exp: 15m)
          │ 2. Return Tokens: Access Token (JSON) +                   │ • Refresh Token (exp: 7d, saved to DB)
          │    Refresh Token (Secure HttpOnly Cookie)                 │
          │◄──────────────────────────────────────────────────────────┤
          │                                                           │
          │ ─── NORMAL API REQUEST (Access Token is Valid) ────────── │
          │                                                           │
          │ 3. GET /api/orders (Header: Authorization Bearer <Token>) │
          ├──────────────────────────────────────────────────────────►│ Validates signature & claims
          │ 4. 200 OK + Orders Data JSON                              │
          │◄──────────────────────────────────────────────────────────┤
          │                                                           │
          │ ─── AFTER 15 MINUTES (Access Token Expires) ───────────── │
          │                                                           │
          │ 5. GET /api/orders (Expired Access Token)                 │
          ├──────────────────────────────────────────────────────────►│ Fails expiry check!
          │ 6. 401 Unauthorized (Token Expired)                       │
          │◄──────────────────────────────────────────────────────────┤
          │                                                           │
          │ ─── SILENT REFRESH (User is NOT logged out!) ──────────── │
          │                                                           │
          │ 7. POST /api/auth/refresh (Cookie: RefreshToken)          │
          ├──────────────────────────────────────────────────────────►│ Validates Refresh Token in DB
          │                                                           │ Revokes old Refresh Token
          │ 8. Returns NEW Access Token (15m) +                       │ Issues NEW Refresh Token (Rotation)
          │    NEW Refresh Token Cookie                               │
          │◄──────────────────────────────────────────────────────────┤
          │                                                           │
          │ 9. Retries original GET /api/orders with NEW Access Token │
          ├──────────────────────────────────────────────────────────►│
          │ 10. 200 OK + Data returned seamlessly!                    │
          │◄──────────────────────────────────────────────────────────┤
\`\`\`

* **Problem:** If a JWT Access Token is valid for 7 days and gets stolen, a hacker has access for 7 days. If it expires in 15 minutes, the user gets logged out every 15 minutes!
* **Solution:**
  * Make the **JWT Access Token short-lived (15 minutes)**.
  * Issue a long-lived **Refresh Token (7 days)** stored in the database and an \`HttpOnly\` cookie.
  * When the 15-minute Access Token expires, the frontend silently calls \`POST /api/auth/refresh\` with the Refresh Token to get a brand-new 15-minute Access Token without asking the user to log in again!

---

## Q3: What is CORS (Cross-Origin Resource Sharing) and how do you enable it in ASP.NET Core?
* **Simple Meaning:** By default, browsers block a frontend running on \`http://localhost:4200\` (or \`https://portal.company.com\`) from calling a Web API on a different domain/port \`https://api.company.com\`. **CORS** is a server configuration that tells the browser which frontend domains are allowed to call the API.
* **What is a Preflight \`OPTIONS\` Request?** Before sending a \`POST\`/\`PUT\`/\`DELETE\` request with custom headers (like \`Authorization\`), the browser automatically sends a lightweight \`OPTIONS\` request to ask the server if the domain and method are permitted.

\`\`\`csharp
// In Program.cs:
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("https://portal.company.com")
              .AllowAnyMethod()
              .AllowAnyHeader());
});

// Must be placed between UseRouting() and UseAuthentication():
app.UseCors("AllowFrontend");
\`\`\`

---

## Q4: Why should you use \`IHttpClientFactory\` instead of \`using (var client = new HttpClient())\` when calling external APIs?
* **Senior 5-Year Question!**
* **The Bug with \`new HttpClient()\`:** Even when wrapped in a \`using\` block, disposing \`HttpClient\` leaves the underlying OS TCP socket in a \`TIME_WAIT\` state for up to 240 seconds. Under high traffic, creating \`new HttpClient()\` on every request causes **Socket Exhaustion (\`SocketException\`)**!
* **The Fix (\`IHttpClientFactory\`):** Registered via \`builder.Services.AddHttpClient()\`, it pools and reuses the underlying \`HttpMessageHandler\` connections safely and respects DNS changes!

---

## Q5: How do you implement Global Exception Handling in ASP.NET Core Web API?
* Instead of writing repetitive \`try-catch\` blocks inside 100 controller actions, use **Custom Exception Middleware** or **.NET 8 \`IExceptionHandler\`** to log the full stack trace via Serilog/Oracle and return a clean, standardized \`ProblemDetails\` JSON response (HTTP 500) without leaking sensitive SQL/stack details to the client.
`;

window.INTERVIEW_LESSONS["api-03"] = `# Web API Lesson 3: Legacy Web Services (SOAP / ASMX / WCF in VB.NET) vs RESTful Web API

> **Specially Tailored to Your Experience:**
> Since you have built **Windows Forms & Web Applications using Web Services in VB.NET** as well as **ASP.NET Core MVC/Web API**, this lesson helps you confidently answer any question comparing Legacy Web Services with Modern Web APIs!

---

## Q1: What is the difference between a Legacy Web Service (SOAP / ASMX / WCF) and a Modern RESTful Web API?

| Feature | Legacy Web Service (ASMX / SOAP) | Modern ASP.NET Core Web API (REST) |
| :--- | :--- | :--- |
| **Protocol** | Strict **SOAP (Simple Object Access Protocol)** | Architectural style over HTTP (**REST**) |
| **Data Format** | **XML only** (Wrapped inside a heavy \`<soap:Envelope>\`) | **JSON** (Lightweight, fast), XML, Plain Text |
| **Contract** | Requires **WSDL** (Web Services Description Language) XML file | Documented via **Swagger / OpenAPI** |
| **Performance / Bandwidth** | Slower and heavy payload due to XML tags | Very fast and small payload (JSON) |
| **Client Consumption** | Visual Studio "Add Service Reference" generates a Proxy class | Any HTTP client (\`HttpClient\`, \`fetch()\`, \`$.ajax()\`, Mobile apps) |

---

## Q2: How did your Windows Forms / Web Application communicate with the VB.NET Web Service?
* **Interview Answer (What to Speak):**
  > "In our enterprise Windows Forms and Web projects built with VB.NET, the client applications communicated with backend **ASMX / WCF Web Services** over HTTP using SOAP XML:
  > 1. The Web Service exposed \`<WebMethod()>\` operations and generated a **WSDL (Web Services Description Language)** contract.
  > 2. In our Windows Forms application, we added a Web/Service Reference using the WSDL URL, which generated a strongly-typed **Proxy Class**.
  > 3. When the Windows Form called a proxy method (like \`proxy.GetCustomerInvoice(invoiceNo)\`), .NET serialized the parameters into a **SOAP XML Envelope**, sent it to IIS, executed the Oracle PL/SQL procedure, and deserialized the SOAP XML response back into VB.NET objects/DataSets."

---

## Q3: How would you migrate a legacy VB.NET Web Service / Windows App to modern ASP.NET Core Web API? (Great 5-Year Interview Story!)
* **Interview Answer (What to Speak):**
  > "To modernize a legacy VB.NET Web Service without breaking existing production users, we follow a step-by-step **Strangler Pattern**:
  > 1. **Database Layer stays intact:** Since core business queries are already in **Oracle PL/SQL Packages and Stored Procedures**, we don't need to rewrite the database layer.
  > 2. **Create ASP.NET Core Web API:** We build new REST endpoints in C# ASP.NET Core that call the same Oracle Packages using \`Oracle.ManagedDataAccess.Core\` or Dapper/EF Core, returning lightweight **JSON DTOs** instead of heavy XML \`DataSet\`s.
  > 3. **Replace SOAP Auth with JWT:** We replace custom SOAP Headers with standard **JWT Bearer Authentication**.
  > 4. **Update Clients Incrementally:** New MVC Core / Web screens consume the JSON Web API directly, and existing Windows Forms apps can call the new Web API using \`HttpClient\` and \`System.Text.Json\`."
`;

