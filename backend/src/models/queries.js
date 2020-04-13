const db = require('../config/dbConfig')
function selectAll (tableName){
    return {
        text:`SELECT * FROM ${tableName}`,
        type: db.QueryTypes.SELECT
    };
} 
function selectById (tableName, ){
    return {
        text:`SELECT * FROM ${tableName}`,
        type: db.QueryTypes.SELECT
    };
}
function insert()
{
    return "";
}
function update(){
    return "";}
function remove(){
    return "";
}

module.exports={
    all:selectAll,
    byId:selectById,
    insert:insert,
    update:update,
    remove:remove
}