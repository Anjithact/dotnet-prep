window.INTERVIEW_LESSONS = window.INTERVIEW_LESSONS || {};

// =========================================================================================
// 1. C# 10/10 MASTERY: Memory Management, Advanced Features & Concurrency (csharp-06)
// =========================================================================================
window.INTERVIEW_LESSONS["csharp-06"] = `# C# Lesson 6: 10/10 Mastery — Memory (GC, IDisposable, using), Advanced Features & Multithreading

> **Target Audience:** 5-Year Full Stack .NET Senior Developer
> **Goal:** Bridge all advanced C# gaps identified by Copilot: GC Generations, LOH, IDisposable vs Finalizers, internals of 'using', Span<T>, Records, Nullable Reference Types, yield, Thread vs Task, lock internals, Race Conditions, and SemaphoreSlim.

---

## Q1: How does Garbage Collection (GC) work in .NET? Explain Generations (Gen 0, 1, 2) and LOH.

\`\`\`diagram
                 .NET GARBAGE COLLECTION GENERATIONS ARCHITECTURE
                 
      Allocation (< 85,000 bytes)
                 │
                 ▼
      ┌─────────────────────────┐
      │      GENERATION 0       │ ──► Short-lived local variables, loop objects
      └────────────┬────────────┘     Collected very frequently (~milliseconds)
                   │ (Survives Gen 0 GC)
                   ▼
      ┌─────────────────────────┐
      │      GENERATION 1       │ ──► Buffer between short-lived & long-lived
      └────────────┬────────────┘     Collected medium frequency
                   │ (Survives Gen 1 GC)
                   ▼
      ┌─────────────────────────┐
      │      GENERATION 2       │ ──► Static fields, Singletons, AppDomain data
      └─────────────────────────┘     Full GC (Stop-the-world pause; avoid often!)
      
      Allocation (>= 85,000 bytes / Large Arrays)
                 │
                 ▼
      ┌─────────────────────────┐
      │ LARGE OBJECT HEAP (LOH) │ ──► Not compacted by default (avoids high CPU)
      └─────────────────────────┘
\`\`\`

* **Simple Meaning:** GC automatically reclaims heap memory from dead objects. It categorizes objects into 3 Generations based on age, cleaning short-lived objects very frequently and long-lived objects rarely.
* **Interview Answer (What to Speak):**
  > "The .NET Garbage Collector uses a generational, mark-sweep-and-compact algorithm. When memory is allocated, small objects (<85,000 bytes) enter **Generation 0**. 
  > 1. **Marking:** The GC traverses root references (stack variables, CPU registers, static fields) to map reachable live objects.
  > 2. **Sweeping / Planning:** It marks dead unreferenced memory blocks for reclamation.
  > 3. **Compacting:** It slides surviving objects into contiguous memory blocks to prevent memory fragmentation and updates reference pointers.
  > Surviving Gen 0 objects are promoted to **Gen 1** (transition buffer). Surviving Gen 1 objects enter **Gen 2** (long-lived objects like singletons and static caches). Objects $\\ge 85,000$ bytes bypass Gen 0/1 and are allocated directly in the **Large Object Heap (LOH)**, which is swept without compaction by default to save CPU cycles."

---

## Q2: What is the exact difference between \`IDisposable\` and a Finalizer (\`~ClassName\`)?
* **Simple Meaning:** \`Dispose()\` is deterministic cleanup called immediately by code or \`using\`. A Finalizer is non-deterministic backup cleanup invoked by GC at an unknown future time.

| Feature | \`IDisposable.Dispose()\` | Finalizer (\`~ClassName()\`) |
| :--- | :--- | :--- |
| **Execution** | **Deterministic** (Immediate upon call or scope exit) | **Non-deterministic** (Whenever GC runs in the future) |
| **Called By** | Developer / \`using\` block | Dedicated CLR Finalizer Thread |
| **Performance** | High performance; calls \`GC.SuppressFinalize(this)\` | Degrades performance; forces object to survive an extra GC cycle |
| **Purpose** | Release unmanaged OS handles, DB connections, sockets | Emergency safety net in case developer forgot \`Dispose()\` |

\`\`\`csharp
public class SafeResourceHolder : IDisposable
{
    private bool _disposed = false;

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this); // Tell GC: Skip finalization queue!
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing) { /* Free managed objects */ }
            /* Free unmanaged OS pointers / handles */
            _disposed = true;
        }
    }

    ~SafeResourceHolder() => Dispose(false); // Safety net only
}
\`\`\`

---

## Q3: What happens internally during a \`using\` statement in C#?
* **Interview Answer (What to Speak):**
  > "The C# compiler lowers any \`using\` block directly into an explicit \`try ... finally\` block. In the \`finally\` block, the compiler casts the instance to \`IDisposable\` and calls \`Dispose()\`. This guarantees that even if an unhandled runtime exception or early \`return\` occurs inside the \`try\` block, the underlying database connection or file handle is deterministically closed."

\`\`\`csharp
// Developer code:
using (var conn = new SqlConnection(connStr))
{
    conn.Open();
}

// Low-level C# compiler generated code:
SqlConnection conn = new SqlConnection(connStr);
try
{
    conn.Open();
}
finally
{
    if (conn != null)
    {
        ((IDisposable)conn).Dispose();
    }
}
\`\`\`

---

## Q4: What is \`Span<T>\` and \`ReadOnlySpan<T>\`? Why is it revolutionary?
* **Simple Meaning:** A \`ref struct\` that represents a contiguous memory window over stack, heap, or native memory with **zero memory allocation** and **zero memory copying** when slicing.
* **Why Revolutionary:** Calling \`str.Substring(0, 10)\` creates a brand-new string on the Heap every single time, causing heavy GC pressure in high-throughput APIs. Calling \`str.AsSpan(0, 10)\` creates a lightweight pointer window without allocating a single byte on the Heap!
* **Senior Interview Trap:** Because \`Span<T>\` is a \`ref struct\`, it lives strictly on the stack! It cannot be boxed, cannot be a field of a normal class, and cannot be captured across an \`await\` boundary in an \`async\` method. For heap or async storage, use **\`Memory<T>\`**.

---

## Q5: What are Records (\`record class\` and \`record struct\`) in C#?
* **Simple Meaning:** Specialized C# types designed for immutable data models with **value-based equality** out of the box.
* **Key Capabilities:**
  1. **Value-Based Equality:** Two instances with identical property values evaluate to \`true\` using \`==\` and \`.Equals()\`.
  2. **Non-Destructive Mutation:** Use the \`with\` expression to clone with modifications (\`var updated = order with { Price = 250 };\`).
  3. **Built-in Deconstruction & \`ToString()\`.**

---

## Q6: What are Nullable Reference Types (NRT) in C# 8+?
* **Simple Meaning:** Compiler-enforced static analysis that differentiates non-nullable reference types (\`string name\`) from nullable ones (\`string? name\`) to prevent \`NullReferenceException\` at compile time.
* **Interview Answer (What to Speak):**
  > "Nullable Reference Types do not change the underlying CLR runtime—at runtime, all reference types can still be null. NRT is a compile-time static code analysis feature. If a variable is declared as \`string name\` and you assign null or dereference it without checking, the compiler emits a warning. If declared as \`string? name\`, the compiler forces you to check for null prior to dereferencing."

---

## Q7: How does the \`yield\` keyword work? (\`yield return\` & \`yield break\`)
* **Simple Meaning:** Enables **deferred / lazy execution** when returning an \`IEnumerable<T>\`.
* **Under the Hood:** The compiler generates a private state-machine class implementing \`IEnumerator<T>\`. When a caller loops through \`foreach\`, execution runs up to the next \`yield return\`, yields that single element, and **pauses its execution state** until the caller requests the next item.

---

## Q8: Thread vs Task in C# — What is the fundamental architectural difference?
* **Thread:** A low-level physical OS kernel thread. Heavyweight (~1MB dedicated stack memory), expensive creation and context-switch costs.
* **Task:** A lightweight promise / unit of work scheduled onto the managed \`ThreadPool\`. Reuses pooled threads for CPU tasks, and **uses zero threads during asynchronous I/O awaits**! Supports cancellation tokens, exception aggregation, and non-blocking continuations (\`async/await\`).

---

## Q9: How does the \`lock\` keyword work internally?
* **Interview Answer (What to Speak):**
  > "The \`lock\` keyword provides mutual exclusion by ensuring that only one thread executes a critical section at any given time. Internally, the C# compiler transforms \`lock(obj)\` into a call to \`Monitor.Enter(obj, ref lockTaken)\` wrapped in a \`try ... finally\` block that calls \`Monitor.Exit(obj)\`."

\`\`\`csharp
private readonly object _syncRoot = new();

public void SafeIncrement()
{
    bool lockTaken = false;
    try
    {
        Monitor.Enter(_syncRoot, ref lockTaken);
        _counter++;
    }
    finally
    {
        if (lockTaken) Monitor.Exit(_syncRoot);
    }
}
\`\`\`

---

## Q10: What is a Race Condition? How do you prevent it?
* **Simple Meaning:** A concurrency bug where multiple threads read and modify shared state simultaneously, producing unexpected results depending on thread scheduling order.
* **Solutions:** Use \`lock\`, atomic operations (\`Interlocked.Increment(ref count)\`), thread-safe concurrent collections (\`ConcurrentDictionary\`), or \`SemaphoreSlim\`.

---

## Q11: What is \`SemaphoreSlim\` and why use it over \`lock\`?
* **The Critical Difference:** \`lock\` blocks the thread **synchronously** and **cannot be used across an \`await\` expression**!
* **\`SemaphoreSlim\`:** Supports non-blocking asynchronous waits: \`await _semaphore.WaitAsync();\`. It also allows controlling concurrency limits (e.g., allowing up to 5 concurrent threads rather than strictly 1).

\`\`\`csharp
private static readonly SemaphoreSlim _semaphore = new(initialCount: 3, maxCount: 3);

public async Task ProcessDataAsync()
{
    await _semaphore.WaitAsync(); // Asynchronous, non-blocking wait!
    try
    {
        await CallDownstreamApiAsync();
    }
    finally
    {
        _semaphore.Release();
    }
}
\`\`\`
`;

