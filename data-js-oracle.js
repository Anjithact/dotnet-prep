window.INTERVIEW_LESSONS = window.INTERVIEW_LESSONS || {};

window.INTERVIEW_LESSONS["js-01"] = `# JavaScript Lesson 1: Data Types, == vs ===, var/let/const, Hoisting & Closures

---

## Q1: What are the Data Types in JavaScript? What is the difference between \`null\` and \`undefined\`?
* **Primitive Types (7):** \`string\`, \`number\`, \`boolean\`, \`undefined\`, \`null\`, \`symbol\`, \`bigint\`.
* **Reference Types:** \`Object\`, \`Array\`, \`Function\`.
* **\`undefined\` vs \`null\`:**
  * **\`undefined\`:** A variable has been declared (\`let x;\`), but **no value has been assigned yet**. (\`typeof undefined\` is \`"undefined"\`).
  * **\`null\`:** An **intentional assignment of "no value / empty"** (\`let user = null;\`). (\`typeof null\` is famously \`"object"\` due to a historic JS bug!).

---

## Q2: What is the difference between \`==\` (Loose Equality) and \`===\` (Strict Equality)?
* **\`==\` (Loose Equality):** Compares **only value** after performing automatic **type conversion (coercion)**. E.g., \`5 == "5"\` is \`true\`, and \`null == undefined\` is \`true\`.
* **\`===\` (Strict Equality):** Compares **BOTH value AND data type** without converting types! E.g., \`5 === "5"\` is \`false\`. **Always use \`===\` in projects!**

---

## Q3: What is the difference between \`var\`, \`let\`, and \`const\`? (100% Guaranteed JS Question)

| Feature | \`var\` (Old ES5) | \`let\` (Modern ES6) | \`const\` (Modern ES6) |
| :--- | :--- | :--- | :--- |
| **Scope** | **Function Scoped** (leaks out of \`if\`/\`for\` blocks!) | **Block Scoped \`{ }\`** | **Block Scoped \`{ }\`** |
| **Redeclaration** | Allowed (\`var x = 1; var x = 2;\`) | **Not allowed** in same scope | **Not allowed** |
| **Reassignment** | Allowed | Allowed (\`x = 10;\`) | **Not allowed** (Note: object properties inside a \`const obj\` CAN be modified!) |
| **Hoisting** | Hoisted and initialized as \`undefined\` | Hoisted into **Temporal Dead Zone (TDZ)** (throws \`ReferenceError\` if used before declaration) | Hoisted into **TDZ** |

---

## Q4: What is Hoisting in JavaScript?
* **Simple Meaning:** Before running your code, JavaScript moves all **variable and function declarations** to the top of their scope.
  * Normal function declarations (\`function test() {}\`) are fully hoisted, so you can call them before the line where they are written.
  * \`var\` variables are hoisted with value \`undefined\`.
  * \`let\` and \`const\` are hoisted into the **Temporal Dead Zone (TDZ)** and throw a \`ReferenceError\` if accessed before their line.

\`\`\`javascript
console.log(a); // Output: undefined (Hoisted var)
var a = 10;

console.log(b); // Throws ReferenceError: Cannot access 'b' before initialization
let b = 20;
\`\`\`

---

## Q5: What is a **Closure** in JavaScript? Give a Practical Example.
* **Simple Meaning:** A **Closure** is when an **inner function remembers and can access variables from its outer parent function**, even **after** the outer function has finished executing!
* **Interview Answer (What to Speak):**
  > "A Closure is a function bundled together with references to its surrounding outer lexical scope. Even after the outer function has returned, the inner function retains access to the outer function's variables. We use closures for **data privacy (encapsulation)**, event handlers, and callbacks."

\`\`\`javascript
function createCounter() {
    let count = 0; // Private variable - cannot be accessed directly from outside!

    return function () {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`
`;

window.INTERVIEW_LESSONS["js-02"] = `# JavaScript Lesson 2: Functions vs Arrow Functions, Arrays, DOM & Events

---

