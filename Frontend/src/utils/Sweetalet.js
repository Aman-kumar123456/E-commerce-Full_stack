import Swal from 'sweetalert2'

const sweetalert=({title})=>{
   const alert= Swal.fire({
  title: title,
  icon: "success",
});
return alert
}
export default sweetalert;