// =========================================================================================
// 2. ASP.NET CORE 10/10 MASTERY: Pipeline, Config & Production Topics (mvc-04)
// =========================================================================================
window.INTERVIEW_LESSONS["mvc-04"] = `# ASP.NET Core Lesson 4: 10/10 Mastery — Pipeline, Configuration Precedence & Production Engineering

> **Target Audience:** 5-Year Full Stack .NET Senior Developer
> **Goal:** Master the deep ASP.NET Core questions needed for a 10/10 rating: Request Pipeline mechanics, UseRouting vs UseEndpoints, IConfiguration precedence, Secrets & Env Vars, Rate Limiting, Health Checks, and BackgroundService.

---

## Q1: How does the ASP.NET Core Request Pipeline work under the hood?
* **Simple Meaning:** A bidirectional chain of **Middleware delegates** arranged in a "Russian doll / onion" pattern.
* **Interview Answer (What to Speak):**
  > "When an HTTP request enters Kestrel, it is passed through the middleware pipeline configured in \`Program.cs\`. Each middleware component receives the \`HttpContext\`. It can inspect the request, modify headers, short-circuit the pipeline without calling downstream middleware, or invoke \`await next.Invoke()\` to pass control forward. When the action or endpoint finishes, the response travels back through the same middleware chain in reverse order."

---

## Q2: What is the exact difference between \`UseRouting\` and \`UseEndpoints\`?
* **\`UseRouting\`:** Matches the incoming request URL and HTTP verb against registered route templates and selects the target endpoint. It populates \`HttpContext.GetEndpoint()\`.
* **\`UseEndpoints\`:** Actually **executes** the matched endpoint delegate (e.g., executing the controller action or minimal API handler).
* *Note:* In modern .NET 6/7/8+, \`app.MapControllers()\` automatically sets up endpoint routing under the hood.

---

## Q3: How does \`IConfiguration\` work in ASP.NET Core? Precedence Hierarchy
* **Interview Answer (What to Speak):**
  > "\`IConfiguration\` aggregates hierarchical configuration values from multiple registered providers. Providers loaded later in the sequence overwrite earlier values in the following strict order of precedence:
  > 1. \`appsettings.json\`
  > 2. \`appsettings.{Environment}.json\` (e.g., Production, Development)
  > 3. User Secrets (loaded in Development environment only)
  > 4. Environment Variables
  > 5. Command-Line Arguments (highest precedence)"

---

## Q4: How do you manage Secrets safely across Development vs Production?
* **Development:** Use the **Secret Manager tool** (\`dotnet user-secrets\`). It stores sensitive connection strings and API keys in a local JSON file in \`%APPDATA%\\Microsoft\\UserSecrets\\<guid>\` on Windows, completely isolated from Git source control.
* **Production:** Inject secrets securely from **Azure Key Vault**, AWS Secrets Manager, or Kubernetes Secrets into \`IConfiguration\` at application startup using Managed Identity without storing any password strings in configuration files.

---

## Q5: How do Environment Variables map to nested JSON configuration settings?
* In Linux, Docker, and Azure App Service, nested JSON paths are represented using a **double underscore (\`__\`)**.
* Example: To override \`ConnectionStrings:DefaultConnection\`, define the environment variable:
  \`ConnectionStrings__DefaultConnection="Server=prod-db;..."\`

---

## Q6: How do you implement built-in Rate Limiting in .NET 7/8+?
* Built-in middleware via \`Microsoft.AspNetCore.RateLimiting\` providing 4 algorithms:
  1. **Fixed Window:** Throttles requests within a static duration window.
  2. **Sliding Window:** Divides the window into segments to smooth out boundary traffic bursts.
  3. **Token Bucket:** Grants a bucket of tokens refilled at a set rate, allowing small bursts.
  4. **Concurrency Limiter:** Restricts total active simultaneous requests.

\`\`\`csharp
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("api-policy", opt =>
    {
        opt.PermitLimit = 100;
        opt.Window = TimeSpan.FromMinutes(1);
        opt.QueueLimit = 10;
    });
});

app.UseRateLimiter();
app.MapControllers().RequireRateLimiting("api-policy");
\`\`\`

---

## Q7: What are Health Checks in ASP.NET Core? Liveness vs Readiness Probes
* **Liveness Probe (\`/health/live\`):** Validates that the application process is running. If it returns failure, orchestrators like Kubernetes kill and restart the container pod.
* **Readiness Probe (\`/health/ready\`):** Validates that external dependencies (SQL Server, Redis, RabbitMQ) are reachable and healthy. If it returns failure, load balancers stop routing user traffic to that node until recovery.

---

## Q8: How does \`BackgroundService\` work and how do you resolve Scoped services inside it?
* **Simple Meaning:** \`BackgroundService\` is a long-running background worker hosted inside the ASP.NET Core application process.
* **Critical Trap:** \`BackgroundService\` is registered as a **Singleton**! If you attempt to directly inject a Scoped dependency (like \`DbContext\`) into its constructor, ASP.NET Core throws an \`InvalidOperationException\` (Captive Dependency).
* **The Solution:** Inject \`IServiceScopeFactory\`, create a temporary scope, and resolve the scoped service inside \`ExecuteAsync\`:

\`\`\`csharp
public class OrderSyncWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public OrderSyncWorker(IServiceScopeFactory scopeFactory) => _scopeFactory = scopeFactory;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                await dbContext.SyncPendingOrdersAsync(stoppingToken);
            }
            await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
        }
    }
}
\`\`\`
`;

