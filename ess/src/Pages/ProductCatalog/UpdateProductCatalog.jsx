import React, { useEffect, useRef, useState } from 'react'
import { SlInput, SlMenuItem, SlSelect, SlTag, SlButton, SlDialog } from '@shoelace-style/shoelace/dist/react';
import './ProductCatalog.css'
import axios from 'axios';
import { baseurl } from '../../api/apiConfig';
import MUIDataTable from "mui-datatables";
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import image from '../img/hero/banner-img1.png'
function UpdateProductCatalog(props) {


    const [partCode, setPartCode] = useState("")
    const [partCategory, setPartCategory] = useState("")
    const [partGroup, setPartGroup] = useState("")
    const [partStatus, setPartStatus] = useState("")
    const [partName, setPartName] = useState("")
    const [partDescription, setPartDescription] = useState("")
    const [attValue, setAttValue] = useState()
    const [attID, setAttID] = useState()
    const [partAttributeInfoUpdate, setPartAttributeInfoUpdate] = useState()
    const [partAttributeInfoKeysUpdate, setPartAttributeInfoKeysUpdate] = useState()
    const [attImageDel, setAttImageDel] = useState()
    const [open, setOpen] = useState(false);
    const [openAtt, setOpenAtt] = useState(false);
    const [openAttImageAdd, setOpenAttImageAdd] = useState(false);
    const [openAttImageDel, setOpenAttImageDel] = useState(false);
    const attObj = useRef(null)

    const insertAttributeData = useRef({
        attribute_type_id: "",
        attribute_value: "",
        employee_id: localStorage.getItem('employee_id'),
        part_id: props.partInfo.part_id
    })

  
    useEffect(() => {
        setPartCode(props.partInfo.part_code)
        setPartCategory(props.partInfo.part_category)
        setPartGroup(props.partInfo.part_group)
        setPartName(props.partInfo.part_name)
        setPartDescription(props.partInfo.part_description)
        setPartStatus(props.partInfo.status)
        setPartAttributeInfoUpdate(props.partInfo.attribute)
        insertAttributeData.current.part_id = props.partInfo.part_id
        //console.log(props.partInfo.attribute[0]);

        console.log(props.images);

        console.log(props.attribute);

        if (props.partInfo.attribute) {
            let arr = Object.keys(props.partInfo.attribute[0]);
            arr.push({
                name: "Edit",
                options: {
                    filter: false,
                    sort: false,
                    empty: true,
                    customBodyRenderLite: (dataIndex, rowIndex) => {

                        return (
                            <SlTag className='tag-row' onClick={() => {
                                console.log(dataIndex);
                                attObj.current = partAttributeInfoUpdate[dataIndex]
                                console.log(partAttributeInfoUpdate[dataIndex]);
                                setAttValue(partAttributeInfoUpdate[dataIndex].attribute_value)
                                setOpen(true)

                            }} style={{ zIndex: "20" }} size="medium">Update</SlTag>
                        );
                    }
                }
            })
            arr.push({
                name: "Add Images",
                options: {
                    filter: false,
                    sort: false,
                    empty: true,
                    customBodyRenderLite: (dataIndex, rowIndex) => {

                        return (
                            <div style={{display:'flex'}}>
                                <SlTag className='tag-row' onClick={() => {
                                //console.log(dataIndex);
                                console.log(partAttributeInfoUpdate[dataIndex].attribute_id);
                                setAttID(partAttributeInfoUpdate[dataIndex].attribute_id)
                                // attObj.current = partAttributeInfoUpdate[dataIndex]
                                //setAttValue(partAttributeInfoUpdate[dataIndex].attribute_value)
                                setOpenAttImageAdd(true)

                            }} style={{ zIndex: "20" , marginRight:"10px" }} size="medium">Add</SlTag>
                                <SlTag className='tag-row' onClick={() => {
                                //console.log(dataIndex);
                               // console.log(partAttributeInfoUpdate[dataIndex].attribute_id);
                                //setAttID(partAttributeInfoUpdate[dataIndex].attribute_id)
                                // attObj.current = partAttributeInfoUpdate[dataIndex]
                                //setAttValue(partAttributeInfoUpdate[dataIndex].attribute_value)
                             
                                getAttributeImages(partAttributeInfoUpdate[dataIndex].attribute_id)

                            }} style={{ zIndex: "20" }} size="medium">Delete</SlTag>
                               
                            </div>
                        );
                    }
                }
            })
            setPartAttributeInfoKeysUpdate(arr)
            //console.log(props.partInfo.attribute[0]);
        }

    }, [props])

   

    function updateAttributeValue() {
        if (!(attValue.trim())) {
            alert("Input value")
        }
        var data = {
            data: [{
                attribute_value: attObj.current.attribute_value,
                attribute_id: attObj.current.attribute_id,
                attribute_type_id: attObj.current.attribute_type_id,
                employee_id: localStorage.getItem('employee_id')
            }]
        }
        console.log(data);
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/update-attribute-data`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res);
                attObj.current.attribute_value = attValue;
                setAttValue(attObj.current.attribute_value);
                props.updateData(props.partInfo.part_id);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function sendUpdatedPartData() {
        if (!(partCode.trim() && partCategory.trim() && partDescription.trim() && partGroup.trim() && partName.trim() && partStatus.trim())) {
            alert("Input ALl")
            return false
        }
        var data = {
            part_id: props.partInfo.part_id,
            part_code: partCode,
            part_category: partCategory,
            part_name: partName,
            part_description: partDescription,
            status: partStatus,
            part_group: partGroup,
            employee_id: localStorage.getItem('employee_id')
        }
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/update-part-master`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    const options = {
        tableBodyMaxHeight: "60vh",
        responsive: "standard",
        selectableRowsHideCheckboxes: true,
        customToolbar: () => {
            return (
                <SlTag size="large" variant='primary' onClick={() => {
                    console.log(insertAttributeData.current);
                    setOpenAtt(true)
                }} className="tag-row">Add New</SlTag>
            );
        }
    };

    function uploadNewAttribute() {
        if (!insertAttributeData.current.attribute_value.trim() || !insertAttributeData.current.attribute_type_id.toString().trim()) {
            alert("Input All")
            return
        }
        let data = {
            data: [
                insertAttributeData.current
            ]
        }
        console.log(data);
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/insert-attribute-data`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res);
                setOpenAtt(false);
                insertAttributeData.current.attribute_type_id = "";
                insertAttributeData.current.attribute_value = ""
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function uploadImages(e) {
        console.log(e.files);

        var formdata = new FormData();
        e.files.map((item) => {
            formdata.append("part_image", item)
        })
        formdata.append("part_id", props.partInfo.part_id)
        formdata.append("employee_id", localStorage.getItem("employee_id"))

        for (const value of formdata.values()) {
            console.log(value);
        }
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/add-part-image`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data: formdata
        })
            .then((res) => {
                console.log(res);
                e.options.clear()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function uploadAttImages(e) {
        console.log(e.files);
        var formdata = new FormData();
        e.files.map((item) => {
            formdata.append("attribute_image", item)
        })
        formdata.append("attribute_id", attID)
        formdata.append("employee_id", localStorage.getItem("employee_id"))

        for (const value of formdata.values()) {
            console.log(value);
        }
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/add-attribute-image`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data: formdata
        })
            .then((res) => {
                console.log(res);
                e.options.clear()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function getAttributeImages(item){
        console.log(item);
        const data ={
            attribute_id: item
        }
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/get-attribute-image`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res);
                setAttImageDel(res.data.data)
                setOpenAttImageDel(true)
               
            })
            .catch((err) => {
                console.log(err);
            }) 
    }

    function delImage(path,i){

        console.log(path);
        const data = {
            "data":[
                {
                    "image_path": path
                }
            ],
            "employee_id":localStorage.getItem('employee_id')
        }

        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/delete-image`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res);
                document.getElementById(path+i).style.display= "none"
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <main className='part-edit-main'>
            <SlDialog label="Enter Value Below" open={open} onSlAfterHide={() => setOpen(false)}>
                <SlInput autofocus placeholder="Enter Value" value={attObj?.current?.attribute_value} onSlInput={e => { attObj.current.attribute_value = e.target.value }} />

                <SlButton style={{ marginRight: "20px" }} slot="footer" outline variant="success" onClick={() => {
                    updateAttributeValue()
                    setOpen(false)
                }}>
                    Update
                </SlButton>
                <SlButton slot="footer" outline variant="danger" onClick={() => { setOpen(false); attObj.current.attribute_value = attValue }}>
                    Close
                </SlButton>
            </SlDialog>
            <SlDialog label="Add images" open={openAttImageAdd} style={{ '--width': '50vw' }} onSlAfterHide={() => setOpenAttImageAdd(false)}>
                <div style={{ padding: "0% 2%" }}>
                    <div className='edit-images-main card'>
                        <FileUpload name="demo[]" customUpload uploadHandler={uploadAttImages} multiple accept="image/*" maxFileSize={1000000}
                            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                    </div>
                </div>
                <SlButton slot="footer" variant="primary" onClick={() => setOpenAttImageAdd(false)}>
                    Close
                </SlButton>
            </SlDialog>
            <SlDialog label="Delete images" open={openAttImageDel} style={{ '--width': '70vw' }} onSlAfterHide={() => setOpenAttImageDel(false)}>
                <div style={{ padding: "0% 2%" }}>
                <div className="del-image-part-main">
                {attImageDel?.map((item,i)=>{
                    return(
                        <div id={item.image_path+i} className='del-image-container'>
                            <img src={item.image} alt="" />
                            <button className='image-delete-button' onClick={()=>{
                                 delImage(item.image_path,i)
                            }} ><span className="material-symbols-outlined">
                                close
                            </span></button>
                        </div>
                    )
                })}
                
                    </div>
                </div>
                <SlButton slot="footer" variant="primary" onClick={() => setOpenAttImageDel(false)}>
                    Close
                </SlButton>
            </SlDialog>

            <button className='button-close-part-desc' onClick={() => {
                props.onClose()
                insertAttributeData.current.attribute_type_id = "";
                insertAttributeData.current.attribute_value = "";
                insertAttributeData.current.part_id = "";
            }}><span className="material-symbols-outlined">
                    close
                </span></button>
            <div className='part-edit-main-container'>
                <div className='part-edit-main-inner'>
                    <div className='part-edit-input-main'>
                        <h4>Update Part Information</h4>
                        <div className='part-edit-input-inner'>
                            <SlInput className="part-edit-input" size='large' label="Part Code" value={partCode} required={true} onSlInput={e => {
                                setPartCode(e.target.value);
                                console.log(e.target.value);
                            }} clearable />
                            <SlInput className="part-edit-input" size='large' label="Part Category" value={partCategory} onSlInput={e => { setPartCategory(e.target.value) }} clearable />
                            <SlInput className="part-edit-input" size='large' label="Part Name" value={partName} onSlInput={e => { setPartName(e.target.value) }} clearable />
                            <SlInput className="part-edit-input" size='large' label="Part Description" value={partDescription} onSlInput={e => { setPartDescription(e.target.value) }} clearable />
                            <SlInput className="part-edit-input" size='large' label="Part Group" clearable value={partGroup} onSlInput={e => { setPartGroup(e.target.value) }} />
                        </div>
                        <SlButton onClick={() => {

                            sendUpdatedPartData()
                        }} size='large' style={{ minWidth: '15vw', minHeight: "50px", padding: '0% 2%' }} variant="neutral">Update</SlButton>
                    </div>
                </div>
                <div style={{ padding: "0% 2%" }}>
                    <div className='edit-images-main card'>
                        <FileUpload name="demo[]" customUpload uploadHandler={uploadImages} multiple accept="image/*" maxFileSize={1000000}
                            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                    </div>
                    <div className="del-image-part-main">
                        
                        {props?.images?.map((item,i)=>{
                            return(
                        <div id={item.image_path+i} className='del-image-container'>
                            <img src={item.image} alt="" />
                            <button className='image-delete-button' onClick={()=>{
                                delImage(item.image_path,i)
                            }} ><span className="material-symbols-outlined">
                                close
                            </span></button>
                        </div>
                            )
                        })}
                        
                        
                    </div>
                </div>

                <div className='part-desc-table'>
                    <MUIDataTable
                        title={"Product Part List"}
                        data={partAttributeInfoUpdate}
                        columns={partAttributeInfoKeysUpdate}
                        options={options}
                    ></MUIDataTable>
                </div>
            </div>
            <SlDialog label="Add new Attribute" open={openAtt} onSlRequestClose={() => { setOpenAtt(false) }} >
                <div>
                    <SlSelect className="part-edit-input" size='large' label="Attribute Name" onSlChange={e => {
                        insertAttributeData.current.attribute_type_id = e.target.value
                    }}>

                        {
                            props?.attribute?.map((item) => {
                                return (
                                    <SlMenuItem className='part-edit-select' value={item.id}>{item.name}</SlMenuItem>
                                )
                            })
                        }



                    </SlSelect>
                    <SlInput className="part-edit-input" size='large' label="Attribute Name" value={insertAttributeData.current.attribute_value} onSlInput={e => {
                        insertAttributeData.current.attribute_value = e.target.value
                    }} clearable />
                </div>
                <SlButton slot="footer" style={{ marginRight: "20px" }} variant="primary" onClick={() => {
                    console.log(insertAttributeData.current);
                    uploadNewAttribute()
                }}>
                    Upload
                </SlButton>
                <SlButton slot="footer" variant="primary" onClick={() => {
                    insertAttributeData.current.attribute_type_id = "";
                    insertAttributeData.current.attribute_value = ""
                    setOpenAtt(false)
                }}>
                    Close
                </SlButton>
            </SlDialog>

        </main>
    )
}

export default UpdateProductCatalog