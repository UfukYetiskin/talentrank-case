"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import eyeIcon from "@/public/icons/eye-scan-svgrepo-com.svg"
import deleteIcon from "@/public/icons/delete-svgrepo-com.svg"
import { deleteDocById } from '@/services/firestoreServices'
import { useRouter } from 'next/navigation'
function TableRowCard({ item }) {
    const router = useRouter()
    const deleteRow = async () => {
        const response = await deleteDocById(item?.id);
        if(response){
            alert("Deleted success!");
            return router.push("/");
        }
    }
    return (
        <div className="table-row">
            <div className="table-cell">{item?.title}</div>
            <div className="table-cell">{item?.description}</div>
            <div className="table-cell table-actions  items-center">
                <Link href={`/detail/${item?.id}`}>
                    <Image alt="Icon" src={eyeIcon} width={24} height={24} />
                </Link>
                <button onClick={() => {
                    deleteRow();
                }}>
                    <Image alt="Icon" src={deleteIcon} width={24} height={24} />
                </button>
            </div>
        </div>
    )
}

export default TableRowCard