// =========================================================================================
// 3. WEB API 10/10 MASTERY: Security, Versioning & Idempotency (api-04)
// =========================================================================================
window.INTERVIEW_LESSONS["api-04"] = `# Web API Lesson 4: 10/10 Mastery — Advanced Security, API Versioning & Idempotency

> **Target Audience:** 5-Year Full Stack .NET Senior Developer
> **Goal:** Master OAuth 2.0 vs JWT, Refresh Tokens, CORS Preflight, API Versioning strategies, Content Negotiation, Idempotency, and Keyset Pagination.

---

## Q1: OAuth 2.0 vs JWT — What is the fundamental difference?
* **OAuth 2.0:** An **authorization framework / protocol** that specifies how third-party client applications obtain delegated authorization without sharing credentials (using flows like Authorization Code with PKCE, Client Credentials).
* **JWT (JSON Web Token):** An **encoded token format** (Header.Payload.Signature) used as the bearer token issued by the OAuth 2.0 authorization server.
* *Summary:* OAuth 2.0 is the **protocol / rules**; JWT is the **data container format** carrying digitally signed claims.

---

## Q2: How do Refresh Tokens protect APIs against token theft?
* **Problem:** Storing an Access Token valid for 7 days means if compromised, an attacker has access for 7 days.
* **Solution:**
  1. Access Token is given a short lifespan (e.g., 10 minutes).
  2. Refresh Token is stored securely in an \`HttpOnly\`, \`Secure\`, \`SameSite=Strict\` cookie or hashed in the database.
  3. When refreshing, the backend checks for token revocation and enforces **Token Rotation** (issuing a new refresh token and invalidating the previous one). If an old refresh token is reused, the server detects potential token theft and invalidates all tokens for that user session.

---

## Q3: What is CORS and what triggers a Preflight \`OPTIONS\` request?
* **CORS (Cross-Origin Resource Sharing):** Browser security standard restricting web clients from making AJAX requests to a different domain, port, or protocol.
* **Preflight \`OPTIONS\`:** Sent automatically by the browser before non-simple requests—specifically requests using methods other than GET/POST (like PUT/DELETE), custom headers (like \`Authorization\`), or \`Content-Type: application/json\`. The browser asks the server if the cross-origin call is permitted before transmitting the actual payload.

---

## Q4: How do you implement API Versioning in ASP.NET Core?
* Implemented via \`Asp.Versioning.Mvc\`. The 4 standard versioning strategies are:
  1. **URL Path (Most Popular):** \`/api/v1/orders\` and \`/api/v2/orders\`.
  2. **Query String:** \`/api/orders?api-version=2.0\`.
  3. **Custom Request Header:** \`X-Version: 2.0\`.
  4. **Accept / Media-Type Header:** \`Accept: application/vnd.company.v2+json\`.

---

## Q5: What is an Idempotent API? How do you make \`POST\` idempotent?
* **Definition:** An HTTP endpoint is **Idempotent** if invoking it multiple times produces the exact same server state as invoking it once.
  * \`GET\`, \`PUT\`, \`DELETE\` are idempotent by specification.
  * \`POST\` is non-idempotent (invoking 3 times generates 3 orders).
* **Making POST Idempotent:** Require the client to pass a unique **\`Idempotency-Key\`** header (UUID). The server caches this key in Redis during processing. If a duplicate request arrives with the same key within a time window, the server returns the cached response without re-executing the payment or database insert.

---

## Q6: Offset Pagination vs Keyset (Cursor) Pagination in Large Databases
* **Offset-Based (\`Skip(page * size).Take(size)\`):** 
  * Simple to implement.
  * *Fatal Flaw:* Generates SQL \`OFFSET 1000000 ROWS FETCH NEXT 20 ROWS\`. The database engine scans 1,000,020 rows in memory before returning 20 rows ($O(N)$ performance degradation).
* **Keyset / Cursor-Based (\`WHERE Id > @lastSeenId ORDER BY Id ASC FETCH NEXT 20 ROWS\`):**
  * Direct B-Tree index seek ($O(1)$ constant performance).
  * Fast even when paginating through tables with 50+ million rows.
`;

