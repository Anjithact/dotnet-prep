window.INTERVIEW_LESSONS = window.INTERVIEW_LESSONS || {};

window.INTERVIEW_LESSONS["oop-01"] = `# OOP Lesson 1: Classes, Objects, Constructors, Encapsulation & Abstraction (Q1 – Q10)

> **Specially Designed for Non-CS / ECE Background:**
> Every question below has:
> 1. **Simple Meaning (Zero Jargon)** — So you understand the concept in 10 seconds.
> 2. **What to Speak in the Interview** — Exact professional sentences for a 5-year .NET developer.
> 3. **Where You Used It in Your MVC / Web Service Project** — Real project connection.
> 4. **C# Code Example** — Clean, runnable code.

---

## Q1: What is Object-Oriented Programming (OOP)? Why do we need it instead of Procedural Programming?
* **Simple Meaning:**
  * In old procedural programming (like C or old scripts), code is just a long list of functions, and any function can modify any global variable—which becomes messy in big projects.
  * In **OOP**, we group **related data (variables/properties)** and **actions (methods)** together inside self-contained boxes called **Objects** (like \`Employee\`, \`Order\`, \`Customer\`).
* **Interview Answer (What to Speak):**
  > "Object-Oriented Programming (OOP) is a programming paradigm where we design software around real-world entities called **Objects** rather than just functions and logic. Each object combines state (fields/properties) and behavior (methods). We use OOP because it makes enterprise applications modular, reusable, secure, and easy to maintain through its four core pillars: **Encapsulation, Abstraction, Inheritance, and Polymorphism**."
* **Your Project Example:**
  * In your MVC Core project, instead of writing all SQL and business logic inside one big file, you have separate classes like \`OrderController\`, \`OrderService\`, \`OrderRepository\`, and \`Order\` (Model).

---

## Q2: What is the exact difference between a \`Class\` and an \`Object\`?
* **Simple Meaning:**
  * **Class:** A **blueprint / design / template** (like a house floor plan on paper). A class does **not** take up memory for instance variables until you create an object.
  * **Object:** The **real thing** built from the class using the \`new\` keyword (like the actual physical house built from the floor plan). It occupies memory on the **Heap**.
* **Comparison Table:**

| Feature | Class | Object |
| :--- | :--- | :--- |
| **What is it?** | A logical template or blueprint | A real runtime instance of a class |
| **Memory Allocation** | **No memory** is allocated on the Heap when a class is merely defined | **Allocates memory on the Heap** when created with \`new\` |
| **How is it created?** | Using the \`class\` keyword (\`public class Employee\`) | Using the \`new\` keyword (\`Employee emp = new Employee();\`) |
| **How many times?** | Defined **once** | Can create **thousands of objects** from one class |

* **Code Example:**
\`\`\`csharp
// 1. CLASS: Just a blueprint (Defined once)
public class Car
{
    public string Brand { get; set; }
    public int Speed { get; set; }

    public void Drive()
    {
        Console.WriteLine($"{Brand} is driving at {Speed} km/h.");
    }
}

// 2. OBJECTS: Real instances in Heap memory (Can create many)
Car car1 = new Car { Brand = "Toyota", Speed = 100 };
Car car2 = new Car { Brand = "Honda", Speed = 120 };
\`\`\`

---

## Q3: What is the difference between a **Field (Variable)** and a **Property** in a C# Class?
* **Simple Meaning:**
  * **Field:** A normal variable declared directly inside a class (usually \`private\`, like \`private decimal _salary;\`). It just stores data with zero validation.
  * **Property:** A smart wrapper (\`get\` and \`set\`) around a field (like \`public decimal Salary { get; set; }\`) that lets you control how values are read or written, and is required by **ASP.NET MVC Model Binding, EF Core, and JSON Serialization**.
* **Interview Answer (What to Speak):**
  > "A **Field** is a variable declared directly inside a class to store raw data and should almost always be \`private\` to maintain encapsulation. A **Property** is a member that provides a flexible mechanism to read, write, or compute the value of a private field using \`get\` and \`set\` accessors. In ASP.NET Core MVC and Entity Framework Core, Model Binding and JSON Serialization work on public **Properties**, not fields."
* **Code Example:**
\`\`\`csharp
public class Employee
{
    // 1. Private Field (Backing field - stores the actual value in memory)
    private int _age;

    // 2. Full Property with validation inside 'set'
    public int Age
    {
        get { return _age; }
        set
        {
            if (value < 18 || value > 65)
                throw new ArgumentException("Employee age must be between 18 and 65.");
            _age = value;
        }
    }

    // 3. Auto-Implemented Property (C# compiler automatically creates a hidden private field!)
    public string FullName { get; set; }

    // 4. Read-Only Property (Can only be set inside Constructor)
    public string EmployeeCode { get; }

    // 5. Init-Only Property (C# 9+: Can only be set during object creation, then becomes read-only)
    public string PanNumber { get; init; }
}
\`\`\`

---

## Q4: What is a Constructor? Why doesn't a Constructor have a Return Type?
* **Simple Meaning:**
  * A **Constructor** is a special method inside a class that runs **automatically** the moment you write \`new ClassName()\`.
  * Its job is to initialize variables or receive injected services (like in an MVC Controller).
  * It has **no return type (not even \`void\`)** because the runtime (\`new\` operator) implicitly returns the memory address of the newly created object itself!
* **Rules of a Constructor:**
  1. Must have the **exact same name** as the class.
  2. Cannot have any return type (not even \`void\`).
  3. If you don't write any constructor in a class, the C# compiler automatically provides a hidden **Default Parameterless Constructor**.
  4. **Trap:** The moment you write a **Parameterized Constructor**, C# **stops** generating the free default constructor!

---

## Q5: What are the 5 Types of Constructors in C#? (With Real Use Cases)
Interviewers frequently ask: *"How many types of constructors are there in C# and where did you use them?"*

1. **Default (Parameterless) Constructor:** Takes no parameters. Required by Entity Framework and JSON deserializers.
2. **Parameterized Constructor:** Takes parameters. Used for **Dependency Injection** in ASP.NET Core Controllers (\`public OrderController(IOrderService orderService)\`).
3. **Copy Constructor:** Takes an object of the **same class** as a parameter to create a duplicate copy.
4. **Static Constructor:** Declared with \`static\` (\`static ClassName()\`). Cannot have access modifiers, cannot take parameters, and executes **ONLY ONCE** in the entire application lifetime before the first object is created or any static member is accessed.
5. **Private Constructor:** Declared with \`private\` (\`private ClassName()\`). Prevents outside classes from creating objects with \`new\`. Used in **Singleton Design Pattern**.

\`\`\`csharp
public class AppConfiguration
{
    public static string DefaultCurrency;
    public string AppName { get; set; }

    // 1. Static Constructor (Runs ONCE automatically before anything else)
    static AppConfiguration()
    {
        DefaultCurrency = "INR";
    }

    // 2. Default Constructor
    public AppConfiguration() => AppName = "MyEnterpriseApp";

    // 3. Parameterized Constructor
    public AppConfiguration(string appName) => AppName = appName;

    // 4. Copy Constructor
    public AppConfiguration(AppConfiguration existingConfig) => AppName = existingConfig.AppName;

    // 5. Private Constructor
    private AppConfiguration(int secretCode) => AppName = $"SecretApp-{secretCode}";
}
\`\`\`

---

## Q6: What is Constructor Overloading and Constructor Chaining (\`this\` vs \`base\`)?
* **Simple Meaning:**
  * **Constructor Overloading:** Having multiple constructors in the same class with **different parameter lists**.
  * **Constructor Chaining:** Calling one constructor from another constructor using \`: this(...)\` (same class) or \`: base(...)\` (parent class) so you don't duplicate initialization code.
\`\`\`csharp
public class BaseService
{
    public string ConnectionString { get; }
    public BaseService(string connectionString) => ConnectionString = connectionString;
}

public class OracleInvoiceService : BaseService
{
    public int TimeoutSeconds { get; }

    // Calls the 2-parameter constructor in the SAME class using : this(...)
    public OracleInvoiceService(string connStr) : this(connStr, 30) { }

    // Calls the Parent class (BaseService) constructor using : base(...)
    public OracleInvoiceService(string connStr, int timeout) : base(connStr)
    {
        TimeoutSeconds = timeout;
    }
}
\`\`\`

---

## Q7: What is Encapsulation? Explain with a Real Project Example.
* **Simple Meaning:** **Data Hiding + Validation.** Keeping internal variables \`private\` inside a class so outside code cannot directly change them to invalid values, and allowing changes only through \`public\` methods or properties.
* **Interview Answer (What to Speak):**
  > "Encapsulation is binding data (fields) and the methods that manipulate that data into a single unit while restricting direct outside access to the internal state. We implement it using \`private\` fields and exposing controlled access via \`public\` properties or methods. In my ASP.NET Core MVC project, inside our \`Order\` domain class, we keep \`_totalAmount\` \`private\` so a controller cannot set a negative amount directly; it must call \`order.AddOrderItem(price, qty)\` which validates the values."
\`\`\`csharp
public class Order
{
    private decimal _totalAmount;
    public decimal TotalAmount => _totalAmount;

    public void AddOrderItem(decimal price, int quantity)
    {
        if (price <= 0 || quantity <= 0)
            throw new ArgumentException("Price and quantity must be greater than zero.");
        _totalAmount += (price * quantity);
    }
}
\`\`\`

---

## Q8: What are Access Modifiers in C#? Explain all 6 of them.

| Access Modifier | Who Can Access It? | Simple Rule to Remember |
| :--- | :--- | :--- |
| **\`private\`** | **Only inside the same \`{ }\` class** (Default for class fields/methods) | Most restricted (Secret to the class) |
| **\`protected\`** | Inside the same class **+ Child (Derived) classes** (even in another DLL/project) | Family only (Parent & Children) |
| **\`internal\`** | **Anywhere inside the same Project / Assembly (\`.dll\`)**, but NOT from other projects | Same project only |
| **\`public\`** | **Everywhere** (Same project and other projects) | Open to everyone |
| **\`protected internal\`** | Same project **OR** Child classes in another project (\`protected\` **OR** \`internal\`) | Union (\`OR\`) |
| **\`private protected\`** | **Only Child classes that are inside the SAME project** (\`protected\` **AND** \`internal\`) | Intersection (\`AND\`) |

---

## Q9: What is Abstraction? Explain with a Real Project Example.
* **Simple Meaning:** **Hiding Complexity.** Showing **WHAT** an operation does while hiding **HOW** the complex internal code works, using an **\`interface\`** or **\`abstract class\`**.
* **Interview Answer (What to Speak):**
  > "Abstraction is exposing only the essential features of an object while hiding its complex background implementation details. In my MVC Core project, my \`OrderController\` calls \`_paymentService.ProcessPayment(orderDto)\` via the \`IPaymentService\` interface. The controller only knows *what* \`ProcessPayment\` returns; it is abstracted from *how* the payment gateway API, encryption, and Oracle DB logging work behind the scenes."

---

## Q10: Classic Interview Trap — What is the Difference Between Abstraction and Encapsulation?

| Feature | Abstraction | Encapsulation |
| :--- | :--- | :--- |
| **Core Question** | **"WHAT does the class do?"** | **"HOW is the data protected?"** |
| **What it Hides** | Hides **implementation complexity** | Hides **internal data/state** |
| **Stage** | **Design Level** (deciding interfaces and contracts) | **Implementation Level** (writing code with \`private\` fields) |
| **How Achieved in C#** | Using \`interface\` and \`abstract class\` | Using Access Modifiers (\`private\`, \`protected\`) and Properties (\`get\`/\`set\`) |
`;