## Q1: What is the difference between a Normal Function and an Arrow Function (\`() => {}\`)?
1. **\`this\` Keyword:** A normal function has its own dynamic \`this\` (depending on who called it). An **Arrow Function does NOT have its own \`this\`**—it inherits \`this\` from its outer surrounding scope!
2. **\`arguments\` Object:** Normal functions have the \`arguments\` object; Arrow functions do not (use rest parameters \`...args\` instead).
3. **Constructor (\`new\`):** Normal functions can be called with \`new\`; Arrow functions cannot.

---

## Q2: Explain \`map()\`, \`filter()\`, \`reduce()\`, and \`find()\` in JavaScript Arrays.
\`\`\`javascript
const employees = [
    { id: 1, name: "Rahul", salary: 40000, dept: "IT" },
    { id: 2, name: "Anita", salary: 70000, dept: "IT" },
    { id: 3, name: "Vikram", salary: 50000, dept: "HR" }
];

// 1. filter(): Returns a NEW array with matching items (like LINQ .Where())
const itStaff = employees.filter(e => e.dept === "IT");

// 2. map(): Transforms each item into a NEW array (like LINQ .Select())
const names = employees.map(e => e.name); // ["Rahul", "Anita", "Vikram"]

// 3. find(): Returns the FIRST matching object (like LINQ .FirstOrDefault())
const emp2 = employees.find(e => e.id === 2);

// 4. reduce(): Accumulates array into a single value (like LINQ .Sum())
const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0); // 160000
\`\`\`

---

## Q3: What is the difference between \`slice()\` and \`splice()\`?
* **\`slice(start, end)\`:** **Does NOT modify** the original array; returns a shallow copy of a portion of the array.
* **\`splice(start, deleteCount, ...items)\`:** **MODIFIES (mutates)** the original array by removing, replacing, or inserting elements in place!

---

## Q4: What is Event Bubbling, \`event.preventDefault()\`, \`event.stopPropagation()\`, and Event Delegation?
* **Event Bubbling:** When you click a \`<button>\` inside a \`<div>\`, the click event fires on the \`<button>\` first, then bubbles up to the parent \`<div>\`, \`<body>\`, and \`document\`.
* **\`event.stopPropagation()\`:** Stops the event from bubbling up to parent elements.
* **\`event.preventDefault()\`:** Stops the browser's default action (e.g., prevents an HTML \`<form>\` from refreshing the page on submit).
* **Event Delegation:** Instead of attaching 500 click listeners to 500 table rows (and breaking when new rows are added via AJAX), attach **ONE click listener on the parent \`<table>\`** and check \`event.target\`!

---

## Q5: What is the difference between \`localStorage\`, \`sessionStorage\`, and \`Cookies\`?

| Feature | \`localStorage\` | \`sessionStorage\` | \`Cookies\` |
| :--- | :--- | :--- | :--- |
| **Capacity** | ~5–10 MB | ~5 MB | **4 KB only** |
| **Lifespan** | **Never expires** (until cleared by JS/user) | **Cleared as soon as the browser tab is closed** | Expires based on \`Expires\`/\`Max-Age\` |
| **Sent to Server automatically?** | **No** (Client-side only) | **No** (Client-side only) | **Yes! Sent in every HTTP request header** |
`;

window.INTERVIEW_LESSONS["js-03"] = `# JavaScript Lesson 3: Event Loop, Promises, async/await, fetch() & AJAX

---

## Q1: How does the JavaScript Event Loop work if JS is Single-Threaded?

\`\`\`diagram
                    JAVASCRIPT EVENT LOOP ARCHITECTURE
                    
      CALL STACK (Single Thread)                     WEB APIs (Browser / Node)
  ┌────────────────────────────────┐              ┌─────────────────────────────┐
  │ console.log("Done")            │              │ DOM Events (click, scroll)  │
  │ asyncFunction()                │              │ fetch() / AJAX HTTP network │
  │ main()                         │              │ setTimeout() / setInterval  │
  └───────────────┬────────────────┘              └──────────────┬──────────────┘
                  │                                              │
                  │ Call Stack executes synchronously.           │ Handed off to browser threads.
                  │ When empty, Event Loop fetches next task:    │ When done, callbacks pushed to:
                  ▼                                              ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                                 EVENT LOOP                                  │
  │   Continuously checks: Is Call Stack empty?                                 │
  │   1. First, drain ALL tasks from MICROTASK QUEUE until completely empty.    │
  │   2. Next, pick ONE task from MACROTASK QUEUE and push to Call Stack.       │
  └───────────────▲──────────────────────────────────────────────▲──────────────┘
                  │                                              │
      MICROTASK QUEUE (High Priority)               MACROTASK QUEUE (Normal Priority)
  ┌────────────────────────────────┐              ┌─────────────────────────────┐
  │ • Promise callbacks (.then)    │              │ • setTimeout / setInterval  │
  │ • async / await continuations  │              │ • I/O operations            │
  │ • queueMicrotask()             │              │ • setImmediate (Node.js)    │
  └────────────────────────────────┘              └─────────────────────────────┘
  * RULE: Microtasks ALWAYS execute BEFORE the next Macrotask runs!
\`\`\`

* **Simple Meaning:** JavaScript has **only ONE Call Stack** (it runs one line of code at a time). When an asynchronous operation like \`setTimeout\`, \`fetch()\`, or an AJAX call starts, the browser's **Web APIs** handle the waiting in the background. Once finished, callbacks are placed in the **Microtask Queue** (Promises) or **Macrotask/Callback Queue** (\`setTimeout\`), and the **Event Loop** pushes them onto the Call Stack as soon as the Call Stack is empty!
* **Important Output Rule:** **Microtasks (Promises \`.then\`) ALWAYS run BEFORE Macrotasks (\`setTimeout\`)!**

---

## Q2: What is a Promise and what are its 3 States?
* A **Promise** is an object representing the eventual completion or failure of an asynchronous operation.
* **3 States:**
  1. **\`Pending\`:** Initial waiting state.
  2. **\`Fulfilled (Resolved)\`:** Operation completed successfully (\`.then()\`).
  3. **\`Rejected\`:** Operation failed (\`.catch()\`).

---

## Q3: How do you call an ASP.NET Core Controller / Web API from JavaScript using \`async/await\` + \`fetch()\` or jQuery \`$.ajax()\`?
\`\`\`javascript
// 1. Modern Fetch API with async/await:
async function saveOrder(orderDto) {
    try {
        const response = await fetch('/api/orders/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
            },
            body: JSON.stringify(orderDto)
        });

        if (!response.ok) {
            throw new Error('Failed with status ' + response.status);
        }

        const result = await response.json();
        alert('Order saved! ID: ' + result.orderId);
    } catch (error) {
        console.error('Error:', error);
    }
}

// 2. jQuery $.ajax() (Commonly used in ASP.NET MVC Razor Views):
$.ajax({
    url: '/Order/Create',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(orderDto),
    success: function (res) {
        alert('Saved: ' + res.orderId);
    },
    error: function (xhr) {
        alert('Error saving order');
    }
});
\`\`\`

---

## Q4: What is Debouncing vs Throttling in JavaScript?
* **Debouncing:** Waits until the user **stops typing for X milliseconds** (e.g., 300ms) before firing the API call. Used in **Search bars / Autocomplete textboxes** so typing \`"laptop"\` sends **1 API call** instead of 6 calls!
* **Throttling:** Ensures a function runs **at most once every X milliseconds** (e.g., during window scroll or resize events).
`;