// =========================================================================================
// 4. SQL PERFORMANCE 10/10 MASTERY: Indexes, Transactions & Window Functions (ora-05)
// =========================================================================================
window.INTERVIEW_LESSONS["ora-05"] = `# Database & SQL Lesson 5: 10/10 Mastery — Query Optimization, ACID, Isolation Levels & Window Functions

> **Target Audience:** 5-Year Full Stack .NET Senior Developer
> **Goal:** Master enterprise SQL topics: Execution plan tuning, Covering vs Composite Indexes, Fragmentation, ACID, Isolation Levels, Deadlocks vs Blocking, ROW_NUMBER vs RANK vs DENSE_RANK, and MERGE statements.

---

## Q1: How do you optimize a slow database query in production?
* **Spoken 5-Step Methodology:**
  1. **Examine Actual Execution Plan:** Inspect whether the query engine is doing an Index Seek or an expensive Table/Clustered Index Scan, and check for costly Key Lookups.
  2. **Verify Sargability:** Ensure indexed columns are not wrapped in functions in \`WHERE\` clauses (e.g., use \`WHERE CreatedDate >= '2024-01-01' AND CreatedDate < '2025-01-01'\` instead of \`WHERE YEAR(CreatedDate) = 2024\`).
  3. **Create Covering Indexes:** Use the \`INCLUDE\` clause to add non-key projected columns to the index leaf level, eliminating Key Lookups.
  4. **Eliminate \`SELECT *\`:** Project only required columns.
  5. **Update Statistics:** Run \`sp_updatestats\` or \`DBMS_STATS.GATHER_TABLE_STATS\` to ensure the query optimizer doesn't choose outdated execution plans.

---

## Q2: What is a Covering Index? How does the \`INCLUDE\` clause work?
* **Covering Index:** An index that contains all columns requested by a query (filtering, joining, and selecting).
* **The \`INCLUDE\` clause:** Stores non-key columns strictly at the leaf level of the B-Tree index. This prevents bloat in the upper B-Tree levels while allowing the database engine to satisfy the entire query directly from the index without reading the base table.

\`\`\`sql
-- Query: SELECT CustomerId, OrderDate, TotalAmount FROM Orders WHERE CustomerId = 105
CREATE NONCLUSTERED INDEX IX_Orders_CustomerId
ON Orders (CustomerId)
INCLUDE (OrderDate, TotalAmount);
\`\`\`

---

## Q3: What is a Composite Index? What is the Leftmost Prefix Rule?
* An index created on two or more columns (e.g., \`INDEX (TenantId, Status, CreatedDate)\`).
* **Leftmost Prefix Rule:** The database can only use this index for seeking if the \`WHERE\` clause filters on the leftmost leading column (\`TenantId\`) or a combination starting from the left (\`TenantId AND Status\`). Filtering on \`Status\` alone cannot seek through this index.

---

## Q4: What is Index Fragmentation? Reorganize vs Rebuild
* **Fragmentation:** Occurs when index pages have empty space (internal) or are out of physical sequential order on disk (external) due to page splits from random inserts (e.g., GUID primary keys).
* **5% to 30% Fragmentation:** Use \`ALTER INDEX REORGANIZE\` (online, defragments leaf nodes, low resource overhead).
* **> 30% Fragmentation:** Use \`ALTER INDEX REBUILD\` (drops and rebuilds index pages, updates statistics).

---

## Q5: ACID Properties of Database Transactions
* **Atomicity:** All operations in the transaction succeed, or the entire transaction rolls back ('all or nothing').
* **Consistency:** Transaction transitions database from one valid state to another, enforcing constraints, triggers, and foreign keys.
* **Isolation:** Concurrent transactions execute without cross-transaction data corruption.
* **Durability:** Once committed, changes are permanent and survive power failures via write-ahead logging (WAL).

---

## Q6: Transaction Isolation Levels & Concurrency Anomalies

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
| :--- | :---: | :---: | :---: |
| **Read Uncommitted** | ⚠️ Yes | ⚠️ Yes | ⚠️ Yes |
| **Read Committed** (Default) | ❌ Prevented | ⚠️ Yes | ⚠️ Yes |
| **Repeatable Read** | ❌ Prevented | ❌ Prevented | ⚠️ Yes |
| **Snapshot** (Row Versioning) | ❌ Prevented | ❌ Prevented | ❌ Prevented |
| **Serializable** (Key-Range Locks)| ❌ Prevented | ❌ Prevented | ❌ Prevented |

---

## Q7: Deadlocks vs Blocking — What is the difference and how do you resolve them?
* **Blocking:** Normal concurrency behavior where Transaction B waits for Transaction A to release its lock.
* **Deadlock:** Cyclic dependency where Transaction 1 holds Resource A and requests Resource B, while Transaction 2 holds Resource B and requests Resource A. Neither can ever proceed.
  * The database deadlock monitor kills one transaction with **Error 1205 (Deadlock Victim)**.
  * **Resolution:** Access tables in the exact same sequence across all stored procedures, keep transactions short, and use Snapshot Isolation / Read Committed Snapshot (RCSI).

---

## Q8: \`ROW_NUMBER()\` vs \`RANK()\` vs \`DENSE_RANK()\`
* **\`ROW_NUMBER()\`:** Assigns a strict sequential integer to every row regardless of ties (\`1, 2, 3, 4\`). Ideal for pagination.
* **\`RANK()\`:** Tied rows receive the same rank; subsequent ranks are **skipped** (\`1, 2, 2, 4\`).
* **\`DENSE_RANK()\`:** Tied rows receive the same rank; subsequent ranks are **NOT skipped** (\`1, 2, 2, 3\`). Ideal for finding the Nth highest salary.

\`\`\`sql
-- Find 2nd Highest Salary:
WITH RankedSalaries AS (
    SELECT EmployeeId, Salary,
           DENSE_RANK() OVER (ORDER BY Salary DESC) as RankNum
    FROM Employees
)
SELECT EmployeeId, Salary FROM RankedSalaries WHERE RankNum = 2;
\`\`\`

---

## Q9: What is the \`MERGE\` Statement in SQL?
* Performs \`INSERT\`, \`UPDATE\`, and \`DELETE\` in a single atomic SQL statement by matching a Source dataset against a Target table on a join condition:

\`\`\`sql
MERGE INTO TargetTable AS T
USING SourceTable AS S ON T.Id = S.Id
WHEN MATCHED THEN
    UPDATE SET T.Name = S.Name, T.Price = S.Price
WHEN NOT MATCHED BY TARGET THEN
    INSERT (Id, Name, Price) VALUES (S.Id, S.Name, S.Price);
\`\`\`
`;

