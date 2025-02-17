import React from "react";
import '../index.css';

interface Props {
    title: string;
    link: string;
}

export default function SubTab(props: Props) {
    const { title } = props
    return (
        <div
            className={'container'}
        >{title}</div>
    )
}