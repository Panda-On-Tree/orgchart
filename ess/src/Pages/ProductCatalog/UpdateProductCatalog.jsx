import React, { useEffect, useRef, useState } from 'react'
import { SlInput, SlMenuItem, SlSelect, SlTag, SlButton, SlDialog } from '@shoelace-style/shoelace/dist/react';
import './ProductCatalog.css'
import axios from 'axios';
import { baseurl } from '../../api/apiConfig';
import MUIDataTable from "mui-datatables";

function UpdateProductCatalog(props) {


    const [partCode, setPartCode] = useState("")
    const [partCategory, setPartCategory] = useState("")
    const [partGroup, setPartGroup] = useState("")
    const [partStatus, setPartStatus] = useState("")
    const [partName, setPartName] = useState("")
    const [partDescription, setPartDescription] = useState("")
    const [attValue, setAttValue] = useState()
    const [partAttributeInfoUpdate, setPartAttributeInfoUpdate] = useState()
    const [partAttributeInfoKeysUpdate, setPartAttributeInfoKeysUpdate] = useState()

    const [open, setOpen] = useState(false);

    const attObj = useRef(null)


    useEffect(() => {
        console.log(props.partInfo);
        setPartCode(props.partInfo.part_code)
        setPartCategory(props.partInfo.part_category)
        setPartGroup(props.partInfo.part_group)
        setPartName(props.partInfo.part_name)
        setPartDescription(props.partInfo.part_description)
        setPartStatus(props.partInfo.status)
        setPartAttributeInfoUpdate(props.partInfo.attribute)
        //console.log(props.partInfo.attribute[0]);

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
                                setAttValue(partAttributeInfoUpdate[dataIndex].attribute_value)
                                setOpen(true)

                            }} style={{ zIndex: "20" }} size="medium">Update</SlTag>
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
        selectableRowsHideCheckboxes: true
    };

    return (
        <main className='part-edit-main'>
            <SlDialog label="Enter Value Below" open={open} onSlAfterHide={() => setOpen(false)}>
                <SlInput autofocus placeholder="Enter Value" value={attObj?.current?.attribute_value} onSlInput={e => { attObj.current.attribute_value = e.target.value }} />

                <SlButton style={{ marginRight: "20px" }} slot="footer" variant="success" onClick={() => {
                    updateAttributeValue()
                    setOpen(false)
                }}>
                    Update
                </SlButton>
                <SlButton slot="footer" variant="danger" onClick={() => { setOpen(false); attObj.current.attribute_value = attValue }}>
                    Close
                </SlButton>
            </SlDialog>

            <button className='button-close-part-desc' onClick={() => {
                props.onClose()
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
                            <SlSelect className="part-edit-input" size='large' label="Part Status" defaultValue={partStatus} value={partStatus} onSlChange={e => { setPartStatus(e.target.value); console.log(e.target.value) }}>
                                <SlMenuItem className='part-edit-select' value="approved" >Approved</SlMenuItem>
                                <SlMenuItem className='part-edit-select' value="1">1</SlMenuItem>

                            </SlSelect>
                            <SlInput className="part-edit-input" size='large' label="Part Group" clearable value={partGroup} onSlInput={e => { setPartGroup(e.target.value) }} />
                        </div>
                        <SlButton onClick={() => {
                            console.log("he;llo");
                            sendUpdatedPartData()
                        }} size='large' style={{ minWidth: '15vw', minHeight: "50px", padding: '0% 2%' }} variant="neutral">Update</SlButton>
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
        </main>
    )
}

export default UpdateProductCatalog