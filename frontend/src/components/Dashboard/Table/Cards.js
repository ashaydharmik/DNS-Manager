import React from 'react'
import { ImBin2 } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import "./Cards.scss"
const Cards = () => {
  return (
    <>
    <div className='card'>
                <div className='domain-name'>
                <p>Domain name</p>
                <p><IoMdAdd /></p>
                </div>
                <div className='dns-records'>
               <table>
                <tr>
                <th>index</th>
                <th>record name</th>
                <th>record type</th>
                <th>record value</th>
                <th>Delete</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>www</td>
                    <td>A</td>
                    <td>192.168.1.1</td>
                    <td><ImBin2/></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>www</td>
                    <td>A</td>
                    <td>192.168.1.1</td>
                    <td><ImBin2/></td>
                </tr>
               </table>
                </div>
            </div>
            <div className='card'>
                <div className='domain-name'>
                <p>Domain name</p>
                <p><IoMdAdd /></p>
                </div>
                <div className='dns-records'>
               <table>
                <tr>
                <th>index</th>
                <th>record name</th>
                <th>record type</th>
                <th>record value</th>
                <th>Delete</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>www</td>
                    <td>A</td>
                    <td>192.168.1.1</td>
                    <td><ImBin2/></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>www</td>
                    <td>A</td>
                    <td>192.168.1.1</td>
                    <td><ImBin2/></td>
                </tr>
               </table>
                </div>
            </div>
           
    </>
  )
}

export default Cards