'use client'

import { Button } from "@mui/material"
import { useState } from "react";
import BasicModal from "./create.modal";
import UpdateModal from "./update.modal";
import Link from 'next/link';
import { toast } from 'react-toastify';
import { mutate } from "swr";

interface IProps{
  blogs: IBlog[]
}

const DataTable = (props: IProps) =>{
  
  const {blogs} = props;

  const [blog, setBlog] = useState<IBlog | null>(null);
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);

  const handleDeleteBlog = (id: number) => {
    if (confirm(`Do you want to delete this blog (id = ${id})`)) {
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },

        }).then(res => res.json())
            .then(res => {
                if (res) {
                    toast.success("Delete blog succeed !"); 
                    mutate("http://localhost:8000/blogs")
                }
            });
    }
  }

  return (
    <div>
      <div className="font-semibold flex space-x-80 my-5">
      <p>List Blogs Page</p>
      <Button variant="contained"  color="success" onClick={() => setOpenModalCreate(true)}>Add new</Button>
      </div>
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {blogs.map(item => {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.author}</td>
            <td className="flex mx-3 my-2 space-x-3">

            <Link className='btn btn-primary' color="primary"
                href={`/blogs/${item.id}`}>View</Link>
            {/* <Button variant="contained" className="space-13"
                >
                View</Button> */}

            <Button variant="contained"  color="secondary" 
              onClick={() => {
                setBlog(item);
                setOpenModalUpdate(true);
              }}>
              Edit</Button>

            <Button variant="contained"  color="error"
              onClick={() => handleDeleteBlog(item.id)}>
            Delete</Button>
              
            </td>
          </tr>
        )
      })}
    </tbody>
    <BasicModal
      openModalCreate={openModalCreate}
      setOpenModalCreate={setOpenModalCreate}
    />

    <UpdateModal
      openModalUpdate={openModalUpdate}
      setOpenModalUpdate={setOpenModalUpdate}
      blog={blog}
      setBlog={setBlog}
      />

    </div>
  );
}
export default DataTable;