// =========================================================================================
// 5. EF CORE 10/10 MASTERY: Tracking, Concurrency & Bulk Operations (ef-03)
// =========================================================================================
window.INTERVIEW_LESSONS["ef-03"] = `# EF Core Lesson 3: 10/10 Mastery — Tracking, Concurrency, Compiled Queries & Bulk Operations

> **Target Audience:** 5-Year Full Stack .NET Senior Developer
> **Goal:** Master EF Core internal mechanics: Change Tracker snapshots, AsNoTracking performance, Concurrency Tokens, Compiled Queries, and Bulk ExecuteUpdate/ExecuteDelete.

---

## Q1: How does the EF Core Change Tracker work? Tracking vs \`AsNoTracking()\`
* **Change Tracker:** When an entity is queried, EF Core stores a snapshot of its initial property values in memory. When \`SaveChanges()\` is invoked, EF Core compares current property values against the initial snapshot to generate minimal SQL \`UPDATE\` statements.
* **\`AsNoTracking()\`:** Disables snapshot creation and tracking in the identity map. Yields significant memory reduction and 2–3x faster query performance. Mandatory for read-only queries and GET endpoints.

---

## Q2: How do you handle Optimistic Concurrency in EF Core?
* Add a \`[Timestamp]\` / \`byte[] RowVersion\` column to the entity.
* When EF Core generates an \`UPDATE\` statement, it appends \`WHERE Id = @id AND RowVersion = @originalRowVersion\`.
* If another concurrent user modified the row first, the database row count is 0, and EF Core throws a **\`DbUpdateConcurrencyException\`**.

\`\`\`csharp
public class Product
{
    public int Id { get; set; }
    public decimal Price { get; set; }

    [Timestamp]
    public byte[] RowVersion { get; set; } // Concurrency Token
}

// Handling in Controller:
try
{
    await _context.SaveChangesAsync();
}
catch (DbUpdateConcurrencyException ex)
{
    // Reload database values and notify user of conflict
}
\`\`\`

---

## Q3: What are Compiled Queries in EF Core?
* Pre-compiles LINQ query expressions into cached delegates via \`EF.CompileAsyncQuery(...)\`.
* Eliminates the overhead of parsing and translating LINQ expression trees into SQL on every request for high-throughput endpoints.

---

## Q4: Bulk Operations in EF Core 7/8+ (\`ExecuteUpdateAsync\` & \`ExecuteDeleteAsync\`)
* Historically, updating 10,000 records in EF Core required loading 10,000 entities into RAM, tracking them, and generating 10,000 individual SQL updates.
* In EF Core 7+, **\`ExecuteUpdateAsync()\`** and **\`ExecuteDeleteAsync()\`** translate LINQ directly into a single set-based SQL statement executed directly on the database without loading entities into memory or touching the Change Tracker.

\`\`\`csharp
// Generates: UPDATE Employees SET Salary = Salary * 1.10 WHERE DepartmentId = 5;
await context.Employees
    .Where(e => e.DepartmentId == 5)
    .ExecuteUpdateAsync(s => s.SetProperty(e => e.Salary, e => e.Salary * 1.10m));

// Generates: DELETE FROM AuditLogs WHERE CreatedAt < @date;
await context.AuditLogs
    .Where(a => a.CreatedAt < cutoffDate)
    .ExecuteDeleteAsync();
\`\`\`
`;

