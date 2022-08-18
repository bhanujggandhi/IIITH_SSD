USE COMPANY;

SELECT D.Dname, D.Dnumber, count(*) as "Number of Locations" FROM DEPARTMENT D, DEPT_LOCATIONS as dl WHERE (SELECT count(*) FROM DEPENDENT dp WHERE dp.Essn = D.Mgr_ssn and dp.Sex = 'F') > 1 and D.Dnumber = dl.Dnumber group by D.Dname, D.Dnumber;
