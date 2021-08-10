import { useState } from "react";
export async function postRequest(request: String, body: String) {
    console.log(body)
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: body.toString(),
    };
    console.log(requestOptions)

    try {
        const response = await fetch('https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/' + request, requestOptions)
        if (!response.ok) {
            throw new Error("Some error occurred (code: " + response.status + ")")
        }
        const data = await response.json()
        return data;
    }
    catch (err) {
        throw err
    }
}