import React from 'react'
import styled from 'styled-components'
import { Drawer, Space } from "antd"


const MobileHeader = ({ visible, setVisible, data }) => {
    return (
        <Drawer
            onClose={_=>setVisible(false)}
            title="Меню"
            placement="left"
            width={300}
            visible={visible}
            // extra={
            // <Space>
            //     <Button onClick={onClose}>Cancel</Button>
            //     <Button type="primary" onClick={onClose}>
            //     OK
            //     </Button>
            // </Space>
            // }
        >
            {data.map((el,ind)=>{
                return(
                    <p key={ind}>{el.text}</p>
                )
            })}
            
            {/* <p>Some contents...</p>
            <p>Some contents...</p> */}
        </Drawer>
    )
}

export default MobileHeader


const Container = styled.div`

`