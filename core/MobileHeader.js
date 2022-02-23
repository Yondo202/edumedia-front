import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Drawer } from "antd"


const MobileHeader = ({ visible, setVisible, data }) => {
    const { push } = useRouter()
    return (
        <Drawer
            title="Меню"
            placement="left"
            width={300}
            visible={visible}
            onClose={_=>setVisible(false)}

            // extra={
            // <Space>
            //     <Button onClick={onClose}>Cancel</Button>
            //     <Button type="primary" onClick={onClose}>
            //     OK
            //     </Button>
            // </Space>
            // }
        >
            <Container>
                {data.map((el,ind)=>{
                    return(
                        <p onClick={_=>(push(`${process.env.frontUrl}/${process.env.categoryUrl}/${el.url}`), setVisible(false) ) } className="lists" key={ind}>{el.name}</p>
                    )
                })}
            </Container>
            
            
            {/* <p>Some contents...</p>
            <p>Some contents...</p> */}
        </Drawer>
    )
}

export default MobileHeader


const Container = styled.div`
    .lists{
        cursor:pointer;
    }
`