const formatDocument = (document: string) =>{
   if(document.length === 14){
    return document.replace(/([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{2})/,'$1.$2.$3/$4-$5'); 
   }else{
    return document.replace(/([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/,'$1.$2.$3-$4');
   }
  
}

export { formatDocument };