window.INTERVIEW_LESSONS["ora-01"] = `# Oracle SQL & PL/SQL Lesson 1: Joins, Subqueries, Analytical Functions & Oracle Built-ins

---

## Q1: What is the difference between \`DELETE\`, \`TRUNCATE\`, and \`DROP\` in Oracle?

| Feature | \`DELETE\` (DML) | \`TRUNCATE\` (DDL) | \`DROP\` (DDL) |
| :--- | :--- | :--- | :--- |
| **Type** | **DML** (Data Manipulation) | **DDL** (Data Definition) | **DDL** |
| **\`WHERE\` Clause?** | **Yes** (Can delete specific rows) | **No** (Deletes ALL rows) | **No** (Drops entire table structure + data + indexes) |
| **Can \`ROLLBACK\`?** | **YES** (Before \`COMMIT\`) | **NO!** (Implicitly commits in Oracle) | **NO!** (Can only recover from \`FLASHBACK\` RecycleBin if enabled) |
| **Fires Triggers?** | **YES** (Fires \`BEFORE/AFTER DELETE\` triggers) | **NO** | **NO** |
| **High Water Mark (HWM)** | Does **NOT** reset HWM (slower full table scans) | **Resets HWM** & frees space | Removes segment completely |

---

## Q2: Explain all Types of Joins in Oracle SQL + The Classic Interview Row-Count Question!

\`\`\`diagram
                 SQL JOINS VENN & SET THEORY VISUALIZATION
                 
  1. INNER JOIN (Intersection)          2. LEFT JOIN (All Left + Matching Right)
       ┌──────────┬──────────┐               ┌──────────┬──────────┐
       │          │██████████│               │██████████│██████████│
       │  Table A │██MATCHED█│ Table B       │██Table A█│██MATCHED█│ Table B
       │          │██ ONLY  █│               │██ (All) █│██ ONLY  █│ (NULL if no match)
       └──────────┴──────────┘               └──────────┴──────────┘

  3. RIGHT JOIN (All Right + Match Left)4. FULL OUTER JOIN (Everything)
       ┌──────────┬──────────┐               ┌──────────┬──────────┐
       │          │██████████│██████████│    │██████████│██████████│██████████│
       │  Table A │██MATCHED█│██Table B█│    │██Table A█│██MATCHED█│██Table B█│
       │(NULL row)│██ ONLY  █│██ (All) █│    │██ (All) █│██  BOTH █│██ (All) █│
       └──────────┴──────────┘               └──────────┴──────────┘

  5. LEFT ANTI-JOIN (Left Excluding Inner)
       ┌──────────┬──────────┐
       │██████████│          │
       │██Left A██│  Matched │ Table B
       │██ ONLY █│ (Omitted) │
       └──────────┴──────────┘
       Syntax: SELECT * FROM A LEFT JOIN B ON A.id = B.id WHERE B.id IS NULL;

──────────────────────────────────────────────────────────────────────────────
                   ROW-COUNT COMBINATORIAL MATCHING TRAP
  Table A: (1, 1, 2)            Table B: (1, 1, 1, 3)
  
  Matches for Key '1':
    A.Row 1 ('1') ──► B.Row 1 ('1'), B.Row 2 ('1'), B.Row 3 ('1')  = 3 rows
    A.Row 2 ('1') ──► B.Row 1 ('1'), B.Row 2 ('1'), B.Row 3 ('1')  = 3 rows
  Total Matching for Key '1' = 2 × 3 = 6 rows!
  
  Unmatched Keys:
    A.Row 3 ('2') ──► No match in B (Emits NULL in LEFT JOIN)       = 1 row
    
  ► INNER JOIN Result:  6 Rows
  ► LEFT JOIN Result:   7 Rows (6 matched + 1 unmatched NULL)
  ► FULL JOIN Result:   8 Rows (6 matched + 1 for '2' + 1 for '3')
\`\`\`

* **\`INNER JOIN\`:** Returns only matching rows present in **both** tables.
* **\`LEFT OUTER JOIN\`:** Returns **all rows from Left table** + matching rows from Right table (\`NULL\` if no match).
* **\`RIGHT OUTER JOIN\`:** Returns **all rows from Right table** + matching rows from Left table.
* **\`FULL OUTER JOIN\`:** Returns all rows from both tables.
* **\`SELF JOIN\`:** Joining a table to itself (e.g., finding an Employee's Manager name from the same \`EMPLOYEES\` table!).

* **Favorite Interview Trap Question: "Table A has rows \`(1, 1, 2)\` and Table B has rows \`(1, 1, 1, 3)\`. How many rows will \`INNER JOIN\` and \`LEFT JOIN\` return?"**
  * **Matching \`1\`s:** two \`1\`s in Table A $\\times$ three \`1\`s in Table B = **$2 \\times 3 = 6$ rows**!
  * **\`INNER JOIN\` Output:** **6 rows** (only \`1\` matches).
  * **\`LEFT JOIN\` Output:** **7 rows** (6 rows for \`1\`, plus 1 row for \`2\` with \`NULL\`).

---

## Q3: What is the difference between \`WHERE\` and \`HAVING\`? What is the logical order of SQL execution?
* **\`WHERE\`:** Filters **individual rows BEFORE** \`GROUP BY\` aggregation. Cannot contain aggregate functions like \`SUM()\` or \`COUNT()\`.
* **\`HAVING\`:** Filters **grouped summary rows AFTER** \`GROUP BY\`. Can contain \`COUNT()\`, \`SUM()\`, \`AVG()\`.
* **Logical Order of SQL Execution:** \`FROM\` / \`JOIN\` $\\rightarrow$ \`WHERE\` $\\rightarrow$ \`GROUP BY\` $\\rightarrow$ \`HAVING\` $\\rightarrow$ \`SELECT\` $\\rightarrow$ \`ORDER BY\`.

---

## Q4: What is the difference between \`ROW_NUMBER()\`, \`RANK()\`, and \`DENSE_RANK()\` in Oracle?
Suppose 4 employees have salaries: \`90000, 80000, 80000, 70000\` (two people tied at \`80000\`):

| Salary | \`ROW_NUMBER()\` | \`RANK()\` | \`DENSE_RANK()\` |
| :--- | :---: | :---: | :---: |
| \`90000\` | \`1\` | \`1\` | \`1\` |
| \`80000\` | \`2\` | \`2\` | \`2\` |
| \`80000\` | \`3\` (No ties) | \`2\` (Tied!) | \`2\` (Tied!) |
| \`70000\` | \`4\` | **\`4\` (Skips 3!)** | **\`3\` (Does NOT skip 3!)** |

* **Always use \`DENSE_RANK()\` when asked to find the Nth Highest Salary in Oracle!**
\`\`\`sql
-- Find 3rd Highest Salary in Oracle (or Department-wise by adding PARTITION BY dept_id):
SELECT emp_name, dept_id, salary
FROM (
    SELECT emp_name, dept_id, salary,
           DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rnk
    FROM employees
)
WHERE rnk = 1; -- Top salary in each department!
\`\`\`

---

## Q5: What is the difference between \`UNION\` and \`UNION ALL\`, and \`IN\` vs \`EXISTS\`?
* **\`UNION\` vs \`UNION ALL\`:** \`UNION\` removes duplicates and sorts the result (slow!). \`UNION ALL\` keeps all rows including duplicates without sorting (**much faster!**).
* **\`IN\` vs \`EXISTS\`:** \`EXISTS\` stops scanning the subquery the moment it finds the **first matching row** (short-circuiting) and handles \`NULL\` values safely (whereas \`NOT IN\` returns **0 rows** if the subquery contains even a single \`NULL\`!).

---

## Q6: Oracle Specific Functions — \`NVL\`, \`NVL2\`, \`COALESCE\`, \`DECODE\` vs \`CASE\`, \`ROWID\` vs \`ROWNUM\`
* **\`NVL(col, 0)\`:** Replaces \`NULL\` with \`0\` (Oracle-specific, evaluates both arguments).
* **\`NVL2(col, val_if_not_null, val_if_null)\`:** 3-argument Oracle check.
* **\`COALESCE(a, b, c, 0)\`:** ANSI standard, returns the first non-null value and short-circuits!
* **\`ROWID\` vs \`ROWNUM\`:**
  * **\`ROWID\`:** Permanent **physical disk address** of a row in Oracle datafiles (fastest way to locate or delete duplicate rows!).
  * **\`ROWNUM\`:** Temporary sequential number (\`1, 2, 3...\`) assigned to output rows as they are fetched. (**Trap:** \`WHERE ROWNUM = 2\` or \`WHERE ROWNUM > 5\` ALWAYS returns **0 rows** unless wrapped in a subquery!).
`;

