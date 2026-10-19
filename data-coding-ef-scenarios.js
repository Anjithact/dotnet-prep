window.INTERVIEW_LESSONS = window.INTERVIEW_LESSONS || {};

window.INTERVIEW_LESSONS["code-01"] = `# Practical Coding Lesson 1: Top Oracle SQL & C# LINQ Queries (Side-by-Side)

---

## Query 1: Find the 2nd / Nth Highest Salary (Oracle SQL vs C# LINQ)
\`\`\`sql
-- Oracle SQL (Works for any Nth highest salary using DENSE_RANK):
SELECT emp_name, salary
FROM (
    SELECT emp_name, salary,
           DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
)
WHERE rnk = 2;
\`\`\`
\`\`\`csharp
// C# LINQ (Nth Highest Salary, e.g., n = 2):
var secondHighestSalary = employees
    .Select(e => e.Salary)
    .Distinct()
    .OrderByDescending(sal => sal)
    .Skip(1) // Skip (N - 1)
    .FirstOrDefault();
\`\`\`

---

## Query 2: Find Department-Wise Highest Salary (With Employee Name)
\`\`\`sql
-- Oracle SQL:
SELECT dept_id, emp_name, salary
FROM (
    SELECT dept_id, emp_name, salary,
           DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rnk
    FROM employees
)
WHERE rnk = 1;
\`\`\`
\`\`\`csharp
// C# LINQ:
var topByDept = employees
    .GroupBy(e => e.DeptId)
    .Select(g => g.OrderByDescending(e => e.Salary).FirstOrDefault())
    .ToList();
\`\`\`

---

## Query 3: Find Duplicate Records in a Table (Oracle SQL vs C# LINQ)
\`\`\`sql
-- Oracle SQL: Find duplicate emails
SELECT email, COUNT(*) AS cnt
FROM employees
GROUP BY email
HAVING COUNT(*) > 1;
\`\`\`
\`\`\`csharp
// C# LINQ:
var duplicateEmails = employees
    .GroupBy(e => e.Email)
    .Where(g => g.Count() > 1)
    .Select(g => new { Email = g.Key, Count = g.Count() })
    .ToList();
\`\`\`

---

## Query 4: Delete Duplicate Rows Keeping Only ONE Copy (Classic Oracle \`ROWID\` Query!)
\`\`\`sql
-- Oracle SQL: Keeps the row with the MAX(ROWID) for each email and deletes the duplicates!
DELETE FROM employees
WHERE ROWID NOT IN (
    SELECT MAX(ROWID)
    FROM employees
    GROUP BY email
);
\`\`\`

---

## Query 5: Find Employees Earning MORE Than Their Manager (Self Join)
\`\`\`sql
-- Oracle SQL (Self Join on EMPLOYEES table):
SELECT e.emp_name AS employee_name,
       e.salary   AS emp_salary,
       m.emp_name AS manager_name,
       m.salary   AS mgr_salary
FROM employees e
INNER JOIN employees m ON e.manager_id = m.emp_id
WHERE e.salary > m.salary;
\`\`\`

---

## Query 6: Find Departments That Have NO Employees (\`LEFT JOIN\` / \`NOT EXISTS\`)
\`\`\`sql
-- Oracle SQL:
SELECT d.dept_id, d.dept_name
FROM departments d
LEFT JOIN employees e ON d.dept_id = e.dept_id
WHERE e.emp_id IS NULL;
\`\`\`

---

## Query 7: Swap Gender (\`'M'\` to \`'F'\` and \`'F'\` to \`'M'\`) in a Single \`UPDATE\` Statement
\`\`\`sql
-- Oracle SQL:
UPDATE employees
SET gender = CASE
                 WHEN gender = 'M' THEN 'F'
                 WHEN gender = 'F' THEN 'M'
                 ELSE gender
             END;
\`\`\`

---

## Query 8: Calculate Running Total (Cumulative Salary) in Oracle SQL
\`\`\`sql
SELECT emp_id, emp_name, salary,
       SUM(salary) OVER (ORDER BY emp_id) AS running_total_salary
FROM employees;
\`\`\`
`;

