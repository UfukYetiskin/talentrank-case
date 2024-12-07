import React from 'react'
import styles from "./styles.module.scss"
import editIcon from "@/public/icons/edit-3-svgrepo-com.svg"
import Image from 'next/image';
import Link from 'next/link';
import { getDocById } from '@/services/firestoreServices';


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
    <div className={styles["container"]}>
        <h1>{data?.title}</h1>
        <div className={styles["first-step-details"]}>
            <h1>Job Details</h1>
            <h2>Jop Title</h2>
            <p>{data?.title}</p>
            <h2>Job Description</h2>
            <p className={styles["description"]}>{data?.description}</p>
        </div>
        <div className={styles["questions-list"]}>
            <h2>Questions</h2>
            <Link
                href={"/edit/" + id}
                className='absolute right-4 top-4'
            >
                <Image 
                    src={editIcon}
                    width={24}
                    height={24}
                    alt='Edit Icon'
                />
            </Link>
            {
                data?.questions && data?.questions.map((item, key) => {
                    return <div className={styles["question"]} key={key}>
                        <h2>{item?.questionNo}</h2>
                        <p>{item?.question}</p>
                        <div>
                            <span>Weightage Score</span>
                            <input 
                                type='range'
                                readOnly
                                min={0}
                                max={3}
                                value={item?.questionScore}
                            />
                        </div>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default Page