window.INTERVIEW_LESSONS["ora-02"] = `# Oracle SQL & PL/SQL Lesson 2: Constraints, Views vs Materialized Views, Indexes & Query Tuning

---

## Q1: What is the difference between a \`PRIMARY KEY\` and a \`UNIQUE KEY\` in Oracle?
* **Primary Key:** Only **ONE** per table; **cannot be \`NULL\`**; automatically creates a Unique Index.
* **Unique Key:** Can have **MULTIPLE** per table; **allows \`NULL\` values** in Oracle!

---

## Q2: What is the difference between a **View** and a **Materialized View** in Oracle?

| Feature | Normal \`VIEW\` | \`MATERIALIZED VIEW\` (MView) |
| :--- | :--- | :--- |
| **Physical Storage** | **Stores NO data** (Just a saved SQL query that runs every time you select from it) | **Physically stores the query result rows on disk** like a table! |
| **Performance** | Slow for heavy joins/aggregations over millions of rows | **Extremely fast** for complex reporting/dashboards |
| **Data Freshness** | Always 100% live real-time data | Refreshed via \`REFRESH FAST ON COMMIT\` or \`REFRESH COMPLETE ON DEMAND\` |

---

## Q3: Explain the Types of Indexes in Oracle (B-Tree, Bitmap, Function-Based).

\`\`\`diagram
                 ORACLE B-TREE INDEX LOOKUP ARCHITECTURE
                 
                          ┌─────────────────────┐
                          │      ROOT BLOCK     │
                          │   [Key 1..50..100]  │
                          └──────────┬──────────┘
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼                                       ▼
     ┌───────────────────────┐               ┌───────────────────────┐
     │     BRANCH BLOCK      │               │     BRANCH BLOCK      │
     │     [Keys 1..49]      │               │     [Keys 50..100]    │
     └───────────┬───────────┘               └───────────┬───────────┘
                 │                                       │
         ┌───────┴───────┐                       ┌───────┴───────┐
         ▼               ▼                       ▼               ▼
   ┌───────────┐   ┌───────────┐           ┌───────────┐   ┌───────────┐
   │LEAF BLOCK │   │LEAF BLOCK │           │LEAF BLOCK │   │LEAF BLOCK │
   │Key: ROWID │   │Key: ROWID │           │Key: ROWID │   │Key: ROWID │
   └─────┬─────┘   └───────────┘           └───────────┘   └───────────┘
         │
         │ Direct Pointer (ROWID)
         ▼
   ┌───────────────────────────────────────────┐
   │ PHYSICAL TABLE DATA BLOCK (Disk I/O Seek) │
   └───────────────────────────────────────────┘
   
   ► INDEX SEEK: Traverses Root ──► Branch ──► Leaf (3-4 I/O reads). O(log N).
   ► TABLE SCAN: Scans every single block up to High Water Mark (HWM). O(N).
\`\`\`

1. **B-Tree Index (Default):** Best for **High-Cardinality** columns (columns with many unique values like \`EMP_ID\`, \`EMAIL\`, \`INVOICE_NO\`) and OLTP tables with frequent inserts/updates.
2. **Bitmap Index:** Best for **Low-Cardinality** columns (few distinct values like \`GENDER ('M'/'F')\`, \`STATUS ('ACTIVE'/'INACTIVE')\`) in Data Warehousing / Read-heavy reporting tables. (Avoid in heavy OLTP because locking a bitmap index locks many rows!).
3. **Function-Based Index:** Created on an expression like \`CREATE INDEX idx_emp_upper ON employees(UPPER(emp_name));\` so \`WHERE UPPER(emp_name) = 'RAHUL'\` uses an index seek instead of a Full Table Scan!

---

## Q4: 5-Year Oracle Performance Question — "Why is Oracle NOT using my Index, and how do you tune a slow SQL query?"
* **5 Reasons Oracle Ignores an Index (Full Table Scan):**
  1. Using a function on the indexed column (\`WHERE TRUNC(order_date) = ...\` or \`WHERE UPPER(name) = ...\`) without a Function-Based Index.
  2. Instead of \`TRUNC(order_date) = DATE '2026-10-19'\`, rewrite as a **Range Condition**: \`WHERE order_date >= DATE '2026-10-19' AND order_date < DATE '2026-10-20'\`!
  3. Implicit data type conversion (e.g., passing a number \`WHERE varchar_code = 1001\` instead of \`'1001'\`).
  4. Using leading wildcard \`LIKE '%ABC'\` (whereas \`LIKE 'ABC%'\` uses the index!).
  5. Querying only the 2nd column of a Composite Index without the leading column.
  6. Outdated table statistics (fix with \`DBMS_STATS.GATHER_TABLE_STATS\`).
`;

