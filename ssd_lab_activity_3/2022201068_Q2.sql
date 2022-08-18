SELECT E2.Ssn, E2.Fname, E2.Lname, count(E1.Ssn) AS "Number of Employees" FROM EMPLOYEE E1, EMPLOYEE E2 WHERE E1.Super_ssn = E2.Ssn GROUP BY E2.Ssn, E2.Fname, E2.Lname;
