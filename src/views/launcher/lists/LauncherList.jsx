import React from 'react';

const LauncherList = (props) => {
  const {items, itemType, heading, itemPropToUseAsButtonText, launch} = props;
  return (
    <div className="list__launcher">
    <h2>{heading}</h2>
    {items && items.map( (item, i) => {
          return (
            <div key={i} className="row__launcher">
                <button data-id={item.id} type="button" onClick={(e) => launch(itemType, e.target.dataset.id)} className="btn btn-secondary">{item[itemPropToUseAsButtonText]}</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default LauncherList;