window.INTERVIEW_LESSONS["ora-03"] = `# Oracle SQL & PL/SQL Lesson 3: PL/SQL Architecture, Procedures vs Functions, Packages & Autonomous Transactions

---

## Q1: What is the structure of a PL/SQL Block, and why should you use \`%TYPE\` and \`%ROWTYPE\`?
\`\`\`sql
DECLARE
    -- %TYPE automatically matches the exact column data type of EMPLOYEES.SALARY!
    -- If table column size changes tomorrow, your PL/SQL code won't break!
    v_salary employees.salary%TYPE;
    v_emp_rec employees%ROWTYPE; -- Holds an entire row of EMPLOYEES
BEGIN
    SELECT * INTO v_emp_rec FROM employees WHERE emp_id = 101;
    DBMS_OUTPUT.PUT_LINE(v_emp_rec.emp_name);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Employee not found');
END;
\`\`\`

---

## Q2: What is the difference between a **Stored Procedure** and a **Function** in Oracle? (100% Guaranteed Question!)

| Feature | Stored Procedure | Function |
| :--- | :--- | :--- |
| **Return Value** | **May or may not** return values (uses \`OUT\` or \`IN OUT\` parameters to return multiple values/cursors) | **MUST return a single value** using the \`RETURN\` clause |
| **Can be called inside a \`SELECT\` statement?** | **NO!** (\`SELECT my_proc() FROM dual\` is illegal) | **YES!** (\`SELECT calc_tax(salary) FROM employees;\` — as long as it has no \`OUT\` params and does no DML!) |
| **Main Purpose** | Executing **Business Logic & DML Transactions** (\`INSERT\`, \`UPDATE\`, \`DELETE\`, returning \`SYS_REFCURSOR\` to .NET) | **Calculations & computations** |
| **Transaction Control (\`COMMIT\`/\`ROLLBACK\`)** | Allowed | Not allowed when called from a SQL \`SELECT\` statement (unless \`PRAGMA AUTONOMOUS_TRANSACTION\`) |

---

## Q3: What is an Oracle **Package** (\`SPECIFICATION\` vs \`BODY\`) and what are its advantages over standalone Procedures?
* **2 Parts of a Package:**
  1. **Package Specification (\`CREATE OR REPLACE PACKAGE pkg_order\`):** Public header declaring public procedures, functions, types, and global variables.
  2. **Package Body (\`CREATE OR REPLACE PACKAGE BODY pkg_order\`):** Private implementation containing the actual SQL/PLSQL code and private helper procedures.
* **5 Advantages of Packages (Speak these in the interview!):**
  1. **Procedure Overloading:** You can have two procedures with the **exact same name** (\` get_employee(p_id NUMBER)\` and \`get_employee(p_email VARCHAR2)\`) inside a Package! (Standalone procedures cannot be overloaded!).
  2. **Better Performance (Single Memory Load):** When any procedure in a package is called, the **entire package is loaded into Oracle SGA shared memory at once**, making subsequent calls super fast.
  3. **Encapsulation:** You can hide private helper procedures inside the Package Body.
  4. **Prevents Cascading Invalidations:** Changing code inside the Package Body does **NOT** invalidate dependent procedures/views as long as the Package Specification header doesn't change!

---

## Q4: What is \`PRAGMA AUTONOMOUS_TRANSACTION\` and where did you use it in your project?
* **Simple Meaning:** An **Autonomous Transaction** is an independent child transaction started by a Procedure that can **\`COMMIT\` its own work without committing or affecting the main parent transaction**—and its committed rows **survive even if the main parent transaction executes a \`ROLLBACK\`**!
* **Real Project Example (Error Audit Logging):**
  > "In our Oracle PL/SQL project, whenever an exception occurred during order processing, we needed to roll back the failed order transaction (\`ROLLBACK\`), **but we still wanted to save the error details into our \`ERROR_LOG_TABLE\`**! If \`log_error\` ran in the same transaction, the \`ROLLBACK\` would erase the error log too. So we marked \`sp_log_error\` with \`PRAGMA AUTONOMOUS_TRANSACTION\`, inserted the error row, and committed just the error log independently!"

\`\`\`sql
CREATE OR REPLACE PROCEDURE sp_log_error (
    p_module  IN VARCHAR2,
    p_err_msg IN VARCHAR2
) IS
    PRAGMA AUTONOMOUS_TRANSACTION; -- Independent transaction!
BEGIN
    INSERT INTO app_error_logs (log_id, module_name, error_msg, created_date)
    VALUES (seq_err_log.NEXTVAL, p_module, p_err_msg, SYSDATE);

    COMMIT; -- Commits ONLY this error log; does NOT affect parent transaction!
END;
\`\`\`
`;