window.INTERVIEW_LESSONS["code-02"] = `# Practical Coding Lesson 2: Top 15 C# Live Coding Programs

---

## Program 1: Reverse a String Without Built-In \`.Reverse()\`
\`\`\`csharp
public static string ReverseString(string str)
{
    if (string.IsNullOrEmpty(str)) return str;
    char[] chars = new char[str.Length];
    int j = 0;

    for (int i = str.Length - 1; i >= 0; i--)
    {
        chars[j++] = str[i];
    }
    return new string(chars);
}
\`\`\`

---

## Program 2: Reverse the Order of Words in a Sentence
\`\`\`csharp
public static string ReverseWords(string sentence)
{
    string[] words = sentence.Split(' ', StringSplitOptions.RemoveEmptyEntries);
    int left = 0, right = words.Length - 1;
    while (left < right)
    {
        string temp = words[left];
        words[left] = words[right];
        words[right] = temp;
        left++;
        right--;
    }
    return string.Join(" ", words);
}
\`\`\`

---

## Program 3: Check if a String or Number is a Palindrome
\`\`\`csharp
public static bool IsPalindrome(string str)
{
    int left = 0, right = str.Length - 1;
    while (left < right)
    {
        if (char.ToLower(str[left]) != char.ToLower(str[right]))
            return false;
        left++;
        right--;
    }
    return true;
}
\`\`\`

---

## Program 4: Count Frequency of Each Character in a String (\`Dictionary\` Pattern)
\`\`\`csharp
public static void CountCharacterFrequency(string input)
{
    Dictionary<char, int> freq = new Dictionary<char, int>();
    foreach (char c in input)
    {
        if (freq.ContainsKey(c)) freq[c]++;
        else freq[c] = 1;
    }
    foreach (var kvp in freq)
        Console.WriteLine($"{kvp.Key} : {kvp.Value}");
}
\`\`\`

---

## Program 5: Find the Second Largest Number in an Array (Single Loop)
\`\`\`csharp
public static int SecondLargest(int[] arr)
{
    int max = int.MinValue, secondMax = int.MinValue;
    foreach (int num in arr)
    {
        if (num > max)
        {
            secondMax = max;
            max = num;
        }
        else if (num > secondMax && num != max)
        {
            secondMax = num;
        }
    }
    return secondMax;
}
\`\`\`

---

## Program 6: Remove Duplicate Characters from a String Using \`HashSet<char>\`
\`\`\`csharp
public static string RemoveDuplicateChars(string input)
{
    HashSet<char> seen = new HashSet<char>();
    StringBuilder result = new StringBuilder();
    foreach (char c in input)
    {
        if (seen.Add(c)) result.Append(c);
    }
    return result.ToString();
}
\`\`\`

---

## Program 7: Two Sum (Find 2 Numbers That Add Up to Target)
\`\`\`csharp
public static int[] TwoSum(int[] nums, int target)
{
    Dictionary<int, int> seen = new Dictionary<int, int>();
    for (int i = 0; i < nums.Length; i++)
    {
        int needed = target - nums[i];
        if (seen.ContainsKey(needed))
            return new int[] { seen[needed], i };
        seen[nums[i]] = i;
    }
    return Array.Empty<int>();
}
\`\`\`

---

## Program 8: Swap Two Numbers Without a Third Variable
\`\`\`csharp
int a = 15, b = 25;
a = a + b; // 40
b = a - b; // 15
a = a - b; // 25
\`\`\`
`;