window.INTERVIEW_LESSONS["oop-02"] = `# OOP Lesson 2: Inheritance & Polymorphism Deep Dive (Q11 – Q20)

---

## Q11: What is Inheritance? Where did you use it in your real projects?
* **Simple Meaning:** Inheritance lets a Child class (\`Derived Class\`) automatically get all the \`public\` and \`protected\` properties and methods of a Parent class (\`Base Class\`) using the \`:\` symbol, so you don't copy-paste common code.
* **Interview Answer (What to Speak):**
  > "Inheritance establishes an **'IS-A' relationship** between a Base class and a Derived class, allowing the child class to reuse, extend, or override parent functionality.
  > **Where I used it:**
  > 1. **BaseEntity Class:** All our Oracle/SQL table models inherit from \`BaseEntity\` containing \`Id\`, \`CreatedBy\`, \`CreatedDate\`, and \`IsActive\`.
  > 2. **BaseController Class:** In my MVC Core project, all controllers inherit from \`BaseController : Controller\` to share helper methods like getting the logged-in user's ID."
\`\`\`csharp
public abstract class BaseController : Controller
{
    protected int CurrentUserId => int.Parse(User.FindFirst("UserId")?.Value ?? "0");
}

public class InvoiceController : BaseController
{
    public IActionResult Index()
    {
        int userId = CurrentUserId; // Inherited from BaseController!
        return View();
    }
}
\`\`\`

---

## Q12: What are the Different Types of Inheritance? Which ones are supported in C#?
1. **Single Inheritance:** \`class B : A\` $\\rightarrow$ **Supported**
2. **Multilevel Inheritance:** \`A -> B -> C\` $\\rightarrow$ **Supported**
3. **Hierarchical Inheritance:** Multiple classes (\`Car\`, \`Truck\`) inherit from one parent (\`Vehicle\`) $\\rightarrow$ **Supported**
4. **Multiple Inheritance:** One class inheriting from **two classes** (\`class C : ClassA, ClassB\`) $\\rightarrow$ **NOT Supported with Classes in C# (Supported ONLY using Interfaces: \`class C : IA, IB\`)**

---

## Q13: Why does C# NOT support Multiple Inheritance with Classes? (The Diamond Problem)
* **Interview Answer (What to Speak):**
  > "C# prevents a class from inheriting from more than one base class to avoid **ambiguity**, known as the **Diamond Problem**. If \`ClassA\` and \`ClassB\` both define a \`Save()\` method and \`ClassC\` inherits from both, the compiler cannot determine which \`Save()\` method to execute. Instead, C# supports implementing **multiple interfaces** (\`class ReportService : IPdfExporter, IExcelExporter\`), because interfaces only define the contract."

---

## Q14: In Inheritance, in what order do Constructors run when you create a Child class object?
* **Simple Rule:** **Parent (Base) instance constructor ALWAYS runs FIRST, then Child (Derived) instance constructor!**
* **If Static Constructors are also present:**
  1. Child \`static\` constructor runs first.
  2. Parent \`static\` constructor runs second.
  3. Parent instance constructor runs third.
  4. Child instance constructor runs last!
\`\`\`csharp
public class Parent
{
    public Parent() => Console.WriteLine("1. Parent Instance Constructor");
}
public class Child : Parent
{
    public Child() => Console.WriteLine("2. Child Instance Constructor");
}
// new Child() prints:
// 1. Parent Instance Constructor
// 2. Child Instance Constructor
\`\`\`

---

## Q15: What is the \`sealed\` keyword in C#? Why and when should you make a class \`sealed\`?
* **Interview Answer:**
  > "The \`sealed\` keyword prevents a class from being inherited by any other class (for example, \`string\` is a \`sealed\` class). We use \`sealed\` for:
  > 1. **Security & Design Integrity:** Preventing classes like \`PasswordHasher\` or \`Singleton\` from being subclassed.
  > 2. **Performance Optimization:** The .NET JIT compiler performs **devirtualization** on \`sealed\` classes, making method calls faster."

---

## Q16: What is Polymorphism? Explain the 2 Types of Polymorphism in Detail.
* **Compile-Time Polymorphism (Static / Early Binding):** Achieved using **Method Overloading**. Decided at compile time based on parameters.
* **Run-Time Polymorphism (Dynamic / Late Binding):** Achieved using **Method Overriding** (\`virtual\` + \`override\`). Decided at runtime based on the actual object created with \`new\`.

---

## Q17: Explain Method Overloading (Compile-Time Polymorphism) with Rules & Trap Cases.
* **3 Ways to Overload a Method (Same method name, same class):**
  1. Different **number** of parameters: \`Add(int a, int b)\` vs \`Add(int a, int b, int c)\`
  2. Different **data types**: \`Add(int a, int b)\` vs \`Add(double a, double b)\`
  3. Different **order of types**: \`Save(int id, string name)\` vs \`Save(string name, int id)\`
* **Trap:** Changing **ONLY the return type** is **NOT** valid method overloading and causes a compiler error!

---

## Q18: Explain Method Overriding (Run-Time Polymorphism) with a Real Project Example.
\`\`\`csharp
public class Customer
{
    public virtual decimal GetDiscountPercentage(decimal billAmount) => 5.0m;
}

public class VipCustomer : Customer
{
    public override decimal GetDiscountPercentage(decimal billAmount) =>
        billAmount > 10000 ? 20.0m : 15.0m;
}

// Run-Time Polymorphism:
Customer cust = new VipCustomer();
decimal discount = cust.GetDiscountPercentage(15000); // Returns 20.0m!
\`\`\`

---

## Q19: What is the difference between \`virtual\`, \`override\`, and \`new\` (Method Hiding)?
\`\`\`csharp
public class Account
{
    public virtual void ShowInterest() => Console.WriteLine("Account: 4% Interest");
}
public class SavingsAccount : Account
{
    public override void ShowInterest() => Console.WriteLine("SavingsAccount: 6% Interest");
}
public class CurrentAccount : Account
{
    public new void ShowInterest() => Console.WriteLine("CurrentAccount: 0% Interest");
}

Account a1 = new SavingsAccount();
a1.ShowInterest(); // Output: "SavingsAccount: 6% Interest" (override)

Account a2 = new CurrentAccount();
a2.ShowInterest(); // Output: "Account: 4% Interest" ('new' only hides, so Parent ref calls Parent!)
\`\`\`

---

## Q20: Can a \`private\` or \`static\` method be \`virtual\` or \`override\`? Why not?
* **NO!**
  1. \`private\` methods are invisible to Child classes, so they cannot be overridden.
  2. \`static\` methods belong to the Class rather than an Object instance, so they have no Virtual Method Table (vtable) pointer at runtime.
`;

