import React, { Component } from 'react';

export default class CustomModal extends Component {

  constructor(props) {
    super(props);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onCloseModal() {
    this.props.onRequestClose();
  }

  render() {
    return (
      <>
        <div className={`fade modal-backdrop ${this.props.isOpen ? 'show' : ''}`}
             style={{ display: this.props.isOpen ? 'block' : 'none' }}></div>
        <div className={`modal fade ${this.props.isOpen ? 'show' : ''}`} tabIndex="-1"
             style={{ display: this.props.isOpen ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">{this.props.contentLabel}</h1>
                <button type="button" className="btn-close" onClick={this.onCloseModal}></button>
              </div>
              <div className="modal-body">
                {this.props.children}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.onCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}