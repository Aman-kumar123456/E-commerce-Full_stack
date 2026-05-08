export const Urlcreation=(name)=>{
const url=name.replaceAll(" ","-").replaceAll('&','--').replaceAll(',',"---").toLowerCase();
return url
}