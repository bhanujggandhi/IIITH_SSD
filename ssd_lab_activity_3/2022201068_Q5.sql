USE COMPANY;

SELECT D.Mgr_ssn as "Manager ssn", D.Dnumber as "Dept. Id", count(*) as "Number of Dependents" FROM DEPARTMENT D, DEPENDENT dp WHERE (SELECT count(*) FROM DEPT_LOCATIONS dl WHERE dl.Dnumber = D.Dnumber) > 1 and D.Mgr_ssn = dp.Essn group by D.Mgr_ssn, D.Dnumber;
