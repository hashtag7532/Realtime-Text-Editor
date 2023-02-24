import React, { useEffect } from 'react'
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'

const Editor = () => {
    useEffect(()=>{
        async function init() {
            CodeMirror.fromTextArea(document.getElementById("realtimeEditor"), {
                mode : {name : 'javascript', json : true},
                theme : 'dracula',
                autoCloseTag : true,
                autoCloseBrackets : true,
                lineNumbers : true,  
            })
        }

        init();
    }, [])
  return (
    <textarea id="realtimeEditor" />
  )
}

export default Editor