window.INTERVIEW_LESSONS["ef-01"] = `# ADO.NET & Data Access Lesson 1: DataReader vs DataSet, Connection Pooling & Calling Oracle Packages

---

## Q1: What is the difference between \`DataReader\` and \`DataSet\` / \`DataAdapter\` in ADO.NET?

| Feature | \`OracleDataReader\` / \`SqlDataReader\` | \`DataSet\` + \`DataAdapter\` |
| :--- | :--- | :--- |
| **Architecture** | **Connected Architecture** (Requires open DB connection while reading) | **Disconnected Architecture** (Loads all rows into RAM and closes DB connection immediately) |
| **Direction** | **Forward-only, Read-only** stream | Can navigate forward/backward, edit, and hold multiple \`DataTable\`s |
| **Speed & Memory** | **Extremely fast & uses minimal RAM** (Best for Web APIs & large results!) | **Slower & heavy RAM usage** (Used in legacy WinForms / ASMX Web Services) |

---

## Q2: What is the difference between \`ExecuteReader()\`, \`ExecuteNonQuery()\`, and \`ExecuteScalar()\`?
* **\`ExecuteReader()\`:** Used for \`SELECT\` queries returning **multiple rows and columns**.
* **\`ExecuteNonQuery()\`:** Used for \`INSERT\`, \`UPDATE\`, \`DELETE\`, or Stored Procedures; returns **the number of rows affected (\`int\`)**.
* **\`ExecuteScalar()\`:** Used when a query returns **only ONE single value** (1st row, 1st column, e.g., \`SELECT COUNT(*) FROM employees\`).

---

## Q3: What is Connection Pooling and why must you always wrap \`OracleConnection\` in a \`using\` block?
* **Simple Meaning:** Opening a physical network connection to Oracle takes time. **Connection Pooling** keeps a pool of ready-to-use connections alive. When you call \`conn.Close()\` or exit a \`using (var conn = new OracleConnection(...))\` block, the connection is **returned to the pool** for the next user instead of being destroyed. If you forget \`using\`/\`.Close()\`, the pool runs out of connections and throws a **Timeout error**!

---

## Q4: Complete C# Code — How to Call an Oracle Package Procedure with \`IN\`, \`OUT\`, and \`SYS_REFCURSOR\`
\`\`\`csharp
using Oracle.ManagedDataAccess.Client;
using System.Data;

public async Task<List<EmployeeDto>> GetEmployeesFromOracleAsync(int deptId)
{
    var list = new List<EmployeeDto>();

    using (var conn = new OracleConnection(_connectionString))
    using (var cmd = new OracleCommand("PKG_HR.SP_GET_DEPT_EMPS", conn))
    {
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.BindByName = true; // Best practice in Oracle ODP.NET!

        // 1. IN Parameter
        cmd.Parameters.Add("p_dept_id", OracleDbType.Int32, deptId, ParameterDirection.Input);

        // 2. OUT SYS_REFCURSOR Parameter
        cmd.Parameters.Add("p_cursor", OracleDbType.RefCursor, ParameterDirection.Output);

        await conn.OpenAsync();
        using (var reader = await cmd.ExecuteReaderAsync())
        {
            while (await reader.ReadAsync())
            {
                list.Add(new EmployeeDto
                {
                    Id = reader.GetInt32(0),
                    Name = reader.GetString(1),
                    Salary = reader.GetDecimal(2)
                });
            }
        }
    }
    return list;
}
\`\`\`

---

## Q5: When do you choose ADO.NET vs Dapper vs Entity Framework Core?
* **Entity Framework Core:** Best for standard CRUD operations, rapid development, compile-time LINQ safety, and automatic change tracking.
* **Dapper (Micro-ORM):** Best for high-performance read-heavy APIs and mapping Stored Procedure results to C# DTOs with near-ADO.NET speed and minimal code.
* **ADO.NET (\`OracleConnection\`):** Best when working heavily with legacy Oracle Packages, multiple \`SYS_REFCURSOR\` outputs, \`ArrayBindCount\` bulk inserts, or \`DataSet\`s in Windows Forms.
`;

