import React, { useState } from 'react'
import './Complaint.css'
import axios from 'axios'
import { useForm } from 'react-hook-form'

function Complaint() {

    const [files, setFile] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit =(data)=>{
   var emp_id = localStorage.getItem('employee_id');
    data.complaint_file = files
    data.employee_id= emp_id
    console.log(data);
    if(data.type == "create"){
    axios({
        method: 'post',
        url: 'http://microtek.tech:8443/v1/api/mhere/create-complaint',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data,
      })
        .then(function (response) {
          console.log(response)
          reset()
          window.alert("File Uploaded successfully")
         
        })
        .catch(function (err) {
          console.log(err)
          window.alert("An error occured")
            
        })}
    if(data.type == "assign"){
    axios({
        method: 'post',
        url: 'http://microtek.tech:8443/v1/api/mhere/assign-complaint',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data,
      })
        .then(function (response) {
          console.log(response)
          reset()
          window.alert("File Uploaded successfully")
         
        })
        .catch(function (err) {
          console.log(err)
          window.alert("An error occured")
            
        })}
    if(data.type == "close"){
    axios({
        method: 'post',
        url: 'http://microtek.tech:8443/v1/api/mhere/close-complaint',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data,
      })
        .then(function (response) {
          console.log(response)
          reset()
          window.alert("File Uploaded successfully")
         
        })
        .catch(function (err) {
          console.log(err)
          window.alert("An error occured")
            
        })}
  }
  function checkfile(sender) {
    var validExts = new Array(".csv");
    var fileExt = sender.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
      alert("Invalid file selected, valid files are of " +
               validExts.toString() + " types.");
    sender.value=null
    }
    else {
        setFile(sender.files[0])
    }
}
  return (
    <div className="comp-main">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="comp-inner">
        
          <input
            type="file"
            required
            name=""
            id=""
            accept=".csv"
        onChange={(e)=>{
            checkfile(e.target)
        }}
          />
          <select name="" required id=""  {...register('type', {
              required: 'required',
            })}>
            <option disabled selected value="">
              {' '}
              -- select an option --{' '}
            </option>
            <option value="create">Create</option>
            <option value="assign">Assign</option>
            <option value="close">Close</option>
          </select>
          <button type='submit' className="login-button">Submit</button>
        
      </div>
      </form>
    </div>
  )
}

export default Complaint
