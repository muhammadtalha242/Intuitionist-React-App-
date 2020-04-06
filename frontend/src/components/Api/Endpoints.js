const url ="http://..."
// const toDatabase=''  to use for further refactoring 
exports.endpoints={
    database:{
        GETtablesName:'/data',
        GETtableValue:'/data/link',
        PUTupdateTable:'/update/edit',
        DELETETableRow:'/update/delete',
        POSTinsertRow:'/update/insert',
    },
    EPPComputations:{
        POSTassumptions:'/submit',
    }
};
