import React from 'react';

const Dropdown = (props) => {
    return (
        <select id={props.id} name={props.name || ""} className={props.classes} onChange={props.changeHandler}>
            <option value="">-- Select a {props.type} --</option>
            { props.dropdownItems.map( (item, i) => {
                return <option key={i} value={item.id}>{item[props.propToUseAsItemText]}</option>
            })}
        </select>
    )
}

export default Dropdown;