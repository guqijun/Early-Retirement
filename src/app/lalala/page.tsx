import Image from "next/image";
import SubTab from "./SubTab";

export default function Lalala() {

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '24px' }}>LALALA</div>
            <div style={{ border: '1px solid #000' }}></div>
            <div style={{ display: 'flex' }}>
                <SubTab title="xxx" link="xxx" />
                <SubTab title="aaa" link="aaa" />
                <SubTab title="xxx" link="xxx" />
            </div>
            <div style={{ display: 'flex' }}>
                <SubTab title="xxx" link="xxx" />
                <SubTab title="aaa" link="aaa" />
                <SubTab title="xxx" link="xxx" />
            </div>
            <div style={{ display: 'flex' }}>
                <SubTab title="xxx" link="xxx" />
                <SubTab title="aaa" link="aaa" />
                <SubTab title="xxx" link="xxx" />
            </div>
        </div>
    );
}