// =========================================================================================
// 6. SYSTEM DESIGN 10/10 MASTERY (sys-01 & sys-02)
// =========================================================================================
window.INTERVIEW_LESSONS["sys-01"] = `# System Design Lesson 1: Clean, Hexagonal & Onion Architectures

> **Target Audience:** 5-Year Full Stack .NET Senior Developer
> **Goal:** Master architectural design principles: Clean Architecture, Hexagonal (Ports & Adapters), and Onion Architecture.

---

## Q1: Clean Architecture vs Hexagonal vs Onion Architecture

\`\`\`diagram
                     CLEAN ARCHITECTURE CONCENTRIC RINGS
  
         ┌────────────────────────────────────────────────────────┐
         │ PRESENTATION / UI LAYER (Controllers, Razor Views)      │
         │  ┌──────────────────────────────────────────────────┐  │
         │  │ INFRASTRUCTURE LAYER (EF Core, Oracle, Redis)    │  │
         │  │  ┌────────────────────────────────────────────┐  │  │
         │  │  │ APPLICATION LAYER (Use Cases, CQRS, DTOs)  │  │  │
         │  │  │  ┌──────────────────────────────────────┐  │  │  │
         │  │  │  │ DOMAIN LAYER (Entities, Rules, Enums)│  │  │  │
         │  │  │  │  ★ CORE BUSINESS LOGIC (Zero Deps)   │  │  │  │
         │  │  │  └──────────────────────────────────────┘  │  │  │
         │  │  └───────────────────▲────────────────────────┘  │  │
         │  └──────────────────────┼───────────────────────────┘  │
         └─────────────────────────┴──────────────────────────────┘
                 DEPENDENCY FLOW: STRICTLY INWARD (DIP)
          (Outer layers depend on inner interfaces; Inner layers
                 never know about databases or frameworks!)
\`\`\`

* **The Shared Golden Rule:** All three adhere to the **Dependency Inversion Principle**—the core domain business logic never depends on databases, frameworks, or UI. Outer layers depend on inner abstractions.

### 1. Clean Architecture (Robert C. Martin / Uncle Bob)
* **Domain Layer (Center):** Entities, Domain Events, Enums (Zero external package dependencies).
* **Application Layer:** Use cases, Commands/Queries (CQRS / MediatR), DTOs, and Interfaces for external services.
* **Infrastructure Layer:** EF Core DbContext, Oracle database implementations, Redis, Email senders.
* **Presentation Layer:** ASP.NET Core Web API Controllers, Minimal APIs.

### 2. Hexagonal Architecture (Ports and Adapters)
* The Application Core sits inside the Hexagon.
* Communicates with the external world through **Ports** (interfaces) and **Adapters** (concrete implementations):
  * *Inbound / Driving Ports:* REST API Controllers, CLI commands calling the use cases.
  * *Outbound / Driven Ports:* Database repositories, Message queue publishers called by the core.

### 3. Onion Architecture (Jeffrey Palermo)
* Concentric rings where all layer dependencies strictly point inward towards the core Domain Model.
`;

