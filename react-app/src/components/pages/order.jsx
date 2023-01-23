import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { apiPost, API_URL } from '../../services/services';


// p pl pr pt pb >> m mr ml mt mb
const Order = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();

    const onSub = (bodyData) => {
        console.log(bodyData)
        doApi(bodyData);
    }

    const doApi = async (bodyData) => {
        try {
            let url = API_URL + "/orders";
            let data = await apiPost(url, "POST", bodyData);
            console.log(data);
            // navigate to categoriesList.js
            nav(-1);
        }
        catch (err) {
            console.log(err);
            alert("Didn't work!");
        }
    }

    const onBackClick = () => {
        nav(-1);
    }



    return (
        <div>
            
            <form onSubmit={handleSubmit(onSub)}>
                <label>
                    Customer Name:
                    <input {...register("customerName", { required: true })} className='' />
                    {errors.customerName && <p className=''>{errors.customerName.message}</p>}
                </label>
                <br />
                <label>
                    Customer Phone:
                    <input {...register("customerPhone", { required: true })} className='' />
                    {errors.customerPhone && <p className=''>{errors.customerPhone.message}</p>}
                </label>
                <br />

                <label>
                    Customer Address:
                    <input {...register("customerAddress", { required: true })} className='' />
                    {errors.customerAddress && <p className=''>{errors.customerAddress.message}</p>}
                </label>
                <br />

                <label>
                    Order Items:
                    <input {...register("orderItems", { required: true })} className='' />
                    {errors.orderItems && <p className=''>{errors.orderItems.message}</p>}
                </label>
                <br />

                <label>
                    Order Total:
                    <input {...register("orderTotal", { required: true })} className='' />
                    {errors.orderTotal && <p className=''>{errors.orderTotal.message}</p>}
                </label>
                <br />

                <label>
                    Order Status:
                    <select {...register("orderStatus", {required:true})}>
                        <option value="pending">Pending</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    {errors.orderStatus && <p>{errors.orderStatus.message}</p>}
                </label>
                <br />
                <button onClick={onBackClick}>Submit your Order</button>
            </form>
        </div>
    )
}

export default Order