window.INTERVIEW_LESSONS["ef-02"] = `# Entity Framework Core Lesson 2: DbContext, Tracking, AsNoTracking, Loading & N+1 Problem

---

## Q1: Why is \`DbContext\` registered as \`Scoped\` (and NEVER \`Singleton\`) in ASP.NET Core?
* **Answer:** \`DbContext\` is **NOT thread-safe** and maintains an in-memory **Change Tracker** of all entities loaded during a request. If it were \`Singleton\`, multiple concurrent HTTP requests would share the same \`DbContext\` simultaneously, causing crashes and memory leaks!

---

## Q2: What is Change Tracking in EF Core and why should you use \`.AsNoTracking()\` for Read-Only Queries?
* By default, whenever EF Core runs a \`SELECT\` query, it creates a snapshot of every entity in its **Change Tracker** in case you call \`SaveChangesAsync()\`.
* For **Read-Only APIs / Grid screens** where you only display data and never update it in that request, adding **\`.AsNoTracking()\`** skips creating tracking snapshots—making the query **30–40% faster and using much less RAM**!

\`\`\`csharp
var orders = await _context.Orders
    .AsNoTracking() // Fast read-only query!
    .Where(o => o.Status == "Completed")
    .ToListAsync();
\`\`\`

---

## Q3: Explain Eager Loading (\`Include\`), Lazy Loading, and the **N+1 Query Problem**.
* **The N+1 Query Problem:**
  * Suppose you fetch **100 Departments** (\`1 query\`), and then inside a \`foreach\` loop you access \`dept.Employees\` with Lazy Loading enabled. EF Core executes **100 separate SQL queries** (1 for each department) = **101 database trips**!
* **The Fix (Eager Loading with \`.Include()\`):**
  * Use \`.Include(d => d.Employees)\` so EF Core fetches all departments and their employees in **1 single SQL \`JOIN\` query** (or \`.AsSplitQuery()\` to avoid Cartesian explosion)!

\`\`\`csharp
var departments = await _context.Departments
    .AsNoTracking()
    .Include(d => d.Employees) // Solves N+1 problem in 1 SQL query!
    .ToListAsync();
\`\`\`

---

## Q4: How do you handle Concurrency Conflicts in EF Core? (\`[Timestamp]\` / \`RowVersion\`)
* Suppose Admin A and Admin B both open Invoice #101 at the same time and both click Save.
* By adding a \`[Timestamp] public byte[] RowVersion { get; set; }\` (or \`[ConcurrencyCheck]\`) property to the entity, EF Core adds \`WHERE RowVersion = @oldVersion\` to the \`UPDATE\` SQL. If another user modified the row first, EF Core throws **\`DbUpdateConcurrencyException\`** so you can alert the user instead of silently overwriting data!
`;

