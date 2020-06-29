import React from "react"
import M from "materialize-css";

export class FloatingButton extends React.Component{

    render() {
        return(
            <div className="fixed-action-btn">
                <button className="btn-floating btn-large red lighten-1">
                    <i className="large material-icons">mode_edit</i>
                </button>
                <ul>
                    <li><button className="btn-floating red" title="Delete" onClick={() => this.props.onDelete()}><i className="material-icons">delete</i></button></li>
                    <li><button className="btn-floating blue" title="Save as file"><i className="material-icons">save</i></button></li>
                </ul>
            </div>
        )
    }

    componentDidMount() {
        const elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, {
            direction: 'left'
        });
    }
}