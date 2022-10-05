import React, { useEffect, useRef, useState } from 'react'
import './ProductCatalog.css'
import MUIDataTable from "mui-datatables";
import $ from 'jquery';
import { baseurl } from '../../api/apiConfig';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';

function ProductCatalog() {

    const [filterData, setFilterData] = useState([]);
    const [filterOption1, setFilterOption1] = useState({});
    const [filterOption2, setFilterOption2] = useState();
    const [filterOption3, setFilterOption3] = useState();
    const [inputToOption3, setInputToOption3] = useState({});
    const [attributes, setAttributes] = useState();
    const [partDataKeys, setPartDataKeys] = useState();
    const [partData, setPartData] = useState()
    const [searchData, setSearchData] = useState([]);
    const [partDataMaster, setPartDataMaster] = useState();
    const [partAttributeDataMaster, setPartAttributeDataMaster] = useState();
    const [attributeMaster, setAttributeMaster] = useState();
    const [partInfo, setPartInfo] = useState({});
    const [partAttributeInfo, setPartAttributeInfo] = useState([]);
    const [partAttributeKeys, setPartAttributeKeys] = useState();
    const [partCodeSearch, setPartCodeSearch] = useState()

    const display = useRef(null);
    const backOpacity = useRef(null);
    const options = {
        tableBodyMaxHeight: "60vh",
        responsive: "standard",
        onRowClick: (rowData, rowMeta) => {
            console.log(rowData);
            console.log(rowMeta);
            getPartInfo(rowData[0]);
            display.current.style.display = "block"
            backOpacity.current.style.display = "block"
            document.getElementById("root").style.overflow = "hidden"
        },
        selectableRowsHideCheckboxes: true
    };

    useEffect(() => {
        //console.log(document.querySelector("#filter-row").innerHTML);
        getAttributes()
        //  console.log("hello world".startsWith("llo"));

    }, [])

    /* Axios api calls */
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
                let arr = Object.keys(res.data.data.attribute[0]);
                console.log(arr);
                setPartAttributeKeys(arr)
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

    function filterMasterData(multiFilter) {
        console.log(multiFilter);
        let filterdata = multiFilter.slice(1);
        var filterAttributeData = partAttributeDataMaster;
        var part_id_data;
        if (!filterdata.length) {
            setPartData(partDataMaster);
            return;
        }
        filterdata.map((item) => {
            let attribute = JSON.parse(item.filter_attribute)
            let operation = item.filter_operation
            let value = item.filter_value
            console.log(attribute.id);
            const abc = filterAttributeData.filter((item) => {
                if (item.attribute_type_id == attribute.id)
                    console.log(item.attribute_value, value);
                console.log(item.attribute_value <= value);
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
            console.log(abc);
            part_id_data = abc.map((item) => {
                return (
                    item.part_id
                )
            })
            console.log(part_id_data);
            filterAttributeData = partAttributeDataMaster.filter((item) => {
                if (part_id_data.includes(item.part_id)) {
                    return true
                }
                return false
            })
            console.log(filterAttributeData);
        })
        const tableDataMain = partDataMaster.filter((item) => {
            if (part_id_data.includes(item.part_id)) {
                return true
            }
            return false
        })
        setPartData(tableDataMain);
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
                if(!res.data.dataFound){
                    alert("No Data Found for Part Code :"+ partCodeSearch)
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

    return (
        <div className='product-table-main'>
            <h1 style={{ textAlign: "center", marginBottom: "5vh" }}>Part Catalogue</h1>


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

                            <option value="" hidden>Select an option </option>
                            <option value="start_with">Start's With</option>
                            <option value="end_with">End's With</option>
                            <option value="contains">Contains</option>
                            <option value="equal_string">Equals</option>
                        </select> : inputToOption3.type == "number" ? <select className='product-filter-option2' name="cars" id="cars" value={filterOption3} onChange={e => {
                            setFilterOption3(e.target.value)
                        }}>

                            <option value="" hidden>Select an option </option>
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
                    <h5 className='search-heading' >Search By Part Code</h5>
                    <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
                        <input style={{ minWidth: "10vw" }} className='product-search part-code-search' type="text" onChange={(e) => {
                            setPartCodeSearch((e.target.value).toUpperCase())
                        }} name="" id="" />
                        <button className='product-add-filter-button' onClick={() => {
                            searchPart()
                        }}>Search Part</button>
                    </div>
                </div>
            </div>
            <MUIDataTable
                title={"Product Part List"}
                data={partData}
                columns={partDataKeys}
                options={options}
            ></MUIDataTable>
            <div className='background-opacity' ref={backOpacity}>

            </div>
            <main style={{ display: "none" }} ref={display} className="part-desc-main">
                <button className='button-close-part-desc' onClick={() => {
                    display.current.style.display = "none";
                    backOpacity.current.style.display = "none";
                    document.getElementById("root").style.overflow = "auto";

                }}><span class="material-symbols-outlined">
                        close
                    </span></button>
                <div className='part-dec-container'>
                    <div className='part-desc-inner'>

                        <div className='part-desc-image-data-main'>
                            <div className='part-desc-image-main'>
                                <ImageGallery items={images} />
                            </div>
                            <div className='part-desc-data-main'>
                                <h1 style={{ textAlign: "center", fontSize: "24px" }}>Part Description</h1>
                                <div className='part-desc-data-desc'>
                                    <div className='desc-info-main'><p className='info-key'>Part ID :</p><p className='info-value'>{partInfo?.part_id}</p></div>
                                    <div className='desc-info-main'><p className='info-key'>Part Name :</p><p className='info-value'>{partInfo?.part_name}</p></div>
                                    <div className='desc-info-main'><p className='info-key'>Part Description :</p><p className='info-value'>{partInfo?.part_description}</p></div>
                                    <div className='desc-info-main'><p className='info-key'>Part Category :</p><p className='info-value'>{partInfo?.part_category}</p></div>
                                    <div className='desc-info-main'><p className='info-key'>Part Grounp :</p><p className='info-value'>{partInfo?.part_group}</p></div>
                                    <div className='desc-info-main'><p className='info-key'>Part Status :</p><p className='info-value'>{partInfo?.staus}</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='part-desc-table'>
                        <MUIDataTable
                            title={"Product Part List"}
                            data={partAttributeInfo}
                            columns={partAttributeKeys}
                            options={options}
                        ></MUIDataTable>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ProductCatalog