window.INTERVIEW_LESSONS["sys-02"] = `# System Design Lesson 2: Scalability, Redis Caching, Resilience & CAP Theorem

> **Target Audience:** 5-Year Full Stack .NET Senior Developer
> **Goal:** Master scaling techniques, Redis caching strategies, Polly resilience (Circuit Breaker & Retry), CAP theorem, and Event-Driven architecture.

---

## Q1: Horizontal vs Vertical Scaling & Load Balancer Role
* **Vertical Scaling (Scale Up):** Adding CPU/RAM to a single server. Limited by hardware ceilings and creates a Single Point of Failure (SPOF).
* **Horizontal Scaling (Scale Out):** Adding multiple stateless app server nodes behind a **Load Balancer** (NGINX, Azure Application Gateway). Provides fault tolerance and elastic scale.
* **Algorithms:** Round Robin, Least Connections, IP Hash.

---

## Q2: Redis Distributed Caching: Strategies & Production Traps
* **Cache-Aside Pattern:** Check cache $\\rightarrow$ on miss read DB $\\rightarrow$ write to cache with TTL.
* **Cache Stampede:** Hot key expires and thousands of concurrent requests hammer the DB at once. *Fix:* Distributed locks (RedLock) or probabilistic early expiration.
* **Cache Penetration:** Requests for non-existent IDs bypass cache and hit DB. *Fix:* Bloom Filters or caching nulls with short TTL.

---

## Q3: Resilience Engineering: Retry with Jitter & Circuit Breaker (Polly)

\`\`\`diagram
                 POLLY CIRCUIT BREAKER STATE MACHINE
                 
         ┌────────────────────────────────────────────────┐
         │                 CLOSED STATE                   │
         │    (Healthy: All calls pass through to API)    │
         └───────────────────────┬────────────────────────┘
                                 │
                   Failures > Threshold (e.g., 50%)
                                 │
                                 ▼
         ┌────────────────────────────────────────────────┐
         │                  OPEN STATE                    │
         │ (Failing: Immediately throws without calling   │
         │  downstream service. Protects failing system!) │
         └───────────────────────┬────────────────────────┘
                                 │
                     Break Duration Expires (e.g. 30s)
                                 │
                                 ▼
         ┌────────────────────────────────────────────────┐
         │               HALF-OPEN STATE                  │
         │ (Testing: Sends trial probe requests to check) │
         └───────────────┬────────────────┬───────────────┘
                         │                │
                Probe Fails               Probe Succeeds
                         │                │
                         ▼                ▼
                     [ OPEN ]        [ CLOSED ]
\`\`\`

* **Retry with Exponential Backoff + Jitter:** Retries transient network failures with increasing delays plus randomized noise (jitter) to avoid thundering herd spikes.
* **Circuit Breaker:** Monitors failure rates. If failures exceed a threshold, the breaker trips to **Open** state, immediately failing incoming calls to allow the downstream service to recover before probing in **Half-Open** state.

---

## Q4: CAP Theorem in Distributed Systems
* In a distributed data store, across a Network Partition (**P**), you must choose between:
  * **Consistency (CP):** Every read receives the most recent write or an error (e.g., Banking ledgers, CockroachDB).
  * **Availability (AP):** Every request receives a non-error response without guarantee of having the latest data (Eventual Consistency, e.g., Cassandra, DynamoDB).

---

## Q5: Event-Driven Architecture & Message Queues
* Microservices communicate asynchronously by publishing Domain Events (e.g., \`OrderPlacedEvent\`) to a Message Broker (RabbitMQ, Kafka, Azure Service Bus). Consumers process events independently without synchronous HTTP blocking.
`;

// =========================================================================================
// 7. MICROSERVICES 10/10 MASTERY (ms-01 & ms-02)
// =========================================================================================
window.INTERVIEW_LESSONS["ms-01"] = `# Microservices Lesson 1: Architecture, gRPC & API Gateways

> **Target Audience:** 5-Year Full Stack .NET Senior Developer
> **Goal:** Master microservice decomposition, REST vs gRPC, and API Gateways.

---

## Q1: Why Microservices? What problems of Monoliths do they solve?
* **Monolith Problems:** Single deployment unit, tight code coupling, deployment bottlenecks, single point of failure, tech stack lock-in.
* **Microservices Solution:** Decomposes systems around business domains (DDD Bounded Contexts). Enables independent team deployments, independent scaling, and fault isolation.

---

## Q2: Communication: REST vs gRPC vs Message Brokers
* **REST (HTTP/JSON):** Synchronous, text-based, human-readable. Best for public client-facing APIs.
* **gRPC (HTTP/2 + Protobuf):** Synchronous, binary serialization, multiplexed, contract-first (\`.proto\`). 7–10x faster with smaller bandwidth. Standard for internal service-to-service communication.
* **Message Brokers (RabbitMQ/Kafka):** Asynchronous, event-driven decoupling.

---

## Q3: API Gateway & Service Discovery
* **API Gateway (YARP, Ocelot, Envoy):** Reverse proxy single entry point for clients. Handles request routing, SSL termination, rate limiting, and auth offloading.
* **Service Discovery (Kubernetes CoreDNS, Consul):** Dynamically tracks ephemeral IP addresses of auto-scaled container pods.
`;

window.INTERVIEW_LESSONS["ms-02"] = `# Microservices Lesson 2: Saga Pattern, Eventual Consistency, Docker & Kubernetes

> **Target Audience:** 5-Year Full Stack .NET Senior Developer
> **Goal:** Master distributed transactions, the Saga pattern, and containerization with Docker & Kubernetes.

---

## Q1: Database per Service & The Saga Pattern

\`\`\`diagram
                 DISTRIBUTED SAGA PATTERN: TWO STYLES
                 
  STYLE 1: CHOREOGRAPHY (Event-Driven Decentralized)
    [Order Service] ──► Event: OrderCreated ──► [Payment Service]
                                                       │
                                            Event: PaymentApproved
                                                       │
                                                       ▼
                                              [Inventory Service]
    * Rollback: Failed step publishes Compensating Event (e.g., RefundPayment).
    
  STYLE 2: ORCHESTRATION (Centralized Coordinator State Machine)
                     ┌───────────────────────┐
                     │   ORDER SAGA MANAGER  │ (Orchestrator)
                     └───────┬───────┬───────┘
                             │       │
              1. ExecutePay  │       │ 2. DeductStock
              ◄──────────────┘       └──────────────►
             [Payment Service]       [Inventory Service]
    * Rollback: If Stock fails, Orchestrator sends Compensating Command: RefundPayment!
\`\`\`

* **Database per Service:** Each microservice strictly owns its database. Services never query another service's tables directly.
* **The Saga Pattern:** Distributed transactions across microservices cannot use 2-Phase Commit (2PC) due to locking overhead. A Saga manages business transactions as a sequence of local transactions:
  * If a step fails, the Saga executes **Compensating Transactions** in reverse order to undo changes.
  * *Choreography:* Services publish/subscribe to events (decentralized).
  * *Orchestration:* A centralized state machine coordinator commands each service.

---

## Q2: Docker Containers & Kubernetes Fundamentals
* **Docker:** Packages application binaries, .NET runtime, and dependencies into an immutable container image running in an isolated OS namespace.
* **Kubernetes (K8s) Core Concepts:**
  * **Pod:** Smallest deployable unit running one or more containers.
  * **Deployment:** Declarative specification for rolling zero-downtime updates and replicas.
  * **Service & Ingress:** Exposes pods to internal/external traffic with load balancing.
  * **Horizontal Pod Autoscaler (HPA):** Auto-scales pod counts based on CPU/memory metrics.
`;