window.INTERVIEW_LESSONS["oop-03"] = `# OOP Lesson 3: Abstract Class, Interface, SOLID Principles & Design Patterns (Q21 – Q30)

---

## Q21: What is an \`Abstract Class\` and an \`Abstract Method\`?
* **Simple Meaning:**
  * An **\`abstract class\`** is an incomplete base class that **cannot be instantiated directly** with \`new\`.
  * An **\`abstract method\`** is a method without a body (\`public abstract bool ChargeCustomer(decimal amount);\`). Any non-abstract child class **MUST** \`override\` it!

---

## Q22: Tricky Question — If we CANNOT create an object of an \`Abstract Class\`, why does an \`Abstract Class\` have a Constructor?
* **Interview Answer:**
  > "Although we cannot instantiate an abstract class directly using \`new\`, an abstract class can contain fields and properties (like \`protected readonly string _merchantId;\`) that need initialization. When a child class is instantiated, the abstract class's \`protected\` constructor runs first via \`: base()\` to initialize those base fields."

---

## Q23: What is an \`Interface\`? Why do we need Interfaces in every MVC / Web API project?
* **4 Reasons we use \`IOrderService\` in every project:**
  1. **Loose Coupling** between Controllers and Services.
  2. **Dependency Injection (DI)** registration in \`Program.cs\`.
  3. **Easy Swapping** of implementations (e.g., Oracle to SQL Server).
  4. **Unit Testing** using \`Moq\` (\`Mock<IOrderService>\`).

---

## Q24: What is the Difference Between an \`Abstract Class\` and an \`Interface\`? (Top #1 OOP Question)

| Feature | \`abstract class\` | \`interface\` |
| :--- | :--- | :--- |
| **Relationship Type** | **"IS-A" Identity** (Closely related classes) | **"CAN-DO" Capability / Contract** |
| **Multiple Inheritance** | Inherit **ONLY ONE** abstract class | Implement **MULTIPLE** interfaces |
| **Instance Variables (Fields)** | **Yes** (\`protected string _connStr;\`) | **No** instance fields allowed |
| **Constructors** | **Yes** (\`protected\` constructors allowed) | **No** instance constructors allowed |
| **When to Choose in Project** | To share **common base code AND state (fields)** | For **Dependency Injection, Unit Testing, or Multiple Inheritance** |

---

## Q25: What New Feature Was Added to Interfaces in C# 8.0? (Default Interface Methods)
* Starting in **C# 8.0**, interfaces can have **Default Interface Methods** (methods with a body) so you can add a new method to an existing published interface without breaking existing implementing classes.

---

## Q26: What is Explicit Interface Implementation? When is it required?
\`\`\`csharp
public interface ISaveToDatabase { void Save(); }
public interface ISaveToFile { void Save(); }

public class DocumentManager : ISaveToDatabase, ISaveToFile
{
    void ISaveToDatabase.Save() => Console.WriteLine("Saved to Oracle DB.");
    void ISaveToFile.Save() => Console.WriteLine("Saved to PDF File.");
}
\`\`\`

---

## Q27: What are the **S** and **O** in SOLID Principles? (SRP & OCP)
* **S — Single Responsibility Principle (SRP):** A class should have **only ONE job** (only one reason to change). E.g., separate \`OrderController\`, \`OrderValidator\`, \`OrderRepository\`, and \`EmailService\`.
* **O — Open/Closed Principle (OCP):** Classes should be **Open for Extension, but Closed for Modification**. Add new features (like \`CsvExporter : IReportExporter\`) by adding a new class rather than editing an existing \`if-else\` block.

---

## Q28: What are the **L**, **I**, and **D** in SOLID Principles? (LSP, ISP, DIP)
* **L — Liskov Substitution Principle (LSP):** Child classes must be completely substitutable for their Parent class without throwing \`NotImplementedException\`.
* **I — Interface Segregation Principle (ISP):** Many small, specific interfaces (\`IReadRepository\`, \`IWriteRepository\`) are better than one giant "fat" interface.
* **D — Dependency Inversion Principle (DIP):** High-level modules (\`OrderService\`) should not depend on low-level concrete classes (\`new OracleOrderRepository()\`); both should depend on abstractions (\`IOrderRepository\`).

---

## Q29: Explain the **Singleton Design Pattern** and write Thread-Safe C# code for it.
\`\`\`csharp
public sealed class LoggerSingleton
{
    private static readonly Lazy<LoggerSingleton> _instance =
        new Lazy<LoggerSingleton>(() => new LoggerSingleton());

    private LoggerSingleton() { }

    public static LoggerSingleton Instance => _instance.Value;
}
\`\`\`

---

## Q30: Explain the **Factory Design Pattern** and **Repository Design Pattern** used in your projects.
\`\`\`csharp
public static class NotificationFactory
{
    public static INotification GetNotifier(string type) => type.ToUpper() switch
    {
        "EMAIL" => new EmailNotification(),
        "SMS"   => new SmsNotification(),
        _       => throw new ArgumentException("Invalid notification type")
    };
}
\`\`\`
`;