window.INTERVIEW_LESSONS["scen-01"] = `# Chapter 10: Project Architecture, Production Debugging, Unit Testing & Git

---

## Q1: How do you explain your Project Architecture in an Interview?
* **Speak this clear 4-Layer Architecture flow:**
  1. **Presentation / UI Layer:** ASP.NET Core MVC Razor Views (with JavaScript/jQuery AJAX) and Windows Forms / Web Clients.
  2. **API / Controller Layer:** Thin Controllers that handle Routing, JWT/Cookie Authentication, Model Validation, and return Views or JSON DTOs.
  3. **Business / Service Layer (\`IOrderService\`):** Contains all core business rules, calculations, Caching (\`IMemoryCache\`), and Transaction coordination.
  4. **Data Access & Database Layer (\`IOrderRepository\` + Oracle DB):** Uses EF Core / ADO.NET (\`Oracle.ManagedDataAccess\`) to call **Oracle PL/SQL Packages, Stored Procedures (\`SYS_REFCURSOR\`), Functions, and Triggers**.

---

## Q2: Scenario — "A Page or API in Production suddenly became very slow (taking 20 seconds). How do you debug and fix it?"
1. **Check Application Logs / Timing:** Check Serilog / Application logs to see if the delay is in the C# code, external API call, or Database query.
2. **Capture the SQL Query & Check Oracle \`EXPLAIN PLAN\`:** Run \`EXPLAIN PLAN\` on the Oracle query to check if it is doing a **Full Table Scan** on a large table.
3. **Database Fixes:** Add missing B-Tree/Function-based indexes, remove functions on indexed \`WHERE\` columns (\`TRUNC(date)\`), replace slow row-by-row PL/SQL cursor loops with \`BULK COLLECT\` + \`FORALL\`, and gather fresh table stats.
4. **C# / API Fixes:** Add **Server-Side Pagination** (fetch 20 rows per page instead of 100,000 rows), add \`.AsNoTracking()\`, fix N+1 queries, and cache master dropdown data in \`IMemoryCache\`.

---

## Q3: How do you write a Unit Test in C# using \`xUnit\` and \`Moq\`? (Arrange-Act-Assert Pattern)
\`\`\`csharp
using Moq;
using Xunit;

public class OrderServiceTests
{
    [Fact]
    public async Task GetOrderById_ReturnsOrder_WhenOrderExists()
    {
        // 1. ARRANGE: Create fake Mock repository so we don't hit real Oracle DB
        var mockRepo = new Mock<IOrderRepository>();
        mockRepo.Setup(r => r.GetByIdAsync(101))
                .ReturnsAsync(new Order { Id = 101, TotalAmount = 2500 });

        var service = new OrderService(mockRepo.Object);

        // 2. ACT: Call the method being tested
        var result = await service.GetOrderByIdAsync(101);

        // 3. ASSERT: Verify the result
        Assert.NotNull(result);
        Assert.Equal(2500, result.TotalAmount);
    }
}
\`\`\`

---

## Q4: Top Git Questions Asked in Interviews (\`fetch\` vs \`pull\`, \`merge\` vs \`rebase\`)
* **\`git fetch\` vs \`git pull\`:** \`git fetch\` downloads new commits from remote without changing your local working files. \`git pull\` does \`git fetch\` + \`git merge\` into your current branch immediately.
* **\`git merge\` vs \`git rebase\`:** \`git merge\` combines branches by creating a merge commit while preserving full history. \`git rebase\` replays your commits on top of the target branch to create a clean, straight linear history.
* **\`git stash\`:** Temporarily shelves uncommitted changes so you can switch branches to fix an urgent production bug, then restore your work with \`git stash pop\`.

---

## Q5: Scenario — "How do you prevent Duplicate Form Submissions or Double Payments when a user double-clicks Submit?"
1. **Frontend (JavaScript):** Immediately disable the Submit button on click (\`btn.disabled = true;\`).
2. **Backend MVC (PRG Pattern):** Use the **Post-Redirect-Get (PRG)** pattern so pressing \`F5\` (Refresh) after submitting a form only refreshes the GET page, not the POST action.
3. **Database / API (Idempotency Key + Unique Constraint):** Send a unique \`RequestId / Idempotency-Key\` GUID with the form/request and enforce a Unique Constraint on \`TransactionReference\` in Oracle so the second request is rejected safely!
`;

