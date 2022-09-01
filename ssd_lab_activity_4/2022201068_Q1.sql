-- USE CUSTOMER_DB;

DELIMITER &&
CREATE PROCEDURE spAddTwoNumbers 
(
IN num1 INT,
IN num2 INT,
OUT ans INT
)
BEGIN
SELECT num1 + num2 into ans;
END &&

call spAddTwoNumbers(2, 6, @ans);
&&

SELECT @ans;
&&
