/* This file contains all the tests for our game.  Due to the difficulty of unit testing the finer aspects of the game
 * such as collision detection, we only test our database API here.  If tests ever became more extensive, a proper
 * testing library should be used.  At the moment, an alert will pop before the game starts if any test fail,
 * warning the user of the test that failed.
 */


//Function to run all the tests.  Loads the database and then executes all the tests
function runTests()
{
    var xhr = new XMLHttpRequest();
    if (isAndroid) {
        xhr.open('GET', 'file:///android_asset/www/databases/test.db'); //android version
    }
    else {
        xhr.open('GET', 'http://localhost:63342/Comp523/LanguageGame/www/databases/test.db', true);//pc version
    }
    xhr.responseType = 'arraybuffer';

    xhr.onload = function (e) {
        var uInt8Array = new Uint8Array(this.response);
        db = new SQL.Database(uInt8Array);

        //Tests are run here
        testInsertion(db);
        testDeletion(db);
        testUniques(db);
        testSingleSelection(db);
    };
    xhr.send();
}

//Test whether data is correctly inserted into the DB
function testInsertion(db)
{
    var countBefore = db.exec("SELECT COUNT(*) FROM test")[0]["values"][0][0];
    db.exec("INSERT INTO test VALUES (1000,'color','mahogany','test')");
    var countAfter = db.exec("SELECT COUNT(*) FROM test")[0]["values"][0][0];

    if((countAfter - countBefore) != 1)
    {
        alert("WARNING: Insertion test for in game database failed. Data was not inserted correctly");
    }

}

//Test whether data deleted from the database is actually deleted
function testDeletion(db)
{
    var countBefore = db.exec("SELECT COUNT(*) FROM test")[0]["values"][0][0];
    db.exec("INSERT INTO test VALUES (1001,'test','test','test')");
    db.exec("DELETE FROM test WHERE wid =1001 AND english='test' AND category = 'test' AND unicode = 'test'");
    var countAfter = db.exec("SELECT COUNT(*) FROM test")[0]["values"][0][0];

    if((countAfter - countBefore) != 0)
    {
        alert("WARNING: Deletion test for in game database failed. Data was not deleted correctly");
    }
}

//Test whether data pulled from the database with the SQL DISTINCT keyword truly pulls only unique items
function testUniques(db)
{
    db.exec("INSERT INTO test VALUES (1001,'test1','test','test')");
    db.exec("INSERT INTO test VALUES (1002,'test1','test','test')");
    var results = db.exec("SELECT DISTINCT category FROM test");

    for(var i = 0;i < results[0]["values"][0].length;i++)
    {
        for(var j = 0;j < results[0]["values"][0].length;j++)
        {
            if((results[0]["values"][0][i] == results[0]["values"][0][j]) && (i != j))
            {
                alert("WARNING: Uniqueness test for in game database failed. Attempt to retrieve only unique data failed.");
            }
        }
    }
}

//Test that a row inserted into the database can be retrieved
function testSingleSelection(db)
{
    db.exec("INSERT INTO test VALUES (1003,'test','test','test')");
    var results = db.exec("SELECT category FROM test WHERE wid = 1003 AND english = 'test' AND category = 'test' AND unicode = 'test'");
    if(results[0]["values"][0][0] != "test")
    {
        alert("WARNING: Single Selection test for in game database failed.  Data that was inserted could not be retrieved");
    }
}