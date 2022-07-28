import React from 'react';

const PanelContainer = props => {
    return (
      <section className="panel-container__admin">
        {props.children}
      </section>
    )
}

export default PanelContainer;