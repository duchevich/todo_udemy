import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  render(){
    const { viewAll, viewActive, viewDone, viewAllState, viewActiveState, viewDoneState } = this.props;
    let btnAll = 'btn';
    let btnActive = 'btn';
    let btnDone = 'btn';

		if(viewAllState){
			btnAll = 'btn btn-info';
      btnActive = 'btn btn-outline-secondary';
      btnDone = 'btn btn-outline-secondary';
    }
    if(viewActiveState){
      btnAll = 'btn btn-outline-secondary';
      btnActive = 'btn btn-info';
      btnDone = 'btn btn-outline-secondary';
    }
    if(viewDoneState){
			btnAll = 'btn btn-outline-secondary';
      btnActive = 'btn btn-outline-secondary';
      btnDone = 'btn btn-info';
    }

    return (
      <div className="btn-group">
        <button type="button"
                className={btnAll}
                onClick={viewAll}>All</button>
        <button type="button"
                className={btnActive}
                onClick={viewActive}>Active</button>
        <button type="button"
                className={btnDone}
                onClick={viewDone}>Done</button>
      </div>
    );
  }
};