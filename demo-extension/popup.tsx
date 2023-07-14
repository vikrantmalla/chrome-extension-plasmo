import React from "react"
import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h2>
        Hello {`${data} !!!`}
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
    </div>
  )
}

export default IndexPopup
