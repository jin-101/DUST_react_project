import Dropdown from "../components/Dropdown";

function MyRegion ({data, onChange}) {
  console.log(data);

  return (
  <>
     <div className='flex pos-mc mg-small'>
      <Dropdown onChange={onChange}/>
    </div>
  </>
  )
}

export default MyRegion;