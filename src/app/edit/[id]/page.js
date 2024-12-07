import React, { Suspense } from 'react'
import { getDocById } from '@/services/firestoreServices';
import EditPageForm from '@/components/pages/EditPageClientSide';


export const getDocDetail = async (id) => {
    try{
        const data = await getDocById(id);
        return data;
    }catch(error){
        console.error("Detail error",error)
    }
}

async function Page(props) {
   const {id} = props.params;
   const data = await getDocDetail(id);
  
   console.log("Doc Detail Data", data);
  return (
    <div>
        <EditPageForm data={data} />
    </div>
  )
}

export default Page