let backend=null;
export const setOpeningBackend=value=>{backend=value};
export const openingSnapshot=()=>backend?.snapshot?.()||null;
export const openingSyncState=()=>backend?.state?.()||{pending:false,saving:false,error:null,conflict:false,refreshing:false,fromCache:false};
