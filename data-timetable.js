// 30-Day Senior .NET Full-Stack Interview Preparation Timetable
// Structured curriculum with individual question tracking and rollover carry-forward support.

window.TIMETABLE_DAYS = [
  // WEEK 1: OOP & C# DEEP INTERNALS
  {
    day: 1,
    week: 1,
    weekLabel: "Week 1: OOP & C# Internals",
    title: "OOP Foundations, Memory Models & Spoken Formula",
    hours: "1.5 – 2 hrs",
    lessonId: "oop-01",
    tasks: [
      { id: "d1_t1", title: "Classes, Constructors, Heap vs Stack & Encapsulation (Q1–Q10)", lessonId: "oop-01" },
      { id: "d1_t2", title: "Polymorphism, vtables, Dynamic Dispatch & Overloading vs Overriding (Q11–Q20)", lessonId: "oop-02" },
      { id: "d1_t3", title: "Spoken Drill: Deliver 3-Sentence spoken formula for Encapsulation & Polymorphism", lessonId: "eng-01" }
    ]
  },
  {
    day: 2,
    week: 1,
    weekLabel: "Week 1: OOP & C# Internals",
    title: "Abstract Classes, Interfaces, SOLID & Design Patterns",
    hours: "1.5 – 2 hrs",
    lessonId: "oop-03",
    tasks: [
      { id: "d2_t1", title: "Abstract Class vs Interface & C# 8+ Interface Default Implementations (Q21–Q25)", lessonId: "oop-03" },
      { id: "d2_t2", title: "SOLID Principles in production code with real violation/fix examples (Q26–Q30)", lessonId: "oop-03" },
      { id: "d2_t3", title: "Aggregation vs Composition, Shallow vs Deep Copy & Output Puzzles (Q31–Q40)", lessonId: "oop-04" }
    ]
  },
  {
    day: 3,
    week: 1,
    weekLabel: "Week 1: OOP & C# Internals",
    title: "CLR Execution Pipeline & C# Type System Internals",
    hours: "1.5 – 2 hrs",
    lessonId: "csharp-01",
    tasks: [
      { id: "d3_t1", title: "CLR Architecture, MSIL, JIT Compilation types & Execution lifecycle", lessonId: "csharp-01" },
      { id: "d3_t2", title: "Value vs Reference Types, Boxing/Unboxing IL overhead & String Interning", lessonId: "csharp-01" },
      { id: "d3_t3", title: "const vs readonly, ref vs out, in parameters, var vs dynamic", lessonId: "csharp-02" }
    ]
  },
  {
    day: 4,
    week: 1,
    weekLabel: "Week 1: OOP & C# Internals",
    title: "Collections, Generics & LINQ Deferred Execution",
    hours: "1.5 – 2 hrs",
    lessonId: "csharp-03",
    tasks: [
      { id: "d4_t1", title: "Array vs ArrayList vs List<T> internal memory growth & generic constraints", lessonId: "csharp-03" },
      { id: "d4_t2", title: "IEnumerable vs IQueryable (In-Memory iteration vs Database Expression Trees)", lessonId: "csharp-03" },
      { id: "d4_t3", title: "LINQ Deferred Execution vs Immediate Execution & multiple enumeration traps", lessonId: "csharp-03" }
    ]
  },
  {
    day: 5,
    week: 1,
    weekLabel: "Week 1: OOP & C# Internals",
    title: "Delegates, Async State Machine & Concurrency Basics",
    hours: "1.5 – 2 hrs",
    lessonId: "csharp-04",
    tasks: [
      { id: "d5_t1", title: "Delegates, Multicast Delegates, Func<T>, Action<T> & Event memory leaks", lessonId: "csharp-04" },
      { id: "d5_t2", title: "async/await compiler state machine, ConfigureAwait & Task.WhenAll vs WaitAll", lessonId: "csharp-04" },
      { id: "d5_t3", title: "Extension methods, Records (with-expressions), lock, Deadlocks & CancellationToken", lessonId: "csharp-05" }
    ]
  },
  {
    day: 6,
    week: 1,
    weekLabel: "Week 1: OOP & C# Internals",
    title: "10/10 Mastery: Memory (GC, IDisposable) & Span<T>",
    hours: "2 hrs",
    lessonId: "csharp-06",
    tasks: [
      { id: "d6_t1", title: "Garbage Collection Generations (0, 1, 2, LOH) & Gen 2 pause mitigation", lessonId: "csharp-06" },
      { id: "d6_t2", title: "IDisposable pattern vs Finalizer & using statement under-the-hood IL", lessonId: "csharp-06" },
      { id: "d6_t3", title: "Span<T>, Memory<T>, Thread vs Task, Race Conditions & SemaphoreSlim", lessonId: "csharp-06" }
    ]
  },
  {
    day: 7,
    week: 1,
    weekLabel: "Week 1: OOP & C# Internals",
    title: "Week 1 Carry-Forward Catchup & Spoken Memory Drill",
    hours: "1.5 hrs",
    lessonId: "csharp-06",
    tasks: [
      { id: "d7_t1", title: "Review & complete any unticked questions from Days 1 to 6", lessonId: "csharp-01" },
      { id: "d7_t2", title: "Spoken Drill: Explain CLR Memory Model & GC Generations out loud (2 mins)", lessonId: "eng-01" },
      { id: "d7_t3", title: "Deep-Dive: Test 3 edge-case questions with ChatGPT using the portal button", lessonId: "csharp-06" }
    ]
  },

  // WEEK 2: ASP.NET CORE, WEB API & DEPENDENCY INJECTION
  {
    day: 8,
    week: 2,
    weekLabel: "Week 2: ASP.NET Core & Web API",
    title: "ASP.NET Core Architecture, Hosting & Middleware",
    hours: "1.5 – 2 hrs",
    lessonId: "mvc-01",
    tasks: [
      { id: "d8_t1", title: "MVC Architecture, Unified Program.cs (.NET 6/8/9) & Routing mechanics", lessonId: "mvc-01" },
      { id: "d8_t2", title: "Middleware Pipeline execution order: app.Use() vs app.Run() vs app.Map()", lessonId: "mvc-02" },
      { id: "d8_t3", title: "Action Filters vs Middleware & Strongly-Typed Configuration with IOptions<T>", lessonId: "mvc-02" }
    ]
  },
  {
    day: 9,
    week: 2,
    weekLabel: "Week 2: ASP.NET Core & Web API",
    title: "Core Security, Caching, Rate Limiting & Health Checks",
    hours: "1.5 – 2 hrs",
    lessonId: "mvc-03",
    tasks: [
      { id: "d9_t1", title: "State Management, Anti-Forgery Tokens (CSRF) & XSS Protection", lessonId: "mvc-03" },
      { id: "d9_t2", title: "In-Memory Caching vs Redis Distributed Caching & Cache Stampede fix", lessonId: "mvc-03" },
      { id: "d9_t3", title: "10/10 Mastery: IConfiguration hierarchy, Rate Limiting & Health Checks", lessonId: "mvc-04" }
    ]
  },
  {
    day: 10,
    week: 2,
    weekLabel: "Week 2: ASP.NET Core & Web API",
    title: "Web API Fundamentals, REST Standards & JWT Auth",
    hours: "1.5 – 2 hrs",
    lessonId: "api-01",
    tasks: [
      { id: "d10_t1", title: "REST principles, HTTP Verbs (GET/POST/PUT/PATCH/DELETE) & Idempotency", lessonId: "api-01" },
      { id: "d10_t2", title: "HTTP Status Codes (200, 201, 204, 400, 401, 403, 404, 409, 500)", lessonId: "api-01" },
      { id: "d10_t3", title: "JWT Token Anatomy (Header.Payload.Signature) & Refresh Token Rotation", lessonId: "api-02" }
    ]
  },
  {
    day: 11,
    week: 2,
    weekLabel: "Week 2: ASP.NET Core & Web API",
    title: "Web API Advanced: CORS, Versioning, Idempotency & Legacy Services",
    hours: "2 hrs",
    lessonId: "api-04",
    tasks: [
      { id: "d11_t1", title: "Legacy VB.NET Web Services (SOAP / ASMX / WCF) vs Modern REST Web API", lessonId: "api-03" },
      { id: "d11_t2", title: "CORS Preflight (OPTIONS), IHttpClientFactory Socket Exhaustion fix", lessonId: "api-02" },
      { id: "d11_t3", title: "10/10 Mastery: OAuth 2.0 vs JWT, API Versioning & Global Exception Handling", lessonId: "api-04" }
    ]
  },
  {
    day: 12,
    week: 2,
    weekLabel: "Week 2: ASP.NET Core & Web API",
    title: "Dependency Injection Lifetimes & Captive Dependencies",
    hours: "1.5 – 2 hrs",
    lessonId: "di-01",
    tasks: [
      { id: "d12_t1", title: "Loose Coupling, IoC vs DI, Constructor vs Method/Property Injection", lessonId: "di-01" },
      { id: "d12_t2", title: "Transient vs Scoped vs Singleton Lifetimes with HTTP request scope", lessonId: "di-02" },
      { id: "d12_t3", title: "Captive Dependency Bug: Why Singleton holding Scoped leaks memory & breaks DbContext", lessonId: "di-02" }
    ]
  },
  {
    day: 13,
    week: 2,
    weekLabel: "Week 2: ASP.NET Core & Web API",
    title: "Advanced DI Patterns & Scoped Services in Background Tasks",
    hours: "1.5 – 2 hrs",
    lessonId: "di-03",
    tasks: [
      { id: "d13_t1", title: "Circular Dependency Resolution using Lazy<T> and Factory Delegates", lessonId: "di-03" },
      { id: "d13_t2", title: "Injecting Scoped DbContext into Singleton Middleware or IHostedService", lessonId: "di-03" },
      { id: "d13_t3", title: "Open Generic Registration (IRepository<T>) & Keyed Services in .NET 8+", lessonId: "di-03" }
    ]
  },
  {
    day: 14,
    week: 2,
    weekLabel: "Week 2: ASP.NET Core & Web API",
    title: "Week 2 Carry-Forward Catchup & Request Pipeline Drill",
    hours: "1.5 hrs",
    lessonId: "mvc-04",
    tasks: [
      { id: "d14_t1", title: "Review & complete any unticked questions from Days 8 to 13", lessonId: "api-02" },
      { id: "d14_t2", title: "Spoken Drill: Trace an incoming HTTP request through Auth, Middleware, DI & Filters", lessonId: "eng-01" },
      { id: "d14_t3", title: "ChatGPT Session: Explore OAuth Grant Types (Authorization Code vs Client Credentials)", lessonId: "api-04" }
    ]
  },

  // WEEK 3: DATABASE TUNING, EF CORE & LIVE CODING
  {
    day: 15,
    week: 3,
    weekLabel: "Week 3: Database, EF Core & Coding",
    title: "Oracle SQL Performance, Indexes & Analytical Functions",
    hours: "2 hrs",
    lessonId: "ora-01",
    tasks: [
      { id: "d15_t1", title: "Inner/Outer/Cross Joins, WHERE vs HAVING & NVL vs COALESCE", lessonId: "ora-01" },
      { id: "d15_t2", title: "Analytical Functions: ROW_NUMBER, RANK, DENSE_RANK & LEAD/LAG partitioning", lessonId: "ora-01" },
      { id: "d15_t3", title: "B-Tree vs Bitmap Indexes, Sargability rules & Execution Plan tuning", lessonId: "ora-02" }
    ]
  },
  {
    day: 16,
    week: 3,
    weekLabel: "Week 3: Database, EF Core & Coding",
    title: "PL/SQL, Stored Procedures, Cursors & Bulk Processing",
    hours: "2 hrs",
    lessonId: "ora-03",
    tasks: [
      { id: "d16_t1", title: "Stored Procedures vs Functions, Oracle Packages & Autonomous Transactions", lessonId: "ora-03" },
      { id: "d16_t2", title: "Cursors: Implicit vs Explicit, SYS_REFCURSOR for C# integration", lessonId: "ora-04" },
      { id: "d16_t3", title: "Database Triggers, Mutating Table Error (ORA-04091) & BULK COLLECT tuning", lessonId: "ora-04" }
    ]
  },
  {
    day: 17,
    week: 3,
    weekLabel: "Week 3: Database, EF Core & Coding",
    title: "10/10 Mastery: Query Optimization, ACID & Deadlocks",
    hours: "2 hrs",
    lessonId: "ora-05",
    tasks: [
      { id: "d17_t1", title: "Query Optimization, Covering Index & Composite Index Leftmost Prefix Rule", lessonId: "ora-05" },
      { id: "d17_t2", title: "ACID Properties & Transaction Isolation Levels (Dirty, Non-repeatable, Phantom)", lessonId: "ora-05" },
      { id: "d17_t3", title: "Deadlock Detection/Mitigation, Locking vs Blocking & MERGE Statement", lessonId: "ora-05" }
    ]
  },
  {
    day: 18,
    week: 3,
    weekLabel: "Week 3: Database, EF Core & Coding",
    title: "ADO.NET vs EF Core: Change Tracking & Query Loading",
    hours: "1.5 – 2 hrs",
    lessonId: "ef-01",
    tasks: [
      { id: "d18_t1", title: "ADO.NET SqlDataReader vs DataSet, CommandBehavior & Connection Pooling", lessonId: "ef-01" },
      { id: "d18_t2", title: "EF Core DbContext lifecycle, Change Tracker & Entity State transitions", lessonId: "ef-02" },
      { id: "d18_t3", title: "AsNoTracking performance, N+1 query problem, Lazy vs Eager vs Explicit Loading", lessonId: "ef-02" }
    ]
  },
  {
    day: 19,
    week: 3,
    weekLabel: "Week 3: Database, EF Core & Coding",
    title: "10/10 Mastery: Concurrency Tokens & Bulk Operations",
    hours: "1.5 – 2 hrs",
    lessonId: "ef-03",
    tasks: [
      { id: "d19_t1", title: "Optimistic Concurrency with RowVersion / DbUpdateConcurrencyException handling", lessonId: "ef-03" },
      { id: "d19_t2", title: "Compiled Queries (EF.CompileAsyncQuery) for ultra-high throughput endpoints", lessonId: "ef-03" },
      { id: "d19_t3", title: "Bulk Operations: ExecuteUpdateAsync & ExecuteDeleteAsync (EF Core 7/8/9)", lessonId: "ef-03" }
    ]
  },
  {
    day: 20,
    week: 3,
    weekLabel: "Week 3: Database, EF Core & Coding",
    title: "Practical Coding Drill 1: 20 Must-Know SQL & LINQ Queries",
    hours: "2.5 hrs",
    lessonId: "code-01",
    tasks: [
      { id: "d20_t1", title: "Write SQL: 2nd & Nth Highest Salary, Duplicate Removal & Running Totals", lessonId: "code-01" },
      { id: "d20_t2", title: "Write LINQ: GroupBy, Multiple Joins, SelectMany & Aggregate Calculations", lessonId: "code-01" },
      { id: "d20_t3", title: "Rewrite slow non-sargable SQL queries into high-performance indexed queries", lessonId: "code-01" }
    ]
  },
  {
    day: 21,
    week: 3,
    weekLabel: "Week 3: Database, EF Core & Coding",
    title: "Practical Coding Drill 2 & JavaScript Internals",
    hours: "2 hrs",
    lessonId: "code-02",
    tasks: [
      { id: "d21_t1", title: "Live C# Coding: Palindrome, Anagram, Reverse LinkedList & LRU Cache", lessonId: "code-02" },
      { id: "d21_t2", title: "JavaScript: Closures, Event Loop, Promises, async/await & DOM Event Delegation", lessonId: "js-01" },
      { id: "d21_t3", title: "Week 3 Carry-Forward: Review and complete any pending SQL/EF questions", lessonId: "ora-05" }
    ]
  },

  // WEEK 4: SYSTEM DESIGN, MICROSERVICES, AZURE & SPOKEN DRILL
  {
    day: 22,
    week: 4,
    weekLabel: "Week 4: Architecture & Cloud",
    title: "Clean Architecture, Project Design & Debugging",
    hours: "2 hrs",
    lessonId: "sys-01",
    tasks: [
      { id: "d22_t1", title: "Clean Architecture, Hexagonal (Ports & Adapters) & Onion Architecture", lessonId: "sys-01" },
      { id: "d22_t2", title: "Production debugging, Global Exception Middleware, xUnit & Git workflows", lessonId: "scen-01" },
      { id: "d22_t3", title: "Spoken Drill: Articulate your current project's layered architecture in 2 minutes", lessonId: "eng-01" }
    ]
  },
  {
    day: 23,
    week: 4,
    weekLabel: "Week 4: Architecture & Cloud",
    title: "Scalability, Redis Distributed Caching & Distributed Resilience",
    hours: "2 hrs",
    lessonId: "sys-02",
    tasks: [
      { id: "d23_t1", title: "Horizontal vs Vertical Scaling, Load Balancer algorithms & Session Affinity", lessonId: "sys-02" },
      { id: "d23_t2", title: "Redis Distributed Caching patterns (Cache-Aside, Write-Through, Eviction)", lessonId: "sys-02" },
      { id: "d23_t3", title: "Circuit Breaker, Retry with Jitter (Polly Resilience) & CAP Theorem trade-offs", lessonId: "sys-02" }
    ]
  },
  {
    day: 24,
    week: 4,
    weekLabel: "Week 4: Architecture & Cloud",
    title: "Microservices Architecture: REST vs gRPC & API Gateway",
    hours: "2 hrs",
    lessonId: "ms-01",
    tasks: [
      { id: "d24_t1", title: "Why Microservices? Monolith bottlenecks & DDD Bounded Context decomposition", lessonId: "ms-01" },
      { id: "d24_t2", title: "Synchronous REST vs Binary Protocol Buffers (gRPC) high-throughput messaging", lessonId: "ms-01" },
      { id: "d24_t3", title: "API Gateway pattern (Ocelot/YARP), Service Discovery & Centralized Routing", lessonId: "ms-01" }
    ]
  },
  {
    day: 25,
    week: 4,
    weekLabel: "Week 4: Architecture & Cloud",
    title: "Distributed Data, Saga Pattern, Docker & Kubernetes",
    hours: "2 hrs",
    lessonId: "ms-02",
    tasks: [
      { id: "d25_t1", title: "Database-per-Service pattern & Eventual Consistency across distributed nodes", lessonId: "ms-02" },
      { id: "d25_t2", title: "Saga Pattern: Choreography (Event-Driven) vs Orchestration (State Machine)", lessonId: "ms-02" },
      { id: "d25_t3", title: "Docker Containerization basics & Kubernetes concepts (Pods, Services, Ingress)", lessonId: "ms-02" }
    ]
  },
  {
    day: 26,
    week: 4,
    weekLabel: "Week 4: Architecture & Cloud",
    title: "Azure Cloud Fundamentals & Core Infrastructure Services",
    hours: "2 hrs",
    lessonId: "az-01",
    tasks: [
      { id: "d26_t1", title: "Cloud Service Models: IaaS vs PaaS vs SaaS architectural trade-offs", lessonId: "az-01" },
      { id: "d26_t2", title: "Azure App Service: Deployment Slots, Scaling Rules & Always On configuration", lessonId: "az-01" },
      { id: "d26_t3", title: "Azure SQL, Azure Storage (Blob/Table/Queue) & Azure Functions triggers", lessonId: "az-01" }
    ]
  },
  {
    day: 27,
    week: 4,
    weekLabel: "Week 4: Architecture & Cloud",
    title: "Azure Security, CI/CD DevOps Pipelines & Application Insights",
    hours: "2 hrs",
    lessonId: "az-02",
    tasks: [
      { id: "d27_t1", title: "Azure Managed Identity (System vs User assigned) - zero-secret database auth", lessonId: "az-02" },
      { id: "d27_t2", title: "Azure Key Vault secret management & integration with IConfiguration", lessonId: "az-02" },
      { id: "d27_t3", title: "Azure DevOps CI/CD YAML pipelines & Application Insights distributed tracing", lessonId: "az-02" }
    ]
  },
  {
    day: 28,
    week: 4,
    weekLabel: "Week 4: Architecture & Cloud",
    title: "Spoken English Fluency & Senior Self-Introduction",
    hours: "1.5 hrs",
    lessonId: "eng-01",
    tasks: [
      { id: "d28_t1", title: "Memorize & deliver the 90-second Senior Developer Introduction Script", lessonId: "eng-01" },
      { id: "d28_t2", title: "Master senior conversational starters ('In our production architecture...')", lessonId: "eng-01" },
      { id: "d28_t3", title: "Week 4 Carry-Forward: Review and complete any pending cloud/microservices topics", lessonId: "az-02" }
    ]
  },

  // FINAL POLISH: DAYS 29 & 30
  {
    day: 29,
    week: 5,
    weekLabel: "Final Sprint: Review & Polish",
    title: "Rollover Backlog Clearance & Full Knowledge Blitz",
    hours: "2 hrs",
    lessonId: "welcome",
    tasks: [
      { id: "d29_t1", title: "Open the 'Pending Carry-Forward' tracker and clear 100% of unticked questions", lessonId: "timetable" },
      { id: "d29_t2", title: "Review all high-priority marked lessons across OOP, C#, Web API, SQL & Azure", lessonId: "oop-01" },
      { id: "d29_t3", title: "Ask ChatGPT 5 tough scenario questions to test rapid analytical response", lessonId: "sys-02" }
    ]
  },
  {
    day: 30,
    week: 5,
    weekLabel: "Final Sprint: Review & Polish",
    title: "Full Senior Mock Interview Simulation & Ready-State",
    hours: "2 hrs",
    lessonId: "welcome",
    tasks: [
      { id: "d30_t1", title: "Record your 90-second introduction aloud without pauses or filler words", lessonId: "eng-01" },
      { id: "d30_t2", title: "Random Question Drill: Use portal search bar to pick 10 random questions and answer aloud", lessonId: "welcome" },
      { id: "d30_t3", title: "Final confidence check: 100% of curriculum mastered. You are ready to crack the interview!", lessonId: "welcome" }
    ]
  }
];

