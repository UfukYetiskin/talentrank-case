import { getAllDocs } from "@/services/firestoreServices";
import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import Image from "next/image";
import eyeIcon from "@/public/icons/eye-scan-svgrepo-com.svg"
import deleteIcon from "@/public/icons/delete-svgrepo-com.svg"
export const getDocs = async () => {
  const data = await getAllDocs("talentrank-b1592");
  console.log("Documents", data);
  return data;
}
export default async function Home() {
  const getData = await getDocs();
  console.log("Data in component", getData);
  return (
    <>
      <div className="table-container flex text-style  items-center w-full  p-4 relative">
        <Link href={"/interview"} className="absolute right-0 top-2">
          <Button variant="outlined" size="md">
            Create a Interview Questions
          </Button>
        </Link>
      </div>
      <div className="table-container text-style">
        <div className="table-row table-header">
          <div className="table-cell">Title</div>
          <div className="table-cell">Content</div>
          <div className="table-cell table-actions">Actions</div>
        </div>
        <div className="table-row">
          <div className="table-cell">Content</div>
          <div className="table-cell">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          <div className="table-cell table-actions  items-center">
            <i className="icon-edit"><Link href={"/"}>
              <Image alt="Icon" src={eyeIcon} width={24} height={24} />
            </Link></i>
            <i className="icon-delete">
            <Link href={"/"}>
              <Image alt="Icon" src={deleteIcon} width={24} height={24} />
            </Link>
            </i>
          </div>
        </div>

        <div className="table-row">
          <div className="table-cell">Actions</div>
          <div className="table-cell">Ali Veli'nin maceraları</div>
          <div className="table-cell table-actions">
            <i className="icon-edit">✏️</i>
            <i className="icon-delete">❌</i>
          </div>
        </div>
      </div>

    </>
  );
}