window.INTERVIEW_LESSONS["oop-04"] = `# OOP Lesson 4: Relationships, Copying, Advanced OOP & Tricky Output Questions (Q31 – Q40)

---

## Q31: What is the difference between Association, Aggregation, and Composition?

| Relationship | Keyword | Ownership | If Parent is Deleted, Does Child Survive? | Example |
| :--- | :--- | :--- | :--- | :--- |
| **Inheritance** | **IS-A** | Parent-Child hierarchy | N/A | \`Car\` IS-A \`Vehicle\` |
| **Aggregation** | **HAS-A (Weak)** | Shared / Independent | **YES** (Child survives) | \`Department\` HAS-A \`Employee\` |
| **Composition** | **HAS-A (Strong)** | Full ownership | **NO** (Child is destroyed too) | \`Order\` HAS-A \`OrderItem\` |

---

## Q32: Why do senior developers say "Prefer Composition over Inheritance"?
* Overusing Inheritance tightly couples child classes to parent implementation details, whereas **Composition** (injecting interfaces like \`private readonly IOrderService _service;\`) keeps classes loosely coupled, flexible, and easy to mock in unit tests.

---

## Q33: What is Coupling vs Cohesion in OOP Design?
* **Coupling:** How heavily two **different classes** depend on each other (**Goal: LOW / LOOSE Coupling**).
* **Cohesion:** How focused and related the methods **inside a SINGLE class** are (**Goal: HIGH Cohesion**).

---

## Q34: What is Shallow Copy vs Deep Copy of an Object in C#?
* **Shallow Copy (\`this.MemberwiseClone()\`):** Copies the main object, **but shares the exact same nested Reference Type objects** in Heap memory!
* **Deep Copy:** Creates a brand-new independent copy of **both** the main object AND all nested reference objects inside it.
\`\`\`csharp
public class Employee
{
    public string Name { get; set; }
    public Address HomeAddress { get; set; }

    public Employee ShallowCopy() => (Employee)this.MemberwiseClone();

    public Employee DeepCopy()
    {
        Employee clone = (Employee)this.MemberwiseClone();
        clone.HomeAddress = new Address { City = this.HomeAddress.City };
        return clone;
    }
}
\`\`\`

---

## Q35: What is Upcasting vs Downcasting in OOP?
* **Upcasting (Child $\\rightarrow$ Parent):** \`Animal a = new Dog();\` (Implicit and 100% safe).
* **Downcasting (Parent $\\rightarrow$ Child):** \`if (a is Dog d) { d.Bark(); }\` (Use \`is\` or \`as\` to avoid \`InvalidCastException\`).

---

## Q36: What is the difference between a \`static class\` and a \`Singleton class\`?

| Feature | \`static class\` | \`Singleton class\` |
| :--- | :--- | :--- |
| **Object Creation** | **Cannot** create any object instance | Creates **exactly ONE object instance** on the Heap |
| **Interface Implementation** | **Cannot** implement any \`interface\` | **Can** implement interfaces & be injected via DI! |
| **Unit Testing** | Hard to mock | Easy to mock via its interface |

---

## Q37: Can we have an \`abstract\` class WITHOUT any \`abstract\` methods? Why?
* **YES!** When you have a complete base class (like \`BaseEntity\` or \`BaseController\`) and simply want to **prevent anyone from instantiating \`new BaseEntity()\` directly**.

---

## Q38: What happens if a \`static\` Constructor throws an unhandled Exception?
* Since a \`static\` constructor runs only ONCE per AppDomain, the CLR wraps the exception inside a **\`TypeInitializationException\`** and marks that class as unusable for the rest of the application's lifetime!

---

## Q39: Tricky Output Puzzle 1 — Constructor & Virtual Method Call Order
\`\`\`csharp
public class A
{
    public A() { Console.Write("1 "); Print(); }
    public virtual void Print() => Console.Write("2 ");
}
public class B : A
{
    public B() { Console.Write("3 "); Print(); }
    public override void Print() => Console.Write("4 ");
}
// new B() outputs: 1 4 3 4
\`\`\`
* **Why \`1 4 3 4\`?** \`A()\` runs first (\`1\`), calls virtual \`Print()\` which resolves to overridden \`B.Print()\` (\`4\`), then \`B()\` body runs (\`3\`) and calls \`B.Print()\` (\`4\`).

---

## Q40: Tricky Output Puzzle 2 — Overload Resolution with \`Display(null)\`
\`\`\`csharp
public class OverloadTest
{
    public void Display(object o) => Console.WriteLine("Object method called");
    public void Display(string s) => Console.WriteLine("String method called");
}
new OverloadTest().Display(null);
// Output: "String method called" (Compiler picks the most specific derived type!)
\`\`\`
`;