window.INTERVIEW_LESSONS["eng-01"] = `# Chapter 11: Spoken English & Communication Mastery for .NET Technical Interviews

> **Important Truth About Technical Interviews:**
> Interviewers are **NOT** testing if you speak fancy British/American English or use big grammar words.
> They only care about **Clarity** and **Technical Keywords**.
> If you speak **simple, short sentences** with the **right .NET keywords**, you will beat candidates who speak fast English without real project knowledge!

---

## 1. The Golden Rule: Use the "3-Sentence Formula" for Every Question

Many developers with weak English struggle because they try to speak **long, complicated sentences** and get stuck halfway.
Instead, break **EVERY** technical answer into **3 short, simple sentences**:

1. **Sentence 1 (What it is — Simple Definition):**
   * *"Sir, \`[Topic]\` is used to \`[Main Purpose]\`."*
2. **Sentence 2 (How it works — Key Technical Words):**
   * *"It works using \`[Keyword 1]\` and \`[Keyword 2]\`."*
3. **Sentence 3 (Where I used it in my Project):**
   * *"In my MVC Core project, I used it in \`[Module Name]\` to \`[Result]\`."*

### Example: Interviewer asks "What is Dependency Injection?"
* **Speak these 3 simple sentences:**
  1. *"Dependency Injection means instead of creating objects manually using the \`new\` keyword, the framework creates and passes the object for us."*
  2. *"In ASP.NET Core, we register services in \`Program.cs\` using \`AddTransient\`, \`AddScoped\`, or \`AddSingleton\` and inject the interface into the Controller constructor."*
  3. *"In my MVC Core project, I used \`AddScoped\` to inject \`IOrderService\` and \`IOrderRepository\` into my Controllers so the code is loosely coupled."*

---

## 2. Ready-to-Use Speaking Starters (Memorize These 8 Phrases!)

| Situation in Interview | Exact Simple English Sentence to Speak |
| :--- | :--- |
| **Starting any definition** | *"Basically, the main purpose of \`[Topic]\` is to..."* |
| **Comparing two things (\`A\` vs \`B\`)** | *"There are three main differences between \`[A]\` and \`[B]\`. First..."* |
| **Giving your project example** | *"In my current ASP.NET Core MVC project, we implemented this in the..."* |
| **When you need 3 seconds to think** | *"That's a good question. Let me explain it with an example from my project."* |
| **When you know the code practically, but forgot the exact English word** | *"I have implemented this many times in my project. Let me explain the step-by-step code flow..."* |
| **When you didn't understand the interviewer's accent/question** | *"Sorry, your voice broke slightly. Could you please repeat the last part of the question?"* |
| **When you know 50% of the answer** | *"I haven't used this exact feature in production, but my understanding is that it works by..."* |
| **When you don't know the answer at all** | *"I haven't got a chance to work on this specific concept yet, but I am comfortable with \`[Related Topic]\`."* |

---

## 3. Word-for-Word "Tell Me About Yourself" Script (Speak Slowly — 90 Seconds)

Practice reading this out loud **5 times every morning** until it sounds natural:

> *"Good morning / Good afternoon. Thank you for giving me this opportunity.*
>
> *My name is \`[Your Name]\`. I have **5 years of hands-on experience** as a **Full-Stack .NET Developer**.*
>
> *During these 5 years, I have worked on **more than 5 end-to-end projects**, including **ASP.NET Core MVC web applications**, **RESTful Web APIs**, **Enterprise Windows Forms applications**, and **Web Services**.*
>
> *On the backend, my strong areas are **C#, ASP.NET Core MVC, Web API, Dependency Injection, Entity Framework Core, and ADO.NET**.*
> *On the database side, I have strong experience in **Oracle SQL and PL/SQL**—writing complex **Stored Procedures, Functions, Packages, Triggers, Cursors, and performance tuning**.*
> *On the frontend, I work with **JavaScript, jQuery, AJAX, HTML, CSS, and Razor Views**.*
>
> *In my current role, my daily responsibilities include gathering requirements, designing database tables and PL/SQL packages, developing MVC controllers and APIs, fixing production issues, and deploying applications.*
>
> *I am a strong practical developer who can build new projects from scratch as well as handle complex existing projects independently. Now, I am looking for a Senior .NET Developer role where I can contribute my practical experience and grow further."*

---

## 4. Word-for-Word Answers for Common HR & Managerial Questions

### HR Q1: "Why are you looking for a change?"
> *"I have had a great learning experience in my current company and successfully delivered multiple projects. Now, after 5 years of experience, I am looking for better technical challenges, larger enterprise projects, and career growth at a senior position."*

### HR Q2: "You graduated in Electronics & Communication (ECE). How did you come into IT / .NET?"
> *"Even during my B.Tech in Electronics, I had a strong interest in programming and logic building. Right from the start of my career, I joined software development in .NET. Over the last 5 years, I have built more than 5 complete production applications in .NET and Oracle, so software development is my core strength now."*

### HR Q3: "What is your biggest strength?"
> *"My biggest strength is my **practical problem-solving ability**. Even if I am given a completely new project from scratch or a big existing codebase with no documentation, I can debug the flow quickly, understand the database and code, and deliver the requirement on time."*

---

## 5. The Best 15-Minute Daily Method to Improve Spoken English Fast

1. **Step 1 (Pick 5 Questions Daily):** Open any lesson in \`Interview-Portal.html\`.
2. **Step 2 (Read Out Loud Twice):** Don't read silently in your head! Your mouth and tongue need muscle memory to pronounce words like *Encapsulation, Polymorphism, Middleware, Idempotency, Serialization*. Read the **"Interview Answer"** block out loud twice.
3. **Step 3 (Close the Screen & Record 60 Seconds on Your Phone):** Open the Voice Recorder on your mobile phone, look away from the screen, and explain the answer in your own simple 3 sentences.
4. **Step 4 (Listen Back):** Listen to your recording. Repeat just once more. Within **10 days**, your speaking fluency and confidence in technical interviews will jump dramatically!
`;

