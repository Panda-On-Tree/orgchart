import { SlMenu, SlMenuItem } from '@shoelace-style/shoelace/dist/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseurl } from '../../api/apiConfig';

function MyTeam() {


    const [team, setTeam] = useState()
    const [currentLocation, setCurrentLocation] = useState()
    const [employeePath, setEmployeePath] = useState()
    useEffect(() => {
        getTeam()
    }, [])

    function getTeam() {

        const data = {
            "parent_employee_id": localStorage.getItem("employee_id")
        }

        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/all-team-attendence`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res.data.result);
                setTeam(res.data.result)
            })
            .catch((err) => {
                console.log(err);
            })

    }

    function getEmployeeAttendence(i) {


        const data = {
            "employee_id": i
        }

        axios({
            method: 'post',
            url: `${baseurl.base_url}/mhere/get-employee-location`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
        })
            .then((res) => {
                console.log(res.data.data);
                var pathString = "";
                setCurrentLocation({
                    latitude: res.data.data.currentLocation.latitude,
                    longitude: res.data.data.currentLocation.longitude
                })
                if (res.data.data.allLocation.length > 1) {
                    res.data.data.allLocation.map(item => {
                        const lat_long_str = `|${item.latitude},${item.longitude}`;
                        pathString = pathString + lat_long_str;
                    })
                    console.log(pathString);
                    setEmployeePath(pathString);
                }

            })
            .catch((err) => {
                console.log(err);
            })

    }

    function showPathOnMap() {

    }


    return (
        <div className='policy-main'>

            <div className='policy-main-left'>
                <h3 style={{ marginBottom: '30px', textAlign: 'center' }}>My Team</h3>
                <SlMenu style={{ maxWidth: '100%', maxHeight: '75vh', overflowX: 'hidden' }}>
                    {
                        team?.map((item, i) => {
                            return (
                                <SlMenuItem id={"teamitem" + i} style={{ borderBottom: '1px solid grey' }} value={item.employee_id} className='policy-menu-item' onClick={(e) => {
                                    getEmployeeAttendence(e.target.value)
                                }}>{item.name}</SlMenuItem>
                            )
                        })
                    }






                </SlMenu>
            </div>
            <div className='policy-main-right'>
                <h2>Current Location :</h2>
                {
                    currentLocation ?
                        <iframe src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBp3c2hhpEnBf06Zl84C9YpKb8f6vLy1Rw&q=${currentLocation.latitude},${currentLocation.longitude}`}
                        width="600"
                        style={{
                          border: "0px",
                          margin: "0 auto",
                          height: "50vh",
                          width: "50vw",
                        }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        ></iframe > : null
                }
               {employeePath?  <h2 style={{marginTop:'50px'}}>
                    Employee Travel History : 
                </h2>:null}
                {
                    employeePath ?
                        <img src={`https://maps.googleapis.com/maps/api/staticmap?&size=3000x3000&path=color:0x0000ff|weight:5${employeePath}&key=AIzaSyBp3c2hhpEnBf06Zl84C9YpKb8f6vLy1Rw`}
                            style={{
                                border: "0px",
                                margin: "0 auto",
                            }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></img > : null
                }

            </div>
            <div>

            </div>
        </div>
    )
}

export default MyTeam