window.INTERVIEW_LESSONS["di-01"] = `# Dependency Injection (DI) Lesson 1: DI, IoC & Types of Injection (Q1 – Q5)

---

## Q1: What is Tight Coupling vs Loose Coupling?
* **Tight Coupling:** Class A directly creates \`new OracleOrderRepository()\` inside its code.
* **Loose Coupling:** Class A depends only on an **Interface (\`IOrderRepository\`)** injected from outside.

\`\`\`csharp
// GOOD: LOOSE COUPLING (Using Interface + DI)
public class OrderController
{
    private readonly IOrderRepository _repo;
    public OrderController(IOrderRepository repo) => _repo = repo;
}
\`\`\`

---

## Q2: What is Inversion of Control (IoC) and Dependency Injection (DI)?
* **IoC (Inversion of Control):** The design principle where object creation control is inverted from your class to the framework's **IoC Container**.
* **DI (Dependency Injection):** The design pattern used to implement IoC by injecting dependencies via Constructor, Method, or Property.

---

## Q3: What are the 3 main benefits of Dependency Injection?
1. **Loose Coupling & Maintainability** (Change implementation in 1 line in \`Program.cs\`).
2. **Easy Unit Testing** (Pass \`Mock<IOrderRepository>\` in xUnit/NUnit).
3. **Automatic Lifecycle & Disposal Management** (Container disposes \`DbContext\` automatically at the end of each HTTP request).

---

## Q4: What are the 3 types of Dependency Injection in C#?
1. **Constructor Injection (95% of cases):** Passed through the class constructor.
2. **Method Injection (\`[FromServices]\`):** Passed into a single action method (\`public IActionResult Export([FromServices] IReportGenerator gen)\`).
3. **Property Injection:** Set via a public property.

---

## Q5: How do you register multiple implementations of the SAME interface in ASP.NET Core?
\`\`\`csharp
// .NET 8 Keyed Services:
builder.Services.AddKeyedScoped<INotificationService, EmailNotificationService>("email");
builder.Services.AddKeyedScoped<INotificationService, SmsNotificationService>("sms");

// In Controller:
public IActionResult SendAlert([FromKeyedServices("sms")] INotificationService smsService)
{
    smsService.Send("Your OTP is 1234");
    return Ok();
}
\`\`\`
`;