window.INTERVIEW_LESSONS["ora-04"] = `# Oracle SQL & PL/SQL Lesson 4: Cursors, SYS_REFCURSOR, Triggers, Mutating Table Error & BULK COLLECT

---

## Q1: What is a Cursor in PL/SQL? Explain Implicit vs Explicit Cursors and Cursor Attributes.

\`\`\`diagram
                ORACLE CURSOR EXECUTION LIFECYCLE
                
   ┌────────────────┐
   │ 1. DECLARE     │ ──► Allocates Private SQL Area in PGA memory
   └───────┬────────┘
           ▼
   ┌────────────────┐
   │ 2. OPEN        │ ──► Parses SQL, binds variables & builds active set
   └───────┬────────┘
           ▼
   ┌────────────────┐ ◄──────────┐
   │ 3. FETCH       │            │ Loop while
   │    INTO vars   │            │ %FOUND is TRUE
   └───────┬────────┘            │
           ▼                     │
   ┌────────────────┐            │
   │ 4. CHECK       │ ───────────┘
   │    %NOTFOUND?  │
   └───────┬────────┘ (When TRUE)
           ▼
   ┌────────────────┐
   │ 5. CLOSE       │ ──► Releases PGA cursor memory & locks
   └────────────────┘
\`\`\`

* **Simple Meaning:** A Cursor is a pointer to a private memory area (Context Area) in Oracle that holds the result rows of a SQL query so PL/SQL can process them.
* **Implicit Cursor (\`SQL%...\`):** Created automatically by Oracle for every \`INSERT\`, \`UPDATE\`, \`DELETE\`, or \`SELECT INTO\`.
* **Explicit Cursor:** Declared manually by the developer for multi-row queries (\`CURSOR c_emp IS SELECT ...\` $\\rightarrow$ \`OPEN\` $\\rightarrow$ \`FETCH\` $\\rightarrow$ \`CLOSE\`, or using a Cursor \`FOR\` loop which automatically opens, fetches, and closes!).
* **4 Cursor Attributes:**
  * \`%FOUND\` (\`TRUE\` if row affected/fetched)
  * \`%NOTFOUND\` (\`TRUE\` if no row fetched — used in \`EXIT WHEN c_emp%NOTFOUND;\`)
  * \`%ROWCOUNT\` (Number of rows affected/fetched so far)
  * \`%ISOPEN\` (\`TRUE\` if cursor is open)

---

## Q2: What is a \`SYS_REFCURSOR\` and how does your C# / .NET code read data from it?
* **Interview Answer:**
  > "A \`SYS_REFCURSOR\` is a dynamic pointer to a query result set that can be passed as an \`OUT\` parameter from an Oracle Stored Procedure back to our .NET C# application. In C# (\`Oracle.ManagedDataAccess.Client\`), we bind a parameter with \`OracleDbType.RefCursor\` and \`ParameterDirection.Output\`, and read the rows using \`cmd.ExecuteReader()\`."

\`\`\`sql
-- Oracle Procedure returning SYS_REFCURSOR to .NET:
CREATE OR REPLACE PROCEDURE sp_get_dept_employees (
    p_dept_id IN  NUMBER,
    p_cursor  OUT SYS_REFCURSOR
) IS
BEGIN
    OPEN p_cursor FOR
        SELECT emp_id, emp_name, salary
        FROM employees
        WHERE dept_id = p_dept_id;
END;
\`\`\`

---

## Q3: What is a Trigger in Oracle? What is the difference between Row-Level and Statement-Level Triggers?
* **Statement-Level Trigger (No \`FOR EACH ROW\`):** Fires **only ONCE** per SQL statement, even if the \`UPDATE\` updates 10,000 rows (or 0 rows!). Cannot access \`:NEW\` or \`:OLD\` values.
* **Row-Level Trigger (\`FOR EACH ROW\`):** Fires **once for every individual row** affected by the DML statement. Has access to **\`:OLD\`** (value before change) and **\`:NEW\`** (value after change).
* **\`INSTEAD OF\` Trigger:** Created **ONLY on Views** to allow \`INSERT\`/\`UPDATE\`/\`DELETE\` on complex multi-table joined Views!

---

## Q4: 5-Year Senior Oracle Question — What is the **Mutating Table Error (\`ORA-04091\`)** and how do you fix it?

\`\`\`diagram
           ORA-04091: MUTATING TABLE TRIGGER ERROR CAUSE & FIX
           
   User DML: UPDATE EMPLOYEES SET SALARY = 90000;
      │
      ▼
   ┌────────────────────────────────────────────────────────┐
   │ EMPLOYEES Table is currently changing (MUTATING state) │
   └──────────────────────────┬─────────────────────────────┘
                              │
   Fires Row-Level Trigger:   ▼
   FOR EACH ROW
   BEGIN
      SELECT AVG(SALARY) FROM EMPLOYEES;  <─── ❌ BOOM! ORA-04091!
      -- Cannot query a table while it is in the middle of being modified!
   END;
   
   ► SOLUTION 1: Use Compound Trigger (combines BEFORE, AFTER ROW, and AFTER STATEMENT)
   ► SOLUTION 2: Use Statement-Level Trigger (no 'FOR EACH ROW')
   ► SOLUTION 3: Use Autonomous Transaction (PRAGMA AUTONOMOUS_TRANSACTION)
\`\`\`

* **Simple Meaning:**
  * If you write a **Row-Level Trigger (\`FOR EACH ROW\`)** on the \`EMPLOYEES\` table, and inside that trigger you try to run a **\`SELECT\` or DML query on the exact same \`EMPLOYEES\` table**, Oracle throws **\`ORA-04091: table EMPLOYEES is mutating, trigger/function may not see it\`** because the table is in the middle of being modified!
* **How to Fix It (Best Answer in Oracle 11g/12c/19c):**
  * Use a **Compound Trigger (\`FOR UPDATE ON employees COMPOUND TRIGGER\`)**! Collect the changed row IDs in the \`AFTER EACH ROW\` section into a PL/SQL collection, and run the \`SELECT\`/validation query safely inside the **\`AFTER STATEMENT\`** section after the row changes have finished!

---

## Q5: What are Predefined Exceptions in PL/SQL, and what is \`RAISE_APPLICATION_ERROR\`?
* **Common Predefined Exceptions:**
  * \`NO_DATA_FOUND\` (\`SELECT INTO\` returned 0 rows)
  * \`TOO_MANY_ROWS\` (\`SELECT INTO\` returned more than 1 row!)
  * \`DUP_VAL_ON_INDEX\` (Unique/Primary key violation)
  * \`ZERO_DIVIDE\`
* **\`RAISE_APPLICATION_ERROR(-20001, 'Custom business error message')\`:** Sends a custom error code (between \`-20000\` and \`-20999\`) and message directly back to the calling C# / .NET \`catch (OracleException ex)\` block!

---

## Q6: How do you tune a slow PL/SQL Loop processing 100,000 rows? (\`BULK COLLECT\` & \`FORALL\`)
* **The Problem (Context Switching):** A normal \`FOR\` loop that runs an \`INSERT\` or \`UPDATE\` row-by-row causes 100,000 back-and-forth **Context Switches** between the **PL/SQL Engine** and the **SQL Engine**, making it very slow.
* **The Solution:**
  1. Use **\`BULK COLLECT INTO ... LIMIT 1000\`** to fetch 1,000 rows at once into a PL/SQL collection.
  2. Use **\`FORALL i IN 1..v_list.COUNT SAVE EXCEPTIONS\`** to send all 1,000 \`UPDATE\`/\`INSERT\` statements to the SQL Engine in a **single batch**!

\`\`\`sql
DECLARE
    TYPE t_emp_ids IS TABLE OF employees.emp_id%TYPE;
    v_ids t_emp_ids;
    CURSOR c_emp IS SELECT emp_id FROM employees WHERE dept_id = 10;
BEGIN
    OPEN c_emp;
    LOOP
        -- 1. Fetch 1000 rows in ONE switch using BULK COLLECT + LIMIT
        FETCH c_emp BULK COLLECT INTO v_ids LIMIT 1000;
        EXIT WHEN v_ids.COUNT = 0;

        -- 2. Update all 1000 rows in ONE switch using FORALL
        FORALL i IN 1 .. v_ids.COUNT SAVE EXCEPTIONS
            UPDATE employees
            SET salary = salary * 1.10
            WHERE emp_id = v_ids(i);
    END LOOP;
    CLOSE c_emp;
    COMMIT;
END;
\`\`\`
`;
