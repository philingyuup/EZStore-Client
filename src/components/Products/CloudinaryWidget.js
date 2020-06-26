import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Widget extends Component {
  constructor () {
    super()

  }

  uploadImage = (resultEvent) => {
    if (resultEvent.event === 'success') {
      this.props.postPhoto({
        user_id: this.props.user,
        caption: '',
        url: resultEvent.info.secure_url
      })
        .then(this.props.history.push('/products/edit'))
    }
  }

  showWidget = (widget) => {
    widget.open()
  }

  render () {
    let widget = window.cloudinary.createUploadWidget({
      cloudName: "dbfulv8ap",
      uploadPreset: "qfwcu7bj" },
      (error, result) => { this.uploadImage(result) })

    return (
      <div id='image-uploader'>
        <button onClick={this.showWidget}>Upload Photo</button>
      </div>
    )
  }
}

export default withRouter(Widget)
