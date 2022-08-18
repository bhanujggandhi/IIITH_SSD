USE COMPANY;

SELECT Concat(E.fname, ' ', E.minit, ' ', E.lname) AS "Full Name", E.Ssn, D.dnumber AS "Dept. Id", D.dname AS "Dept. Name"
FROM EMPLOYEE AS E, DEPARTMENT AS D
WHERE  EXISTS (SELECT DISTINCT NULL FROM WORKS_ON AS W WHERE  W.essn = E.ssn AND W.hours < 40)
       AND E.dno = D.dnumber
       AND D.mgr_ssn = E.ssn; 