window.INTERVIEW_LESSONS["di-02"] = `# Dependency Injection (DI) Lesson 2: Service Lifetimes (\`Transient\`, \`Scoped\`, \`Singleton\`) (Q6 – Q10)

---

## Q6: Explain \`Transient\`, \`Scoped\`, and \`Singleton\` service lifetimes in ASP.NET Core.

| Lifetime | Registration Method | When is a New Instance Created? | Best Used For |
| :--- | :--- | :--- | :--- |
| **Transient** | \`AddTransient<IService, Service>()\` | **Every single time** it is requested (even multiple times in the same HTTP request!) | Lightweight, stateless helpers (\`IValidator\`) |
| **Scoped** | \`AddScoped<IService, Service>()\` | **Once per HTTP Request** (shared across Controller & Services during that 1 HTTP request) | **\`DbContext\`**, Repositories, Business Services |
| **Singleton** | \`AddSingleton<IService, Service>()\` | **Only ONCE** for the entire application lifetime across all users | Caching, Configuration, Logging |

---

## Q7: Visual Scenario — How Many Instances Are Created Across 2 Requests?
Suppose \`ServiceX\` is injected into **both** \`OrderController\` AND \`PaymentHelper\` in Request 1 and Request 2:
* **Transient:** Request 1 gets **2 instances** (#1, #2). Request 2 gets **2 new instances** (#3, #4).
* **Scoped:** Request 1 shares **1 instance** (#1). Request 2 shares **1 new instance** (#2).
* **Singleton:** Request 1 and Request 2 share the **exact same 1 instance** (#1) forever!

---

## Q8: Senior Trap Question — What happens if you inject a \`Scoped\` service (like \`DbContext\`) into a \`Singleton\` service? (Captive Dependency)
* **Problem:** A \`Singleton\` lives forever, while a \`Scoped\` service (\`DbContext\`) is meant for only 1 HTTP request and is NOT thread-safe. Injecting \`Scoped\` into \`Singleton\` traps it forever (**Captive Dependency**) and throws \`InvalidOperationException: Cannot consume scoped service from singleton\`.
* **Solution:** Inject **\`IServiceScopeFactory\`** into the Singleton and create a manual \`using\` scope!

\`\`\`csharp
public class MySingletonWorker
{
    private readonly IServiceScopeFactory _scopeFactory;

    public MySingletonWorker(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    public async Task ProcessDataAsync()
    {
        using (IServiceScope scope = _scopeFactory.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            await dbContext.ProcessPendingOrdersAsync();
        }
    }
}
\`\`\`

---

## Q9: Can we inject a \`Transient\` service into a \`Singleton\`?
* Technically allowed without an exception, **but dangerous** if the \`Transient\` service holds any state, because that single instance will be kept alive inside the \`Singleton\` forever.

---

## Q10: What is the difference between \`AddScoped\` and \`TryAddScoped\`?
* \`AddScoped\` registers a duplicate implementation and overrides the previous default.
* \`TryAddScoped\` only registers the service if that interface has **not already been registered**.
`;

