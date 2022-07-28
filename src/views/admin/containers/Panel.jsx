import React from 'react';

const Panel = props => {
  const Form = props.form;

    return (
      <div className={`${props.panelSize}-panel__admin ${props.panelType}__admin ${props.additionalClasses || ''}`}>
        <div className="panel-header__admin">
          <h3>{props.heading}</h3>
        </div>
        <Form { ...props } />
      </div>
    )
}

export default Panel;