USE CUSTOMER_DB;

Delimiter //
CREATE PROCEDURE spGetCDetails()
BEGIN
   DECLARE brek INT DEFAULT 0;
   DECLARE cgrade DECIMAL DEFAULT 0;
   DECLARE cname VARCHAR(255) DEFAULT "";
   DECLARE ccity VARCHAR(255) DEFAULT "";
   DECLARE ccountry VARCHAR(255) DEFAULT "";
   DECLARE cur CURSOR FOR
   SELECT GRADE, CUST_CITY, CUST_NAME, CUST_COUNTRY FROM customer;
   DECLARE CONTINUE HANDLER FOR NOT FOUND SET brek = 1;
   OPEN cur;
   myloop:LOOP
   FETCH cur INTO cgrade, cname,ccity,ccountry;
   IF brek = 1 THEN LEAVE myloop;
   END IF;
   SELECT cgrade,cname,ccity,ccountry;
   END LOOP myloop;
   CLOSE cur;
END //

CALL spGetCDetails(); //