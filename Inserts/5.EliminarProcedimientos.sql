--CREATE PROCEDURE EliminarProcedimientos
--AS
--      DECLARE @procName VARCHAR(500)
--      DECLARE cur CURSOR
--            FOR SELECT [name] FROM sys.objects WHERE TYPE = 'p'
--      OPEN cur
 
--      FETCH NEXT FROM cur INTO @procName
--      WHILE @@fetch_status = 0
--      BEGIN
--            IF @procName <> 'EliminarProcedimientos'
--                  EXEC('drop procedure ' + @procName)
--                  FETCH NEXT FROM cur INTO @procName
--      END
--      CLOSE cur
--      DEALLOCATE cur
--GO
--      GRANT EXECUTE ON dbo.EliminarProcedimientos TO PUBLIC
--GO
 
