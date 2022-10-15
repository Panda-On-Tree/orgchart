import React, { useEffect, useState } from 'react'
import './Policy.css'
import { SlDivider, SlMenu, SlMenuItem } from '@shoelace-style/shoelace/dist/react';
import pdf from '../assets/pdf-test.pdf'
import axios from 'axios';
import { baseurl } from '../../api/apiConfig';
function Policy() {
    const [policyData, setPolicyData] = useState('');
    const [data, setData] = useState()
    const [policy, setPolicy] = useState()
    const [dept, setDept] = useState(['it', 'sales', 'travelling', 'service', 'admin', 'hr'])
    useEffect(() => {

    }, [])

    function getPolicy(dept) {
        console.log(dept);
        const data = {
            department: dept,
            access_to: "it"
        }
        console.log(data);
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/get-policy`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res.data);
                const data=[];
                const length = res.data.data.length;
                res.data.data.map((item,i) => {
                    const linkSource = `data:application/pdf;base64,${res.data.data[0].file}`;
                    return (fetch(linkSource)
                        .then(res => res.blob())
                        .then(blob => {
                            const file = new File([blob], "File name", { type: "application/pdf" })
                            console.log(file);
                            var objectURL = URL.createObjectURL(file);
                            item.url = objectURL
                            data.push(item)
                            if(i >= length-1){
                                console.log(data);
                                setPolicy(data);
                            }
                        }))
                })
                /* const linkSource = `data:application/pdf;base64,${res.data.data[0].file}`;
                fetch(linkSource)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], "File name", { type: "application/pdf" })
                        console.log(file);
                        var objectURL = URL.createObjectURL(file);
                        setData(objectURL)
                    }) */

            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <div className='policy-main'>

            <div className='policy-main-left'>
                <h3 style={{ marginBottom: '30px', textAlign: 'center' }}>Policy</h3>
                <SlMenu style={{ maxWidth: '100%' }}>
                    {dept.map((item) => {
                        return (
                            <SlMenuItem style={{ borderBottom: '1px solid grey' }} value={item.toLowerCase()} onClick={(e) => {
                                getPolicy(e.target.value)
                            }} className='policy-menu-item'>{item}</SlMenuItem>

                        )
                    })}



                </SlMenu>
            </div>
            <div className='policy-main-right'>
                <ul className='policy-right-list-container'>
                    {
                        policy?.map((item) => {
                            return (
                                <li className='policy-right-list-item'>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                    <a id="link" href={item.url} target="_blank">View Policy</a>
                                </li>
                            )
                        })
                    }


                </ul>
            </div>
        </div>
    )
}

export default Policy