import React, { useEffect, useRef, useState } from 'react'
import './ProductCatalog.css'
import MUIDataTable from "mui-datatables";
import { baseurl } from '../../api/apiConfig';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import { SlInput, SlMenuItem, SlSelect, SlButton, SlTag, SlDetails, SlDialog, SlIcon } from '@shoelace-style/shoelace/dist/react';
import UpdateProductCatalog from './UpdateProductCatalog';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
function ProductCatalog() {

    const [filterData, setFilterData] = useState([]);
    const [filterOption1, setFilterOption1] = useState({});
    const [filterOption2, setFilterOption2] = useState();
    const [filterOption3, setFilterOption3] = useState();
    const [inputToOption3, setInputToOption3] = useState({});
    const [attributes, setAttributes] = useState();
    const [addPartAttributeMaster, setAddPartAttributeMaster] = useState([]);
    const [primaryAttributes, setPrimaryAttributes] = useState();
    const [partDataKeys, setPartDataKeys] = useState();
    const [partData, setPartData] = useState()
    const [searchData, setSearchData] = useState([]);
    const [partDataMaster, setPartDataMaster] = useState();
    const [partAttributeDataMaster, setPartAttributeDataMaster] = useState();
    const [attributeMaster, setAttributeMaster] = useState();
    const [partInfo, setPartInfo] = useState({});
    const [partAttributeInfo, setPartAttributeInfo] = useState([]);
    const [partAttributeKeys, setPartAttributeKeys] = useState();
    const [partCodeSearch, setPartCodeSearch] = useState();
    const [part_code, setPart_code] = useState("");
    const [part_category, setPart_category] = useState("");
    const [part_group, setPart_group] = useState("");
    const [addAttributeOption1, setAddAttributeOption1] = useState();
    const [addAttributeOption2, setAddAttributeOption2] = useState();
    const [addPartAttributeData, setAddPartAttributeData] = useState([]);
    const [attributeImage, setAttributeImage] = useState([])
    const [partStatus, setPartStatus] = useState()
    const [partImages, setPatImages] = useState([])
    const [partUpdateImages, setPatUpdateImages] = useState([])
    const [openStatus, setOpenStatus] = useState(false);
    const [openImage, setOpenImage] = useState(false);
    const displayModel = useRef(false)
    const displayEdit = useRef(null);
    const display = useRef(null);
    const backOpacity = useRef(null);
    const loadingRef = useRef(false);
    const options = {
        tableBodyMaxHeight: "60vh",
        responsive: "standard",
        onCellClick: (colData, colMeta) => {
            console.log(colData);
            console.log(colMeta);
        },
        onRowClick: (rowData, rowMeta) => {
            getPartImages(rowData[0])
            console.log(rowData);
            console.log(rowMeta);
            getPartInfo(rowData[0]);
            console.log(displayModel);
            display.current.style.display = "block"
            if (displayModel.current) {

                display.current.style.display = "none"
            }
            backOpacity.current.style.display = "block"
            document.getElementById("root").style.overflow = "hidden"
            document.getElementById("root").scrollTop = 0;

        },
        selectableRowsHideCheckboxes: true
    };
    const optionsAtt = {
        tableBodyMaxHeight: "60vh",
        responsive: "standard",
        selectableRowsHideCheckboxes: true
    };

    useEffect(() => {
        //console.log(document.querySelector("#filter-row").innerHTML);
        getAttributes()
        console.log(loadingRef.current);
        //  console.log("hello world".startsWith("llo"));
        console.log(localStorage.getItem('role'));
    }, [])
    useEffect(() => {
        console.log("data is here");
    }, [partData])

    /* Axios api calls */
    function getPartImages(part_id) {
        const data = {
            part_id: part_id
        }
        console.log(data);
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/get-part-image`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res.data.data);
                setPatUpdateImages(res.data.data)
                let images = []
                res.data.data.map((item) => {
                    let obj = {}
                    obj.original = item.image
                    images.push(obj);
                })
                console.log(images);
                setPatImages(images)
            })
            .catch((err) => {
                console.log(err);
            })
    }


    function getPartInfo(part_id) {
        const data = {
            part_id: part_id
        }
        console.log(data);
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/part-data`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res);
                setPartInfo(res.data.data);
                setPartAttributeInfo(res.data.data.attribute);
                console.log(res.data.data.attribute[0]);
                let obj = res.data.data.attribute[0]
                

                let arr = Object.keys(obj);
                let new_arr = arr.map((item) => {
                    let new_obj = {
                        name: item,
                        label: item.replace("_", " "),
                        options: {
                            filter: true,
                            sort: true,
                        }
                    }
                    return new_obj
                })
                new_arr.push({
                    name: "Images",
                    options: {
                        filter: false,
                        sort: false,
                        empty: true,
                        customBodyRenderLite: (dataIndex, rowIndex) => {
                            return (

                                <SlTag variant='primary' size="medium" className="tag-row" onClick={() => {
                                    console.log(res.data.data.attribute[dataIndex].attribute_id);
                                    const data ={
                                        attribute_id:res.data.data.attribute[dataIndex].attribute_id
                                    }
                                    console.log(data);
                                    axios({
                                        method: 'post',
                                        url: `${baseurl.base_url}/mhere/get-attribute-image`,
                                        headers: {
                                            'Content-Type': 'application/json',
                                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                                        },
                                        data
                                    })
                                    .then((res)=>{
                                        console.log(res.data.data);
                                        let arr =[]

                                        res.data.data.map((item)=>{
                                            let obj ={
                                                original : item.image
                                            }
                                            arr.push(obj)
                                        })
                                        console.log(arr);
                                        setAttributeImage(arr)
                                        if(attributeImage){
                                            setOpenImage(true)
                                        }
                                    })
                                    .catch((err)=>{
                                        console.log(err);
                                    })
                                }} style={{ zIndex: "20", cursor: "pointer" }} >
                                    view

                                </SlTag>
                            );
                        }
                    }
                })
                console.log(arr);
                setPartAttributeKeys(new_arr)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    function getAttributes() {
        axios({
            method: 'get',
            url: `${baseurl.base_url}/mhere/attribute`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then((res) => {
                console.log(res);
                setAttributes(res.data.data);
                setAttributeMaster(res.data.data);
                setAddPartAttributeMaster(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
        axios({
            method: 'get',
            url: `${baseurl.base_url}/mhere/primary-attribute`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then((res) => {
                console.log(res);
                setPrimaryAttributes(res.data.data);
                //setAttributeMaster(res.data.data);

            })
            .catch((err) => {
                console.log(err);
            })
    }
    /* Axios api calls */

    useEffect(() => {
        console.log(filterOption1);
        console.log("100" > "95");
    }, [filterOption1])

    function closeEdit() {
        displayModel.current = false
        displayEdit.current.style.display = "none";
        backOpacity.current.style.display = "none";
        document.getElementById("root").style.overflow = "auto";
    }


    function get() {

        console.log(attributes);
        if (!(filterOption1 && filterOption2 && filterOption3)) {
            alert("input all");
            return;
        }
        const filter = {
            filter_attribute: filterOption1,
            filter_value: filterOption2,
            filter_operation: filterOption3
        }
        setFilterData([...filterData, filter]);
        setSearchData([...searchData, filter]);
        console.log(filterOption1);
        console.log([...filterData, filter]);
        setFilterOption1({});
        setFilterOption2("");
        setFilterOption3("");
        if (!partDataMaster) {
            console.log(partDataMaster);
            getFilterList();
        }
        else {
            filterMasterData([...filterData, filter]);
        }
    }

    function filterMasterData(multiFilter, multiAttributeDataMaster, multiPartDataMaster) {
        if (!multiFilter.length) {
            return;
        }
        console.log(multiFilter);
        let filterdata = multiFilter;
        var filterPartDataMaster = multiPartDataMaster ? multiPartDataMaster : partDataMaster
        var filterAttributeDataMaster = multiAttributeDataMaster ? multiAttributeDataMaster : partAttributeDataMaster;
        var filterAttributeData = multiAttributeDataMaster ? multiAttributeDataMaster : partAttributeDataMaster;

        var part_id_data;
        if (!filterdata.length) {
            setPartData(filterPartDataMaster);
            return;
        }
        console.log(partAttributeDataMaster);
        filterdata.map((item) => {
            let attribute = JSON.parse(item.filter_attribute)
            let operation = item.filter_operation
            let value = item.filter_value
            const abc = filterAttributeData.filter((item) => {
                if (item.attribute_type_id == attribute.id)
                    switch (operation) {
                        case "greater_then":
                            if (item.attribute_type_id == attribute.id && parseInt(item.attribute_value) >= parseInt(value)) {
                                console.log(item);
                                console.log(value, item.attribute_value);
                                return true
                            }
                            return false
                            break;
                        case "less_then":
                            if (item.attribute_type_id == attribute.id && parseInt(item.attribute_value) <= parseInt(value)) {
                                return true
                            }
                            return false
                            break;
                        case "start_with":
                            if (item.attribute_type_id == attribute.id && item.attribute_value.startsWith(value)) {
                                return true
                            }
                            return false

                            break;
                        case "equal":
                            if (item.attribute_type_id == attribute.id && parseInt(item.attribute_value) == parseInt(value)) {
                                return true
                            }
                            return false

                            break;
                        case "end_with":
                            if (item.attribute_type_id == attribute.id && item.attribute_value.endsWith(value)) {
                                return true
                            }
                            return false

                            break;
                        case "contains":
                            if (item.attribute_type_id == attribute.id && item.attribute_value.includes(value)) {
                                return true
                            }
                            return false

                            break;
                        case "equal_string":
                            if (item.attribute_type_id == attribute.id && item.attribute_value == value) {
                                return true
                            }
                            return false
                            break;

                        default:
                            break;
                    }

            })
            part_id_data = abc.map((item) => {
                return (
                    item.part_id
                )
            })
            filterAttributeData = filterAttributeDataMaster.filter((item) => {
                if (part_id_data.includes(item.part_id)) {
                    return true
                }
                return false
            })
        })
        const tableDataMain = filterPartDataMaster.filter((item) => {
            if (part_id_data.includes(item.part_id)) {
                return true
            }
            return false
        })
        console.log(tableDataMain);
        setPartData(tableDataMain);
    }

    function searchPartBase() {
        const data = {
            part_code: part_code,
            part_category: part_category,
            part_group: part_group
        }
        console.log(data);
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/part-base-search`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res);
                let attribute = [];
                setPartDataMaster(res.data.data.part_data);
                setPartAttributeDataMaster(res.data.data.part_attribute_data);
                console.log(res.data.data.part_attribute_data);
                res.data.data.part_attribute_data.map(item => {
                    const data = {
                        id: item.attribute_type_id,
                        type: item.attribute_type,
                        name: item.attribute_name,
                        description: item.attribute_description
                    }
                    if (attribute.indexOf(data) < 0) {
                        attribute.push(data);
                    }
                })
                const uniqueIds = [];

                const unique = attribute.filter(element => {
                    const isDuplicate = uniqueIds.includes(element.id);

                    if (!isDuplicate) {
                        uniqueIds.push(element.id);

                        return true;
                    }

                    return false;
                });
                console.log(unique);
                setAttributes(unique);
                let data = res.data.data.part_data;
                let obj = res.data.data.part_data[0];
                console.log(obj);
                delete obj.created_at
                delete obj.created_by
                delete obj.updated_at
                delete obj.updated_by
                let arr = Object.keys(obj);
                let new_arr = arr.map((item) => {
                    let new_obj = {
                        name: item,
                        label: item.replace("_", " "),
                        options: {
                            filter: true,
                            sort: true,
                        }
                    }
                    return new_obj
                })
                if (localStorage.getItem('role') == 'admin' || localStorage.getItem('role') == 'sadmin') {
                    new_arr.push({
                        name: "Update",
                        options: {
                            filter: false,
                            sort: false,
                            empty: true,
                            customBodyRenderLite: (dataIndex, rowIndex) => {

                                return (
                                    <SlTag size="medium" className="tag-row" onClick={() => {
                                        //alert(dataIndex + "hello " + rowIndex) ;
                                        console.log(partData);
                                        console.log(dataIndex);
                                        console.log(rowIndex);
                                        console.log("update button");
                                        displayModel.current = true
                                        console.log(displayModel);
                                        displayEdit.current.style.display = "block"
                                        display.current.style.display = "none"

                                    }} style={{ zIndex: "20", cursor: "pointer" }} >Update</SlTag>
                                );
                            }
                        }
                    })
                }
                if (localStorage.getItem('role') == 'sadmin') {
                    new_arr.push({
                        name: "Change Status",
                        options: {
                            filter: false,
                            sort: false,
                            empty: true,
                            customBodyRenderLite: (dataIndex, rowIndex) => {

                                return (
                                    <SlTag size="medium" className="tag-row" onClick={() => {
                                        //alert(dataIndex + "hello " + rowIndex) ;
                                        displayModel.current = true
                                        display.current.style.display = "none"
                                        setOpenStatus(true)

                                    }} style={{ zIndex: "20", cursor: "pointer" }} >Change</SlTag>
                                );
                            }
                        }
                    })
                }
                console.log(new_arr);

                // console.log(arr);
                setPartDataKeys(new_arr)
                setPartData(data)
                filterMasterData(filterData, res.data.data.part_attribute_data, res.data.data.part_data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function getFilterList() {
        var data;
        if (searchData.length) {
            data = {
                "attribute_type_id": JSON.parse(searchData[0].filter_attribute).id,
                "attribute_value": searchData[0].filter_value,
                "attribute_operation": searchData[0].filter_operation
            }
        } else {
            if (!(filterOption1 && filterOption2 && filterOption3)) {
                alert("input all");
                return;
            }
            var data = {
                "attribute_type_id": JSON.parse(filterOption1).id,
                "attribute_value": filterOption2,
                "attribute_operation": filterOption3
            }
            const filter = {
                filter_attribute: filterOption1,
                filter_value: filterOption2,
                filter_operation: filterOption3
            }
        }
        console.log(data);
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/filter-part`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                let attribute = [];
                setPartDataMaster(res.data.data.part_data);
                setPartAttributeDataMaster(res.data.data.part_attribute_data);
                console.log(res.data.data.part_attribute_data);
                res.data.data.part_attribute_data.map(item => {
                    const data = {
                        id: item.attribute_type_id,
                        type: item.attribute_type,
                        name: item.attribute_name,
                        description: item.attribute_description
                    }
                    if (attribute.indexOf(data) < 0) {
                        attribute.push(data);
                    }
                })
                const uniqueIds = [];

                const unique = attribute.filter(element => {
                    const isDuplicate = uniqueIds.includes(element.id);

                    if (!isDuplicate) {
                        uniqueIds.push(element.id);

                        return true;
                    }

                    return false;
                });
                console.log(unique);
                setAttributes(unique);
                let data = res.data.data.part_data;
                let obj = res.data.data.part_data[0];
                console.log(obj);
                delete obj.created_at
                delete obj.created_by
                delete obj.updated_at
                delete obj.updated_by
                let arr = Object.keys(obj);
                let new_arr = arr.map((item) => {
                    let new_obj = {
                        name: item,
                        label: item.replace("_", " "),
                        options: {
                            filter: true,
                            sort: true,
                        }
                    }
                    return new_obj
                })
                //console.log(new_arr);

                // console.log(arr);
                setPartDataKeys(new_arr)
                setPartData(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    function clearAll() {
        setFilterData([]);
        setPartDataMaster("");
        setPartAttributeDataMaster("");
        setPartData();
        setSearchData("");
        getAttributes();
        setPart_category("");
        setPart_code("");
        setPart_group("");
    }
    function deleteFilter(item) {
        const filter = filterData.filter((data) => data.filter_attribute !== item.filter_attribute);
        setFilterData(filter);
        filterMasterData(filter);
    }
    function changeFilterOperation(item, operation) {
        var filter = filterData
        const index = filter.findIndex(x => x.filter_attribute == item.filter_attribute)
        filter[index].filter_operation = operation;
        console.log(filter);
        setFilterData(filter);
    }
    function changeFilterValue(item, value) {
        var filter = filterData
        const index = filter.findIndex(x => x.filter_attribute == item.filter_attribute)
        filter[index].filter_value = value;
        console.log(filter);
        setFilterData(filter);
    }

    function searchPart() {
        if (!partCodeSearch) {
            alert("Input Part Code First")
            return
        }
        const data = {
            part_code: partCodeSearch
        }
        console.log(data);
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/part-code-search`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res);
                if (!res.data.dataFound) {
                    alert("No Data Found for Part Code :" + partCodeSearch)
                    return
                }
                setPartInfo(res.data.data);
                setPartAttributeInfo(res.data.data.attribute);
                let arr = Object.keys(res.data.data.attribute[0]);
                console.log(arr);
                setPartAttributeKeys(arr)
                display.current.style.display = "block"
                backOpacity.current.style.display = "block"
                document.getElementById("root").style.overflow = "hidden"
            })
            .catch((err) => {
                console.log(err);
            })
    }
    function addPartAttribute() {
        if (!(addAttributeOption1 && addAttributeOption2)) {
            alert("input all");
            return;
        }
        const filter = {
            filter_attribute: addAttributeOption1,
            filter_value: addAttributeOption2,
        }
        setAddPartAttributeData([...addPartAttributeData, filter])
        setAddAttributeOption1("");
        setAddAttributeOption2("");
        const attr_filter = addPartAttributeMaster.filter((data) => data.id !== JSON.parse(addAttributeOption1).id);
        setAddPartAttributeMaster(attr_filter);
    }
    function deleteAddPartAttribute(item) {
        const filter = addPartAttributeData.filter((data) => data.filter_attribute !== item.filter_attribute);
        setAddPartAttributeData(filter)
        setAddPartAttributeMaster([...addPartAttributeMaster, JSON.parse(item.filter_attribute)]);
    }

    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];

    const newPartData = useRef({
        part_code: "",
        part_category: "",
        part_name: "",
        part_description: "",
        status: "pending",
        part_group: "",
        employee_id: localStorage.getItem("employee_id")
    })

    const newAttributeData = useRef({
        attribute_type: "",
        attribute_name: "",
        attribute_description: "",
        attribute_priority: "",
        employee_id: localStorage.getItem("employee_id")
    })

    function sendAddPartData() {
        loadingRef.current = true
        //addPartAttributeData
        let arr = []
        arr = addPartAttributeData.map((item) => {
            let obj = {
                attribute_type_id: JSON.parse(item.filter_attribute).id,
                attribute_value: item.filter_value
            }
            return obj
        })

        newPartData.current.attributes = arr;

        if (!(newPartData.current.part_code.trim() != "" && newPartData.current.part_category.trim() != "" && newPartData.current.part_description.trim() != "" && newPartData.current.part_group.trim() != "" && newPartData.current.part_name.trim() != "" && arr[0])) {
            alert("Input All");
            return
        }

        const data = newPartData.current
        console.log(data);
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/insert-part-master`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res);
                loadingRef.current = false
                setAddPartAttributeData([]);
                document.getElementById("add-part-form").reset();
                newPartData.current =
                {
                    part_code: "",
                    part_category: "",
                    part_name: "",
                    part_description: "",
                    status: "pending",
                    part_group: "",
                    employee_id: localStorage.getItem("employee_id")
                }
            })
            .catch((err) => {
                console.log(err);
                loadingRef.current = false
            })



    }

    function sendNewAttributeData() {
        if (!newAttributeData.current.attribute_name.trim() || !newAttributeData.current.attribute_type.toString().trim() || !newAttributeData.current.attribute_priority.toString().trim() || !newAttributeData.current.attribute_description.toString().trim()) {
            alert("Input All Field")
            return
        }
        let data = newAttributeData.current
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/insert-attribute-master`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res);
                newAttributeData.current.attribute_description = ""
                newAttributeData.current.attribute_name = ""
                newAttributeData.current.attribute_priority = ""
                newAttributeData.current.attribute_type = ""

            })
            .catch((err) => {
                console.log(err);

            })

    }
    /* 
        function uploadImages(e){
            console.log(e.files);
        } */

    function changePartStatus() {
        if (!partStatus) {
            alert("Select One status")
            return
        }

        const data = {
            part_id: partInfo.part_id,
            status: partStatus,
            employee_id: localStorage.getItem("employee_id")
        }
        console.log(data);
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/update-part-status`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res);
                setPartStatus("");
                searchPartBase()
                backOpacity.current.style.display = "none"
                display.current.style.display = "none";
                document.getElementById("root").style.overflow = "auto";
                setOpenStatus(false)
                displayModel.current = false
            })
            .catch((err) => {
                console.log(err);

            })
    }


    return (
        <div className='product-table-main'>
            <h1 style={{ textAlign: "center", marginBottom: "5vh" }}>Part Catalogue</h1>

            {localStorage.getItem('role') != 'user' ? <div>
                <SlDetails className='part-add-input-main' summary="Add New Part">

                    <form id="add-part-form">
                        <div className='part-add-input-inner'>
                            <SlInput maxlength={50} size="large" className="part-add-input" label="Part Code" onSlChange={(e) => { newPartData.current.part_code = e.target.value }} />
                            <SlInput maxlength={100} size="large" className="part-add-input" label="Part Name" onSlChange={(e) => { newPartData.current.part_name = e.target.value }} />
                            <SlInput maxlength={100} size="large" className="part-add-input" label="Part Category" onSlChange={(e) => { newPartData.current.part_category = e.target.value }} />
                            <SlInput maxlength={30} size="large" className="part-add-input" label="Part Group" onSlChange={(e) => { newPartData.current.part_group = e.target.value }} />
                            <SlInput maxlength={250} size="large" className="part-add-input" label="Part Description" onSlChange={(e) => { newPartData.current.part_description = e.target.value }} />
                            {/*  <SlInput maxlength={20} size="large" className="part-add-input" label="Part Status" onSlChange={(e) => { newPartData.current.status = e.target.value }} /> */}
                        </div>
                    </form>
                    <div className='part-add-attribute-main'>
                        <div>
                            <h5 className='search-heading'>Add Attributes</h5>
                            {addPartAttributeData.map(item => {
                                return (
                                    <div id='filter-row' className='product-filter-main'>
                                        <select className='product-filter-option1' name="cars" id="cars" value={item.filter_attribute} disabled>
                                            {attributeMaster?.map((attributeItem) => {
                                                return (
                                                    <option value={JSON.stringify(attributeItem)} id={attributeItem.name}>{attributeItem.name}</option>
                                                )
                                            })}
                                        </select>
                                        <input className='product-search' type="text" name="" id="" value={item.filter_value} disabled />

                                        <button className='product-add-filter-button' onClick={e => {
                                            deleteAddPartAttribute(item)
                                        }}>Clear Filter</button>
                                    </div>
                                )
                            })}
                            <div id='filter-row' className='product-filter-main'>
                                <select className='product-filter-option1' name="cars" id="cars" value={addAttributeOption1} onChange={e => {
                                    setAddAttributeOption1(e.target.value)
                                    console.log(JSON.parse(e.target.value));
                                }}>

                                    <option value="" hidden>Select an option </option>
                                    {addPartAttributeMaster?.map((item) => {
                                        return (
                                            <option value={JSON.stringify(item)} id={item.name}>{item.name}</option>
                                        )
                                    })}
                                </select>
                                <input type="text" name="" className='product-search' id="" value={addAttributeOption2} onChange={e => {

                                    setAddAttributeOption2(e.target.value);
                                }} />

                            </div>
                            <div className='product-filter-main-button'>
                                <button className='product-add-filter-button' onClick={() => {
                                    addPartAttribute();
                                }}>Add Attribute</button>
                                {/* <button className='product-add-filter-button' onClick={() => {
            getFilterList()
            }}>Search Part</button> */}
                            </div>
                        </div>
                    </div>
                    {/*  <div style={{padding:"0% 2%"}}>
<div className='edit-images-main card'>
<FileUpload name="demo[]" customUpload uploadHandler={uploadImages} url=""  multiple accept="image/*" maxFileSize={1000000}
    emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
</div>
</div> */}

                    <SlButton {...(loadingRef.current && { loading: true })} size='large' className='add-part-main-button' onClick={() => {

                        sendAddPartData()
                    }} variant="primary">Submit
                    </SlButton>

                </SlDetails>
                <SlDetails className='part-add-input-main' summary="Add New Attribute">
                    <div className='part-add-input-inner'>
                        <SlSelect className="part-edit-input att--edit-input" size='large' label="Attribute Type" onSlChange={(e) => {
                            newAttributeData.current.attribute_type = e.target.value
                        }}>
                            <SlMenuItem className='part-edit-select' value="text" >Text</SlMenuItem>
                            <SlMenuItem className='part-edit-select' value="number">Number</SlMenuItem>
                        </SlSelect>
                        <SlInput defaultValue="" maxlength={20} size="large" className="part-add-input" clearable label="Attribute Name" onSlChange={(e) => { newAttributeData.current.attribute_name = e.target.value }} />
                        <SlInput maxlength={10} type="number" size="large" className="part-add-input" clearable label="Attribute Priority" onSlChange={(e) => { newAttributeData.current.attribute_priority = e.target.value }} />
                        <SlInput maxlength={250} size="large" className="part-add-input" clearable label="Attribute Description" onSlChange={(e) => { newAttributeData.current.attribute_description = e.target.value }} />
                    </div>
                    <SlButton size='large' className='add-part-main-button' onClick={() => {
                        console.log(newAttributeData.current);
                        sendNewAttributeData()
                    }} variant="primary">Submit</SlButton>

                </SlDetails>
            </div> : null}
            <div className='filter-inputs-main'>
                <SlDetails className='part-filter-input-main-first' open summary="Search Part Using Filter">
                    <div className='filter-inputs-main'>
                        <div>
                            <h5 className='search-heading'>Search Using Filters</h5>
                            {filterData.slice(0, 1).map(item => {
                                console.log(item.filter_attribute);
                                return (
                                    <div id='filter-row' className='product-filter-main'>
                                        <select className='product-filter-option1' name="cars" id="cars" value={item.filter_attribute} disabled>
                                            {attributeMaster?.map((attributeItem) => {
                                                return (
                                                    <option value={JSON.stringify(attributeItem)} id={attributeItem.name}>{attributeItem.name}</option>
                                                )
                                            })}
                                        </select>
                                        {JSON.parse(item.filter_attribute).type == "text" ? <select disabled className='product-filter-option2' name="cars" id="cars" value={item.filter_operation}>

                                            <option value="" hidden>Select an option </option>
                                            <option value="start_with">Start's With</option>
                                            <option value="end_with">End's With</option>
                                            <option value="contains">Contains</option>
                                            <option value="equal_string">Equals</option>
                                        </select> : <select disabled className='product-filter-option2' name="cars" id="cars" value={item.filter_operation}>

                                            <option value="" hidden>Select an option </option>
                                            <option value="greater_then">Greater Then</option>
                                            <option value="less_then">Less Then</option>
                                            <option value="equal">Equals</option>
                                        </select>}
                                        <input className='product-search' type="text" name="" id="" value={item.filter_value} disabled />

                                    </div>
                                )
                            })}
                            {filterData.slice(1).map(item => {
                                return (
                                    <div id='filter-row' className='product-filter-main'>
                                        <select className='product-filter-option1' name="cars" id="cars" value={item.filter_attribute} disabled>
                                            {attributeMaster?.map((attributeItem) => {
                                                return (
                                                    <option value={JSON.stringify(attributeItem)} id={attributeItem.name}>{attributeItem.name}</option>
                                                )
                                            })}
                                        </select>
                                        {JSON.parse(item.filter_attribute).type == "text" ? <select disabled className='product-filter-option2' name="cars" id="cars" value={item.filter_operation}>

                                            <option value="" hidden>Select an option </option>
                                            <option value="start_with">Start's With</option>
                                            <option value="end_with">End's With</option>
                                            <option value="contains">Contains</option>
                                            <option value="equal_string">Equals</option>
                                        </select> : <select disabled className='product-filter-option2' name="cars" id="cars" value={item.filter_operation}>

                                            <option value="" hidden>Select an option </option>
                                            <option value="greater_then">Greater Then</option>
                                            <option value="less_then">Less Then</option>
                                            <option value="equal">Equals</option>
                                        </select>}
                                        <input className='product-search' type="text" name="" id="" value={item.filter_value} disabled />

                                        <button className='product-add-filter-button' onClick={e => {
                                            deleteFilter(item)
                                        }}>Clear Filter</button>
                                    </div>
                                )
                            })}
                            <div id='filter-row' className='product-filter-main'>
                                <select className='product-filter-option1' name="cars" id="cars" value={filterOption1} onChange={e => {
                                    setFilterOption1(e.target.value)
                                    console.log(JSON.parse(e.target.value));
                                    setInputToOption3(JSON.parse(e.target.value))

                                }}>

                                    <option value="" hidden>Select an option </option>
                                    {attributes?.map((item) => {
                                        return (
                                            <option value={JSON.stringify(item)} id={item.name}>{item.name}</option>
                                        )
                                    })}
                                </select>
                                {inputToOption3.type == "text" ? <select className='product-filter-option2' name="cars" id="cars" value={filterOption3} onChange={e => {
                                    setFilterOption3(e.target.value)
                                }}>

                                    <option value="" hidden>Select an option</option>
                                    <option value="start_with">Start's With</option>
                                    <option value="end_with">End's With</option>
                                    <option value="contains">Contains</option>
                                    <option value="equal_string">Equals</option>
                                </select> : inputToOption3.type == "number" ? <select className='product-filter-option2' name="cars" id="cars" value={filterOption3} onChange={e => {
                                    setFilterOption3(e.target.value)
                                }}>

                                    <option value="" hidden>Select an option</option>
                                    <option value="greater_then">Greater Then</option>
                                    <option value="less_then">Less Then</option>
                                    <option value="equal">Equals</option>
                                </select> : null}
                                <input type="text" name="" className='product-search' id="" value={filterOption2} onChange={e => {
                                    console.log(e.target.value);
                                    setFilterOption2(e.target.value)
                                }} />

                            </div>
                            <div className='product-filter-main-button'>
                                <button className='product-add-filter-button' onClick={() => {
                                    get()
                                }}>Search / Add Filter +</button>
                                <button className='product-add-filter-button' onClick={() => {
                                    clearAll();
                                }}>Clear All Filter </button>
                                {/* <button className='product-add-filter-button' onClick={() => {
                            getFilterList()
                            }}>Search Part</button> */}
                            </div>
                        </div>
                        <div className='part-code-search-main'>
                            <h5 className='search-heading' >Search By : </h5>
                            <div style={{ display: "flex", flexDirection: "row", gap: "15px", marginBottom: "15px" }}>
                                <select className='product-filter-option1' name="cars" id="cars">
                                    <option value="part_code" hidden>Part Code</option>
                                </select>
                                <input style={{ minWidth: "10vw" }} className='product-search part-code-search' type="text" value={part_code} onChange={(e) => {
                                    setPart_code((e.target.value).toUpperCase())
                                }} name="" id="" />
                                {/* <button className='product-add-filter-button' onClick={() => {
                            searchPartBase()
                        }}>Search Part</button> */}
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", gap: "15px", marginBottom: "15px" }}>
                                <select className='product-filter-option1' name="cars" id="cars">
                                    <option value="part_category" hidden>Part Category</option>
                                </select>
                                <input style={{ minWidth: "10vw" }} className='product-search part-code-search' type="text" value={part_category} onChange={(e) => {
                                    setPart_category((e.target.value).toUpperCase())
                                }} name="" id="" />
                                {/* <button className='product-add-filter-button' onClick={() => {
                            searchPartBase()
                        }}>Search Part</button> */}
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", gap: "15px", marginBottom: "25px" }}>
                                <select className='product-filter-option1' name="cars" id="cars">
                                    <option value="part_group" hidden>Part Group</option>
                                </select>
                                <input style={{ minWidth: "10vw" }} className='product-search part-code-search' type="text" value={part_group} onChange={(e) => {
                                    setPart_group((e.target.value).toUpperCase())
                                }} name="" id="" />
                                {/* <button className='product-add-filter-button' onClick={() => {
                            searchPartBase()
                        }}>Search Part</button> */}
                            </div>
                            <button className='product-add-filter-button search-part-base-button' onClick={() => {
                                searchPartBase()
                            }}>Search Part</button>

                        </div>
                    </div>

                </SlDetails>


            </div>
            <div style={{ marginBottom: "3vh" }}>
                <MUIDataTable
                    title={"Product Part List"}
                    data={partData}
                    columns={partDataKeys}
                    options={options}
                ></MUIDataTable>
            </div>
            <div className='background-opacity' ref={backOpacity}>

            </div>
            <main style={{ display: "none" }} ref={display} className="part-desc-main">
                <button className='button-close-part-desc' onClick={() => {
                    display.current.style.display = "none";
                    backOpacity.current.style.display = "none";
                    document.getElementById("root").style.overflow = "auto";
                }}><span className="material-symbols-outlined">
                        close
                    </span></button>
                <div className='part-dec-container'>
                    <div className='part-desc-inner'>

                        <div className='part-desc-image-data-main'>
                            <div className='part-desc-image-main'>
                                <ImageGallery items={partImages} />
                            </div>
                            <div className='part-desc-data-main'>
                                <h1 style={{ textAlign: "center", fontSize: "24px" }}>Part Description</h1>
                                <div className='part-desc-data-desc'>
                                    <div className='desc-info-main'><p className='info-key'>Part ID :</p><p className='info-value'>{partInfo?.part_id}</p></div>
                                    <div className='desc-info-main'><p className='info-key'>Part Code :</p><p className='info-value'>{partInfo?.part_code}</p></div>
                                    <div className='desc-info-main'><p className='info-key'>Part Name :</p><p className='info-value'>{partInfo?.part_name}</p></div>
                                    <div className='desc-info-main'><p className='info-key'>Part Description :</p><p className='info-value'>{partInfo?.part_description}</p></div>
                                    <div className='desc-info-main'><p className='info-key'>Part Category :</p><p className='info-value'>{partInfo?.part_category}</p></div>
                                    <div className='desc-info-main'><p className='info-key'>Part Grounp :</p><p className='info-value'>{partInfo?.part_group}</p></div>
                                    <div className='desc-info-main'><p className='info-key'>Part Status :</p><p className='info-value'>{partInfo?.status}</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='part-desc-table'>
                        <MUIDataTable
                            title={"Product Attribute List"}
                            data={partAttributeInfo}
                            columns={partAttributeKeys}
                            options={optionsAtt}
                        ></MUIDataTable>
                    </div>
                </div>
            </main>
            <SlDialog label="Change status" open={openStatus} onSlRequestClose={() => {
                displayModel.current = false
                display.current.style.display = "none";
                backOpacity.current.style.display = "none";
                document.getElementById("root").style.overflow = "auto";
                setOpenStatus(false)
            }} >
                <SlSelect className="part-edit-input" size='large' label="Status" value={partStatus} onSlChange={(e) => {
                    setPartStatus(e.target.value)
                }} >
                    <SlMenuItem className='part-edit-select' value="approved">Approved</SlMenuItem>
                    <SlMenuItem className='part-edit-select' value="pending">Pending</SlMenuItem>
                    <SlMenuItem className='part-edit-select' value="unactive">Unactive</SlMenuItem>



                </SlSelect>
                <SlButton style={{ marginRight: "20px" }} slot="footer" variant="primary" onClick={() => {
                    changePartStatus()
                }}>
                    Change
                </SlButton>
                <SlButton slot="footer" variant="primary" onClick={() => {
                    setOpenStatus(false)
                    setPartStatus("");
                    backOpacity.current.style.display = "none"
                    display.current.style.display = "none";
                    document.getElementById("root").style.overflow = "auto";
                    displayModel.current = false
                }}>
                    Close
                </SlButton>
            </SlDialog>
            <SlDialog className='attribute-image-modal' style={{ '--width': '50vw', '--height': '20vh' }} label="Images" open={openImage} onSlAfterHide={() => setOpenImage(false)}>

                <div>
                    <ImageGallery items={attributeImage} />
                </div>
            </SlDialog>
            <div ref={displayEdit} style={{ display: "none" }}>
                <UpdateProductCatalog onClose={closeEdit} partInfo={partInfo} attribute={attributes} images={partUpdateImages} updateData={getPartInfo}></UpdateProductCatalog>
            </div>
        </div>
    )
}

export default ProductCatalog