// =========================================================================================
// 8. MICROSOFT AZURE 10/10 MASTERY (az-01 & az-02)
// =========================================================================================
window.INTERVIEW_LESSONS["az-01"] = `# Azure Cloud Lesson 1: Fundamentals, IaaS/PaaS/SaaS & Core Services

> **Target Audience:** 5-Year Full Stack .NET Senior Developer
> **Goal:** Master Azure cloud foundations: IaaS vs PaaS vs SaaS, App Service, Azure SQL, Azure Storage, and Azure Functions.

---

## Q1: What is Azure? IaaS vs PaaS vs SaaS with Real Examples

\`\`\`diagram
                 CLOUD COMPUTING RESPONSIBILITY MATRIX
                 
  Layer                   On-Premises       IaaS           PaaS           SaaS
 ─────────────────────────────────────────────────────────────────────────────
  Applications             [ YOU ]        [ YOU ]        [ YOU ]        [ MSFT ]
  Data & Database          [ YOU ]        [ YOU ]        [ YOU ]        [ MSFT ]
  Runtime (.NET CLR)       [ YOU ]        [ YOU ]        [ MSFT ]       [ MSFT ]
  Operating System         [ YOU ]        [ YOU ]        [ MSFT ]       [ MSFT ]
  Virtualization           [ YOU ]        [ MSFT ]       [ MSFT ]       [ MSFT ]
  Physical Hardware        [ YOU ]        [ MSFT ]       [ MSFT ]       [ MSFT ]
 ─────────────────────────────────────────────────────────────────────────────
  Azure Example:          Local Server   Azure VM     App Service    Microsoft 365
\`\`\`

* **IaaS (Infrastructure as a Service):** Cloud provider manages hardware; you manage OS, patching, and runtimes (e.g., **Azure Virtual Machines**).
* **PaaS (Platform as a Service):** Provider manages OS, patching, and auto-scaling; you deploy only code and config (e.g., **Azure App Service**, **Azure SQL Database**).
* **SaaS (Software as a Service):** Fully managed end-user application (e.g., **Microsoft 365**).

---

## Q2: Core Azure Services for .NET Developers
* **Azure App Service:** Fully managed PaaS for hosting web apps and REST APIs with auto-scale, SSL, and zero-downtime deployment slots.
* **Azure SQL Database:** Managed DBaaS with automated backups, 99.99% SLA, and auto-tuning.
* **Azure Storage:** Scalable cloud storage (Blob for files/images, Queue for async messaging, Table for NoSQL).
* **Azure Functions:** Serverless event-driven compute billed per millisecond execution, triggered by HTTP, Timer, or Service Bus queues.
`;

window.INTERVIEW_LESSONS["az-02"] = `# Azure Cloud Lesson 2: Security (Managed Identity & Key Vault), CI/CD & App Insights

> **Target Audience:** 5-Year Full Stack .NET Senior Developer
> **Goal:** Master cloud security without passwords, Azure DevOps CI/CD pipelines, and Application Insights with KQL.

---

## Q1: Managed Identity & Azure Key Vault — Zero Passwords in Code
* **Azure Key Vault:** Centralized vault for storing encrypted secrets, certificates, and connection strings.
* **Managed Identity:** Eliminates hardcoded credentials in \`appsettings.json\`! Azure automatically registers the App Service in Microsoft Entra ID (Azure AD). When connecting to Key Vault or Azure SQL, the app authenticates using token-based OAuth via **\`DefaultAzureCredential\`** without any password in configuration files.

\`\`\`csharp
builder.Configuration.AddAzureKeyVault(
    new Uri("https://myvault.vault.azure.net/"),
    new DefaultAzureCredential());
\`\`\`

---

## Q2: CI/CD & Azure DevOps YAML Pipelines
* **Continuous Integration (CI):** Triggers on Pull Requests to compile code (\`dotnet build\`), execute unit tests (\`dotnet test\`), and run SonarQube quality analysis.
* **Continuous Deployment (CD):** Deploys built artifacts to Staging, runs smoke tests, and swaps deployment slots to Production with zero downtime and automated rollback.

---

## Q3: Application Insights & Log Analytics (KQL)
* **Application Insights:** APM tool monitoring live request rates, response times, unhandled exceptions, and distributed end-to-end transaction tracing across services.
* **Log Analytics & KQL Query Example:**
\`\`\`kusto
requests
| where timestamp > ago(24h) and success == false
| summarize count() by resultCode, name
| order by count_ desc
\`\`\`
`;