window.INTERVIEW_LESSONS["di-03"] = `# Dependency Injection (DI) Lesson 3: Advanced DI Scenarios (Q11 – Q20)

---

## Q11: What is a Circular Dependency in DI, and how do you fix it?
* **Meaning:** \`ServiceA\` injects \`IServiceB\`, and \`ServiceB\` injects \`IServiceA\`. Throws \`InvalidOperationException: A circular dependency was detected\`.
* **Fix:** Extract the common methods into a third service \`ISharedService\` so both \`A\` and \`B\` depend on \`C\`.

---

## Q12: How do you inject a \`Scoped\` service into a Custom Middleware?
* **Trap:** Middleware constructors run **ONLY ONCE at startup (like a Singleton)**!
* **Fix:** Inject \`Scoped\` services (like \`AppDbContext\`) into the **\`InvokeAsync(HttpContext context, AppDbContext db)\` method**, NOT the Middleware constructor!

\`\`\`csharp
public class AuditLoggingMiddleware
{
    private readonly RequestDelegate _next;
    public AuditLoggingMiddleware(RequestDelegate next) => _next = next;

    // Inject Scoped AppDbContext into InvokeAsync!
    public async Task InvokeAsync(HttpContext context, AppDbContext dbContext)
    {
        await _next(context);
    }
}
\`\`\`

---

## Q13: How do you inject a service directly into an ASP.NET Core Razor View (\`.cshtml\`)?
* Use \`@inject IConfiguration Configuration\` at the top of the \`.cshtml\` file.

---

## Q14: How do you register a Generic Interface (\`IRepository<T>\`) in DI? (Open Generics)
\`\`\`csharp
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
\`\`\`

---

## Q15: Who calls \`.Dispose()\` on \`IDisposable\` services registered in DI?
* The **ASP.NET Core DI Container automatically calls \`.Dispose()\`** when the request/scope ends. Never manually dispose an injected service!

---

## Q16: \`GetService<T>()\` vs \`GetRequiredService<T>()\`?
* \`GetService<T>()\` returns \`null\` if not registered.
* \`GetRequiredService<T>()\` throws \`InvalidOperationException\` immediately if not registered (preferred!).

---

## Q17: What is the Service Locator Anti-Pattern?
* Injecting \`IServiceProvider\` everywhere and calling \`_sp.GetService<T>()\` inside methods instead of declaring honest constructor dependencies. It hides class dependencies and makes unit testing harder.

---

## Q18: \`[ServiceFilter]\` vs \`[TypeFilter]\` for DI in Action Filters?
* \`[ServiceFilter(typeof(MyFilter))]\` requires registering \`MyFilter\` in \`Program.cs\`.
* \`[TypeFilter(typeof(MyFilter))]\` resolves constructor dependencies from DI without registering the filter class itself.

---

## Q19: How do you register a Service using a Factory Delegate in \`Program.cs\`?
\`\`\`csharp
builder.Services.AddScoped<IOracleDbConnection>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    return new OracleDbConnectionWrapper(config.GetConnectionString("OracleProdDb")!);
});
\`\`\`

---

## Q20: What happens if you register the SAME interface twice in \`Program.cs\`?
* Injecting a single \`ITaxService\` resolves the **last registered class**.
* Injecting \`IEnumerable<ITaxService>\` resolves **all registered classes**.
`;

